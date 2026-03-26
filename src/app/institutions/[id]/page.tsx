"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Phone, Loader2, Users } from "lucide-react";
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
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!institution) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10 opacity-50"></div>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-center text-stone-500 shrink-0">
              <InstitutionIcon type={institution.type} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-stone-900 leading-tight">{institution.name}</h1>
                <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
                  {institution.type}
                </span>
              </div>
              <p className="text-sm text-stone-500 max-w-lg mt-2">
                {institution.description || "Official branch office serving customers digitally."}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-stone-100">
            <div className="flex items-start gap-3 text-stone-600">
              <MapPin className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{institution.address}, {institution.city}, {institution.state}</span>
            </div>
            {institution.phone && (
              <div className="flex items-center gap-3 text-stone-600">
                <Phone className="w-5 h-5 text-stone-400 shrink-0" />
                <span className="text-sm">{institution.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            Available Services
            <span className="bg-stone-200 text-stone-700 text-xs py-0.5 px-2 rounded-full">{institution.services.length}</span>
          </h2>

          {institution.services.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 border-dashed p-8 text-center text-stone-500">
              No services currently available.
            </div>
          ) : (
            <div className="space-y-4">
              {institution.services.map((service) => {
                const isFull = service.waitingCount >= service.maxQueueSize;
                
                return (
                  <div key={service.id} className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:shadow transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-stone-900 text-lg">{service.name}</h3>
                        {!service.isOpen && (
                          <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider">Closed</span>
                        )}
                      </div>
                      {service.description && (
                        <p className="text-stone-500 text-sm mb-4">{service.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                          <Users className="w-4 h-4 text-brand-500" />
                          <span className="font-semibold">{service.waitingCount}</span> waiting
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span>~{service.estimatedTime} min <span className="text-stone-400">/ person</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end md:min-w-[140px] border-t md:border-t-0 md:border-l border-stone-100 pt-5 md:pt-0 md:pl-6">
                      <div className="mb-3 text-center md:text-right">
                        <div className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-0.5">Est. Wait</div>
                        <div className="text-xl font-extrabold text-stone-900">
                          ~{service.estimatedWaitMinutes} <span className="text-sm font-medium text-stone-400">min</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleJoinQueue(service.id)}
                        disabled={!service.isOpen || isFull || joiningId === service.id}
                        className="w-full md:w-auto inline-flex items-center justify-center bg-brand-500 text-white rounded-lg px-6 py-2.5 font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                      >
                        {joiningId === service.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : !service.isOpen ? (
                          "Queue Closed"
                        ) : isFull ? (
                          "Queue Full"
                        ) : (
                          "Join Queue →"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
