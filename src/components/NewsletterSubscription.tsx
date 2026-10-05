import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-14 sm:py-16 bg-[#0f5132] text-white relative overflow-hidden" id="newsletter">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-emerald-950/60 rounded-3xl p-6 sm:p-10 border border-emerald-700/50 shadow-xl backdrop-blur-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold border border-emerald-700">
                <Mail className="w-3.5 h-3.5" />
                <span>Monthly Humanitarian Dispatch</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Stay Connected with Our Field Impact
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                Subscribe to receive our monthly email bulletin detailing ongoing scholarship disbursements, 
                mobile clinic schedules, audited financial summaries, and emergency disaster relief calls.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero spam · Strictly confidential · Unsubscribe anytime</span>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-5 bg-emerald-900/90 border border-emerald-500 rounded-2xl flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">
                      Welcome to the Trust Community!
                    </h4>
                    <p className="text-xs text-emerald-200 mt-1">
                      You are now subscribed to our monthly updates. 
                      You will receive our upcoming quarterly audited report and community highlights.
                    </p>
                    <button
                      onClick={() => setSubscribed(false)}
                      className="mt-3 text-xs text-amber-300 hover:text-amber-200 font-bold underline"
                    >
                      Subscribe another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white text-stone-900 placeholder-stone-400 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-emerald-200/80 flex items-center justify-between px-1">
                    <span>Delivered every 1st of the month</span>
                    <span className="font-mono">ISSN 2026-ACT</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
