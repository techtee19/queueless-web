"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Users, Building2, Activity, Settings } from "lucide-react";
import { PageLoader } from "@/components/Spinner";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading: authLoading, loadUser, logout } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!authLoading && isAuthenticated && user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN") {
      router.push("/dashboard");
      toast.error("Unauthorized access");
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || !isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN")) {
    return <PageLoader message="Verifying access..." />;
  }

  const navLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/institutions", icon: Building2, label: "Institutions" },
    { href: "/admin/users", icon: Users, label: "Users & Staff" },
    { href: "/admin/analytics", icon: Activity, label: "System Analytics" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans selection:bg-brand-200">
      {/* Persistent Admin Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-stone-950 text-stone-400 flex flex-col z-50 shadow-2xl">
        <div className="h-20 flex items-center px-6 border-b border-white/5 bg-stone-950">
          <Link href="/admin" className="text-xl font-black tracking-tight text-white group">
            Queue<span className="text-brand-500">Less</span> 
            <span className="text-[10px] text-stone-500 font-bold ml-1.5 uppercase tracking-[0.2em]">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                  isActive 
                  ? "bg-brand-500/10 text-brand-400 relative overflow-hidden" 
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-r-md"></div>}
                <link.icon className={`w-5 h-5 ${isActive ? "text-brand-400" : "text-stone-500 group-hover:text-stone-300 transition-colors"}`} /> 
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 bg-stone-950">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm border border-brand-500/30">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-white line-clamp-1">{user?.firstName} {user?.lastName}</p>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">System Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-colors font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Dynamic Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen bg-[#FDFCFB]">
        {children}
      </main>
    </div>
  );
}
