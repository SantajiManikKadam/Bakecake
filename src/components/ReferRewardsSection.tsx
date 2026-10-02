import React, { useState } from 'react';
import { Gift, Copy, Check, Share2, Sparkles, Trophy } from 'lucide-react';

interface ReferRewardsSectionProps {
  onShowToast: (msg: string) => void;
}

export const ReferRewardsSection: React.FC<ReferRewardsSectionProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'ANANYA100';

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(referralCode);
    setCopied(true);
    onShowToast('Referral code ANANYA100 copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `Hey! Order fresh homemade artisan cakes from verified Pune home bakers on BakeGhar. Use my code ${referralCode} to get ₹100 OFF your first cake order: https://bakeghar.pune`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    onShowToast('Opened WhatsApp share dialogue!');
  };

  return (
    <section id="refer" className="py-16 sm:py-20 bg-[#FFFDF9] border-b border-[#E6D8C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4A1328] text-[#FFF8EE] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#6F1D3A]/60 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#30231F]/50 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Offer Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono tracking-wider uppercase text-[#F1D5CC]">
                <Gift className="w-3.5 h-3.5 text-[#C9862B]" />
                <span>BakeGhar Circles · Pune Referral Club</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                Give ₹100. Get ₹100. <br />
                <span className="italic font-light text-[#F1D5CC]">Spread sweet moments in Pune.</span>
              </h2>

              <p className="text-sm text-white/80 max-w-lg leading-relaxed font-sans">
                Share your personal code with friends and family in Pune. When they order their first celebration cake, they get ₹100 off, and you receive ₹100 directly into your BakeGhar wallet.
              </p>

              {/* Code Box & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
                <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-mono text-base font-bold tracking-widest text-[#FFF8EE]">
                  <span>{referralCode}</span>
                  <button
                    onClick={handleCopy}
                    className="ml-3 p-1 text-[#F1D5CC] hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#7E9B5E]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={handleShareWhatsapp}
                  className="px-5 py-3 bg-[#7E9B5E] hover:bg-[#5E7844] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Rewards Mini Ledger */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#C9862B]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F1D5CC]">
                    Your Wallet Credits
                  </span>
                </div>
                <span className="font-mono text-xl font-bold text-white tabular-nums">
                  ₹300
                </span>
              </div>

              {/* Recent Activity */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <div>
                    <p className="font-medium text-white">Riya M. ordered in Kothrud</p>
                    <p className="text-[10px] text-white/60">First order completed</p>
                  </div>
                  <span className="font-mono font-bold text-[#7E9B5E]">+₹100</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <div>
                    <p className="font-medium text-white">Aditya K. ordered in Baner</p>
                    <p className="text-[10px] text-white/60">First order completed</p>
                  </div>
                  <span className="font-mono font-bold text-[#7E9B5E]">+₹100</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <div>
                    <p className="font-medium text-white">Kunal S. signed up</p>
                    <p className="text-[10px] text-white/60">Browsing cakes in Viman Nagar</p>
                  </div>
                  <span className="font-mono text-[11px] text-[#C9862B]">Pending order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
