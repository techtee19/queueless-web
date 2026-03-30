"use client";

import { Activity, ArrowUpRight, ShieldCheck, Database, Zap, Settings2 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8 md:p-12 animate-fade-in max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">System Analytics</h1>
          <p className="text-stone-500 font-medium">Deep dive telemetry gathered across all active QueueLess deployments.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white text-stone-700 border border-stone-200 px-6 py-3.5 rounded-2xl font-bold shadow-sm hover:shadow-md active:scale-95 transition-all w-max">
          <Settings2 className="w-5 h-5" /> Export Logs
        </button>
      </header>

      {/* Grid of abstract mock analytics graphs */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Memory Pressure Chart */}
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-xl p-8 group relative overflow-hidden">
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-black text-stone-900">Database Load</h2>
              </div>
              <p className="text-sm font-semibold text-stone-400 max-w-xs">PostgreSQL connection pooling and memory pressure.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-200">
              Optimal
            </span>
          </div>

          <div className="h-40 flex items-end gap-2 w-full mb-4">
            {[45, 52, 48, 61, 55, 68, 74, 65, 59, 70, 62, 58, 65, 52].map((height, i) => (
              <div key={i} className="flex-1 bg-indigo-100 rounded-t-md relative group-hover:bg-indigo-200 transition-colors" style={{ height: `${height}%` }}>
                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-md opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ height: `${height * 0.4}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-stone-100 pt-4 text-xs font-bold text-stone-300 uppercase tracking-widest">
            <span>24H Ago</span>
            <span>Now</span>
          </div>
        </div>

        {/* WebSocket Activity */}
        <div className="bg-stone-950 text-white rounded-[2rem] border border-stone-800 shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-black text-white">WebSocket Clusters</h2>
              </div>
              <p className="text-sm font-semibold text-stone-400 max-w-xs">Real-time bi-directional ping activity across all regions.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-400/20">
              <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400"></span> Live
            </span>
          </div>

          <div className="h-40 relative flex items-center justify-between z-10">
            {/* Mock Sine/Heartbeat Wave using flex blocks */}
             {[20, 30, 80, 40, 20, 30, 25, 20, 90, 45, 20, 25, 30, 75].map((height, i) => (
              <div key={i} className="w-2.5 bg-stone-800 rounded-full flex flex-col justify-center" style={{ height: '100%' }}>
                <div 
                  className={`w-full rounded-full transition-all duration-500 ${height > 60 ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-emerald-900'}`} 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-stone-800 pt-4 mt-4 text-xs font-bold text-stone-600 uppercase tracking-widest z-10 relative">
            <span>Packet Delay (ms)</span>
            <span className="text-emerald-500">Avg 42ms</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stone-200 p-8 shadow-sm">
        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6"><ShieldCheck className="w-4 h-4 inline mr-2 text-brand-500"/> Traffic Anomalies & Alerts</h3>
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 text-center text-stone-400 border-dashed">
          No irregularities strictly detected in the past 7 days.
        </div>
      </div>
    </div>
  );
}
