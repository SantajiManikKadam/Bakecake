import React from 'react';
import { Star, ShieldCheck, Heart, Sparkles, MapPin, Award } from 'lucide-react';
import { aarohiPortraitImg } from '../data/mockData';

interface BakerStorySectionProps {
  onSelectBaker: () => void;
}

export const BakerStorySection: React.FC<BakerStorySectionProps> = ({ onSelectBaker }) => {
  return (
    <section id="bakers" className="py-16 sm:py-20 bg-[#FFFDF9] border-b border-[#E6D8C7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Frame Border */}
              <div className="absolute -inset-3 bg-[#F4E7D5] rounded-3xl -rotate-1 border border-[#E6D8C7] -z-10"></div>
              
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white">
                <img
                  src={aarohiPortraitImg}
                  alt="Aarohi Deshmukh, founder of Aarohi's Bake Studio Pune"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[#F1D5CC]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kothrud, Pune</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold">Aarohi Deshmukh</h3>
                  <p className="text-white/80 text-[11px]">Pastry Chef & Founder, Aarohi's Bake Studio</p>
                </div>
              </div>

              {/* Floating Escrow Verification badge */}
              <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-[#FFFDF9] border border-[#E6D8C7] rounded-xl p-3 shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#7E9B5E]/20 text-[#5E7844] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#30231F] leading-tight">FSSAI Certified</p>
                  <p className="text-[10px] text-[#75675F] font-mono">Clean Home Kitchen Vetted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Emotional Storytelling & Trust Proof */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8EE] border border-[#E6D8C7] text-xs font-mono uppercase tracking-wider text-[#6F1D3A] font-semibold">
              <Award className="w-3.5 h-3.5 text-[#C9862B]" />
              <span>Meet Pune's Top Artisan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#30231F] leading-tight">
              “I started baking from my home kitchen because I wanted every celebration cake to feel <span className="italic text-[#6F1D3A]">personal</span>.”
            </h2>

            <p className="text-sm sm:text-base text-[#75675F] leading-relaxed">
              When you order a cake on BakeGhar, you are not receiving a mass-produced freezer sponge from a commercial factory. Aarohi whips every batch fresh in her Kothrud studio using unadulterated French butter, organic vanilla bean pods, and Callebaut single-origin Belgian chocolate.
            </p>

            {/* Quantitative Proof Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#E6D8C7]">
              <div>
                <span className="font-mono text-2xl font-bold text-[#4A1328] block tabular-nums">
                  840+
                </span>
                <span className="text-xs text-[#75675F]">Celebrations Baked</span>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-[#30231F] block tabular-nums">
                  4.95 ★
                </span>
                <span className="text-xs text-[#75675F]">Customer Rating</span>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-[#30231F] block tabular-nums">
                  4 Years
                </span>
                <span className="text-xs text-[#75675F]">Artisan Crafting</span>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-[#5E7844] block tabular-nums">
                  100%
                </span>
                <span className="text-xs text-[#75675F]">On-Time Dispatch</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onSelectBaker}
                className="px-6 py-3 bg-[#6F1D3A] hover:bg-[#4A1328] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
              >
                Order from Aarohi's Studio
              </button>
              <span className="text-xs text-[#75675F]">
                Serving: <strong className="text-[#30231F]">Kothrud · Baner · Aundh · Viman Nagar</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
