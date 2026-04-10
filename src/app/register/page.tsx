"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { ButtonSpinner } from "@/components/Spinner";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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

      await register(formattedPhone, firstName, lastName, password);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Pane - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 overflow-hidden items-center justify-center">
        {/* Animated gradient blobs */}
        <div className="absolute top-[-10%] right-0 w-[600px] h-[600px] bg-brand-500 rounded-full blur-[140px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-sky-500 rounded-full blur-[130px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg px-12 text-center text-balance animate-fade-in-up">
          <Link href="/" className="mb-8 inline-block bg-white/10 p-3 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform">
            <Image src="/queueless-logo-tight.png" alt="QueueLess" width={246} height={48} className="h-12 w-auto object-contain brightness-0 invert" priority />
          </Link>
          <div className="glass-panel-dark rounded-3xl p-8 mb-8 text-left relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 transition-all duration-300 group-hover:w-2"></div>
            <p className="text-xl text-stone-200 italic font-medium leading-relaxed mb-6 relative z-10">
              "Since I started using QueueLess, I've reclaimed over 4 hours a week that I used to spend sitting in waiting rooms. It's truly life-changing."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-white font-bold">
                AO
              </div>
              <div>
                <div className="text-white font-bold">Amaka Okafor</div>
                <div className="text-stone-400 text-sm">Lagos, Nigeria</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 animate-fade-in">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden mb-12 flex justify-center">
            <Link href="/" className="inline-block">
              <Image src="/queueless-logo-tight.png" alt="QueueLess" width={205} height={40} className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Create Account</h1>
            <p className="text-stone-500 mt-2 font-medium text-sm">
              Sign up today and never wait in an active queue again.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-stone-900 mb-1.5 ml-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full border border-stone-200 py-3.5 px-4 text-stone-900 outline-none placeholder:text-stone-400 sm:text-sm font-medium rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-stone-900 mb-1.5 ml-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full border border-stone-200 py-3.5 px-4 text-stone-900 outline-none placeholder:text-stone-400 sm:text-sm font-medium rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-semibold text-stone-900 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm overflow-hidden">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 6 characters"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-stone-900 mb-1.5 ml-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full border border-stone-200 py-3.5 px-4 text-stone-900 outline-none placeholder:text-stone-400 sm:text-sm font-medium rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-sm"
              />
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
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-stone-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
