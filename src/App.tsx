import React, { useState } from 'react';
import { 
  Cake, CartItem, Order, PuneNeighborhood 
} from './types';
import { 
  MOCK_CAKES, MOCK_BAKERS, INITIAL_LIVE_ORDER, 
  PUNE_NEIGHBORHOODS 
} from './data/mockData';

// Core Components
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OccasionTiles } from './components/OccasionTiles';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { BakerStorySection } from './components/BakerStorySection';
import { HowItWorks } from './components/HowItWorks';
import { ReferRewardsSection } from './components/ReferRewardsSection';
import { Footer } from './components/Footer';
import { WishlistModal } from './components/WishlistModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';

// Role Views
import { BakerAppView } from './components/baker/BakerAppView';
import { SuperAdminView } from './components/admin/SuperAdminView';

// Icons
import { Search, SlidersHorizontal, Sparkles, X, Check, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation / Role View: 'customer' | 'baker' | 'admin'
  const [currentView, setCurrentView] = useState<'customer' | 'baker' | 'admin'>('customer');

  // Customer State
  const [selectedArea, setSelectedArea] = useState<PuneNeighborhood>('Kothrud');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All');
  const [isEgglessOnly, setIsEgglessOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceAsc' | 'priceDesc'>('recommended');

  // Interactive Drawers & Modals
  const [selectedCakeForDetail, setSelectedCakeForDetail] = useState<Cake | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      cake: MOCK_CAKES[0],
      customization: {
        sizeKg: 1.0,
        isEggless: true,
        messageOnCake: 'Happy Birthday Kabir!',
        deliverySlot: 'Today · 6:30 PM – 7:30 PM'
      },
      unitPrice: 1618,
      quantity: 1
    }
  ]);

  const [wishlist, setWishlist] = useState<Cake[]>([MOCK_CAKES[1], MOCK_CAKES[2]]);

  // Live Order State for Customer Tracking
  const [liveOrder, setLiveOrder] = useState<Order>(INITIAL_LIVE_ORDER);
  const [activeTabSection, setActiveTabSection] = useState<'cakes' | 'tracker'>('cakes');

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [customerName, setCustomerName] = useState('Ananya Roy');

  // Checkout discount state
  const [checkoutDiscount, setCheckoutDiscount] = useState(100);
  const [appliedCouponCode, setAppliedCouponCode] = useState('ANANYA100');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (cake: Cake) => {
    const exists = wishlist.some((item) => item.id === cake.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== cake.id));
      showToast(`Removed "${cake.name}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, cake]);
      showToast(`Added "${cake.name}" to your wishlist! ❤️`, 'success');
    }
  };

  // Add to Cart
  const handleAddToCart = (itemData: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: `cart-${Date.now()}`
    };
    setCartItems((prev) => [newItem, ...prev]);
    setSelectedCakeForDetail(null);
    setIsCartOpen(true);
    showToast(`Added "${newItem.cake.name}" to your cart! 🎂`, 'success');
  };

  // Buy Now (direct checkout)
  const handleBuyNow = (itemData: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: `cart-${Date.now()}`
    };
    setCartItems((prev) => [newItem, ...prev]);
    setSelectedCakeForDetail(null);
    setCheckoutDiscount(100);
    setAppliedCouponCode('ANANYA100');
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart.', 'info');
  };

  const handleProceedToCheckout = (discountAmount: number, code: string) => {
    setCheckoutDiscount(discountAmount);
    setAppliedCouponCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: Order) => {
    setLiveOrder(order);
    setCartItems([]);
    showToast(`Order #${order.orderNumber} successfully placed! We notified the baker.`, 'success');
  };

  // Simulate Order lifecycle progression
  const handleAdvanceOrderStatus = () => {
    const statusProgression: Order['status'][] = [
      'placed',
      'accepted',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = statusProgression.indexOf(liveOrder.status);
    const nextStatus = statusProgression[(currentIndex + 1) % statusProgression.length];
    setLiveOrder({
      ...liveOrder,
      status: nextStatus
    });
    showToast(`Order status updated to: ${nextStatus.toUpperCase()}`, 'info');
  };

  // Filtered & Sorted Cakes
  const filteredCakes = MOCK_CAKES.filter((cake) => {
    const matchesOccasion = selectedOccasion === 'All' || cake.occasion === selectedOccasion;
    const matchesFlavor = selectedFlavor === 'All' || cake.flavor === selectedFlavor;
    const matchesEggless = !isEgglessOnly || cake.isEgglessAvailable;
    const matchesSearch =
      searchQuery === '' ||
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.bakerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOccasion && matchesFlavor && matchesEggless && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.basePrice - b.basePrice;
    if (sortBy === 'priceDesc') return b.basePrice - a.basePrice;
    return b.bestseller ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#30231F] flex flex-col font-sans selection:bg-[#F1D5CC] selection:text-[#4A1328]">
      {/* Universal Top Navigation Header */}
      <Header
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedArea={selectedArea}
        onSelectArea={(area) => {
          setSelectedArea(area);
          showToast(`Delivery neighborhood updated to ${area}, Pune.`);
        }}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        customerName={customerName}
      />

      {/* Main Content Area Based on Current App Role */}
      <main className="flex-1">
        {/* ========================================================
            VIEW 1: LUXURY CUSTOMER STOREFRONT
            ======================================================== */}
        {currentView === 'customer' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <HeroSection
              onExploreCakes={() => {
                const el = document.getElementById('cakes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onFindBaker={() => {
                const el = document.getElementById('bakers');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectCategory={(cat) => {
                setSelectedOccasion(cat);
                const el = document.getElementById('cakes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Shop by Occasion Section */}
            <OccasionTiles
              selectedOccasion={selectedOccasion}
              onSelectOccasion={(occ) => {
                setSelectedOccasion(occ);
                const el = document.getElementById('cakes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Cake Discovery & Catalogue Section */}
            <section id="cakes" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header with Subtitle and Section Selector (Catalogue vs Live Order Radar) */}
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E6D8C7] gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6F1D3A] font-semibold">
                    Fresh from Pune Ovens
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#30231F] mt-1">
                    Made popular this week
                  </h2>
                  <p className="text-sm text-[#75675F] mt-1">
                    Beautiful handcrafted cakes our {selectedArea} customers are loving right now.
                  </p>
                </div>

                {/* Sub-view toggle (Browse Catalogue vs Track Active Order) */}
                <div className="flex items-center gap-2 bg-[#FFF8EE] p-1 rounded-xl border border-[#E6D8C7] text-xs font-semibold self-start md:self-auto">
                  <button
                    onClick={() => setActiveTabSection('cakes')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTabSection === 'cakes'
                        ? 'bg-[#6F1D3A] text-white shadow-sm'
                        : 'text-[#75675F] hover:text-[#30231F]'
                    }`}
                  >
                    Browse Cakes ({filteredCakes.length})
                  </button>
                  <button
                    onClick={() => setActiveTabSection('tracker')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTabSection === 'tracker'
                        ? 'bg-[#6F1D3A] text-white shadow-sm'
                        : 'text-[#75675F] hover:text-[#30231F]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#7E9B5E] animate-pulse"></span>
                    <span>Live Order #{liveOrder.orderNumber}</span>
                  </button>
                </div>
              </div>

              {/* Show Live Order Radar when active */}
              {activeTabSection === 'tracker' && (
                <div className="py-10">
                  <LiveOrderTracker
                    order={liveOrder}
                    onSimulateNextStatus={handleAdvanceOrderStatus}
                  />
                </div>
              )}

              {/* Catalogue Filtering & Products Grid */}
              {activeTabSection === 'cakes' && (
                <div className="pt-8">
                  {/* Clean Search & Filter Toolbar */}
                  <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-8">
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-[#75675F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search cakes, flavors, bakers in Pune..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] focus:bg-white focus:outline-none focus:border-[#6F1D3A] transition-colors"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75675F] hover:text-[#30231F]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Filter Controls (Flavor, Eggless, Sort) */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                      {/* Flavor Filter */}
                      <select
                        value={selectedFlavor}
                        onChange={(e) => setSelectedFlavor(e.target.value)}
                        className="py-2.5 px-3 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] text-[#30231F] focus:outline-none font-medium text-xs"
                      >
                        <option value="All">All Flavors</option>
                        <option value="Belgian Chocolate">Belgian Chocolate</option>
                        <option value="Red Velvet">Red Velvet</option>
                        <option value="Pistachio & Rose">Pistachio & Rose</option>
                        <option value="Alphonso Mango">Alphonso Mango</option>
                        <option value="Salted Caramel">Salted Caramel</option>
                      </select>

                      {/* Eggless Only Toggle Button */}
                      <button
                        onClick={() => setIsEgglessOnly(!isEgglessOnly)}
                        className={`py-2.5 px-3.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-colors ${
                          isEgglessOnly
                            ? 'bg-[#7E9B5E]/20 border-[#5E7844] text-[#5E7844]'
                            : 'bg-[#FFF8EE] border-[#E6D8C7] text-[#75675F] hover:text-[#30231F]'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${isEgglessOnly ? 'bg-[#5E7844]' : 'bg-[#E6D8C7]'}`}></span>
                        <span>100% Eggless Only</span>
                      </button>

                      {/* Sort Selector */}
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="py-2.5 px-3 rounded-xl border border-[#E6D8C7] bg-[#FFF8EE] text-[#30231F] focus:outline-none font-medium text-xs"
                      >
                        <option value="recommended">Sort: Popular & Recommended</option>
                        <option value="rating">Sort: Highest Rated</option>
                        <option value="priceAsc">Sort: Price Low → High</option>
                        <option value="priceDesc">Sort: Price High → Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Active filters pill-less unboxed display */}
                  {(selectedOccasion !== 'All' || selectedFlavor !== 'All' || isEgglessOnly || searchQuery) && (
                    <div className="flex items-center gap-2 text-xs text-[#75675F] mb-6">
                      <span className="font-semibold text-[#30231F]">Active filters:</span>
                      {selectedOccasion !== 'All' && <span>Occasion: {selectedOccasion} ·</span>}
                      {selectedFlavor !== 'All' && <span>Flavor: {selectedFlavor} ·</span>}
                      {isEgglessOnly && <span>Diet: Eggless ·</span>}
                      {searchQuery && <span>Keyword: "{searchQuery}" ·</span>}
                      <button
                        onClick={() => {
                          setSelectedOccasion('All');
                          setSelectedFlavor('All');
                          setIsEgglessOnly(false);
                          setSearchQuery('');
                        }}
                        className="text-[#6F1D3A] font-semibold hover:underline ml-2"
                      >
                        Clear all
                      </button>
                    </div>
                  )}

                  {/* Product Cards Grid */}
                  {filteredCakes.length === 0 ? (
                    <div className="text-center py-16 bg-[#FFF8EE] rounded-3xl border border-[#E6D8C7] p-8 space-y-3">
                      <p className="font-serif text-xl font-bold text-[#30231F]">
                        No cakes matched your exact combination.
                      </p>
                      <p className="text-xs text-[#75675F] max-w-sm mx-auto">
                        Try resetting filters or searching for our signature Belgian Chocolate Truffle Gateau.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedOccasion('All');
                          setSelectedFlavor('All');
                          setIsEgglessOnly(false);
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 bg-[#6F1D3A] text-white text-xs font-semibold rounded-xl"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredCakes.map((cake) => (
                        <ProductCard
                          key={cake.id}
                          cake={cake}
                          isWishlisted={wishlist.some((w) => w.id === cake.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onSelectCake={(c) => setSelectedCakeForDetail(c)}
                          onQuickAdd={(c) => {
                            setSelectedCakeForDetail(c);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Baker Story Section */}
            <BakerStorySection
              onSelectBaker={() => {
                setSelectedCakeForDetail(MOCK_CAKES[0]);
              }}
            />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Refer & Rewards Section */}
            <ReferRewardsSection onShowToast={showToast} />
          </div>
        )}

        {/* ========================================================
            VIEW 2: HOME BAKER APPLICATION
            ======================================================== */}
        {currentView === 'baker' && (
          <BakerAppView onShowToast={showToast} />
        )}

        {/* ========================================================
            VIEW 3: SUPER ADMIN SAAS PANEL
            ======================================================== */}
        {currentView === 'admin' && (
          <SuperAdminView onShowToast={showToast} />
        )}
      </main>

      {/* Universal Luxury Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        cake={selectedCakeForDetail}
        isOpen={!!selectedCakeForDetail}
        onClose={() => setSelectedCakeForDetail(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedCakeForDetail ? wishlist.some((w) => w.id === selectedCakeForDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onExploreCakes={() => {
          const el = document.getElementById('cakes');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={checkoutDiscount}
        couponCode={appliedCouponCode}
        defaultArea={selectedArea}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectCake={(cake) => setSelectedCakeForDetail(cake)}
      />

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(name, phone) => {
          setIsLoggedIn(true);
          setCustomerName(name);
        }}
        onShowToast={showToast}
      />


      {/* Premium Toast System */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
