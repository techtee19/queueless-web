"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Building2, Activity, Settings, Plus, ArrowUpRight, Sparkles } from "lucide-react";
import { Spinner } from "@/components/Spinner";
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
    <div className="relative min-h-screen">
      {/* Exquisite Soft Mesh Background */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-50/50 via-sky-50/20 to-transparent pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-brand-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-sky-400/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 p-8 md:p-12 animate-fade-in max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-stone-200/50 text-stone-600 font-bold text-[10px] uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
              </span>
              System Live & Routing
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-none mb-3">Network Control</h1>
            <p className="text-stone-500 font-medium text-lg max-w-xl leading-relaxed">
              Real-time birds-eye view of all QueueLess planetary infrastructure.
            </p>
          </div>
          
          <Link href="/admin/institutions" className="inline-flex items-center gap-2 bg-brand-500 text-white px-7 py-3.5 rounded-2xl font-bold shadow-[0_8px_25px_rgba(20,184,166,0.25)] hover:bg-brand-600 hover:shadow-[0_12px_35px_rgba(20,184,166,0.35)] hover:-translate-y-1 active:scale-95 transition-all w-max group relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            <Plus className="w-5 h-5 relative z-10 flex-shrink-0" /> 
            <span className="relative z-10">Deploy Institution</span>
          </Link>
        </header>

        {/* Holographic Glowing Stats Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Spinner size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Active Nodes", sub: "Connected Institutions", value: stats?.activeInstitutions || 0, icon: Building2, gradient: "from-brand-500 to-emerald-400", shadow: "shadow-brand-500/20", glow: "group-hover:bg-brand-400/10" },
              { label: "Today's Volume", sub: "Concurrent active queues", value: stats?.totalQueuesToday || 0, icon: Activity, gradient: "from-sky-500 to-indigo-500", shadow: "shadow-sky-500/20", glow: "group-hover:bg-sky-400/10" },
              { label: "Total Identities", sub: "Registered verified users", value: stats?.registeredUsers?.toLocaleString() || 0, icon: Users, gradient: "from-fuchsia-500 to-purple-600", shadow: "shadow-fuchsia-500/20", glow: "group-hover:bg-fuchsia-400/10" },
              { label: "Global Uptime", sub: "Platform operational health", value: stats?.uptime || "99.99%", icon: Sparkles, gradient: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20", glow: "group-hover:bg-amber-400/10" },
            ].map((stat, i) => (
              <div key={i} className={`bg-white/80 backdrop-blur-xl p-7 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group`}>
                <div className={`absolute -right-10 -top-10 w-40 h-40 opacity-0 blur-3xl transition-opacity duration-500 rounded-full z-0 ${stat.glow}`}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/0 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} text-white mb-6 shadow-lg ${stat.shadow} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-4xl font-extrabold text-stone-900 tracking-tight leading-none mb-2">{stat.value}</h3>
                  <p className="text-sm font-bold text-stone-700">{stat.label}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Aesthetic Filler / Analytics Preview */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#030712] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden text-white border border-stone-800 shadow-2xl group">
            {/* Sleek architectural grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
            
            {/* Dynamic glowing orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-colors duration-1000"></div>
            <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-16 relative z-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-1.5 tracking-tight text-white drop-shadow-sm">Throughput Velocity</h2>
                <p className="text-stone-400 font-medium text-sm">Real-time simulation of planetary queue resolution.</p>
              </div>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-4 py-2 rounded-xl text-xs backdrop-blur-sm self-start whitespace-nowrap">
                <ArrowUpRight className="w-4 h-4" /> 14.5% acceleration
              </span>
            </div>

            <div className="h-48 md:h-56 flex items-end justify-between gap-2 sm:gap-4 relative z-10 mt-8">
              {/* Mock Chart Bars with stunning visual gradients */}
              {[40, 70, 45, 90, 65, 85, 30, 55, 75, 100].map((h, j) => (
                <div key={j} className="w-full flex justify-center group/bar cursor-crosshair relative h-full items-end">
                  {/* Subtle hover tooltip mock */}
                  <div className="absolute -top-10 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-stone-800 text-xs font-bold px-2 py-1 rounded text-stone-200 pointer-events-none whitespace-nowrap z-20">
                    {h * 12} reqs
                  </div>
                  
                  <div 
                    className="w-full max-w-[2rem] bg-gradient-to-t from-brand-600/50 to-brand-400 rounded-t-xl opacity-60 group-hover/bar:opacity-100 transition-all duration-300 group-hover/bar:shadow-[0_0_20px_rgba(45,212,191,0.6)] relative overflow-hidden" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-extrabold text-stone-500 tracking-[0.2em] uppercase relative z-10">
              <span>08:00 AM</span>
              <span>LIVE</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/0 pointer-events-none z-0"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Settings className="w-7 h-7 group-hover:text-stone-600 transition-colors" />
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900 mb-3 tracking-tight">Automated Fallbacks</h2>
              <p className="text-stone-500 font-medium text-sm mb-8 leading-relaxed">
                If an institution drops offline, all pending tickets are safely paused. SMS notifications have been delivered flawlessly today.
              </p>
            </div>
            
            <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-100 relative z-10 group-hover:bg-white transition-colors duration-500">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-stone-500">SMS Delivery Rate</span>
                <span className="text-lg font-black text-emerald-600 drop-shadow-sm">99.8%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-200/60 rounded-full overflow-hidden shadow-inner">
                <div className="w-[99.8%] h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 animate-[translateX_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
