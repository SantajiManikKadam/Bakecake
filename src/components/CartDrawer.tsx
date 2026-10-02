import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Sparkles, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, couponCode: string) => void;
  onExploreCakes: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCakes
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('ANANYA100');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (subtotal > 1500 ? 0 : 49) : 0;
  
  let discount = 0;
  if (appliedCoupon === 'ANANYA100') {
    discount = Math.min(100, subtotal);
  } else if (appliedCoupon === 'PUNEBAKE50') {
    discount = Math.round(subtotal * 0.1);
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'ANANYA100' || code === 'PUNEBAKE50') {
      setAppliedCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid referral or voucher code for Pune.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Slide-out Drawer Panel */}
      <div className="w-full max-w-md bg-[#FFFDF9] border-l border-[#E6D8C7] h-full flex flex-col justify-between shadow-2xl relative z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E6D8C7] flex items-center justify-between bg-[#FFF8EE]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6F1D3A]" />
            <h2 className="font-serif text-lg font-bold text-[#30231F]">
              Your BakeGhar Cart
            </h2>
            <span className="font-mono text-xs text-[#75675F]">
              ({items.length} {items.length === 1 ? 'cake' : 'cakes'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#75675F] hover:text-[#30231F] hover:bg-[#F4E7D5] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F4E7D5] flex items-center justify-center text-2xl text-[#6F1D3A]">
                🎂
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#30231F]">
                Nothing delicious here yet.
              </h3>
              <p className="text-xs text-[#75675F] max-w-xs">
                Your celebration is waiting for a cake made with love by a local Pune home baker.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCakes();
                }}
                className="mt-3 px-5 py-2.5 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors"
              >
                Explore Fresh Cakes
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#FFF8EE]/80 border border-[#E6D8C7] flex gap-3 relative group"
              >
                {/* Cake Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4E7D5] shrink-0 border border-[#E6D8C7]">
                  <img
                    src={item.cake.image}
                    alt={item.cake.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-semibold text-[#30231F] line-clamp-1">
                        {item.cake.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#75675F] hover:text-[#6F1D3A] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#75675F] font-mono">
                      By {item.cake.bakerName} · {item.customization.sizeKg}kg · {item.customization.isEggless ? 'Eggless' : 'With Egg'}
                    </p>

                    {item.customization.messageOnCake && (
                      <p className="text-[11px] text-[#6F1D3A] italic mt-0.5 line-clamp-1">
                        "{item.customization.messageOnCake}"
                      </p>
                    )}
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E6D8C7]/60">
                    <div className="flex items-center border border-[#E6D8C7] rounded-lg bg-[#FFFDF9]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-xs text-[#75675F] hover:text-[#30231F]"
                      >
                        −
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-[#30231F]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#75675F] hover:text-[#30231F]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-[#4A1328] tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Pricing & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E6D8C7] bg-[#FFFDF9] space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#7E9B5E]/15 border border-[#5E7844]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#5E7844]">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-mono font-bold">{appliedCoupon}</span>
                    <span>applied (−₹{discount})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-[11px] font-semibold text-[#6F1D3A] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Referral / Promo code (e.g. ANANYA100)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#30231F] text-[#FFF8EE] text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-[#6F1D3A] mt-1 font-mono">{couponError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#75675F] pt-2 border-t border-[#E6D8C7]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#30231F] tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee (Shadowfax)</span>
                <span className="font-mono text-[#30231F] tabular-nums">
                  {deliveryFee === 0 ? <span className="text-[#5E7844]">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#5E7844]">
                  <span>Voucher / Referral Discount</span>
                  <span className="font-mono font-bold tabular-nums">−₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#30231F] pt-2 border-t border-[#E6D8C7]">
                <span>Total Payable</span>
                <span className="font-mono text-[#4A1328] text-base tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onProceedToCheckout(discount, appliedCoupon || '')}
              className="w-full py-3.5 px-4 bg-[#6F1D3A] hover:bg-[#4A1328] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#75675F] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5E7844]" />
              <span>Razorpay 256-Bit SSL Secured · 100% Quality Escrow</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
