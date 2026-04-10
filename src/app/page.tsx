import Link from "next/link";
import Image from "next/image";
import { Clock, Zap, QrCode, Bell, ArrowRight, Activity, ShieldCheck, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-brand-200">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b-0 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center">
            <Image src="/queueless-logo-tight.png" alt="QueueLess" width={164} height={32} className="h-8 w-auto object-contain" priority />
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="#how-it-works" className="hidden md:block text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors fast">
              How It Works
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold text-stone-700 hover:text-brand-600 transition-colors fast">
                Sign In
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center text-sm font-semibold bg-stone-900 text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-colors fast active:bg-black">
                Join Now <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Dynamic Hero Section - Dark Brutalist Futuristic */}
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-stone-950 text-white">
          {/* Subtle Ambient Background - Dialed back from intense blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark text-brand-300 text-xs font-semibold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                LIVE ACROSS NIGERIA
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-balance">
                Your time is <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">too valuable</span> to wait.
              </h1>
              <p className="text-lg text-stone-300 leading-relaxed mb-10 max-w-xl font-normal">
                Join virtual queues from your phone. Know your exact position. Walk in precisely when it's your turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/register" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-lg px-6 py-3 text-base font-semibold hover:bg-brand-600 active:bg-brand-700 transition-colors fast">
                  Try it Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <span className="text-sm font-medium text-stone-400 px-4 py-2 border border-stone-800 rounded-lg glass-panel-dark">
                  <ShieldCheck className="w-4 h-4 inline mr-2 text-brand-400" />
                  No App Download Required
                </span>
              </div>
            </div>
            
            {/* Interactive Demo - Retained tasteful 3D tilt and futuristic borders, but enforced design system radiuses */}
            <div className="hidden lg:block relative perspective-[1500px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative mx-auto w-full max-w-[380px] transform-gpu rotate-y-[-5deg] rotate-x-[5deg] duration-700 hover:rotate-0 transition-all glass-panel-dark rounded-2xl p-6 border border-brand-500/20 shadow-md">
                <div className="relative z-10">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-1">Current Queue</h3>
                      <p className="text-lg font-bold text-white flex items-center gap-2">
                        First Bank <MapPin className="w-4 h-4 text-brand-500" />
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center border border-brand-500/30">
                      <span className="text-brand-400 font-bold text-sm">#</span>
                    </div>
                  </div>

                  {/* Main Ticket Container */}
                  <div className="flex flex-col items-center justify-center bg-stone-900 border border-stone-800 rounded-xl p-8 mb-6 shadow-sm relative overflow-hidden group">
                    <span className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Your Ticket</span>
                    <span className="text-5xl font-extrabold text-white tabular-nums leading-none tracking-tight">
                      42
                    </span>
                  </div>

                  {/* Tracking Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-800">
                      <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-1">Position</p>
                      <p className="text-lg font-bold text-white">#5</p>
                    </div>
                    <div className="bg-brand-500/10 rounded-lg p-4 border border-brand-500/20">
                      <p className="text-xs text-brand-400 font-medium uppercase tracking-wider mb-1">Est. Wait</p>
                      <p className="text-lg font-bold text-white">12 <span className="text-xs font-normal text-brand-200">min</span></p>
                    </div>
                  </div>

                  <div className="relative w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-3/4 h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Metric Bar */}
        <section className="bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200 text-center animate-slide-up" style={{ animationDelay: '0.4s'}}>
            <div className="pt-4 md:pt-0 group">
              <p className="text-4xl font-extrabold mb-2 tabular-nums tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors normal">52<span className="text-2xl text-stone-400">m</span></p>
              <p className="font-semibold text-stone-500 uppercase tracking-widest text-xs">Avg Wait Saved</p>
            </div>
            <div className="pt-8 md:pt-0 group">
              <p className="text-4xl font-extrabold mb-2 tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors normal">₦14<span className="text-2xl text-stone-400">B</span></p>
              <p className="font-semibold text-stone-500 uppercase tracking-widest text-xs">Productivity Restored</p>
            </div>
            <div className="pt-8 md:pt-0 group">
              <p className="text-4xl font-extrabold mb-2 tracking-tight text-stone-900 group-hover:text-brand-500 transition-colors normal">2M<span className="text-2xl text-stone-400">+</span></p>
              <p className="font-semibold text-stone-500 uppercase tracking-widest text-xs">Tickets Issued</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-600 font-semibold mb-4 uppercase tracking-widest text-xs">How It Works</span>
              <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mt-4 mb-4 tracking-tight">Three steps to bypass the line.</h3>
              <p className="text-base text-stone-600 font-normal">Our system simplifies queueing. Focus on your day, not the line.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connecting Line (Desktop Only) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-stone-100 -z-10"></div>
              
              <div className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border-[8px] border-white shadow-sm flex items-center justify-center mb-6 relative z-10">
                  <span className="text-3xl font-extrabold text-brand-500">1</span>
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-3">Scan or Search</h4>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Find your desired institution on the app, or scan their QueueLess QR code upon arrival.</p>
              </div>

              <div className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border-[8px] border-white shadow-sm flex items-center justify-center mb-6 relative z-10">
                  <span className="text-3xl font-extrabold text-brand-500">2</span>
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-3">Get Your Ticket</h4>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Receive your digital ticket instantly. We'll show your exact position and estimated wait time.</p>
              </div>

              <div className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border-[8px] border-white shadow-sm flex items-center justify-center mb-6 relative z-10">
                  <span className="text-3xl font-extrabold text-brand-500">3</span>
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-3">Walk Right In</h4>
                <p className="text-stone-500 text-sm leading-relaxed px-4">Go grab a coffee or run errands. We'll notify you when it's your turn so you walk straight to the counter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Brutalist precision */}
        <section className="py-20 bg-stone-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
               <span className="text-brand-600 font-semibold mb-4 uppercase tracking-widest text-xs">Built for Excellence</span>
               <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mt-4 mb-4 tracking-tight">Everything you need to <br/> bypass reality.</h3>
               <p className="text-base text-stone-600 font-normal">Engineered specifically for extreme reliability in the real world.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "Real-Time Telemetry", desc: "Watch the line move live with precise updates. Know exactly how many people stand between you and freedom." },
                { icon: Zap, title: "Smart-Skip Intelligence", desc: "If someone doesn't show up, our system automatically bridges the gap, completely preventing blockages." },
                { icon: QrCode, title: "Frictionless Check-In", desc: "Just scan the location's QR code when you arrive to cryptographically verify your identity and physical presence." },
                { icon: Bell, title: "Resilient Fallbacks", desc: "No data? Our infrastructure falls back to robust SMS delivery to ensure you receive your ticket updates." },
                { icon: Activity, title: "Live Analytics", desc: "Gain insights into the busiest hours to plan your appointments when queues are statistically shorter." },
                { icon: ShieldCheck, title: "Enterprise Grade", desc: "Secure encryption protects all your personal data and ensures fair ticketing without manipulation." },
              ].map((feat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-md transition-shadow duration-200 group">
                  <div className="w-12 h-12 bg-stone-50 rounded-lg shadow-sm border border-stone-100 flex items-center justify-center mb-4 group-hover:bg-brand-50 transition-colors fast">
                    <feat.icon className="w-6 h-6 text-stone-600 group-hover:text-brand-600 transition-colors fast" />
                  </div>
                  <h4 className="text-lg font-semibold text-stone-900 mb-2">{feat.title}</h4>
                  <p className="text-stone-500 font-normal text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Dark block */}
        <section className="py-20 bg-stone-950 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight text-balance">Become unstoppable. <br/> Stop waiting today.</h2>
            <Link href="/register" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-lg px-8 py-4 text-base font-semibold hover:bg-brand-600 transition-colors fast active:bg-brand-700">
              Start Using QueueLess <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="mt-8 text-stone-400 font-medium text-sm">Join 200,000+ people reclaiming their time.</p>
          </div>
        </section>
      </main>

      {/* Standard Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 pt-16 pb-8 text-stone-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <Link href="/" className="mb-6 inline-block bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                <Image src="/queueless-logo-tight.png" alt="QueueLess" width={205} height={40} className="h-10 w-auto object-contain brightness-0 invert" />
              </Link>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                Reclaiming lost time for millions of Nigerians. Stop waiting in line and start living your life.
              </p>
              <a href="mailto:hello@queueless.com" className="text-sm font-semibold text-white hover:text-brand-500 transition-colors fast">
                hello@queueless.com
              </a>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Product</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#how-it-works" className="hover:text-brand-500 transition-colors fast">How it Works</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">For Institutions</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Pricing</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Live Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Help Center</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">API Documentation</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">System Status</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Case Studies</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Terms of Service</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Cookie Policy</Link></li>
                <li><Link href="/" className="hover:text-brand-500 transition-colors fast">Data Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-stone-500">
            <p>© {new Date().getFullYear()} QueueLess Technologies. All rights reserved.</p>
            <p>Designed in Lagos, built for the world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
