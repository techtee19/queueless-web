"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Monitor, Users, Clock, Loader2, CheckCircle2, XCircle, BellRing, Settings2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { QueueEntry } from "@/types";
import { useAuthStore } from "@/stores/authStore";

export default function StaffDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, loadUser, logout } = useAuthStore();
  
  const [queues, setQueues] = useState<any[]>([]);
  const [stats, setStats] = useState({ served: 0, avgTime: 0, skipped: 0 });
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "STAFF") {
        toast.error("Unauthorized. Staff access only.");
        router.push("/dashboard");
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await api.get("/staff/queue");
      setQueues(data.data.queues || []);
      setStats(data.data.stats || { served: 0, avgTime: 0, skipped: 0 });
      setIsOnDuty(data.data.isOnDuty || false);
    } catch (error) {
      // toast.error("Failed to load staff data");
      // Silently fail if just refreshing
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.role === "STAFF") {
      fetchData();
      
      const socket = connectSocket();
      socket.on("queue:updated", () => {
        fetchData();
      });

      return () => {
        socket.off("queue:updated");
      };
    }
  }, [isAuthenticated, user, fetchData]);

  const toggleDuty = async () => {
    try {
      const { data } = await api.patch("/staff/duty");
      setIsOnDuty(data.data.isOnDuty);
      toast.success(data.data.isOnDuty ? "You are now ON DUTY" : "You are OFF DUTY");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const callNext = async (queueId: string) => {
    try {
      setActionLoading(`call-${queueId}`);
      await api.post("/staff/call-next", { queueId });
      toast.success("Called next customer");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to call next");
    } finally {
      setActionLoading(null);
    }
  };

  const completeService = async (entryId: string) => {
    try {
      setActionLoading(`complete-${entryId}`);
      await api.post(`/staff/complete/${entryId}`);
      toast.success("Service completed");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to complete service");
    } finally {
      setActionLoading(null);
    }
  };

  const skipCustomer = async (entryId: string) => {
    if (!confirm("Are you sure you want to mark this customer as a no-show?")) return;
    try {
      setActionLoading(`skip-${entryId}`);
      await api.post(`/staff/skip/${entryId}`);
      toast("Customer skipped", { icon: "⚠️" });
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to skip");
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  // Get currently serving (there should only be 1 per staff member, but let's find it)
  // The API should ideally return the specific entry this staff member is serving.
  // Assuming the `queues` array contains entries and we filter for SERVING.
  const allEntries = queues.flatMap(q => q.entries || []);
  const currentlyServing = allEntries.find(e => e.status === "SERVING" && e.servedById === user?.id) 
    || allEntries.find(e => e.status === "SERVING"); // Fallback if API doesn't populate servedById well

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-24">
      {/* Header */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monitor className="w-5 h-5 text-brand-400" />
            <h1 className="text-lg font-bold tracking-tight">Staff Terminal</h1>
            <span className="bg-stone-800 text-stone-300 text-xs px-2 py-1 rounded font-mono">
              Counter {user?.staffProfile?.counterNumber || "1"}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className={`text-sm font-semibold ${isOnDuty ? "text-brand-400" : "text-stone-400"}`}>
                {isOnDuty ? "ON DUTY" : "OFF DUTY"}
              </span>
              <div className={`w-10 h-6 rounded-full relative transition-colors ${isOnDuty ? "bg-brand-500" : "bg-stone-700"}`}>
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isOnDuty ? "translate-x-4" : ""}`}></div>
              </div>
              <input type="checkbox" className="hidden" checked={isOnDuty} onChange={toggleDuty} />
            </label>
            
            <div className="h-6 border-l border-stone-700 hidden sm:block"></div>
            
            <button
              onClick={logout}
              className="text-stone-400 hover:text-red-400 transition-colors hidden sm:flex items-center gap-2 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {!isOnDuty && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center shadow-sm">
            <Settings2 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-amber-900 mb-1">You are currently offline</h2>
            <p className="text-amber-700">Toggle your status to "ON DUTY" to start serving customers.</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Current & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* Action Card: Currently Serving */}
            <div className={`bg-white rounded-2xl border ${currentlyServing ? "border-brand-500 shadow-md ring-1 ring-brand-500" : "border-stone-200 shadow-sm"} p-6 relative overflow-hidden`}>
              {currentlyServing && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-10"></div>
              )}
              
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-6 flex items-center justify-between">
                Currently Serving
                {currentlyServing && (
                  <span className="flex items-center gap-1 text-xs text-brand-600 bg-brand-50 px-2 py-1 rounded">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                    Live
                  </span>
                )}
              </h2>

              {currentlyServing ? (
                <div>
                  <div className="flex border-b border-stone-100 pb-6 mb-6">
                    <div className="bg-brand-50 border-2 border-brand-200 rounded-xl px-4 py-3 flex flex-col items-center justify-center mr-5 shrink-0">
                      <span className="text-[0.65rem] font-bold text-brand-700 uppercase tracking-widest mb-1">Ticket</span>
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums leading-none">
                        #{currentlyServing.ticketNumber}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-stone-900 leading-tight">
                        {currentlyServing.user.firstName} {currentlyServing.user.lastName}
                      </p>
                      <p className="text-sm font-medium text-stone-500 mt-1">{currentlyServing.queue.service.name}</p>
                      <p className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Waiting since {new Date(currentlyServing.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <button
                      onClick={() => completeService(currentlyServing.id)}
                      disabled={!!actionLoading}
                      className="w-full bg-stone-900 text-white rounded-lg py-3.5 font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {actionLoading === `complete-${currentlyServing.id}` ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                      Complete Service
                    </button>
                    <button
                      onClick={() => skipCustomer(currentlyServing.id)}
                      disabled={!!actionLoading}
                      className="w-full bg-white border-2 border-red-100 text-red-600 rounded-lg py-3 font-bold hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
                    >
                      {actionLoading === `skip-${currentlyServing.id}` ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                      No-Show / Skip
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-100">
                    <Monitor className="w-8 h-8 text-stone-300" />
                  </div>
                  <p className="text-stone-500 font-medium">Counter is empty</p>
                  <p className="text-sm text-stone-400 mt-1">Ready for the next customer</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-6">Today's Performance</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase">Served</p>
                  <p className="text-2xl font-extrabold text-stone-900 mt-1">{stats.served}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase">Avg Time</p>
                  <p className="text-2xl font-extrabold text-stone-900 mt-1">{stats.avgTime}<span className="text-sm text-stone-500 font-medium ml-1">m</span></p>
                </div>
                <div className="col-span-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase">Skipped / No-Shows</p>
                  <p className="text-2xl font-extrabold text-stone-900 mt-1">{stats.skipped}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Queue Lists */}
          <div className="lg:col-span-2 space-y-6">
            {queues.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500 border-dashed">
                No active queues for your institution today.
              </div>
            ) : (
              queues.map((queue) => {
                const waitingList = queue.entries.filter((e: any) => ["WAITING", "CALLED", "CHECKED_IN"].includes(e.status));
                const isNextAvailable = waitingList.length > 0 && !currentlyServing;
                
                return (
                  <div key={queue.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-stone-50 border-b border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-stone-900">{queue.service.name}</h3>
                        <p className="text-sm text-stone-500 flex items-center gap-2 mt-1">
                          <Users className="w-4 h-4" />
                          {waitingList.length} waiting list
                        </p>
                      </div>
                      
                      <button
                        onClick={() => callNext(queue.id)}
                        disabled={!isOnDuty || !isNextAvailable || !!actionLoading || !!currentlyServing}
                        className="bg-brand-500 text-white rounded-lg px-6 py-2.5 font-bold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                      >
                        {actionLoading === `call-${queue.id}` ? <Loader2 className="w-5 h-5 animate-spin" /> : <BellRing className="w-5 h-5" />}
                        Call Next
                      </button>
                    </div>

                    <div className="p-0">
                      {waitingList.length === 0 ? (
                        <div className="p-8 text-center text-stone-400 text-sm">
                          Queue is currently empty
                        </div>
                      ) : (
                        <div className="divide-y divide-stone-100 max-h-[400px] overflow-y-auto">
                          {waitingList.map((entry: any, idx: number) => (
                            <div key={entry.id} className={`p-4 flex items-center justify-between hover:bg-stone-50 transition-colors ${entry.status === "CHECKED_IN" ? "bg-blue-50/30" : ""}`}>
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center font-bold text-lg text-stone-700">
                                  {entry.ticketNumber}
                                </div>
                                <div>
                                  <p className="font-bold text-stone-900">
                                    {entry.user.firstName} {entry.user.lastName}
                                  </p>
                                  <p className="text-xs text-stone-500 mt-1 border-l-2 pl-2 border-stone-200">
                                    {idx === 0 ? "Next in line" : `${idx} ahead`}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="mb-1">
                                  {entry.status === "CHECKED_IN" && (
                                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded shadow-sm">
                                      CHECKED IN ✓
                                    </span>
                                  )}
                                  {entry.status === "WAITING" && (
                                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
                                      Waiting
                                    </span>
                                  )}
                                  {entry.status === "CALLED" && (
                                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">
                                      CALLED 🔔
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-stone-400 block mt-1">
                                  Joined {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
