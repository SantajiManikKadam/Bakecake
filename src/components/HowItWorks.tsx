import React from 'react';
import { Search, Sliders, Flame, Bike } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose your cake',
      desc: 'Browse artisan confections crafted by verified home bakers in your Pune neighborhood.',
      icon: Search
    },
    {
      num: '02',
      title: 'Customize flavors & size',
      desc: 'Choose 0.5kg to 2kg, eggless preference, piping message, and optional photo reference.',
      icon: Sliders
    },
    {
      num: '03',
      title: 'Baker prepares it fresh',
      desc: 'No warehouse freezers. Your baker whisks, bakes, and decorates your sponge only after payment.',
      icon: Flame
    },
    {
      num: '04',
      title: 'Track to your doorstep',
      desc: 'Follow the live timeline as Shadowfax food partners safely transport your cake in suspension boxes.',
      icon: Bike
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#FFF8EE]/50 border-b border-[#E6D8C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6F1D3A] font-semibold">
            Freshness Guaranteed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#30231F] mt-1.5">
            How BakeGhar Works
          </h2>
          <p className="text-sm text-[#75675F] mt-2 leading-relaxed">
            From an artisan’s warm oven in Pune straight to your celebration table in four seamless steps.
          </p>
        </div>

        {/* 4 Steps Grid with connecting horizontal flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-lg hover:border-[#6F1D3A]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#F1D5CC] group-hover:text-[#6F1D3A] transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FFF8EE] border border-[#E6D8C7] flex items-center justify-center text-[#6F1D3A]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#30231F]">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#75675F] mt-2 leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6D8C7]/60 flex items-center gap-1.5 text-[11px] font-mono text-[#5E7844]">
                  <span>Step {i + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
