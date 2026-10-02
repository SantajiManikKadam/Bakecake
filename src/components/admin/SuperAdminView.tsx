import React, { useState } from 'react';
import { 
  BarChart3, ShoppingBag, Users, ShieldAlert, RefreshCw, 
  Search, Filter, ChevronRight, CheckCircle2, AlertTriangle, 
  Building, ExternalLink, ArrowUpRight, Plus, Download
} from 'lucide-react';
import { 
  MOCK_ORDERS_LIST, MOCK_BAKERS, MOCK_DEPOSITS_LEDGER, 
  MOCK_AGGREGATORS 
} from '../../data/mockData';
import { Order, DepositLedgerEntry, AggregatorPartner } from '../../types';

interface SuperAdminViewProps {
  onShowToast: (msg: string) => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onShowToast }) => {
  const [activePane, setActivePane] = useState<'dashboard' | 'orders' | 'bakers' | 'deposits' | 'aggregators'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS_LIST);
  const [deposits, setDeposits] = useState<DepositLedgerEntry[]>(MOCK_DEPOSITS_LEDGER);
  const [aggregators, setAggregators] = useState<AggregatorPartner[]>(MOCK_AGGREGATORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Trigger manual aggregator sync
  const handleTriggerSync = (platformName: string) => {
    onShowToast(`Sync initiated for ${platformName}...`);
    setTimeout(() => {
      setAggregators((prev) =>
        prev.map((agg) =>
          agg.name === platformName
            ? { ...agg, lastSync: 'Just now', ordersPulledToday: agg.ordersPulledToday + 2, menuSyncStatus: 'Up to date' }
            : agg
        )
      );
      onShowToast(`Menu & orders synchronized with ${platformName}!`);
    }, 1000);
  };

  // Add sample penalty or credit
  const handleAddPenalty = (bakerName: string, amount: number, orderId: string) => {
    const newEntry: DepositLedgerEntry = {
      id: `dep-${Date.now()}`,
      date: 'Today',
      bakerName,
      type: 'Penalty',
      amount: -amount,
      relatedOrderId: orderId,
      balanceAfter: 2550,
      reason: 'Late preparation penalty (>30 min delay)'
    };
    setDeposits([newEntry, ...deposits]);
    onShowToast(`SLA Penalty of ₹${amount} debited from ${bakerName}'s deposit escrow.`);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.bakerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Admin Shell */}
        <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[720px]">
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 bg-[#30231F] text-[#FFF8EE] p-5 flex flex-col justify-between shrink-0">
            <div>
              <div className="pb-5 border-b border-white/10">
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  BakeGhar
                </span>
                <p className="text-[11px] font-mono uppercase text-[#F1D5CC] tracking-wider mt-0.5">
                  Super Admin · Pune HQ
                </p>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 space-y-1.5 text-xs font-semibold">
                {[
                  { id: 'dashboard', label: 'Live Dashboard', icon: BarChart3 },
                  { id: 'orders', label: 'All Orders', icon: ShoppingBag },
                  { id: 'bakers', label: 'Home Bakers', icon: Users },
                  { id: 'deposits', label: 'Deposits & Penalties', icon: ShieldAlert },
                  { id: 'aggregators', label: 'Aggregator Sync', icon: RefreshCw }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activePane === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePane(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                        isActive
                          ? 'bg-[#6F1D3A] text-white font-bold shadow-sm'
                          : 'text-[#FFF8EE]/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Status Indicator */}
            <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-[#FFF8EE]/60 space-y-1">
              <div className="flex items-center gap-2 text-[#7E9B5E]">
                <span className="w-2 h-2 rounded-full bg-[#7E9B5E] animate-pulse"></span>
                <span>Zomato & Swiggy APIs Online</span>
              </div>
              <p>Pilot City: Pune (7 active zones)</p>
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[85vh]">
            {/* PANE 1: LIVE DASHBOARD */}
            {activePane === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#30231F]">
                    Live Operational Dashboard
                  </h2>
                  <p className="text-xs text-[#75675F]">
                    Real-time monitoring across Pune coverage area · Today
                  </p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#75675F] font-bold">
                      Orders Today
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#30231F] mt-1 tabular-nums">
                      184
                    </div>
                    <span className="text-[10px] text-[#5E7844] font-semibold mt-1 block">
                      ↑ 12% vs yesterday
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#75675F] font-bold">
                      Active Bakers
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#30231F] mt-1 tabular-nums">
                      67
                    </div>
                    <span className="text-[10px] text-[#5E7844] font-semibold mt-1 block">
                      ↑ 3 new in Kothrud & Baner
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#75675F] font-bold">
                      Revenue Today
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#4A1328] mt-1 tabular-nums">
                      ₹1.42L
                    </div>
                    <span className="text-[10px] text-[#5E7844] font-semibold mt-1 block">
                      ↑ 8% vs yesterday
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] shadow-sm">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#75675F] font-bold">
                      SLA Breaches
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#6F1D3A] mt-1 tabular-nums">
                      3
                    </div>
                    <span className="text-[10px] text-[#6F1D3A] font-semibold mt-1 block">
                      Needs review / penalty check
                    </span>
                  </div>
                </div>

                {/* Live orders table */}
                <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-[#E6D8C7] flex justify-between items-center bg-[#FFF8EE]">
                    <h3 className="font-serif text-sm font-bold text-[#30231F]">
                      Urgent & Live Orders Radar
                    </h3>
                    <span className="text-xs font-mono text-[#5E7844]">Auto-refreshing (5s)</span>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFFDF9] border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Order</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Baker</th>
                        <th className="p-3">Channel</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Prep Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6D8C7]/60">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#FFF8EE]/50">
                          <td className="p-3 font-mono font-bold text-[#4A1328]">
                            #{o.orderNumber}
                          </td>
                          <td className="p-3 font-semibold text-[#30231F]">
                            {o.customerName}
                          </td>
                          <td className="p-3">{o.bakerName}</td>
                          <td className="p-3">
                            <span className="bg-[#E6D8C7]/50 text-[#30231F] font-mono text-[10px] px-2 py-0.5 rounded">
                              {o.source}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.status === 'delivered'
                                  ? 'bg-[#7E9B5E]/20 text-[#5E7844]'
                                  : o.status === 'preparing'
                                  ? 'bg-[#F1D5CC] text-[#4A1328]'
                                  : 'bg-[#C9862B]/20 text-[#C9862B]'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{o.estimatedDeliveryTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PANE 2: ORDERS MANAGEMENT */}
            {activePane === 'orders' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#30231F]">
                      All Orders ({filteredOrders.length})
                    </h2>
                    <p className="text-xs text-[#75675F]">
                      Comprehensive audit from App, Zomato and Swiggy APIs
                    </p>
                  </div>

                  {/* Search and filters */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#75675F]" />
                      <input
                        type="text"
                        placeholder="Search order, customer, baker..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl overflow-x-auto shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8EE] border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Order</th>
                        <th className="p-3">Items & Weight</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Baker</th>
                        <th className="p-3">Delivery Partner</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6D8C7]/60">
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#FFF8EE]/50">
                          <td className="p-3 font-mono font-bold text-[#4A1328]">
                            #{o.orderNumber}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-[#30231F] block">
                              {o.items[0]?.cake.name}
                            </span>
                            <span className="text-[10px] text-[#75675F]">
                              {o.items[0]?.customization.sizeKg}kg · {o.items[0]?.customization.isEggless ? 'Eggless' : 'Regular'}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-[#30231F]">
                            ₹{o.total}
                          </td>
                          <td className="p-3">{o.bakerName}</td>
                          <td className="p-3 text-[11px] text-[#75675F]">
                            {o.deliveryPartner ? `${o.deliveryPartner.name} (${o.deliveryPartner.provider.split(' ')[0]})` : '—'}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.status === 'delivered'
                                  ? 'bg-[#7E9B5E]/20 text-[#5E7844]'
                                  : o.status === 'preparing'
                                  ? 'bg-[#F1D5CC] text-[#4A1328]'
                                  : 'bg-[#C9862B]/20 text-[#C9862B]'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PANE 3: BAKERS ONBOARDING & HEALTH */}
            {activePane === 'bakers' && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#30231F]">
                    Verified Home Bakers Directory
                  </h2>
                  <p className="text-xs text-[#75675F]">
                    Onboarding verification, FSSAI licenses, and security deposit reserve
                  </p>
                </div>

                <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl overflow-x-auto shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8EE] border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Baker & Studio</th>
                        <th className="p-3">Area</th>
                        <th className="p-3">Specialty</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Deposit Health</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6D8C7]/60">
                      {MOCK_BAKERS.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FFF8EE]/50">
                          <td className="p-3">
                            <span className="font-bold text-[#30231F] block">{b.name}</span>
                            <span className="text-[10px] text-[#75675F]">{b.studioName}</span>
                          </td>
                          <td className="p-3 font-medium text-[#4A1328]">{b.area}</td>
                          <td className="p-3 text-[11px]">{b.specialties.join(', ')}</td>
                          <td className="p-3 font-mono font-bold text-[#30231F]">
                            {b.rating} ★
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-[#E6D8C7] h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${b.depositBalance > 3000 ? 'bg-[#7E9B5E]' : 'bg-[#6F1D3A]'}`}
                                  style={{ width: `${(b.depositBalance / 5000) * 100}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-[11px] font-bold">
                                ₹{b.depositBalance}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="bg-[#7E9B5E]/20 text-[#5E7844] font-bold px-2 py-0.5 rounded-full text-[10px]">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PANE 4: DEPOSITS & PENALTIES LEDGER */}
            {activePane === 'deposits' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#30231F]">
                      Escrow Deposits & SLA Penalties
                    </h2>
                    <p className="text-xs text-[#75675F]">
                      Fully auditable security deposit debits, credits, and penalty enforcement
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddPenalty('Rekha Tambe', 950, '#BG-4819')}
                    className="px-3 py-1.5 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl hover:bg-[#4A1328] transition-colors"
                  >
                    + Enforce Sample SLA Penalty
                  </button>
                </div>

                <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl overflow-x-auto shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8EE] border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Baker</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Related Order / Reason</th>
                        <th className="p-3">Balance After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6D8C7]/60">
                      {deposits.map((d) => (
                        <tr key={d.id} className="hover:bg-[#FFF8EE]/50">
                          <td className="p-3 font-mono text-[#75675F]">{d.date}</td>
                          <td className="p-3 font-semibold text-[#30231F]">{d.bakerName}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                d.type === 'Penalty'
                                  ? 'bg-[#F1D5CC] text-[#6F1D3A]'
                                  : d.type === 'Credit'
                                  ? 'bg-[#7E9B5E]/20 text-[#5E7844]'
                                  : 'bg-[#C9862B]/20 text-[#C9862B]'
                              }`}
                            >
                              {d.type}
                            </span>
                          </td>
                          <td
                            className={`p-3 font-mono font-bold ${
                              d.amount < 0 ? 'text-[#6F1D3A]' : 'text-[#5E7844]'
                            }`}
                          >
                            {d.amount < 0 ? `−₹${Math.abs(d.amount)}` : `+₹${d.amount}`}
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-[#4A1328] font-semibold mr-1">
                              {d.relatedOrderId}
                            </span>
                            <span className="text-[11px] text-[#75675F]">{d.reason}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-[#30231F]">
                            ₹{d.balanceAfter}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PANE 5: AGGREGATOR SYNC (ZOMATO & SWIGGY) */}
            {activePane === 'aggregators' && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#30231F]">
                    Aggregator Platform Sync
                  </h2>
                  <p className="text-xs text-[#75675F]">
                    Live partner API webhooks for Zomato and Swiggy orders
                  </p>
                </div>

                <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-2xl overflow-x-auto shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8EE] border-b border-[#E6D8C7] text-[#75675F] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Platform</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Connection</th>
                        <th className="p-3">Catalogue Sync</th>
                        <th className="p-3">Orders Pulled</th>
                        <th className="p-3">Last Sync</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6D8C7]/60">
                      {aggregators.map((agg) => (
                        <tr key={agg.name} className="hover:bg-[#FFF8EE]/50">
                          <td className="p-3 font-bold text-[#30231F]">{agg.name}</td>
                          <td className="p-3 font-mono text-[11px] text-[#75675F]">{agg.service}</td>
                          <td className="p-3">
                            <span className="bg-[#7E9B5E]/20 text-[#5E7844] font-bold px-2 py-0.5 rounded-full text-[10px]">
                              ● {agg.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-[#30231F]">{agg.menuSyncStatus}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-[#4A1328]">
                            {agg.ordersPulledToday} orders
                          </td>
                          <td className="p-3 font-mono text-[11px] text-[#75675F]">{agg.lastSync}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleTriggerSync(agg.name)}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFF8EE] hover:bg-[#F4E7D5] border border-[#E6D8C7] rounded-lg transition-colors"
                            >
                              Sync Now ↻
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
