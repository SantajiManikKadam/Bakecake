import React, { useState } from 'react';
import { X, Star, Clock, ShieldCheck, Heart, Sparkles, ChefHat, Check, AlertCircle } from 'lucide-react';
import { Cake, CartItem } from '../types';

interface ProductDetailModalProps {
  cake: Cake | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onBuyNow: (item: Omit<CartItem, 'id'>) => void;
  isWishlisted: boolean;
  onToggleWishlist: (cake: Cake) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  cake,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!isOpen || !cake) return null;

  // Customization state
  const [selectedSizeKg, setSelectedSizeKg] = useState<number>(1.0);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('Today · 6:30 PM – 7:30 PM');
  const [hasPhotoRef, setHasPhotoRef] = useState<boolean>(false);

  // Size price multiplier: 0.5kg = base, 1kg = base * 1.8, 1.5kg = base * 2.6, 2kg = base * 3.4
  const sizeMultiplier = selectedSizeKg === 0.5 ? 1 : selectedSizeKg === 1.0 ? 1.8 : selectedSizeKg === 1.5 ? 2.6 : 3.4;
  const unitPrice = Math.round(cake.basePrice * sizeMultiplier);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      cake,
      customization: {
        sizeKg: selectedSizeKg,
        isEggless,
        messageOnCake: messageOnCake.trim(),
        specialInstructions: specialInstructions.trim() || undefined,
        deliverySlot: selectedSlot
      },
      unitPrice,
      quantity
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      cake,
      customization: {
        sizeKg: selectedSizeKg,
        isEggless,
        messageOnCake: messageOnCake.trim(),
        specialInstructions: specialInstructions.trim() || undefined,
        deliverySlot: selectedSlot
      },
      unitPrice,
      quantity
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FFFDF9]/80 backdrop-blur-md border border-[#E6D8C7] text-[#75675F] hover:text-[#30231F] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery & Baker Badge */}
        <div className="md:w-1/2 bg-[#FFF8EE] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E6D8C7]">
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#E6D8C7] group">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#4A1328] text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md">
                Freshly Baked to Order
              </div>
            </div>

            {/* Baker Information Box */}
            <div className="mt-5 p-4 rounded-xl bg-[#FFFDF9] border border-[#E6D8C7]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#6F1D3A] text-[#FFF8EE] flex items-center justify-center font-serif text-lg font-bold">
                  {cake.bakerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#30231F]">{cake.bakerName}</span>
                    <ShieldCheck className="w-4 h-4 text-[#7E9B5E]" />
                  </div>
                  <p className="text-xs text-[#75675F]">
                    Verified Home Baker · {cake.bakerArea}, Pune
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E6D8C7] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="font-mono font-bold text-[#30231F] block">{cake.bakerRating} ★</span>
                  <span className="text-[10px] text-[#75675F]">Baker Rating</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-[#30231F] block">840+</span>
                  <span className="text-[10px] text-[#75675F]">Cakes Made</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-[#5E7844] block">45–75m</span>
                  <span className="text-[10px] text-[#75675F]">Prep Time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Freshness guarantee */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[#75675F]">
            <Sparkles className="w-4 h-4 text-[#C9862B]" />
            <span>Baked only after your order is confirmed. Never pre-made.</span>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[92vh]">
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#75675F]">
                  <span className="flex items-center gap-1 text-[#C9862B] font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {cake.rating.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{cake.reviewsCount} customer reviews in Pune</span>
                </div>

                <button
                  onClick={() => onToggleWishlist(cake)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted
                      ? 'bg-[#F1D5CC] border-[#6F1D3A] text-[#6F1D3A]'
                      : 'border-[#E6D8C7] text-[#75675F] hover:text-[#6F1D3A]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#30231F] mt-1">
                {cake.name}
              </h2>
              <p className="text-xs text-[#75675F] mt-1.5 leading-relaxed">
                {cake.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#30231F] font-bold">
                  Select Cake Weight
                </label>
                <span className="text-[11px] text-[#75675F]">
                  {selectedSizeKg === 0.5 ? 'Serves 3–4' : selectedSizeKg === 1.0 ? 'Serves 6–8' : selectedSizeKg === 1.5 ? 'Serves 10–12' : 'Serves 15+'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0.5, 1.0, 1.5, 2.0].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeKg(size)}
                    className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all ${
                      selectedSizeKg === size
                        ? 'bg-[#6F1D3A] text-white border-[#6F1D3A] shadow-sm'
                        : 'bg-[#FFF8EE] text-[#30231F] border-[#E6D8C7] hover:border-[#6F1D3A]'
                    }`}
                  >
                    <span className="block font-mono">{size} kg</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Type: Eggless / With Egg */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#30231F] font-bold block mb-2">
                Dietary Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsEggless(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    isEggless
                      ? 'bg-[#7E9B5E]/15 border-[#5E7844] text-[#5E7844]'
                      : 'bg-[#FFF8EE] border-[#E6D8C7] text-[#75675F]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5E7844]"></span>
                  <span>100% Eggless (Pure Veg)</span>
                </button>

                <button
                  onClick={() => setIsEggless(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    !isEggless
                      ? 'bg-[#C9862B]/15 border-[#C9862B] text-[#C9862B]'
                      : 'bg-[#FFF8EE] border-[#E6D8C7] text-[#75675F]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9862B]"></span>
                  <span>Contains Egg</span>
                </button>
              </div>
            </div>

            {/* Message on Cake (Textarea) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#30231F] font-bold">
                  Piped Inscription on Cake
                </label>
                <span className="text-[10px] text-[#75675F]">Free of charge</span>
              </div>
              <input
                type="text"
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                placeholder="e.g. Happy 30th Birthday Kabir!"
                maxLength={45}
                className="w-full text-xs p-3 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none focus:border-[#6F1D3A] transition-colors"
              />
            </div>

            {/* Delivery Slot */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#30231F] font-bold block mb-1.5">
                Delivery Schedule
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none text-[#30231F]"
              >
                <option value="Today · 6:30 PM – 7:30 PM">Today · 6:30 PM – 7:30 PM (Evening slot)</option>
                <option value="Today · 8:00 PM – 9:00 PM">Today · 8:00 PM – 9:00 PM (Dinner slot)</option>
                <option value="Tomorrow · 11:00 AM – 1:00 PM">Tomorrow · 11:00 AM – 1:00 PM (Morning slot)</option>
                <option value="Tomorrow · 4:00 PM – 6:00 PM">Tomorrow · 4:00 PM – 6:00 PM (Tea time slot)</option>
              </select>
            </div>

            {/* Special Instructions & Reference Photo toggle */}
            <div className="pt-1 border-t border-[#E6D8C7]">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#75675F]">Reference design photo?</label>
                <button
                  type="button"
                  onClick={() => setHasPhotoRef(!hasPhotoRef)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                    hasPhotoRef ? 'bg-[#6F1D3A] text-white border-[#6F1D3A]' : 'bg-[#FFF8EE] text-[#30231F] border-[#E6D8C7]'
                  }`}
                >
                  {hasPhotoRef ? 'Photo Attached ✓' : '+ Attach Reference'}
                </button>
              </div>
              {hasPhotoRef && (
                <p className="text-[11px] text-[#5E7844] mt-1 font-mono">
                  ✓ Sample theme uploaded: Baker will review before oven prep.
                </p>
              )}
            </div>
          </div>

          {/* Sticky Bottom Actions Container */}
          <div className="mt-8 pt-4 border-t border-[#E6D8C7]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#75675F] block">
                  Total Calculated Price
                </span>
                <span className="font-mono text-2xl font-bold text-[#4A1328] tabular-nums">
                  ₹{totalPrice}
                </span>
                <span className="text-xs text-[#75675F] ml-1">
                  ({selectedSizeKg}kg {isEggless ? 'Eggless' : 'Regular'})
                </span>
              </div>

              {/* Quantity stepper */}
              <div className="flex items-center border border-[#E6D8C7] rounded-xl bg-[#FFF8EE]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[#75675F] hover:text-[#30231F]"
                >
                  −
                </button>
                <span className="px-2 font-mono text-xs font-bold text-[#30231F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-[#75675F] hover:text-[#30231F]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 rounded-xl border border-[#6F1D3A] text-[#6F1D3A] hover:bg-[#F1D5CC]/50 font-semibold text-xs transition-colors"
              >
                Add to Bag
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-[#6F1D3A] hover:bg-[#4A1328] text-white font-semibold text-xs shadow-md transition-all"
              >
                Buy Now · Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
