import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, CheckCircle2, AlertTriangle, ChefHat, 
  TrendingUp, DollarSign, Package, MapPin, Eye, Bell, ArrowRight,
  RotateCcw, Sparkles
} from 'lucide-react';
import { MOCK_BAKERS, chocoTruffleImg } from '../../data/mockData';

interface BakerAppViewProps {
  onShowToast: (msg: string) => void;
}

export const BakerAppView: React.FC<BakerAppViewProps> = ({ onShowToast }) => {
  // Baker sub-screens: 'offer' (incoming dispatch ticket) | 'active' (in prep) | 'ready' (awaiting rider pickup)
  const [bakerScreen, setBakerScreen] = useState<'offer' | 'active' | 'ready'>('offer');

  // Interactive offer timer (counts down from 30)
  const [offerSeconds, setOfferSeconds] = useState(27);
  useEffect(() => {
    if (bakerScreen !== 'offer') return;
    const interval = setInterval(() => {
      setOfferSeconds((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(interval);
  }, [bakerScreen]);

  // Prep window countdown timer
  const [prepTimeRemaining, setPrepTimeRemaining] = useState('1:24:07');

  // Material checklist state
  const [checklist, setChecklist] = useState({
    sponge: true,
    ganache: true,
    piping: false,
    box: false
  });

  const [depositBalance, setDepositBalance] = useState(4400);
  const [viewMode, setViewMode] = useState<'phone' | 'dashboard'>('phone');

  const handleAcceptOrder = () => {
    setBakerScreen('active');
    onShowToast('Order #BG-4821 accepted! Committed to prep window of 1 hr 30 min.');
  };

  const handleDeclineOrder = () => {
    onShowToast('Offer passed to next nearby baker in Kothrud.');
    setOfferSeconds(30);
  };

  const handleMarkReady = () => {
    const allChecked = Object.values(checklist).every(Boolean);
    if (!allChecked) {
      onShowToast('Please check all packaging & hygiene requirements before dispatch!');
      // auto check for convenience
      setChecklist({ sponge: true, ganache: true, piping: true, box: true });
    }
    setBakerScreen('ready');
    onShowToast('Marked ready! Delivery partner Vikram (Shadowfax) alerted for pickup.');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Baker Studio Masthead */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#E6D8C7] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7E9B5E]"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6F1D3A] font-bold">
                Baker Kitchen Terminal · Kothrud Hub
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#30231F] mt-1">
              Sugar & Bloom Studio (Sunita K.)
            </h1>
            <p className="text-xs text-[#75675F] mt-0.5">
              FSSAI Lic. #11526038000412 · Active Service Area: Kothrud, Karve Nagar & Paud Road
            </p>
          </div>

          {/* Toggle between Phone Simulation & Desktop Workspace */}
          <div className="flex items-center gap-3">
            <div className="flex bg-[#FFF8EE] border border-[#E6D8C7] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('phone')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'phone' ? 'bg-[#6F1D3A] text-white shadow-sm' : 'text-[#75675F] hover:text-[#30231F]'
                }`}
              >
                Mobile Dispatch Device
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'dashboard' ? 'bg-[#6F1D3A] text-white shadow-sm' : 'text-[#75675F] hover:text-[#30231F]'
                }`}
              >
                Studio Operations Overview
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Mobile Dispatch Phone Frame */}
        {viewMode === 'phone' && (
          <div className="py-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
            {/* The Phone Container */}
            <div className="w-[340px] h-[680px] bg-[#30231F] rounded-[44px] p-3 shadow-xl border-4 border-[#4A1328] relative flex flex-col shrink-0">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#30231F] rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-black/60"></div>
                </div>

              {/* Phone Screen */}
              <div className="w-full h-full bg-[#FFFDF9] rounded-[34px] overflow-hidden flex flex-col justify-between pt-7 pb-3 px-4 relative z-10">
                {/* Screen Top Status bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#75675F] px-1 pb-2 border-b border-[#E6D8C7]">
                  <span className="font-bold text-[#30231F]">BakeGhar Baker</span>
                  <span className="text-[#5E7844] font-semibold">● Online</span>
                </div>

                {/* Dynamic Screen Content */}
                <div className="flex-1 overflow-y-auto py-3">
                  {/* STATE 1: INCOMING OFFER (RIDE-REQUEST STYLE WITH COUNTDOWN RING) */}
                  {bakerScreen === 'offer' && (
                    <div className="flex flex-col items-center justify-between h-full space-y-4">
                      <div className="text-center w-full">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#6F1D3A] font-bold block">
                          Incoming Dispatch Ticket
                        </span>

                        {/* Circular Countdown Ring */}
                        <div className="relative w-24 h-24 mx-auto my-3 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#E6D8C7"
                              strokeWidth="6"
                              fill="none"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="#6F1D3A"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 - (251.2 * offerSeconds) / 30}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-mono text-xl font-bold text-[#4A1328]">
                              {offerSeconds}
                            </span>
                            <span className="text-[9px] uppercase font-mono text-[#75675F]">
                              Seconds
                            </span>
                          </div>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#30231F]">
                          Choco Truffle · 1kg
                        </h3>
                        <p className="text-xs text-[#75675F]">
                          Eggless · "Happy Birthday Riya!"
                        </p>
                      </div>

                      {/* Ticket Key-Values */}
                      <div className="w-full bg-[#FFF8EE] rounded-2xl p-3 border border-[#E6D8C7] space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#75675F]">Baker Payout:</span>
                          <span className="font-mono font-bold text-[#5E7844]">₹780 net</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#75675F]">Customer Distance:</span>
                          <span className="font-mono font-bold text-[#30231F]">2.1 km (Kothrud)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#75675F]">Committed Window:</span>
                          <span className="font-mono font-bold text-[#4A1328]">1 hr 30 min</span>
                        </div>
                      </div>

                      {/* Decline / Accept Buttons */}
                      <div className="w-full grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={handleDeclineOrder}
                          className="py-2.5 px-3 border border-[#75675F] text-[#75675F] hover:text-[#30231F] text-xs font-semibold rounded-xl"
                        >
                          Decline
                        </button>
                        <button
                          onClick={handleAcceptOrder}
                          className="py-2.5 px-3 bg-[#5E7844] hover:bg-[#475d33] text-white text-xs font-semibold rounded-xl shadow-md"
                        >
                          Accept Order
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STATE 2: ACTIVE ORDER (PREPARATION IN PROGRESS & CHECKLIST) */}
                  {bakerScreen === 'active' && (
                    <div className="space-y-3">
                      {/* Deposit balance indicator */}
                      <div className="flex justify-between items-center bg-[#FFF8EE] border border-[#E6D8C7] rounded-xl px-3 py-2 text-xs">
                        <span className="text-[#75675F]">Deposit Balance:</span>
                        <span className="font-mono font-bold text-[#5E7844]">
                          ₹{depositBalance}
                        </span>
                      </div>

                      {/* Countdown Timer Box */}
                      <div className="bg-[#F1D5CC] rounded-2xl p-3 text-center border border-[#E6D8C7]">
                        <span className="font-mono text-2xl font-bold text-[#4A1328] block">
                          {prepTimeRemaining}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-[#75675F]">
                          Left in prep commitment window
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#30231F]">
                          Order #BG-4821
                        </h4>
                        <div className="text-[11px] text-[#75675F] flex justify-between mt-1">
                          <span>Recipe: Choco Truffle v3</span>
                          <span className="font-mono text-[#5E7844]">70% Couverture</span>
                        </div>
                      </div>

                      {/* Interactive Material Checklist */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#75675F] font-bold block">
                          Assembly Checklist
                        </span>

                        {[
                          { key: 'sponge', label: 'Cocoa sponge base ×1' },
                          { key: 'ganache', label: 'Truffle ganache kit' },
                          { key: 'piping', label: 'Piping + garnish set' },
                          { key: 'box', label: 'Company packaging box' }
                        ].map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[#FFF8EE] border border-[#E6D8C7]/60 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checklist[item.key as keyof typeof checklist]}
                              onChange={(e) =>
                                setChecklist({
                                  ...checklist,
                                  [item.key]: e.target.checked
                                })
                              }
                              className="accent-[#6F1D3A] rounded w-3.5 h-3.5"
                            />
                            <span className="text-[#30231F]">{item.label}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        onClick={handleMarkReady}
                        className="w-full mt-3 py-3 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors shadow-md"
                      >
                        Mark Ready for Pickup
                      </button>
                    </div>
                  )}

                  {/* STATE 3: READY FOR PICKUP */}
                  {bakerScreen === 'ready' && (
                    <div className="text-center py-4 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#7E9B5E]/20 text-[#5E7844] text-2xl flex items-center justify-center mx-auto">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#30231F]">
                          Ready for pickup
                        </h3>
                        <p className="text-xs text-[#75675F] mt-1">
                          Delivery partner Vikram is on the way — ETA 8 min.
                        </p>
                      </div>

                      {/* Partner Card */}
                      <div className="p-3 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] text-left flex items-center gap-3 text-xs">
                        <div className="w-10 h-10 rounded-full bg-[#5E7844] text-white flex items-center justify-center font-bold">
                          VK
                        </div>
                        <div>
                          <p className="font-bold text-[#30231F]">Vikram · Shadowfax</p>
                          <p className="text-[#6F1D3A] font-mono font-bold text-[11px]">
                            Pickup OTP: 4471
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setBakerScreen('offer');
                          setOfferSeconds(30);
                        }}
                        className="w-full py-2.5 border border-[#E6D8C7] hover:bg-[#FFF8EE] text-xs font-semibold text-[#30231F] rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#6F1D3A]" />
                        <span>Simulate next incoming offer</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="pt-2 border-t border-[#E6D8C7] flex justify-around text-[10px] font-mono text-[#75675F]">
                  <span className={bakerScreen === 'offer' ? 'text-[#6F1D3A] font-bold' : ''}>
                    01 Offers
                  </span>
                  <span className={bakerScreen === 'active' ? 'text-[#6F1D3A] font-bold' : ''}>
                    02 Prep
                  </span>
                  <span className={bakerScreen === 'ready' ? 'text-[#6F1D3A] font-bold' : ''}>
                    03 Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Side Explanations & Trust System (from original prototype) */}
            <div className="max-w-md space-y-4 text-left">
              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <h4 className="font-serif text-sm font-bold text-[#4A1328] uppercase tracking-wider">
                  The Dispatch Mechanism
                </h4>
                <p className="text-xs text-[#75675F] mt-1.5 leading-relaxed font-sans">
                  Incoming orders are offered in 30-second priority bursts to qualified home bakers closest to the customer's Pune neighborhood.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <h4 className="font-serif text-sm font-bold text-[#4A1328] uppercase tracking-wider">
                  Prep Window & Quality SLA
                </h4>
                <p className="text-xs text-[#75675F] mt-1.5 leading-relaxed font-sans">
                  Accepting an order commits the baker to an exact oven window. All cakes are delivered with standardized BakeGhar suspension boxes to prevent icing damage.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <h4 className="font-serif text-sm font-bold text-[#4A1328] uppercase tracking-wider">
                  Security Escrow Safeguard
                </h4>
                <p className="text-xs text-[#75675F] mt-1.5 leading-relaxed font-sans">
                  Home bakers maintain an escrow reserve (current: ₹4,400). Unexcused late cancellations are automatically reconciled from deposit to protect customer trust.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Studio Operations Overview Dashboard */}
        {viewMode === 'dashboard' && (
          <div className="py-8 space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#75675F] font-bold">
                  Today's Earnings
                </span>
                <div className="font-mono text-2xl font-bold text-[#4A1328] mt-2 tabular-nums">
                  ₹2,340
                </div>
                <span className="text-[11px] text-[#5E7844] mt-1 block">3 orders fulfilled</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#75675F] font-bold">
                  Weekly Payout
                </span>
                <div className="font-mono text-2xl font-bold text-[#30231F] mt-2 tabular-nums">
                  ₹14,800
                </div>
                <span className="text-[11px] text-[#75675F] mt-1 block">Disbursed via NEFT on Friday</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#75675F] font-bold">
                  Escrow Deposit Health
                </span>
                <div className="font-mono text-2xl font-bold text-[#5E7844] mt-2 tabular-nums">
                  ₹4,400 / ₹5,000
                </div>
                <div className="w-full bg-[#E6D8C7] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#7E9B5E] h-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#75675F] font-bold">
                  Customer Rating
                </span>
                <div className="font-mono text-2xl font-bold text-[#30231F] mt-2 tabular-nums">
                  4.88 ★
                </div>
                <span className="text-[11px] text-[#5E7844] mt-1 block">Top 5% in Pune</span>
              </div>
            </div>

            {/* Active & Queued Orders Table */}
            <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl p-6 shadow-sm overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-[#30231F]">
                  Today's Studio Orders
                </h3>
                <span className="text-xs font-mono text-[#5E7844]">● 1 Order in Oven</span>
              </div>

              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[11px]">
                    <th className="py-2.5">Order</th>
                    <th>Cake Recipe</th>
                    <th>Weight</th>
                    <th>Deadline</th>
                    <th>Customer Area</th>
                    <th>Payout</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6D8C7]/60">
                  <tr>
                    <td className="py-3 font-mono font-bold text-[#4A1328]">#BG-4821</td>
                    <td className="font-semibold text-[#30231F]">Choco Truffle Gateau</td>
                    <td className="font-mono">1.0 kg</td>
                    <td className="font-mono text-[#C9862B] font-bold">6:40 PM</td>
                    <td>Kothrud (Gandhi Bhavan)</td>
                    <td className="font-mono font-bold text-[#5E7844]">₹780</td>
                    <td>
                      <span className="bg-[#F1D5CC] text-[#4A1328] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        In Oven
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono font-bold text-[#75675F]">#BG-4818</td>
                    <td className="font-semibold text-[#30231F]">Butterscotch Crunch</td>
                    <td className="font-mono">0.5 kg</td>
                    <td className="font-mono">5:00 PM</td>
                    <td>Kothrud (Paud Road)</td>
                    <td className="font-mono font-bold text-[#5E7844]">₹450</td>
                    <td>
                      <span className="bg-[#7E9B5E]/20 text-[#5E7844] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        Delivered
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
