"use client";

import { ShieldAlert, DatabaseBackup, Globe, Smartphone, BellRing, Link as LinkIcon } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-8 md:p-12 animate-fade-in max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Global Settings</h1>
        <p className="text-stone-500 font-medium">Configure deep platform rules, external connections, and fallback behavior.</p>
      </header>

      <div className="space-y-6">
        
        {/* Network & Scale */}
        <section className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex items-center gap-3">
            <Globe className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl font-black text-stone-900">Network & Connectivity</h2>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-stone-900">Smart-Skip Threshold</h3>
                <p className="text-sm text-stone-500 font-medium mt-1">Number of times a user can miss their call before strict expiration.</p>
              </div>
              <select className="bg-stone-50 border border-stone-200 text-stone-900 font-bold py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-32">
                <option>1 Miss</option>
                <option selected>2 Misses</option>
                <option>3 Misses</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900">SMS Fallback Delivery</h3>
                <p className="text-sm text-stone-500 font-medium mt-1">Automatically send SMS tickets if WebSocket disconnects.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-7 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex items-center gap-3">
            <LinkIcon className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl font-black text-stone-900">External Integrations</h2>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                  <BellRing className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Twilio SMS Gateway</h3>
                  <p className="text-sm text-stone-500 font-medium mt-1">Provider mapping for high-deliverability SMS alerts to customers.</p>
                </div>
              </div>
              <button className="bg-stone-100 text-stone-600 font-bold px-5 py-2.5 rounded-xl hover:bg-stone-200 transition-colors whitespace-nowrap">Configure Keys</button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                  <DatabaseBackup className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">AWS Redshift Replication</h3>
                  <p className="text-sm text-stone-500 font-medium mt-1">Export daily node traffic statistics safely into the data warehouse.</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100 whitespace-nowrap">
                Connected
              </span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50/50 rounded-[2rem] border border-red-200 shadow-sm overflow-hidden mt-10">
          <div className="p-6 border-b border-red-200 bg-red-100/50 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-black text-red-900">Danger Zone</h2>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-red-900">Global Queue Purge</h3>
                <p className="text-sm text-red-700/80 font-medium mt-1">Erase every currently active queue across all networks immediately.</p>
              </div>
              <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 active:scale-95 transition-all w-full md:w-auto">
                Initiate Purge
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
