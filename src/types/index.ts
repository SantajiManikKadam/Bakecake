export type PuneNeighborhood = 
  | 'Kothrud' 
  | 'Baner' 
  | 'Viman Nagar' 
  | 'Hadapsar' 
  | 'Koregaon Park' 
  | 'Wakad' 
  | 'Aundh';

export interface Cake {
  id: string;
  name: string;
  subtitle: string;
  bakerId: string;
  bakerName: string;
  bakerArea: PuneNeighborhood;
  bakerRating: number;
  basePrice: number; // For 0.5kg
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
  occasion: 'Birthday' | 'Anniversary' | 'Wedding' | 'Baby Shower' | 'Corporate' | 'Just Because';
  flavor: 'Belgian Chocolate' | 'Red Velvet' | 'Pistachio & Rose' | 'Alphonso Mango' | 'Salted Caramel' | 'Vanilla Bean';
  isEgglessAvailable: boolean;
  prepTimeMinutes: number;
  description: string;
  ingredients: string[];
  bestseller?: boolean;
}

export interface Baker {
  id: string;
  name: string;
  studioName: string;
  area: PuneNeighborhood;
  rating: number;
  cakesSold: number;
  yearsBaking: number;
  avatar: string;
  specialties: string[];
  bio: string;
  depositBalance: number;
  status: 'Active' | 'Busy' | 'Offline';
}

export interface CartCustomization {
  sizeKg: number;
  isEggless: boolean;
  messageOnCake: string;
  specialInstructions?: string;
  deliverySlot: string;
}

export interface CartItem {
  id: string;
  cake: Cake;
  customization: CartCustomization;
  unitPrice: number;
  quantity: number;
}

export type OrderStatus = 
  | 'placed' 
  | 'accepted' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'out_for_delivery' 
  | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    area: PuneNeighborhood;
    city: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'Cash on Delivery';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  bakerName: string;
  bakerPhone?: string;
  deliveryPartner?: {
    name: string;
    provider: string;
    phone: string;
    otp: string;
  };
  source: 'BakeGhar App' | 'Zomato' | 'Swiggy';
}

export interface DepositLedgerEntry {
  id: string;
  date: string;
  bakerName: string;
  type: 'Credit' | 'Penalty' | 'Payout' | 'Refund';
  amount: number;
  relatedOrderId?: string;
  balanceAfter: number;
  reason: string;
}

export interface AggregatorPartner {
  name: string;
  service: string;
  status: 'Connected' | 'Syncing' | 'Degraded';
  menuSyncStatus: 'Up to date' | 'Syncing' | 'Pending';
  ordersPulledToday: number;
  lastSync: string;
}
