import Link from "next/link";
import { Clock, Zap, QrCode, Bell, ArrowRight, Activity, ShieldCheck, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-brand-200">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b-0 shadow-sm border-white/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-stone-900 group">
            Queue<span className="text-brand-500 group-hover:text-brand-600 transition-colors">Less</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
              How It Works
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-stone-700 hover:text-brand-600 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="hidden md:inline-flex items-center justify-center text-sm font-bold bg-stone-900 text-white px-5 py-2.5 rounded-xl hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95">
                Join Now <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-stone-950 text-white">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/30 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/4 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[140px] -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                LIVE ACROSS NIGERIA
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] text-balance">
                Your time is <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-sky-400">too valuable</span> to wait.
              </h1>
              <p className="text-xl md:text-2xl text-stone-300/90 leading-relaxed mb-10 max-w-xl font-medium">
                Join virtual queues from your phone. Know your exact position. Walk in precisely when it's your turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/register" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-xl px-8 py-4 text-lg font-bold hover:bg-brand-400 transition-all shadow-xl shadow-brand-500/30 active:scale-95 group">
                  Try it Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-sm font-semibold text-stone-400 px-4 py-2 border border-stone-800 rounded-xl bg-stone-900/50 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 inline mr-2 text-brand-400" />
                  No App Download Required
                </span>
              </div>
            </div>
            
            {/* Glassmorphism Interactive Demo */}
            <div className="hidden lg:block relative perspective-[2000px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative mx-auto w-full max-w-[380px] transform-gpu rotate-y-[-15deg] rotate-x-[10deg] duration-700 hover:rotate-0 hover:scale-105 transition-all glass-panel-dark rounded-[2.5rem] p-2 border border-white/20 shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:z-0">
                <div className="relative z-10 bg-stone-900/90 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-inner">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">Current Queue</h3>
                      <p className="text-xl font-bold text-white flex items-center gap-2">
                        First Bank <MapPin className="w-4 h-4 text-brand-400" />
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                      <span className="text-brand-400 font-bold">#</span>
                    </div>
                  </div>

                  {/* Main Ticket */}
                  <div className="flex flex-col items-center justify-center bg-stone-950/50 rounded-3xl border border-white/10 p-8 mb-8 shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-sm font-bold text-brand-400 mb-2 uppercase tracking-wide">Your Ticket</span>
                    <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 tabular-nums leading-none tracking-tighter">
                      42
                    </span>
                  </div>

                  {/* Tracking Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-stone-800/50 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-1">Position</p>
                      <p className="text-xl font-bold text-white">#5</p>
                    </div>
                    <div className="bg-brand-500/10 rounded-2xl p-4 border border-brand-500/20">
                      <p className="text-xs text-brand-300 font-semibold uppercase tracking-wider mb-1">Est. Wait</p>
                      <p className="text-xl font-bold text-white">12 <span className="text-sm font-medium text-brand-200">min</span></p>
                    </div>
                  </div>

                  <div className="relative w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-3/4 h-full bg-gradient-to-r from-brand-500 to-sky-400 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Metric Bar */}
        <section className="bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200 text-center animate-slide-up" style={{ animationDelay: '0.4s'}}>
            <div className="pt-4 md:pt-0 group">
              <p className="text-5xl font-black mb-2 tabular-nums tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors">52<span className="text-3xl text-stone-400">m</span></p>
              <p className="font-bold text-stone-500 uppercase tracking-widest text-xs">Avg Wait Saved</p>
            </div>
            <div className="pt-8 md:pt-0 group">
              <p className="text-5xl font-black mb-2 tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors">₦14<span className="text-3xl text-stone-400">B</span></p>
              <p className="font-bold text-stone-500 uppercase tracking-widest text-xs">Productivity Restored</p>
            </div>
            <div className="pt-8 md:pt-0 group">
              <p className="text-5xl font-black mb-2 tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors">2M<span className="text-3xl text-stone-400">+</span></p>
              <p className="font-bold text-stone-500 uppercase tracking-widest text-xs">Tickets Issued</p>
            </div>
          </div>
        </section>

        {/* Premium Features Grid */}
        <section className="py-24 bg-stone-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
              <span className="text-brand-600 font-extrabold mb-4 uppercase tracking-widest text-sm decoration-2 underline-offset-4 decoration-brand-200 underline">Built for Excellence</span>
              <h3 className="text-4xl md:text-5xl font-black text-stone-900 mt-4 mb-6 tracking-tight">Everything you need to bypass reality.</h3>
              <p className="text-xl text-stone-600 font-medium">Engineered specifically for extreme reliability in the Nigerian context.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: "Real-Time Telemetry", desc: "Watch the line move live with millisecond precision. Know exactly how many people stand between you and freedom." },
                { icon: Zap, title: "Smart-Skip Intelligence", desc: "If someone doesn't show up, our system automatically bridges the gap, completely preventing blockages." },
                { icon: QrCode, title: "Frictionless Check-In", desc: "Just scan the location's QR code when you arrive to cryptographically verify your identity and physical presence." },
                { icon: Bell, title: "Resilient Fallbacks", desc: "No data? Our infrastructure falls back to robust SMS delivery to ensure you receive your ticket updates." },
                { icon: Activity, title: "Live Analytics", desc: "Gain insights into the busiest hours to plan your appointments when queues are statistically shorter." },
                { icon: ShieldCheck, title: "Enterprise Grade", desc: "Bank-level encryption secures all your personal data and ensures fair ticketing without manipulation." },
              ].map((feat, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 border border-stone-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-14 h-14 bg-stone-50 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center mb-6 group-hover:bg-brand-50 group-hover:scale-110 transition-all duration-300">
                    <feat.icon className="w-7 h-7 text-stone-700 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-3">{feat.title}</h4>
                  <p className="text-stone-500 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-stone-950 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500 via-stone-950 to-stone-950"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight text-balance">Become unstoppable. <br/> Stop waiting today.</h2>
            <Link href="/register" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-xl px-10 py-5 text-lg font-bold hover:bg-brand-400 transition-all shadow-[0_0_40px_rgba(20,184,166,0.3)] active:scale-95 group">
              Start Using QueueLess <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-8 text-stone-400 font-medium tracking-wide text-sm">Join 200,000+ Nigerians reclaiming their time.</p>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-stone-900 tracking-tight">Queue<span className="text-brand-500">Less</span></span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-stone-500">
            <Link href="/contact" className="hover:text-brand-600 transition-colors">For Institutions</Link>
            <Link href="/" className="hover:text-brand-600 transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-brand-600 transition-colors">Terms</Link>
          </div>
          <div className="text-sm font-semibold text-stone-400">
            © 2026 QueueLess.
          </div>
        </div>
      </footer>
    </div>
  );
}
