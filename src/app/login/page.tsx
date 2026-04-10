"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { ButtonSpinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith("+234") && formattedPhone.startsWith("0")) {
        formattedPhone = "+234" + formattedPhone.substring(1);
      } else if (!formattedPhone.startsWith("+234")) {
        formattedPhone = "+234" + formattedPhone;
      }

      await login(formattedPhone, password);
      
      const user = useAuthStore.getState().user;
      if (user?.role === "STAFF") {
        router.push("/staff");
      } else if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Pane - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 overflow-hidden items-center justify-center">
        {/* Animated gradient blob */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg px-12 text-center text-balance animate-fade-in-up">
          <Link href="/" className="inline-block text-4xl font-extrabold tracking-tight text-white mb-8 hover:scale-105 transition-transform">
            Queue<span className="text-brand-400">Less</span>
          </Link>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Stop waiting in line. <br />
            <span className="text-brand-400">Start living your life.</span>
          </h2>
          <p className="text-lg text-stone-300">
            Join queues remotely, track your position live, and drop the anxiety of losing your spot.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 animate-fade-in">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-stone-900 inline-block">
              Queue<span className="text-brand-500">Less</span>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Welcome back</h1>
            <p className="text-stone-500 mt-2 font-medium text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-1.5 ml-1">
                Phone Number
              </label>
              <div className="relative flex shadow-sm rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
                <span className="inline-flex items-center justify-center px-4 bg-stone-100 border border-r-0 border-stone-200 text-stone-500 font-semibold text-sm">
                  +234
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="8012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full border-y border-r border-stone-200 py-3.5 px-4 text-stone-900 outline-none placeholder:text-stone-400 sm:text-sm font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label htmlFor="password" className="block text-sm font-semibold text-stone-900">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-xl shadow-sm overflow-hidden">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-stone-200 py-3.5 pl-4 pr-12 text-stone-900 outline-none placeholder:text-stone-400 sm:text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400 hover:text-stone-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center items-center py-4 px-4 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30 active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <ButtonSpinner size={20} />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-stone-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
