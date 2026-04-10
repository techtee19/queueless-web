"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";
import { ArrowLeft, AlertCircle, CheckCircle2, QrCode } from "lucide-react";
import { PageLoader, Spinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { QueueEntry } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { useAuthStore } from "@/stores/authStore";

export default function QueueTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, loadUser } = useAuthStore();
  
  const [entry, setEntry] = useState<QueueEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchEntry = useCallback(async () => {
    try {
      const { data } = await api.get(`/queues/${params.id}`);
      setEntry(data.data);
    } catch (error) {
      toast.error("Failed to load queue details");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntry();
    }
  }, [isAuthenticated, fetchEntry]);

  useEffect(() => {
    if (!entry || !user) return;

    const socket = connectSocket();

    socket.emit("join-queue-room", { queueId: entry.queue.id });
    socket.emit("join-user-room", { userId: user.id });

    socket.on("queue:updated", () => {
      fetchEntry();
    });

    socket.on("status:changed", (data: any) => {
      if (data.entryId === params.id) {
        setEntry((prev) => prev ? { ...prev, status: data.newStatus } : prev);
        toast(data.message, {
          icon: ["COMPLETED", "CHECKED_IN", "SERVING"].includes(data.newStatus) ? "✅" : "ℹ️",
        });

        if (["COMPLETED", "EXPIRED", "CANCELLED"].includes(data.newStatus)) {
          setTimeout(() => router.push("/dashboard"), 3000);
        }
      }
    });

    socket.on("position:updated", (data: any) => {
      if (data.entryId === params.id) {
        setEntry((prev) => prev ? { 
          ...prev, 
          position: data.position, 
          estimatedWaitMinutes: data.estimatedWaitMinutes 
        } : prev);
      }
    });

    return () => {
      socket.emit("leave-queue-room", { queueId: entry.queue.id });
      socket.off("queue:updated");
      socket.off("status:changed");
      socket.off("position:updated");
    };
  }, [entry?.queue.id, user, params.id, router, fetchEntry]);

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    setIsCancelModalOpen(false);
    try {
      await api.post(`/queues/${params.id}/cancel`);
      toast.success("Spot cancelled locally");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel");
    }
  };

  if (authLoading || loading) {
    return <PageLoader message="Loading queue details..." />;
  }

  if (!entry) return null;

  const totalWaiting = (entry.queue as any).totalWaiting || entry.position;
  const isTerminalState = ["COMPLETED", "SKIPPED", "CANCELLED", "EXPIRED"].includes(entry.status);

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans flex flex-col items-center relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

      <header className="w-full relative z-40 pt-6 pb-4">
        <div className="max-w-md mx-auto px-4 flex items-center">
          <Link 
            href="/dashboard" 
            className="bg-white border border-stone-200 shadow-sm hover:shadow-md px-4 py-2.5 rounded-full inline-flex items-center text-sm font-semibold text-stone-700 hover:text-brand-600 transition-all fast"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 text-stone-400" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-md w-full mx-auto px-4 py-4 relative z-10">
        {/* Alerts for special states */}
        {entry.status === "CALLED" && (
          <div className="mb-6 bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3 shadow-sm animate-pulse">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900">It's your turn!</h3>
              <p className="text-amber-800 text-sm mt-1">Please proceed to the counter immediately and show your QR code to check in.</p>
            </div>
          </div>
        )}

        {entry.status === "CHECKED_IN" && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-blue-800">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-medium text-sm">You are checked in. Please wait to be served.</p>
          </div>
        )}

        {entry.status === "SERVING" && (
          <div className="mb-6 bg-teal-50 border-2 border-teal-300 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <Spinner size={20} />
            <p className="font-bold text-teal-900">You are currently being served.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-200 overflow-hidden relative group">
          {/* Ticket Header */}
          <div className="bg-stone-900 p-6 text-center relative border-b-4 border-brand-500">
            {/* Decoration */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-50 rounded-full"></div>
            
            <h2 className="text-xl font-bold text-white mb-1 truncate">{entry.queue.institution.name}</h2>
            <p className="text-stone-400 font-medium text-sm">{entry.queue.service.name}</p>
          </div>

          <div className="p-8 text-center border-b border-stone-100 border-dashed relative">
            {/* Ticket Cutouts */}
            <div className="absolute -left-4 -bottom-4 w-8 h-8 bg-stone-50 rounded-full border border-stone-200"></div>
            <div className="absolute -right-4 -bottom-4 w-8 h-8 bg-stone-50 rounded-full border border-stone-200"></div>
            
            <div className="mb-4">
              <StatusBadge status={entry.status} />
            </div>
            
            <div className="inline-flex flex-col items-center justify-center bg-brand-50 border-2 border-brand-200 rounded-2xl p-6 min-w-[200px] mb-8 shadow-inner">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-1">Your Ticket</span>
              <div className="text-6xl font-extrabold text-stone-900 tracking-tight tabular-nums leading-none flex items-start justify-center">
                <span className="text-brand-500 text-4xl mr-1 mt-1">#</span>
                {entry.ticketNumber}
              </div>
            </div>

            {!isTerminalState && entry.status !== "SERVING" && (
              <div className="grid grid-cols-2 gap-4 text-left p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Position</p>
                  <p className="text-xl font-bold text-stone-900">
                    <span className="text-brand-500">#{entry.position}</span> <span className="text-sm font-medium text-stone-500">in line</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Est. Wait</p>
                  <p className="text-xl font-bold text-stone-900">
                    ~{entry.estimatedWaitMinutes} <span className="text-sm font-medium text-stone-500">min</span>
                  </p>
                </div>
              </div>
            )}

            {isTerminalState && (
              <div className="py-8">
                <p className="text-lg font-bold text-stone-900">
                  {entry.status === "COMPLETED" ? "Service Completed" : `Service ${entry.status.toLowerCase()}`}
                </p>
                <p className="text-stone-500 mt-2">Returning to dashboard soon...</p>
              </div>
            )}
          </div>

          {/* Bottom Section - Progress & QR */}
          {!isTerminalState && (
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex flex-col gap-6">
              
              {/* Progress Panel */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Queue Progress</p>
                <ProgressBar position={entry.position} total={totalWaiting} />
                
                <div className="mt-5 grid grid-cols-2 gap-4 divide-x divide-stone-100">
                  <div className="flex flex-col pr-4">
                    <span className="text-xs text-stone-500 font-medium mb-1">Serving Now</span>
                    <span className="text-xl font-extrabold text-stone-900 tabular-nums">#{entry.queue.currentServing || 0}</span>
                  </div>
                  <div className="flex flex-col pl-4">
                    <span className="text-xs text-stone-500 font-medium mb-1">People Ahead</span>
                    <span className="text-xl font-extrabold text-brand-600 tabular-nums">{Math.max(0, entry.position - 1)}</span>
                  </div>
                </div>
              </div>

              {/* Check-In Panel */}
              {entry.qrToken && (
                <div className="bg-stone-900 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>
                  
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 relative z-10">
                    <QrCode className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 relative z-10">Check-In Ready</h3>
                  <p className="text-stone-400 text-xs font-medium mb-6 relative z-10">
                    Show this exact code at the counter. Do not screenshot.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl shadow-md w-full flex justify-center relative z-10 border border-stone-200">
                    <QRCode
                      value={entry.qrToken}
                      size={160}
                      level="Q"
                      fgColor="#1c1917"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!isTerminalState && (
          <button
            onClick={handleCancelClick}
            className="w-full mt-6 py-4 rounded-xl border-2 border-red-200 text-red-600 bg-white hover:bg-red-50 focus:ring-4 focus:ring-red-100 font-bold text-base transition-all fast active:scale-[0.98]"
          >
            Cancel Spot
          </button>
        )}
      </main>

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCancelModalOpen(false)}
          />
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm relative z-10 animate-slide-up">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Cancel Spot?</h3>
            <p className="text-stone-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to completely cancel your spot in this queue? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmCancel}
                className="w-full bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors fast"
              >
                Yes, cancel my spot
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="w-full bg-transparent text-stone-600 font-semibold px-6 py-3 border-2 border-stone-200 rounded-lg hover:bg-stone-50 transition-colors fast"
              >
                No, keep waiting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
