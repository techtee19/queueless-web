import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/" className="group flex items-center">
            <Image src="/queueless-logo-tight.png" alt="QueueLess" width={164} height={32} className="h-8 w-auto object-contain" priority />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">Partner With Us</h1>
          <p className="text-lg text-stone-600 max-w-xl mx-auto">
            Are you an institution looking to modernize your waiting experience? Let's talk about how QueueLess can eliminate your queues and delight your customers.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-stone-900 mb-2">Institution Name</label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="e.g. First Bank"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-stone-900 mb-2">Institution Type</label>
                <select
                  id="type"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select a type...</option>
                  <option value="bank">Bank</option>
                  <option value="hospital">Hospital/Clinic</option>
                  <option value="government">Government Office</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-900 mb-2">Contact Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-900 mb-2">Work Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="jane@institution.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-stone-900 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="+234 800 000 0000"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-stone-900 mb-2">How can we help?</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                placeholder="Tell us about the queues you're trying to manage..."
                required
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full bg-brand-500 text-white font-bold py-4 rounded-lg hover:bg-brand-600 transition-colors shadow-md active:scale-[0.99]"
            >
              Submit Inquiry
            </button>
          </form>

          <hr className="my-8 border-stone-100" />
          
          <div className="grid sm:grid-cols-3 gap-6 text-center text-sm">
            <div className="flex flex-col items-center">
              <Mail className="w-5 h-5 text-stone-400 mb-2" />
              <span className="font-semibold text-stone-900">Email Us</span>
              <span className="text-stone-500">partners@queueless.com</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-5 h-5 text-stone-400 mb-2" />
              <span className="font-semibold text-stone-900">Call Us</span>
              <span className="text-stone-500">+234 (0) 800 QUEUELES</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 text-stone-400 mb-2" />
              <span className="font-semibold text-stone-900">Visit Us</span>
              <span className="text-stone-500">Victoria Island, Lagos</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
