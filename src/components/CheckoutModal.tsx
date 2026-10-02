import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, CreditCard, ArrowRight, Sparkles, Check } from 'lucide-react';
import { CartItem, Order, PuneNeighborhood } from '../types';
import { PUNE_NEIGHBORHOODS } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  couponCode: string;
  defaultArea: PuneNeighborhood;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  couponCode,
  defaultArea,
  onOrderPlaced
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Address
  const [recipientName, setRecipientName] = useState('Ananya Roy');
  const [recipientPhone, setRecipientPhone] = useState('+91 98230 45892');
  const [streetAddress, setStreetAddress] = useState('B-402, Rohan Ashima, Near Gandhi Bhavan');
  const [selectedArea, setSelectedArea] = useState<PuneNeighborhood>(defaultArea);
  const [pincode, setPincode] = useState('411038');

  // Step 2: Delivery Details
  const [deliverySlot, setDeliverySlot] = useState('Today · 6:30 PM – 7:30 PM');
  const [deliveryNote, setDeliveryNote] = useState('Please ring bell twice and hand over gently (cream cake).');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery'>('UPI');
  const [upiApp, setUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'CustomUPI'>('GPay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Placed Order state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (subtotal > 1500 ? 0 : 49) : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder: Order = {
        id: `order-bg-${Math.floor(4000 + Math.random() * 1000)}`,
        orderNumber: `BG-${Math.floor(4800 + Math.random() * 200)}`,
        customerName: recipientName,
        customerPhone: recipientPhone,
        deliveryAddress: {
          street: streetAddress,
          area: selectedArea,
          city: 'Pune',
          pincode
        },
        items: [...items],
        subtotal,
        deliveryFee,
        discount,
        total: grandTotal,
        paymentMethod,
        status: 'preparing',
        createdAt: 'Just now',
        estimatedDeliveryTime: 'Today · 6:45 PM',
        bakerName: items[0]?.cake.bakerName || 'Aarohi Deshmukh',
        bakerPhone: '+91 94220 18274',
        deliveryPartner: {
          name: 'Vikram Shinde',
          provider: 'Shadowfax Express (Pune Fleet)',
          phone: '+91 97640 88219',
          otp: '4471'
        },
        source: 'BakeGhar App'
      };
      setPlacedOrder(newOrder);
      setCurrentStep(4);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E6D8C7] flex items-center justify-between bg-[#FFF8EE]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F1D3A] font-bold">
              BakeGhar Secure Checkout
            </span>
            <h2 className="font-serif text-xl font-bold text-[#30231F]">
              {currentStep === 4 ? 'Order Confirmed' : 'Complete Your Order'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#75675F] hover:text-[#30231F] hover:bg-[#F4E7D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="px-6 py-3 bg-[#FFFDF9] border-b border-[#E6D8C7] flex items-center justify-between text-xs font-mono">
            {[
              { num: 1, label: '01 Address' },
              { num: 2, label: '02 Slot' },
              { num: 3, label: '03 Payment' }
            ].map((st) => (
              <div
                key={st.num}
                className={`flex items-center gap-1.5 ${
                  currentStep === st.num
                    ? 'text-[#6F1D3A] font-bold'
                    : currentStep > st.num
                    ? 'text-[#5E7844] font-medium'
                    : 'text-[#75675F]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep === st.num
                      ? 'bg-[#6F1D3A] text-white'
                      : currentStep > st.num
                      ? 'bg-[#7E9B5E] text-white'
                      : 'bg-[#E6D8C7] text-[#75675F]'
                  }`}
                >
                  {currentStep > st.num ? '✓' : st.num}
                </span>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Body content based on step */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* STEP 1: Address */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#30231F] block mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none focus:border-[#6F1D3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#30231F] block mb-1">
                    Mobile Number (For Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none focus:border-[#6F1D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Pune Delivery Area / Neighborhood
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value as PuneNeighborhood)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none focus:border-[#6F1D3A]"
                >
                  {PUNE_NEIGHBORHOODS.map((area) => (
                    <option key={area} value={area}>
                      {area}, Pune
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Flat / House / Building / Street Address
                </label>
                <textarea
                  rows={2}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none focus:border-[#6F1D3A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Postal Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-32 text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Delivery Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Slot & Note */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-2">
                  Choose Preferred Delivery Time
                </label>
                <div className="space-y-2">
                  {[
                    'Today · 6:30 PM – 7:30 PM (Evening)',
                    'Today · 8:00 PM – 9:00 PM (Dinner)',
                    'Tomorrow · 11:00 AM – 1:00 PM (Lunch)',
                    'Tomorrow · 4:00 PM – 6:00 PM (Party slot)'
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                        deliverySlot === slot
                          ? 'bg-[#F1D5CC]/40 border-[#6F1D3A] text-[#4A1328] font-semibold'
                          : 'bg-[#FFF8EE] border-[#E6D8C7] text-[#30231F]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                        className="accent-[#6F1D3A]"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-1">
                  Cake Handling Instructions for Delivery Rider
                </label>
                <textarea
                  rows={2}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#7E9B5E]/10 border border-[#5E7844]/20 rounded-xl text-xs text-[#5E7844] flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Cakes are delivered in temperature-stable suspension boxes by dedicated Shadowfax food riders.</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-[#E6D8C7] text-[#30231F] text-xs font-semibold rounded-xl hover:bg-[#FFF8EE]"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Razorpay Payment Simulation */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="bg-[#FFF8EE] p-3.5 rounded-xl border border-[#E6D8C7] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#75675F]">Amount to pay:</span>
                  <span className="font-mono font-bold text-base text-[#4A1328] ml-2">
                    ₹{grandTotal}
                  </span>
                </div>
                {discount > 0 && (
                  <span className="font-mono text-[11px] text-[#5E7844] font-bold">
                    Voucher {couponCode} applied (−₹{discount})
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#30231F] block mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / QR' },
                    { id: 'Card', label: 'Credit / Debit' },
                    { id: 'Netbanking', label: 'Net Banking' },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#6F1D3A] text-white border-[#6F1D3A] shadow-sm'
                          : 'bg-[#FFF8EE] border-[#E6D8C7] text-[#30231F] hover:border-[#6F1D3A]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI Sub-options */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] space-y-3">
                  <span className="text-xs font-semibold text-[#30231F] block">
                    Choose UPI App
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['GPay', 'PhonePe', 'Paytm'] as const).map((app) => (
                      <button
                        key={app}
                        onClick={() => setUpiApp(app)}
                        className={`py-2 px-3 rounded-lg border font-semibold ${
                          upiApp === app
                            ? 'bg-[#4A1328] text-white border-[#4A1328]'
                            : 'bg-white border-[#E6D8C7] text-[#30231F]'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#75675F] font-mono">
                    Instant zero-fee transfer verified via Razorpay India Gateway.
                  </p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (•••• •••• •••• 4242)"
                    defaultValue="4532 8910 2418 4242"
                    className="w-full p-2.5 rounded-lg border border-[#E6D8C7] bg-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="08/29"
                      className="p-2.5 rounded-lg border border-[#E6D8C7] bg-white font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="891"
                      className="p-2.5 rounded-lg border border-[#E6D8C7] bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-[#E6D8C7] text-[#30231F] text-xs font-semibold rounded-xl hover:bg-[#FFF8EE]"
                >
                  ← Back
                </button>
                <button
                  disabled={isProcessingPayment}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3 bg-[#6F1D3A] hover:bg-[#4A1328] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Verifying with Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{grandTotal} & Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success confirmation screen */}
          {currentStep === 4 && placedOrder && (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#7E9B5E]/20 text-[#5E7844] flex items-center justify-center mx-auto text-3xl shadow-inner">
                ✓
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-wider text-[#5E7844] uppercase font-bold">
                  Payment Verified
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#30231F] mt-1">
                  Your cake is officially on its way.
                </h3>
                <p className="text-xs text-[#75675F] max-w-md mx-auto mt-1">
                  We’ve dispatched the order ticket to our verified home bakers near {placedOrder.deliveryAddress.area}.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] text-left text-xs space-y-2">
                <div className="flex justify-between font-mono pb-2 border-b border-[#E6D8C7]">
                  <span className="text-[#75675F]">Order ID:</span>
                  <span className="font-bold text-[#4A1328]">#{placedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75675F]">Cake:</span>
                  <span className="font-medium text-[#30231F]">{placedOrder.items[0]?.cake.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75675F]">Baker:</span>
                  <span className="font-medium text-[#30231F]">{placedOrder.bakerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75675F]">Delivery Slot:</span>
                  <span className="font-medium text-[#30231F]">{deliverySlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75675F]">Destination:</span>
                  <span className="font-medium text-[#30231F] truncate max-w-[200px]">{streetAddress}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors shadow-md"
                >
                  Track Order Live
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
