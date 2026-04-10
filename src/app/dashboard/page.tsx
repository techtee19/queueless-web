"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, MapPin, ArrowRight, Building2, Ticket } from "lucide-react";
import { PageLoader, Spinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import api from "@/lib/api";
import { QueueEntry, Institution } from "@/types";
import { InstitutionIcon } from "@/components/InstitutionIcon";
import { ProgressBar } from "@/components/ProgressBar";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, loadUser, logout } = useAuthStore();
  
  const [activeEntries, setActiveEntries] = useState<QueueEntry[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [queuesRes, instRes] = await Promise.all([
        api.get("/queues/my-active").catch(() => null),
        api.get("/institutions").catch(() => null),
      ]);
      
      if (queuesRes?.data?.data) {
        setActiveEntries(queuesRes.data.data);
      }
      if (instRes?.data?.data) {
        setInstitutions(instRes.data.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      toast.error("Failed to load your dashboard");
    } finally {
      setLoadingData(false);
    }
  };

  const handleCancelEntry = async (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation(); // prevent clicking card
    if (!confirm("Are you sure you want to cancel your spot in this queue?")) return;
    
    try {
      await api.post(`/queues/${entryId}/cancel`);
      toast.success("Queue entry cancelled");
      fetchData(); // refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel queue entry");
    }
  };

  if (authLoading || !isAuthenticated) {
    return <PageLoader message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      {/* Premium Glass Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-stone-200/50 shadow-sm transition-all animate-fade-in-up">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-black tracking-tight text-stone-900 group">
            Queue<span className="text-brand-500">Less</span>
          </Link>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-sm">
              <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="text-sm font-bold text-stone-800 hidden sm:block pr-2">
                {user?.firstName}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl font-bold flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        
        {loadingData ? (
          <div className="flex justify-center items-center py-32">
            <Spinner size={40} />
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">Overview</h2>
              <p className="text-stone-500 font-medium mt-1">Manage your active spots and browse new queues.</p>
            </div>

            {/* Premium Active Queues Cards */}
            {activeEntries.length > 0 && (
              <section className="mb-14">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-6 bg-brand-500 rounded-full"></div>
                  <h3 className="text-lg font-black text-stone-900 uppercase tracking-widest">Active Tickets</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {activeEntries.map((entry) => {
                    const totalWaiting = (entry.queue as any).totalWaiting || entry.position;
                    return (
                      <div 
                        key={entry.id}
                        onClick={() => router.push(`/queue/${entry.id}`)}
                        className="bg-white border border-stone-200 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 cursor-pointer overflow-hidden group"
                      >
                        <div className="p-6 relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="flex justify-between items-start mb-6 relative z-10">
                            <div>
                              <span className="inline-block px-2.5 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-md mb-3 uppercase tracking-wider">{entry.queue.service.name}</span>
                              <h3 className="font-black text-2xl text-stone-900 leading-tight mb-1">
                                {entry.queue.institution.name}
                              </h3>
                            </div>
                            <div className="bg-brand-500 border-none rounded-2xl px-5 py-3 flex flex-col items-center shadow-lg shadow-brand-500/20 transform group-hover:scale-105 transition-transform">
                              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">Ticket</span>
                              <span className="text-3xl font-black text-white tabular-nums leading-none">
                                #{entry.ticketNumber}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">Your Position</p>
                              <p className="text-2xl font-black text-stone-900">
                                <span className="text-brand-500">#{entry.position}</span>
                              </p>
                            </div>
                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">Est. Wait</p>
                              <p className="text-2xl font-black text-stone-900">
                                ~{entry.estimatedWaitMinutes} <span className="text-sm font-semibold text-stone-500">min</span>
                              </p>
                            </div>
                          </div>

                          <div className="mb-6 relative z-10">
                            <ProgressBar position={entry.position} total={totalWaiting} />
                          </div>
                        </div>

                        <div className="flex border-t border-stone-100 bg-stone-50/50">
                          <button
                            onClick={(e) => { e.stopPropagation(); router.push(`/queue/${entry.id}`); }}
                            className="flex-1 py-4 font-bold text-brand-600 hover:bg-brand-50 transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <Ticket className="w-4 h-4" /> Live Tracking
                          </button>
                          <div className="w-px bg-stone-200"></div>
                          <button
                            onClick={(e) => handleCancelEntry(e, entry.id)}
                            className="px-6 py-4 font-bold text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Institutions Browse */}
            <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-6 bg-stone-400 rounded-full"></div>
                <h3 className="text-lg font-black text-stone-900 uppercase tracking-widest">Available Institutions</h3>
              </div>
              
              {institutions.length === 0 ? (
                <div className="bg-white border-2 border-stone-200/50 rounded-[2rem] p-12 text-center border-dashed">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 mx-auto mb-6">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-stone-900 mb-2">No institutions listed</h3>
                  <p className="text-stone-500 font-medium">Check back later or try a different location.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {institutions.map((inst) => (
                    <Link href={`/institutions/${inst.id}`} key={inst.id}>
                      <div className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 flex items-start flex-col gap-4 group h-full">
                        <div className="flex items-start justify-between w-full">
                          <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors text-stone-400 group-hover:text-brand-500 border border-stone-100">
                            <InstitutionIcon type={inst.type} className="w-6 h-6" />
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all bg-brand-50 p-2 rounded-full text-brand-500">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <div className="w-full mt-2">
                          <h3 className="font-black text-lg text-stone-900 leading-tight mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">{inst.name}</h3>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 mb-4">
                            <MapPin className="w-4 h-4 text-stone-400" />
                            <span className="truncate">{inst.address}, {inst.city}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-stone-100 text-stone-600">
                              {inst.services.length} Services
                            </span>
                            <span className="text-xs font-bold text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
