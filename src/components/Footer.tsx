import React from 'react';
import { Heart, MapPin, ShieldCheck, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { PUNE_NEIGHBORHOODS } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#30231F] text-[#FFF8EE] pt-16 pb-12 border-t border-[#4A1328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#FFF8EE]">
              BakeGhar
            </span>
            <p className="text-xs uppercase tracking-widest text-[#F1D5CC] font-mono font-semibold">
              Freshly baked. Locally loved.
            </p>
            <p className="text-xs text-[#FFF8EE]/70 max-w-sm leading-relaxed font-sans">
              Pune’s curated artisan marketplace connecting home celebration hosts with vetted local home bakers. Never frozen, crafted to order with pure butter and single-origin cocoa.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#F1D5CC]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#7E9B5E]" />
                <span>FSSAI Compliant Kitchens</span>
              </div>
              <span>·</span>
              <span>Pune Pilot 2026</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F1D5CC] font-bold">
              Explore Cakes
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF8EE]/80">
              <li><a href="#cakes" className="hover:text-white transition-colors">Belgian Truffle Gateaux</a></li>
              <li><a href="#cakes" className="hover:text-white transition-colors">Eggless Celebrations</a></li>
              <li><a href="#cakes" className="hover:text-white transition-colors">Tiered Wedding Showpieces</a></li>
              <li><a href="#cakes" className="hover:text-white transition-colors">Persian Pistachio & Rose</a></li>
              <li><a href="#cakes" className="hover:text-white transition-colors">Seasonal Mango Clouds</a></li>
            </ul>
          </div>

          {/* Column 3: For Bakers */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F1D5CC] font-bold">
              For Home Bakers
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF8EE]/80">
              <li><a href="#bakers" className="hover:text-white transition-colors">Join as a Baker</a></li>
              <li><a href="#bakers" className="hover:text-white transition-colors">Kitchen Quality Standards</a></li>
              <li><a href="#bakers" className="hover:text-white transition-colors">BakeGhar Escrow & Payouts</a></li>
              <li><a href="#bakers" className="hover:text-white transition-colors">Packaging Supplies Hub</a></li>
              <li><a href="#bakers" className="hover:text-white transition-colors">Baker Dashboard</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Pune Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F1D5CC] font-bold">
              Pune Artisan Hub
            </h4>
            <div className="space-y-2 text-xs text-[#FFF8EE]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9862B] shrink-0 mt-0.5" />
                <span>BakeGhar Central, Prabhat Road, Lane 4, Erandwane, Pune 411004</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7E9B5E] shrink-0" />
                <span>+91 20 2567 8900</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F1D5CC] shrink-0" />
                <span>concierge@bakeghar.in</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pune Delivery Neighborhoods Ribbon */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FFF8EE]/70">
          <span className="font-mono text-[#F1D5CC] font-bold uppercase tracking-wider text-[11px]">
            Delivery Neighborhoods:
          </span>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs">
            {PUNE_NEIGHBORHOODS.map((area) => (
              <span key={area} className="hover:text-white transition-colors">
                {area} ·
              </span>
            ))}
            <span className="text-[#7E9B5E] font-medium">+ Expanding across PCMC</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8EE]/60 font-sans">
          <p>© 2026 BakeGhar Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#fssai" className="hover:text-white transition-colors">FSSAI Lic. #11526038000412</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
