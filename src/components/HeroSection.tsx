import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { heroMoodyCakeImg, catPartyCakeImg, catWeddingCakeImg, catBirthdayCakeImg } from '../data/mockData';

interface HeroSectionProps {
  onExploreCakes: () => void;
  onFindBaker: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCakes,
  onFindBaker,
  onSelectCategory
}) => {
  return (
    <div className="relative">
      {/* =========================================================
          DARK MOODY ARTISAN HERO (Matching User Reference Image)
          ========================================================= */}
      <section className="relative overflow-hidden bg-[#1E1917] text-[#FFF9F2] pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-[#382C27]">
        {/* Subtle warm ambient illumination */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#8A3D28]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#381E16]/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading and "View Bakery" Button */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Eyebrow marker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono tracking-wider uppercase text-[#E8DAC8] border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#C9862B]" />
                <span>Pune Home Baker Collective</span>
              </div>

              {/* Exact Master Headline from Reference Image */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
                Baked with Love, <br />
                <span className="italic font-serif font-light text-[#F1D5CC]">Served with Joy</span>
              </h1>

              {/* Supporting Editorial Prose */}
              <p className="text-sm sm:text-base text-[#D4C7BC] max-w-md leading-relaxed font-sans font-normal">
                Discover freshly baked, handcrafted celebration cakes made by verified home bakers near you in Pune. Customized for your special moments, delivered oven-fresh.
              </p>

              {/* Primary Action Button (Terracotta / Rust Brown from Reference Image) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onExploreCakes}
                  className="px-6 py-3.5 bg-[#8A3D28] hover:bg-[#733120] text-white font-serif font-semibold text-sm rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  View Bakery
                </button>

                <button
                  onClick={onFindBaker}
                  className="px-5 py-3.5 bg-transparent hover:bg-white/10 text-[#FFF9F2] font-semibold text-sm rounded-lg border border-white/20 hover:border-white/40 transition-all"
                >
                  Meet Pune Bakers
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center gap-5 text-xs text-[#C7BDB5] font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#7E9B5E]" />
                  <span>100% Oven-Fresh</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C9862B]" />
                  <span>Same-Day Pune Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Artisan Chocolate Cake on Slate Turntable */}
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl">
                {/* Hero Cake Image (Exact aesthetic from user reference) */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={heroMoodyCakeImg}
                    alt="Decadent artisan chocolate gateau with chocolate truffles and dark chocolate shards"
                    className="w-full h-auto max-h-[460px] object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex justify-between items-end">
                    <div>
                      <p className="font-serif text-base font-semibold drop-shadow">The Belgian Truffle Royale</p>
                      <p className="text-white/80 font-mono text-[11px]">Handcrafted by Sunita K. · Kothrud</p>
                    </div>
                    <span className="font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-[#F1D5CC]">
                      From ₹899
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED CATEGORY TILES (Matching Reference Image Layout)
          3 Horizontal Cream Cards with Cake Photos & "View more"
          ========================================================= */}
      <div className="relative -mt-14 sm:-mt-18 lg:-mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Party Cakes */}
          <div
            onClick={() => onSelectCategory?.('Corporate')}
            className="group bg-[#FAF1E4] border border-[#E5D5C2] rounded-xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:border-[#8A3D28]/60 transition-all duration-300 cursor-pointer flex items-center gap-4 hover:-translate-y-1"
          >
            {/* Cake Image Left */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#EFE3CF] border border-[#DFCBB5]">
              <img
                src={catPartyCakeImg}
                alt="Party Cakes"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Right */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E221D] group-hover:text-[#8A3D28] transition-colors leading-tight">
                Party Cakes
              </h3>
              <p className="text-xs text-[#7A6A5F] mt-1 font-sans line-clamp-1">
                Baked with Love, Served with Joy
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#8A3D28] group-hover:underline mt-3">
                <span>View more</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 2: Wedding Cakes */}
          <div
            onClick={() => onSelectCategory?.('Wedding')}
            className="group bg-[#FAF1E4] border border-[#E5D5C2] rounded-xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:border-[#8A3D28]/60 transition-all duration-300 cursor-pointer flex items-center gap-4 hover:-translate-y-1"
          >
            {/* Cake Image Left */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#EFE3CF] border border-[#DFCBB5]">
              <img
                src={catWeddingCakeImg}
                alt="Wedding Cakes"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Right */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E221D] group-hover:text-[#8A3D28] transition-colors leading-tight">
                Wedding Cakes
              </h3>
              <p className="text-xs text-[#7A6A5F] mt-1 font-sans line-clamp-1">
                Baked with Love, Served with Joy
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#8A3D28] group-hover:underline mt-3">
                <span>View more</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Birthday Cakes */}
          <div
            onClick={() => onSelectCategory?.('Birthday')}
            className="group bg-[#FAF1E4] border border-[#E5D5C2] rounded-xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:border-[#8A3D28]/60 transition-all duration-300 cursor-pointer flex items-center gap-4 hover:-translate-y-1"
          >
            {/* Cake Image Left */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#EFE3CF] border border-[#DFCBB5]">
              <img
                src={catBirthdayCakeImg}
                alt="Birthday Cakes"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Right */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E221D] group-hover:text-[#8A3D28] transition-colors leading-tight">
                Birthday Cakes
              </h3>
              <p className="text-xs text-[#7A6A5F] mt-1 font-sans line-clamp-1">
                Baked with Love, Served with Joy
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-serif font-bold text-[#8A3D28] group-hover:underline mt-3">
                <span>View more</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
