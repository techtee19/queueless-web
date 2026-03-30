"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, Building2, Activity, Settings, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, loadUser, logout } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!authLoading && isAuthenticated && user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN") {
      // Redirect non-admins away
      router.push("/dashboard");
      toast.error("Unauthorized access");
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || !isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN")) {
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-500 drop-shadow-md" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-stone-950 text-stone-400 flex flex-col z-50">
        <div className="h-20 flex items-center px-6 border-b border-stone-800">
          <Link href="/admin" className="text-xl font-black tracking-tight text-white group">
            Queue<span className="text-brand-500">Less</span> <span className="text-xs text-stone-500 font-bold ml-1 uppercase tracking-widest">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500/10 text-brand-400 font-semibold transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-900 hover:text-white font-semibold transition-colors">
            <Building2 className="w-5 h-5" /> Institutions
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-900 hover:text-white font-semibold transition-colors">
            <Users className="w-5 h-5" /> Users & Staff
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-900 hover:text-white font-semibold transition-colors">
            <Activity className="w-5 h-5" /> System Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-900 hover:text-white font-semibold transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 hover:text-white transition-colors font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 animate-fade-in">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-stone-500 font-medium mt-1">Welcome back, {user?.firstName}. System is running smoothly.</p>
          </div>
          
          <button className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-brand-500/20 hover:bg-brand-600 active:scale-95 transition-all">
            <Plus className="w-4 h-4" /> Add Institution
          </button>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Active Institutions", value: "3", icon: Building2, color: "text-brand-500", bg: "bg-brand-50" },
            { label: "Total Queues Today", value: "142", icon: Activity, color: "text-sky-500", bg: "bg-sky-50" },
            { label: "Registered Users", value: "1,204", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
            { label: "Platform Health", value: "100%", icon: Settings, color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
              <p className="text-3xl font-black text-stone-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Empty State / Coming Soon Layout */}
        <div className="bg-white border-2 border-dashed border-stone-200 rounded-[2rem] p-16 text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mx-auto mb-6">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-stone-900 mb-2">Management Modules Unconfigured</h2>
          <p className="text-stone-500 font-medium max-w-md mx-auto">
            The advanced admin control panels and data tables will appear here once the management endpoints are fully integrated into the frontend.
          </p>
        </div>
      </main>
    </div>
  );
}
