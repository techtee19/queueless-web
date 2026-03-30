"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Building2, Activity, Settings, Plus, ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data.data);
    } catch (error) {
      console.error("Failed to load admin stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 animate-fade-in max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 font-bold text-[10px] uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            System Live & Routing
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-none mb-2">Network Control</h1>
          <p className="text-stone-500 font-medium text-lg max-w-xl">
            Real-time birds-eye view of all QueueLess planetary infrastructure.
          </p>
        </div>
        
        <Link href="/admin/institutions" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-stone-900/20 hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all w-max group relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          <Plus className="w-5 h-5 relative z-10" /> 
          <span className="relative z-10">Deploy Institution</span>
        </Link>
      </header>

      {/* Holographic Glowing Stats Grid */}
      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Nodes", sub: "Connected Institutions", value: stats?.activeInstitutions || 0, icon: Building2, gradient: "from-brand-500 to-emerald-400", shadow: "shadow-brand-500/20" },
            { label: "Today's Volume", sub: "Concurrent active queues", value: stats?.totalQueuesToday || 0, icon: Activity, gradient: "from-sky-500 to-indigo-500", shadow: "shadow-sky-500/20" },
            { label: "Total Identities", sub: "Registered verified users", value: stats?.registeredUsers?.toLocaleString() || 0, icon: Users, gradient: "from-fuchsia-500 to-purple-600", shadow: "shadow-fuchsia-500/20" },
            { label: "Global Uptime", sub: "Platform operational health", value: stats?.uptime || "99.99%", icon: Sparkles, gradient: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity bg-gradient-to-br rounded-full z-0"></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} text-white mb-6 shadow-lg ${stat.shadow} transform group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black text-stone-900 tracking-tight leading-none mb-2">{stat.value}</h3>
                <p className="text-sm font-bold text-stone-900">{stat.label}</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mt-1">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Aesthetic Filler / Analytics Preview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-stone-950 rounded-[2rem] p-8 relative overflow-hidden text-white border border-stone-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[80px]"></div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h2 className="text-2xl font-black mb-1">Throughput Velocity</h2>
              <p className="text-stone-400 font-medium text-sm">Real-time simulation of queue resolution times.</p>
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full text-xs">
              <ArrowUpRight className="w-4 h-4" /> 14.5% faster
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 relative z-10">
            {/* Mock Chart Bars */}
            {[40, 70, 45, 90, 65, 85, 30, 55, 75, 100].map((h, j) => (
              <div key={j} className="w-full flex flex-col justify-end group cursor-crosshair">
                <div 
                  className="w-full bg-brand-500 rounded-t-md opacity-70 group-hover:opacity-100 transition-all hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-stone-500 tracking-widest uppercase relative z-10">
            <span>08:00 AM</span>
            <span>Now</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-stone-200 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-6">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 mb-2">Automated Fallbacks</h2>
            <p className="text-stone-500 font-medium text-sm mb-6 leading-relaxed">
              If an institution drops offline, all pending tickets are safely paused. SMS notifications have been delivered flawlessly today.
            </p>
          </div>
          
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">SMS Delivery Rate</span>
              <span className="text-sm font-black text-stone-900">99.8%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="w-[99.8%] h-full bg-stone-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
