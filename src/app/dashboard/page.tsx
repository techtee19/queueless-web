"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, MapPin, User as UserIcon, Loader2, ArrowRight } from "lucide-react";
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
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-stone-900">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="text-sm font-medium text-stone-700 hidden sm:block">
                {user?.firstName}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-lg hover:bg-stone-100"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {loadingData ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          </div>
        ) : (
          <>
            {/* Active Queues Card */}
            {activeEntries.length > 0 && (
              <section className="mb-10">
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Active Queues</h2>
                
                <div className="space-y-4">
                  {activeEntries.map((entry) => {
                    const totalWaiting = (entry.queue as any).totalWaiting || entry.position; // fallback estimate
                    return (
                      <div 
                        key={entry.id}
                        onClick={() => router.push(`/queue/${entry.id}`)}
                        className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 cursor-pointer hover:border-brand-200 transition-all hover:shadow-md active:scale-[0.99]"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="font-bold text-lg text-stone-900 leading-tight">
                              {entry.queue.institution.name}
                            </h3>
                            <p className="text-stone-500 font-medium">
                              {entry.queue.service.name}
                            </p>
                          </div>
                          <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-2 flex flex-col items-center min-w-[80px]">
                            <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">Ticket</span>
                            <span className="text-2xl font-extrabold text-brand-600 tabular-nums leading-none mt-1">
                              #{entry.ticketNumber}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-stone-50 border border-stone-100">
                          <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Position</p>
                            <p className="text-xl font-bold text-stone-900">
                              <span className="text-brand-500">#{entry.position}</span> in line
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Est. Wait</p>
                            <p className="text-xl font-bold text-stone-900">
                              ~{entry.estimatedWaitMinutes} <span className="text-base font-medium text-stone-500">min</span>
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <ProgressBar position={entry.position} total={totalWaiting} />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); router.push(`/queue/${entry.id}`); }}
                            className="flex-1 bg-brand-500 text-white rounded-lg py-3 font-semibold hover:bg-brand-600 transition-colors text-sm"
                          >
                            View Live Tracking
                          </button>
                          <button
                            onClick={(e) => handleCancelEntry(e, entry.id)}
                            className="px-5 text-sm font-semibold rounded-lg bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
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
            <section>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Browse Institutions</h2>
              
              {institutions.length === 0 ? (
                <div className="bg-white border flex flex-col items-center justify-center border-stone-200 rounded-2xl p-8 text-center border-dashed">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1">No institutions found</h3>
                  <p className="text-stone-500 text-sm">Check back later or try a different location.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {institutions.map((inst) => (
                    <Link href={`/institutions/${inst.id}`} key={inst.id}>
                      <div className="bg-white border border-stone-200 rounded-xl p-5 hover:border-brand-200 hover:shadow-sm transition-all flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors text-stone-500 border border-stone-100">
                          <InstitutionIcon type={inst.type} className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-stone-900 truncate">{inst.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-stone-500 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{inst.address}, {inst.city}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-600">
                              {inst.services.length} Services
                            </span>
                          </div>
                        </div>
                        <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                          <ArrowRight className="w-5 h-5 text-brand-500" />
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
