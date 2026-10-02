import React from 'react';
import { CheckCircle2, Clock, Phone, MapPin, ChefHat, Bike, ShieldCheck, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface LiveOrderTrackerProps {
  order: Order;
  onSimulateNextStatus?: () => void;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  order,
  onSimulateNextStatus
}) => {
  const steps: { key: OrderStatus; title: string; subtitle: string }[] = [
    {
      key: 'placed',
      title: 'Order Confirmed',
      subtitle: `${order.createdAt} · Paid via ${order.paymentMethod} (Razorpay)`
    },
    {
      key: 'accepted',
      title: 'Baker Accepted Commitment',
      subtitle: `Assigned to ${order.bakerName} · Kitchen prepped`
    },
    {
      key: 'preparing',
      title: 'Fresh Baking & Artisanal Decoration',
      subtitle: 'Committed in oven · Fresh cream piping'
    },
    {
      key: 'ready',
      title: 'Packaged in Cold Suspension Box',
      subtitle: 'Sealed with tamper-evident BakeGhar badge'
    },
    {
      key: 'out_for_delivery',
      title: 'Out for Doorstep Delivery',
      subtitle: `Rider ${order.deliveryPartner?.name || 'Vikram'} dispatched`
    },
    {
      key: 'delivered',
      title: 'Delivered Freshly to Doorstep',
      subtitle: 'Handoff complete · Enjoy celebration!'
    }
  ];

  const statusOrder: OrderStatus[] = [
    'placed',
    'accepted',
    'preparing',
    'ready',
    'picked_up',
    'out_for_delivery',
    'delivered'
  ];

  const currentIdx = statusOrder.indexOf(order.status);

  return (
    <div className="bg-[#FFFDF9] border border-[#E6D8C7] rounded-3xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E6D8C7] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7E9B5E] animate-ping"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#6F1D3A] font-bold">
              Live Order Radar
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#30231F] mt-1">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs text-[#75675F] font-mono mt-0.5">
            {order.items[0]?.cake.name} ({order.items[0]?.customization.sizeKg}kg)
          </p>
        </div>

        <div className="text-left sm:text-right bg-[#FFF8EE] px-4 py-2.5 rounded-xl border border-[#E6D8C7]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#75675F] block">
            Estimated Arrival
          </span>
          <span className="font-mono text-sm font-bold text-[#4A1328]">
            {order.estimatedDeliveryTime}
          </span>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="py-8">
        <div className="relative pl-6 space-y-7 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6D8C7]">
          {steps.map((st, i) => {
            const isDone = i <= currentIdx;
            const isCurrent = i === currentIdx;

            return (
              <div key={st.key} className="relative flex items-start gap-4 group">
                {/* Marker Dot */}
                <span
                  className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                    isDone
                      ? 'bg-[#7E9B5E] border-[#5E7844] text-white'
                      : isCurrent
                      ? 'bg-[#C9862B] border-[#C9862B] text-white shadow-lg ring-4 ring-[#C9862B]/20 animate-pulse'
                      : 'bg-[#FFFDF9] border-[#E6D8C7] text-[#75675F]'
                  }`}
                >
                  {isDone ? '✓' : i + 1}
                </span>

                {/* Text Content */}
                <div className="flex-1">
                  <h4
                    className={`text-sm font-semibold leading-tight ${
                      isDone || isCurrent ? 'text-[#30231F]' : 'text-[#75675F]/70'
                    }`}
                  >
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#75675F] mt-0.5 font-sans">
                    {st.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Baker & Delivery Partner Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E6D8C7]">
        {/* Baker Card */}
        <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6F1D3A] text-white flex items-center justify-center font-serif font-bold text-lg shrink-0">
            {order.bakerName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h5 className="text-xs font-bold text-[#30231F] truncate">{order.bakerName}</h5>
              <ShieldCheck className="w-3.5 h-3.5 text-[#5E7844] shrink-0" />
            </div>
            <p className="text-[11px] text-[#75675F]">Home Baker · Kothrud</p>
            <p className="text-[10px] text-[#5E7844] font-mono mt-0.5 font-semibold">Kitchen Prepped & Sanitized</p>
          </div>
        </div>

        {/* Delivery Partner Card */}
        <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#E6D8C7] flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#30231F] text-white flex items-center justify-center shrink-0">
            <Bike className="w-5 h-5 text-[#F1D5CC]" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-xs font-bold text-[#30231F] truncate">
              {order.deliveryPartner?.name || 'Vikram Shinde'}
            </h5>
            <p className="text-[11px] text-[#75675F]">
              {order.deliveryPartner?.provider || 'Shadowfax Express'}
            </p>
            <p className="text-[10px] text-[#6F1D3A] font-mono mt-0.5 font-bold">
              Pickup OTP: {order.deliveryPartner?.otp || '4471'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulator button */}
      {onSimulateNextStatus && (
        <div className="mt-6 pt-4 border-t border-[#E6D8C7] flex items-center justify-between">
          <span className="text-xs text-[#75675F]">Test order lifecycle:</span>
          <button
            onClick={onSimulateNextStatus}
            className="text-xs font-mono font-semibold text-[#6F1D3A] hover:bg-[#F1D5CC]/40 px-3 py-1.5 rounded-lg border border-[#E6D8C7] transition-colors"
          >
            Advance Status ↻
          </button>
        </div>
      )}
    </div>
  );
};
