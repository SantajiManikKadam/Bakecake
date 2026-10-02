import React from 'react';
import { Heart, Star, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Cake } from '../types';

interface ProductCardProps {
  cake: Cake;
  isWishlisted: boolean;
  onToggleWishlist: (cake: Cake) => void;
  onSelectCake: (cake: Cake) => void;
  onQuickAdd: (cake: Cake) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  cake,
  isWishlisted,
  onToggleWishlist,
  onSelectCake,
  onQuickAdd
}) => {
  return (
    <div className="group relative bg-[#FFFDF9] border border-[#E6D8C7] rounded-[20px] overflow-hidden hover:border-[#6F1D3A]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      {/* Top Image Section (Dominates the card) */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4E7D5] cursor-pointer"
        onClick={() => onSelectCake(cake)}
      >
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Soft Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

        {/* Top Floating Elements */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {cake.bestseller ? (
            <span className="pointer-events-auto bg-[#4A1328]/90 backdrop-blur-md text-[#FFF8EE] text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md shadow-sm">
              Bestseller
            </span>
          ) : (
            <span className="pointer-events-auto bg-[#FFFDF9]/90 backdrop-blur-md text-[#30231F] text-[10px] font-mono tracking-wider uppercase font-medium px-2 py-0.5 rounded-md shadow-sm border border-[#E6D8C7]">
              {cake.flavor}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(cake);
            }}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isWishlisted
                ? 'bg-[#6F1D3A] text-white shadow-md'
                : 'bg-[#FFFDF9]/90 backdrop-blur-md text-[#75675F] hover:text-[#6F1D3A] hover:bg-white shadow-sm'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Baker Tag on Image */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none">
          <span className="text-[11px] font-medium text-white/95 drop-shadow bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
            By {cake.bakerName} · {cake.bakerArea}
          </span>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata: Rating and Prep Time */}
          <div className="flex items-center justify-between text-xs text-[#75675F] mb-1.5">
            <div className="flex items-center gap-1 font-mono font-medium text-[#30231F]">
              <Star className="w-3.5 h-3.5 fill-[#C9862B] text-[#C9862B]" />
              <span className="tabular-nums font-bold">{cake.rating.toFixed(1)}</span>
              <span className="text-[#75675F] font-sans">({cake.reviewsCount})</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-[#5E7844]">
              <Clock className="w-3 h-3" />
              <span>{cake.prepTimeMinutes}m oven-ready</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectCake(cake)}
            className="font-serif text-lg font-semibold text-[#30231F] group-hover:text-[#6F1D3A] transition-colors line-clamp-1 cursor-pointer"
          >
            {cake.name}
          </h3>

          {/* Subtitle / Flavor notes */}
          <p className="text-xs text-[#75675F] line-clamp-2 mt-1 leading-relaxed">
            {cake.subtitle}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#E6D8C7] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#75675F] block">
              Starting from
            </span>
            <span className="font-mono text-base font-bold text-[#4A1328] tabular-nums">
              ₹{cake.basePrice}
            </span>
            <span className="text-[11px] text-[#75675F] ml-1 font-sans">/ 0.5kg</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectCake(cake)}
              className="px-3.5 py-2 text-xs font-semibold bg-[#FFF8EE] hover:bg-[#F4E7D5] text-[#4A1328] border border-[#E6D8C7] hover:border-[#6F1D3A] rounded-xl transition-colors flex items-center gap-1"
            >
              <span>Customize</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
