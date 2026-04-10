"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, MapPin, Search, X } from "lucide-react";
import { Spinner, ButtonSpinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "", type: "HOSPITAL", address: "", city: "", state: "", phone: "", description: "", services: ""
  });

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const { data } = await api.get("/admin/institutions");
      setInstitutions(data.data);
    } catch (error) {
      toast.error("Failed to fetch institutions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post("/admin/institutions", formData);
      toast.success("Institution deployed successfully");
      setIsModalOpen(false);
      fetchInstitutions();
      setFormData({ name: "", type: "HOSPITAL", address: "", city: "", state: "", phone: "", description: "", services: "" });
    } catch (error) {
      toast.error("Deployment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = institutions.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-8 md:p-12 animate-fade-in max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Institution Nodes</h1>
          <p className="text-stone-500 font-medium">Manage and deploy registered organizations on the platform.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-400 active:scale-95 transition-all w-max"
        >
          <Plus className="w-5 h-5" /> 
          Register Institution
        </button>
      </header>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input 
          type="text" 
          placeholder="Search registered nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-stone-200 py-3 pl-12 pr-4 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm transition-all"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size={40} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((inst) => (
            <div key={inst.id} className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-500 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors z-10 relative">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full z-10 relative group-hover:bg-white group-hover:shadow-sm">
                  {inst.type}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-black text-stone-900 leading-tight mb-2 line-clamp-2">{inst.name}</h3>
                <p className="text-sm font-medium text-stone-500 flex flex-col gap-1 mb-6">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{inst.city}, {inst.state}</span>
                </p>
                
                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Available Services</span>
                  <span className="text-lg font-black text-stone-900">{inst._count?.services || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Glossy Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div>
                <h3 className="text-2xl font-black text-stone-900">Provision New Node</h3>
                <p className="text-stone-500 text-sm font-medium mt-1">Registering a new institution to the global network.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Institution Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="e.g. Zenith Bank" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Type Focus</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none">
                      <option value="BANK">Financial (Bank)</option>
                      <option value="HOSPITAL">Healthcare (Hospital)</option>
                      <option value="GOVERNMENT">Government Agency</option>
                      <option value="OTHER">Other Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Address Details</label>
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none mb-4" placeholder="Street Address" />
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="City (e.g. Ikeja)" />
                    <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="State (e.g. Lagos)" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Support Phone</label>
                    <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="+234..." />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Available Services (Comma-separated)</label>
                  <input value={formData.services} onChange={e => setFormData({...formData, services: e.target.value})} className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none mb-4" placeholder="e.g. General Inquiry, Checkup, Consultancy" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">Brief Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Official description of operations..."></textarea>
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-stone-500 hover:bg-stone-100 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="group relative bg-brand-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-600 active:scale-95 transition-all overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      {isSubmitting && <ButtonSpinner size={16} />} Launch Node
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
