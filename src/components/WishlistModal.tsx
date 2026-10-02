import React from 'react';
import { X, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Cake } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Cake[];
  onRemoveFromWishlist: (cake: Cake) => void;
  onSelectCake: (cake: Cake) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectCake
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="flex-1" onClick={onClose}></div>

      <div className="w-full max-w-md bg-[#FFFDF9] border-l border-[#E6D8C7] h-full flex flex-col justify-between shadow-2xl relative z-10 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-[#E6D8C7] flex items-center justify-between bg-[#FFF8EE]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#6F1D3A] fill-current" />
            <h2 className="font-serif text-lg font-bold text-[#30231F]">
              Your Saved Cakes
            </h2>
            <span className="font-mono text-xs text-[#75675F]">
              ({wishlist.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#75675F] hover:text-[#30231F] hover:bg-[#F4E7D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F1D5CC]/40 flex items-center justify-center text-[#6F1D3A]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#30231F]">
                Your wishlist is waiting for something sweet.
              </h3>
              <p className="text-xs text-[#75675F] max-w-xs">
                Tap the heart on any artisanal cake to save it for your next celebration in Pune.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors"
              >
                Explore Cakes
              </button>
            </div>
          ) : (
            wishlist.map((cake) => (
              <div
                key={cake.id}
                className="p-3.5 rounded-2xl bg-[#FFF8EE]/80 border border-[#E6D8C7] flex gap-3 relative group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4E7D5] shrink-0 border border-[#E6D8C7]">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-semibold text-[#30231F] line-clamp-1">
                        {cake.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(cake)}
                        className="text-[#75675F] hover:text-[#6F1D3A] p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#75675F] font-mono">
                      By {cake.bakerName} · {cake.bakerArea}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E6D8C7]/60">
                    <span className="font-mono text-xs font-bold text-[#4A1328] tabular-nums">
                      From ₹{cake.basePrice}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectCake(cake);
                      }}
                      className="px-3 py-1 bg-[#6F1D3A] hover:bg-[#4A1328] text-white text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
