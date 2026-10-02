import React from 'react';
import { Cake } from '../types';
import { 
  chocoTruffleImg, 
  redVelvetImg, 
  pistachioRoseImg, 
  catBirthdayCakeImg, 
  catWeddingCakeImg, 
  catPartyCakeImg 
} from '../data/mockData';

interface OccasionTilesProps {
  selectedOccasion: string;
  onSelectOccasion: (occ: string) => void;
}

interface OccasionMeta {
  name: string;
  subtitle: string;
  image: string;
  count: string;
}

const OCCASIONS: OccasionMeta[] = [
  {
    name: 'Birthday',
    subtitle: 'Confetti, rich ganache & custom names',
    image: catBirthdayCakeImg,
    count: '24 Designs'
  },
  {
    name: 'Anniversary',
    subtitle: 'Romantic red velvet & berry layers',
    image: redVelvetImg,
    count: '18 Designs'
  },
  {
    name: 'Wedding',
    subtitle: 'Architectural tiers & botanicals',
    image: catWeddingCakeImg,
    count: '12 Curations'
  },
  {
    name: 'Baby Shower',
    subtitle: 'Pastel clouds & delicate textures',
    image: pistachioRoseImg,
    count: '14 Designs'
  },
  {
    name: 'Corporate',
    subtitle: 'Artisan walnut & caramel slabs',
    image: catPartyCakeImg,
    count: '9 Curations'
  },
  {
    name: 'Just Because',
    subtitle: 'Mid-week sweet craving cravings',
    image: redVelvetImg,
    count: '16 Designs'
  }
];

export const OccasionTiles: React.FC<OccasionTilesProps> = ({
  selectedOccasion,
  onSelectOccasion
}) => {
  return (
    <section id="occasions" className="py-14 bg-[#FFF8EE]/60 border-b border-[#E6D8C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6F1D3A] font-semibold">
              Curated Moments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#30231F] mt-1">
              Shop by Celebration
            </h2>
            <p className="text-sm text-[#75675F] mt-1">
              Every occasion deserves a freshly baked story from a neighborhood artisan.
            </p>
          </div>

          {selectedOccasion !== 'All' && (
            <button
              onClick={() => onSelectOccasion('All')}
              className="text-xs font-semibold text-[#6F1D3A] hover:underline self-start md:self-auto"
            >
              Reset filter (Show all cakes)
            </button>
          )}
        </div>

        {/* Photographic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {OCCASIONS.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                onClick={() => onSelectOccasion(isSelected ? 'All' : occ.name)}
                className={`group relative text-left rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#6F1D3A] ring-2 ring-[#6F1D3A]/30 shadow-md transform -translate-y-1'
                    : 'border-[#E6D8C7] hover:border-[#6F1D3A]/50 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Background Image Container */}
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#F4E7D5]">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#30231F]/90 via-[#30231F]/40 to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 p-3 sm:p-3.5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-mono text-[#F1D5CC] tracking-wide">
                      {occ.count}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-semibold leading-tight drop-shadow-sm mt-0.5">
                      {occ.name}
                    </h3>
                  </div>
                </div>

                {/* Active Indicator bar */}
                {isSelected && (
                  <div className="h-1 bg-[#6F1D3A] w-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
