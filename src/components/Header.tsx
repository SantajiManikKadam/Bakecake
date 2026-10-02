import React, { useState } from 'react';
import { ShoppingBag, Heart, MapPin, ChevronDown, User, Sparkles, Menu, X } from 'lucide-react';
import { PuneNeighborhood } from '../types';
import { PUNE_NEIGHBORHOODS } from '../data/mockData';

interface HeaderProps {
  currentView: 'customer' | 'baker' | 'admin';
  onViewChange: (view: 'customer' | 'baker' | 'admin') => void;
  selectedArea: PuneNeighborhood;
  onSelectArea: (area: PuneNeighborhood) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  customerName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  selectedArea,
  onSelectArea,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  isLoggedIn,
  customerName
}) => {
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E6D8C7] transition-all">
      {/* Top Banner / Mode Switcher bar */}
      <div className="bg-[#4A1328] text-[#FFF8EE] text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#7E9B5E] animate-pulse"></span>
          <span>Pune Pilot · Verified Home Bakers in Kothrud, Baner & Viman Nagar</span>
        </div>
        
        {/* Role Switcher tabs (Customer / Baker / Admin) */}
        <div className="flex items-center gap-1 bg-[#30231F] p-0.5 rounded-md text-[11px]">
          <button
            onClick={() => onViewChange('customer')}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              currentView === 'customer'
                ? 'bg-[#6F1D3A] text-white font-semibold'
                : 'text-[#F1D5CC] hover:text-white'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => onViewChange('baker')}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              currentView === 'baker'
                ? 'bg-[#6F1D3A] text-white font-semibold'
                : 'text-[#F1D5CC] hover:text-white'
            }`}
          >
            Baker App
          </button>
          <button
            onClick={() => onViewChange('admin')}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              currentView === 'admin'
                ? 'bg-[#6F1D3A] text-white font-semibold'
                : 'text-[#F1D5CC] hover:text-white'
            }`}
          >
            Super Admin
          </button>
        </div>
      </div>

      {/* Main Top Bar matching strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('customer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4A1328] hover:text-[#6F1D3A] transition-colors"
          >
            BakeGhar
          </a>

          {/* Pune Neighborhood quick picker */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-[#75675F] hover:text-[#30231F] py-1.5 px-3 rounded-md bg-[#FFF8EE] border border-[#E6D8C7] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#6F1D3A]" />
              <span className="font-medium text-[#30231F]">{selectedArea}, Pune</span>
              <ChevronDown className="w-3 h-3 text-[#75675F]" />
            </button>

            {isAreaDropdownOpen && (
              <div className="absolute left-0 mt-1 w-44 bg-[#FFFDF9] border border-[#E6D8C7] rounded-lg shadow-xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-[#75675F] uppercase border-b border-[#E6D8C7]">
                  Delivery Neighborhood
                </div>
                {PUNE_NEIGHBORHOODS.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      onSelectArea(area);
                      setIsAreaDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      selectedArea === area
                        ? 'bg-[#F1D5CC] text-[#4A1328] font-semibold'
                        : 'text-[#30231F] hover:bg-[#FFF8EE]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#75675F]">
          <a
            href="#cakes"
            className="hover:text-[#4A1328] transition-colors"
          >
            Explore Cakes
          </a>
          <a
            href="#occasions"
            className="hover:text-[#4A1328] transition-colors"
          >
            Occasions
          </a>
          <a
            href="#bakers"
            className="hover:text-[#4A1328] transition-colors"
          >
            Meet the Bakers
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#4A1328] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#refer"
            className="hover:text-[#4A1328] transition-colors flex items-center gap-1 text-[#6F1D3A]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Refer & Earn</span>
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#75675F] hover:text-[#4A1328] hover:bg-[#FFF8EE] rounded-lg transition-colors"
            title="Your Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6F1D3A] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 bg-[#6F1D3A] hover:bg-[#4A1328] text-white rounded-lg transition-colors shadow-sm"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold hidden sm:inline">Bag</span>
            <span className="bg-white/20 text-white text-xs font-mono font-bold px-1.5 py-0.5 rounded">
              {cartCount}
            </span>
          </button>

          {/* Account / Login */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#30231F] hover:text-[#4A1328] py-2 px-3 rounded-lg border border-[#E6D8C7] hover:border-[#6F1D3A] transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#6F1D3A]" />
            <span className="hidden sm:inline">
              {isLoggedIn ? customerName || 'Ananya' : 'Sign In'}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden text-[#75675F] hover:text-[#30231F]"
            aria-label="Open mobile navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6D8C7] bg-[#FFFDF9] px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6D8C7]">
            <span className="text-xs font-semibold text-[#75675F]">Delivery Hub:</span>
            <select
              value={selectedArea}
              onChange={(e) => onSelectArea(e.target.value as PuneNeighborhood)}
              className="text-xs font-semibold bg-[#FFF8EE] border border-[#E6D8C7] rounded px-2 py-1 text-[#30231F]"
            >
              {PUNE_NEIGHBORHOODS.map((area) => (
                <option key={area} value={area}>
                  {area}, Pune
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2.5 text-sm font-medium text-[#30231F]">
            <a
              href="#cakes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#6F1D3A]"
            >
              Explore Cakes
            </a>
            <a
              href="#occasions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#6F1D3A]"
            >
              Occasions
            </a>
            <a
              href="#bakers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#6F1D3A]"
            >
              Meet the Bakers
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#6F1D3A]"
            >
              How It Works
            </a>
            <a
              href="#refer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#6F1D3A] font-semibold"
            >
              Refer & Earn (₹100 Off)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
