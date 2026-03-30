"use client";

import { useEffect, useState } from "react";
import { Users, Loader2, ShieldAlert, Monitor, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.data);
    } catch (error) {
      toast.error("Failed to load user directories");
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold uppercase tracking-widest"><ShieldAlert className="w-3 h-3" /> System Admin</span>;
      case "STAFF":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-100 text-sky-700 text-[10px] font-bold uppercase tracking-widest"><Monitor className="w-3 h-3" /> Counter Staff</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest"><Users className="w-3 h-3" /> Customer</span>;
    }
  };

  return (
    <div className="p-8 md:p-12 animate-fade-in max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Identities Library</h1>
        <p className="text-stone-500 font-medium">Platform-wide overview of active consumers, staff, and administrators.</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">
                  <th className="py-5 px-6 font-semibold">User Hash/Name</th>
                  <th className="py-5 px-6 font-semibold">Primary Contact</th>
                  <th className="py-5 px-6 font-semibold">Access Level</th>
                  <th className="py-5 px-6 font-semibold">Employment Ref</th>
                  <th className="py-5 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50/80 transition-colors group cursor-default">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          {u.firstName?.[0]}{u.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 leading-tight">{u.firstName} {u.lastName}</p>
                          <p className="text-[10px] text-stone-400 font-mono mt-0.5">ID: {u.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-stone-600">{u.phone}</td>
                    <td className="py-4 px-6">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="py-4 px-6">
                      {u.role === "STAFF" && u.staffProfile ? (
                        <div className="text-sm font-semibold text-stone-700">
                          {u.staffProfile.institution.name}
                          <p className="text-xs text-stone-400 mt-0.5">Counter #{u.staffProfile.counterNumber}</p>
                        </div>
                      ) : (
                        <span className="text-stone-300 italic text-sm">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-stone-50 border-t border-stone-200 p-4 text-center">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Showing Latest {users.length} Records</span>
          </div>
        </div>
      )}
    </div>
  );
}
