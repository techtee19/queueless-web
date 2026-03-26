import Link from "next/link";
import { Clock, Zap, QrCode, Bell, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-stone-900">
            Queue<span className="text-brand-500">Less</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              How It Works
            </Link>
            <Link href="/login" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
              Login
            </Link>
            <Link href="/login" className="hidden md:inline-flex items-center justify-center text-sm font-semibold bg-stone-900 text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-colors shadow-sm">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white min-h-[90vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500 via-transparent to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-sm font-semibold mb-6 ring-1 ring-inset ring-brand-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Live in Nigeria
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Stop Waiting.<br/>
                <span className="text-brand-400">Start Living.</span>
              </h1>
              <p className="text-xl text-stone-300 leading-relaxed mb-10 max-w-xl">
                Join queues remotely, track your position live, and get notified exactly when it's your turn. Never waste another hour in a crowded waiting room.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-lg px-8 py-4 text-lg font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 active:scale-[0.98]">
                  Join a Queue <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center bg-transparent border-2 border-stone-700 text-white rounded-lg px-8 py-4 text-lg font-semibold hover:bg-stone-800 hover:border-stone-600 transition-all">
                  For Institutions
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative text-center">
              {/* Abstract decorative element representing a digital ticket */}
              <div className="relative mx-auto w-80 h-[500px] bg-stone-800 rounded-3xl border border-stone-700 shadow-2xl p-6 flex flex-col rotate-3 transition-transform hover:rotate-0 duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-bold text-stone-200">First Bank, VI</h3>
                  <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
                    <span className="text-brand-400 font-bold">#</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-stone-900 rounded-2xl border border-stone-700 mb-6">
                  <span className="text-sm font-semibold text-stone-400 mb-2 uppercase tracking-wider">Your Ticket</span>
                  <span className="text-7xl font-extrabold text-white tabular-nums">42</span>
                </div>
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-brand-200">Est. Wait</span>
                    <span className="text-sm font-bold text-brand-400">12 min</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-brand-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-brand-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-400 text-center">
            <div className="pt-4 md:pt-0">
              <p className="text-5xl font-extrabold mb-2 tabular-nums tracking-tight">52<span className="text-3xl">m</span></p>
              <p className="font-semibold text-brand-100">Average wait time saved</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-extrabold mb-2 tracking-tight">₦14<span className="text-3xl">B+</span></p>
              <p className="font-semibold text-brand-100">Economic productivity recovered</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-extrabold mb-2 tracking-tight">200<span className="text-3xl">M+</span></p>
              <p className="font-semibold text-brand-100">Nigerians finally free from queues</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-brand-600 font-semibold mb-3 uppercase tracking-wider text-sm">Simple Process</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">How QueueLess Works</h3>
              <p className="text-lg text-stone-600">Three simple steps to reclaim your time. No apps to download, no complicated setup.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-stone-200 z-0"></div>
              
              {[
                { step: "01", title: "Select Service", desc: "Browse nearby institutions and select the specific service you need." },
                { step: "02", title: "Join Remotely", desc: "Get your digital ticket from anywhere. You're officially in line." },
                { step: "03", title: "Get Notified", desc: "We'll text you when it's almost your turn. Show up just in time." },
              ].map((item, i) => (
                <div key={i} className="relative z-10 bg-white rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h4>
                  <p className="text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-brand-600 font-semibold mb-3 uppercase tracking-wider text-sm">Everything you need</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Powerful Features</h3>
              <p className="text-lg text-stone-600">Built specifically for the Nigerian context, with resilient fallbacks and intuitive experiences.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Clock, title: "Real-Time Tracking", desc: "Watch the line move live from your phone. Know exactly how many people are ahead of you." },
                { icon: Zap, title: "Smart Skip", desc: "If someone doesn't show up, our system automatically moves to the next person, preventing blockages." },
                { icon: QrCode, title: "QR Check-In", desc: "When you arrive, simply scan the location's QR code or show yours to confirm your presence." },
                { icon: Bell, title: "SMS Notifications", desc: "No data? No problem. We fall back to SMS to ensure you never miss your turn." },
              ].map((feat, i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-brand-200 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-stone-200 flex items-center justify-center mb-6 focus-within:ring-2 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                    <feat.icon className="w-6 h-6 text-stone-700 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-3">{feat.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-stone-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to eliminate queues?</h2>
            <p className="text-xl text-stone-300 mb-10">Join thousands of Nigerians who have already taken back control of their time.</p>
            <Link href="/login" className="inline-flex items-center justify-center bg-brand-500 text-white rounded-lg px-8 py-4 text-lg font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 active:scale-[0.98]">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-stone-900 tracking-tight">Queue<span className="text-brand-500">Less</span></span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-stone-500">
            <Link href="/" className="hover:text-stone-900 transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-stone-900 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-stone-900 transition-colors">Support</Link>
          </div>
          <div className="text-sm text-stone-400">
            © 2026 QueueLess. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
