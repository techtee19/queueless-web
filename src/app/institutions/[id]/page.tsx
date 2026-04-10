"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Phone, Users } from "lucide-react";
import { PageLoader, ButtonSpinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Institution } from "@/types";
import { InstitutionIcon } from "@/components/InstitutionIcon";
import { useAuthStore } from "@/stores/authStore";

export default function InstitutionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const { data } = await api.get(`/institutions/${params.id}`);
        setInstitution(data.data);
      } catch (error) {
        toast.error("Failed to load institution details");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchInstitution();
  }, [params.id, router]);

  const handleJoinQueue = async (serviceId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to join a queue");
      router.push("/login");
      return;
    }

    try {
      setJoiningId(serviceId);
      const { data } = await api.post("/queues/join", { serviceId });
      toast.success("Joined queue successfully!");
      router.push(`/queue/${data.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || error.response?.data?.message || "Failed to join queue");
    } finally {
      setJoiningId(null);
    }
  };

  if (loading) {
    return <PageLoader message="Loading institution..." />;
  }

  if (!institution) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="group flex items-center text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
            <div className="bg-stone-100 p-2 rounded-lg mr-3 group-hover:bg-stone-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Banner Section */}
      <div className="bg-gradient-to-b from-brand-50/50 to-stone-50 pt-16 pb-32 -mb-24 relative overflow-hidden border-b border-stone-200/50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-600 shadow-xl shadow-brand-500/10 border border-stone-200/60 shrink-0 group hover:scale-105 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-50"></div>
            <InstitutionIcon type={institution.type} className="w-12 h-12 md:w-16 md:h-16 group-hover:rotate-6 transition-transform duration-500 relative z-10" />
          </div>
          <div className="flex-1">
            <span className="inline-block bg-white text-brand-600 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg mb-3 border border-stone-200/60 shadow-sm">
              {institution.type}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-3 tracking-tight leading-tight">
              {institution.name}
            </h1>
            <p className="text-stone-500 max-w-2xl text-base md:text-lg leading-relaxed">
              {institution.description || "Official branch office serving customers digitally. Join a queue from anywhere and save time."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Institution Details / Sticky Sidebar */}
          <div className="lg:w-1/3 shrink-0">
            <div className="glass-panel rounded-3xl p-6 lg:p-8 shadow-xl border border-stone-200/50 lg:sticky lg:top-24 space-y-6 bg-white/95 backdrop-blur-xl">
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Location & Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm mb-0.5">Address</div>
                      <div className="text-sm text-stone-500 leading-relaxed">
                        {institution.address}<br />
                        {institution.city}, {institution.state}
                      </div>
                    </div>
                  </div>
                  
                  {institution.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 text-sm mb-0.5">Phone</div>
                        <div className="text-sm text-stone-500">{institution.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Services List */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Available Services</h2>
              <div className="bg-white text-stone-700 text-sm font-bold py-1.5 px-4 rounded-full flex items-center gap-2 shadow-sm border border-stone-200">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span>{institution.services.length}</span>
              </div>
            </div>

            {institution.services.length === 0 ? (
              <div className="glass-panel rounded-3xl border border-stone-200 border-dashed p-12 text-center flex flex-col items-center justify-center bg-white/50">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">No Services Available</h3>
                <p className="text-stone-500 max-w-sm">This institution has not set up any queueing services yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {institution.services.map((service) => {
                  const isFull = service.waitingCount >= service.maxQueueSize;
                  const isClosed = !service.isOpen;
                  
                  return (
                    <div 
                      key={service.id} 
                      className={`group relative bg-white rounded-3xl border ${isClosed ? 'border-stone-200/60 bg-stone-50/50' : 'border-stone-200/80 hover:border-brand-200'} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1`}
                    >
                      {/* Interactive hover background effect */}
                      {!isClosed && <div className="absolute inset-0 bg-gradient-to-r from-brand-50/0 via-brand-50/0 to-brand-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>}
                      
                      <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-extrabold ${isClosed ? 'text-stone-400' : 'text-stone-900'}`}>{service.name}</h3>
                          {isClosed && (
                            <span className="bg-stone-100 text-stone-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Closed</span>
                          )}
                          {isFull && !isClosed && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200/50 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Full</span>
                          )}
                        </div>
                        
                        {service.description && (
                          <p className={`text-sm mb-5 leading-relaxed ${isClosed ? 'text-stone-400' : 'text-stone-500'}`}>{service.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${isClosed ? 'bg-stone-100/50 border-stone-200/50 text-stone-400' : 'bg-white border-stone-200 text-stone-700 shadow-sm'}`}>
                            <Users className={`w-4 h-4 ${isClosed ? 'text-stone-400' : 'text-brand-500'}`} />
                            <span className="font-bold">{service.waitingCount}</span> 
                            <span className="text-xs">waiting</span>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${isClosed ? 'bg-stone-100/50 border-stone-200/50 text-stone-400' : 'bg-white border-stone-200 text-stone-700 shadow-sm'}`}>
                            <Clock className={`w-4 h-4 ${isClosed ? 'text-stone-400' : 'text-amber-500'}`} />
                            <span className="font-bold">~{service.estimatedTime}</span>
                            <span className="text-xs">min / person</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-stone-200/60 pt-5 sm:pt-0 sm:pl-8 sm:min-w-[160px]">
                        <div className="text-left sm:text-right">
                          <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isClosed ? 'text-stone-400' : 'text-stone-400'}`}>Est. Wait</div>
                          <div className={`text-2xl sm:text-3xl font-black ${isClosed ? 'text-stone-300' : 'text-stone-900'} tracking-tight`}>
                            {service.estimatedWaitMinutes} <span className="text-sm font-bold text-stone-400">min</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleJoinQueue(service.id)}
                          disabled={isClosed || isFull || joiningId === service.id}
                          className={`mt-0 sm:mt-4 inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold transition-all duration-300 min-w-[130px] ${
                            isClosed 
                              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                              : isFull
                                ? 'bg-amber-100 text-amber-700 cursor-not-allowed'
                                : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:-translate-y-0.5'
                          }`}
                        >
                          {joiningId === service.id ? (
                            <ButtonSpinner size={20} />
                          ) : isClosed ? (
                            "Offline"
                          ) : isFull ? (
                            "At Capacity"
                          ) : (
                            <span className="flex items-center gap-2">
                              Join Queue <ArrowLeft className="w-4 h-4 rotate-180" />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
