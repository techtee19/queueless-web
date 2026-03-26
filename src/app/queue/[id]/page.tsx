"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
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

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to completely cancel your spot in this queue?")) return;
    try {
      await api.post(`/queues/${params.id}/cancel`);
      toast.success("Spot cancelled locally");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!entry) return null;

  const totalWaiting = (entry.queue as any).totalWaiting || entry.position;
  const isTerminalState = ["COMPLETED", "SKIPPED", "CANCELLED", "EXPIRED"].includes(entry.status);

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans flex flex-col items-center">
      <header className="bg-white border-b border-stone-200 w-full sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-md w-full mx-auto px-4 py-8">
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
            <Loader2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 animate-spin" />
            <p className="font-bold text-teal-900">You are currently being served.</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden relative">
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
            <div className="p-8 pb-10 bg-white">
              <div className="mb-8">
                <ProgressBar position={entry.position} total={totalWaiting} />
                <div className="mt-4 flex justify-between text-xs font-medium text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <span>Currently Serving: <span className="font-bold text-stone-900">#{entry.queue.currentServing || 0}</span></span>
                  <span>People Ahead: <span className="font-bold text-stone-900">{Math.max(0, entry.position - 1)}</span></span>
                </div>
              </div>

              {entry.qrToken && (
                <div className="flex flex-col items-center pt-6 border-t border-stone-100">
                  <p className="text-sm font-bold text-stone-900 mb-4">Show this QR check-in when you arrive</p>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
                    <QRCode
                      value={entry.qrToken}
                      size={180}
                      level="Q"
                      fgColor="#134e4a" // brand-900
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!isTerminalState && (
          <button
            onClick={handleCancel}
            className="w-full mt-8 py-4 rounded-xl border-2 border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 font-bold text-lg transition-colors"
          >
            Cancel Spot
          </button>
        )}
      </main>
    </div>
  );
}
