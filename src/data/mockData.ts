import { Cake, Baker, Order, DepositLedgerEntry, AggregatorPartner, PuneNeighborhood } from '../types';

import heroCakeImg from '../assets/images/hero_artisan_berry_cake_1790937943380.jpg';
import chocoTruffleImg from '../assets/images/cake_choco_truffle_1790937956498.jpg';
import redVelvetImg from '../assets/images/cake_red_velvet_berry_1790937966855.jpg';
import pistachioRoseImg from '../assets/images/cake_pistachio_rose_1790937979132.jpg';
import aarohiPortraitImg from '../assets/images/baker_aarohi_portrait_1790937990522.jpg';

import heroMoodyCakeImg from '../assets/images/hero_chocolate_truffle_moody_1790939529116.jpg';
import catPartyCakeImg from '../assets/images/cat_party_cake_1790939545312.jpg';
import catWeddingCakeImg from '../assets/images/cat_wedding_cake_1790939558665.jpg';
import catBirthdayCakeImg from '../assets/images/cat_birthday_cake_1790939572162.jpg';

export { 
  heroCakeImg, 
  chocoTruffleImg, 
  redVelvetImg, 
  pistachioRoseImg, 
  aarohiPortraitImg,
  heroMoodyCakeImg,
  catPartyCakeImg,
  catWeddingCakeImg,
  catBirthdayCakeImg
};

export const PUNE_NEIGHBORHOODS: PuneNeighborhood[] = [
  'Kothrud',
  'Baner',
  'Viman Nagar',
  'Hadapsar',
  'Koregaon Park',
  'Wakad',
  'Aundh'
];

export const MOCK_BAKERS: Baker[] = [
  {
    id: 'baker-1',
    name: 'Aarohi Deshmukh',
    studioName: "Aarohi's Bake Studio",
    area: 'Kothrud',
    rating: 4.95,
    cakesSold: 840,
    yearsBaking: 4,
    avatar: aarohiPortraitImg,
    specialties: ['Belgian Chocolate', 'Persian Pistachio', 'Eggless Tiered Cakes'],
    bio: '“I started baking from my home kitchen in Kothrud because I wanted every celebration cake to feel deeply personal. Every sponge is made with pure French butter and Belgian couverture chocolate.”',
    depositBalance: 4800,
    status: 'Active'
  },
  {
    id: 'baker-2',
    name: 'Sunita Kulkarni',
    studioName: 'Sugar & Bloom Studio',
    area: 'Baner',
    rating: 4.88,
    cakesSold: 612,
    yearsBaking: 5,
    avatar: aarohiPortraitImg,
    specialties: ['Red Velvet Berry', 'Salted Caramel Crunch'],
    bio: '“Certified pastry artisan specializing in low-sugar, melt-in-mouth celebration cakes with fresh berry reductions.”',
    depositBalance: 4400,
    status: 'Active'
  },
  {
    id: 'baker-3',
    name: 'Meena Dani',
    studioName: 'The Confectionery Attic',
    area: 'Viman Nagar',
    rating: 4.92,
    cakesSold: 520,
    yearsBaking: 3,
    avatar: aarohiPortraitImg,
    specialties: ['Black Forest Classic', 'Alphonso Mango Cloud'],
    bio: '“Trained in Viennese pastry, bringing authentic European methods to fresh home-baked celebration cakes across Viman Nagar & KP.”',
    depositBalance: 4750,
    status: 'Active'
  },
  {
    id: 'baker-4',
    name: 'Pooja Salvi',
    studioName: 'Pooja Bakes & Treats',
    area: 'Koregaon Park',
    rating: 4.79,
    cakesSold: 410,
    yearsBaking: 2,
    avatar: aarohiPortraitImg,
    specialties: ['Madagascar Vanilla', 'Fruit Tarts & Cakes'],
    bio: '“Passionate about fresh botanical flavors, hand-piped florals, and 100% vegetarian artisan confections.”',
    depositBalance: 3500,
    status: 'Active'
  }
];

export const MOCK_CAKES: Cake[] = [
  {
    id: 'cake-1',
    name: 'Belgian Chocolate Truffle Gateau',
    subtitle: '70% Callebaut dark chocolate ganache with moist cocoa sponge',
    bakerId: 'baker-1',
    bakerName: "Aarohi's Bake Studio",
    bakerArea: 'Kothrud',
    bakerRating: 4.95,
    basePrice: 899, // 0.5kg
    rating: 4.9,
    reviewsCount: 142,
    image: chocoTruffleImg,
    tags: ['Bestseller', 'Couverture Chocolate', 'Signature'],
    occasion: 'Birthday',
    flavor: 'Belgian Chocolate',
    isEgglessAvailable: true,
    prepTimeMinutes: 75,
    description: 'Our most celebrated cake in Pune. Triple-layered moist Belgian chocolate sponge enveloped in silky 70% dark chocolate ganache, finished with artisanal chocolate shards and 24k edible gold dust.',
    ingredients: ['Belgian Couverture Chocolate', 'Dutch Process Cocoa', 'Farm Fresh Butter', 'Brown Sugar', 'Pure Madagascar Vanilla'],
    bestseller: true
  },
  {
    id: 'cake-2',
    name: 'Velvet Berry & Mascarpone Bliss',
    subtitle: 'Crimson cocoa velvet sponge with light vanilla bean mascarpone',
    bakerId: 'baker-2',
    bakerName: 'Sugar & Bloom Studio',
    bakerArea: 'Baner',
    bakerRating: 4.88,
    basePrice: 799,
    rating: 4.8,
    reviewsCount: 98,
    image: redVelvetImg,
    tags: ['Popular', 'Fresh Berries', 'Celebration'],
    occasion: 'Anniversary',
    flavor: 'Red Velvet',
    isEgglessAvailable: true,
    prepTimeMinutes: 60,
    description: 'Tender crimson cocoa layers filled with whipped Philadelphia mascarpone cream and layered with slow-cooked Mahabaleshwar strawberry compote.',
    ingredients: ['Madagascar Vanilla Bean', 'Italian Mascarpone', 'Mahabaleshwar Strawberries', 'Pure Cream Butter'],
    bestseller: true
  },
  {
    id: 'cake-3',
    name: 'Persian Pistachio & Damask Rose',
    subtitle: 'Aromatic roasted Iranian pistachios infused with fragrant rose cream',
    bakerId: 'baker-1',
    bakerName: "Aarohi's Bake Studio",
    bakerArea: 'Kothrud',
    bakerRating: 4.95,
    basePrice: 1049,
    rating: 4.95,
    reviewsCount: 86,
    image: pistachioRoseImg,
    tags: ['Artisan Reserve', 'Nut Rich', 'Festive Favorite'],
    occasion: 'Wedding',
    flavor: 'Pistachio & Rose',
    isEgglessAvailable: true,
    prepTimeMinutes: 90,
    description: 'A royal confluence of finely crushed Iranian pistachios and organic Damask rosewater buttercream, crowned with crystallised rose petals and crushed emerald pistachio praline.',
    ingredients: ['Roasted Iranian Pistachios', 'Organic Damask Rosewater', 'Almond Flour', 'Slow-churned Butter'],
    bestseller: true
  },
  {
    id: 'cake-4',
    name: 'Royal Celebration Berry Cascade',
    subtitle: 'Multi-tiered centerpiece cake with fresh dark berry compote',
    bakerId: 'baker-1',
    bakerName: "Aarohi's Bake Studio",
    bakerArea: 'Kothrud',
    bakerRating: 4.95,
    basePrice: 1299,
    rating: 5.0,
    reviewsCount: 64,
    image: heroCakeImg,
    tags: ['Luxury Tiered', 'Centerpiece', 'Custom Inscription'],
    occasion: 'Anniversary',
    flavor: 'Belgian Chocolate',
    isEgglessAvailable: true,
    prepTimeMinutes: 120,
    description: 'Our monumental signature tiered cake designed for Pune’s grandest celebrations. Layers of dark chocolate truffle and vanilla bean chiffon stacked with organic berry coulis.',
    ingredients: ['Callebaut Dark Couverture', 'Organic Wild Berries', 'Edible Gold Leaf', 'Tahitian Vanilla'],
    bestseller: false
  },
  {
    id: 'cake-5',
    name: 'Kesar Mango Alphonso Cloud',
    subtitle: 'Seasonal Ratnagiri Alphonso mango curd in delicate sponge',
    bakerId: 'baker-3',
    bakerName: 'The Confectionery Attic',
    bakerArea: 'Viman Nagar',
    bakerRating: 4.92,
    basePrice: 849,
    rating: 4.85,
    reviewsCount: 112,
    image: heroCakeImg,
    tags: ['Seasonal', 'Fresh Fruit', 'Locally Sourced'],
    occasion: 'Baby Shower',
    flavor: 'Alphonso Mango',
    isEgglessAvailable: true,
    prepTimeMinutes: 65,
    description: 'Brimming with pure hand-extracted Ratnagiri Alphonso mango pulp and velvety light mango mousse between cloud-soft vanilla sponge.',
    ingredients: ['Ratnagiri Alphonso Mango', 'White Chocolate Ganache', 'Light Sponge', 'Fresh Cream'],
    bestseller: false
  },
  {
    id: 'cake-6',
    name: 'Salted Caramel Crunch Walnut',
    subtitle: 'Slow-simmered amber caramel with toasted Kashmiri walnuts',
    bakerId: 'baker-4',
    bakerName: 'Pooja Bakes & Treats',
    bakerArea: 'Koregaon Park',
    bakerRating: 4.79,
    basePrice: 799,
    rating: 4.76,
    reviewsCount: 73,
    image: chocoTruffleImg,
    tags: ['Caramel', 'Crunchy', 'Gourmet'],
    occasion: 'Corporate',
    flavor: 'Salted Caramel',
    isEgglessAvailable: true,
    prepTimeMinutes: 55,
    description: 'A rich celebration of French fleur de sel caramel and roasted Kashmiri walnuts layered with brown butter sponge.',
    ingredients: ['Fleur de Sel Caramel', 'Kashmiri Walnuts', 'Cultured Butter', 'Cane Sugar'],
    bestseller: false
  }
];

export const INITIAL_LIVE_ORDER: Order = {
  id: 'order-bg-4821',
  orderNumber: 'BG-4821',
  customerName: 'Ananya Roy',
  customerPhone: '+91 98230 45892',
  deliveryAddress: {
    street: 'B-402, Rohan Ashima, Near Gandhi Bhavan',
    area: 'Kothrud',
    city: 'Pune',
    pincode: '411038'
  },
  items: [
    {
      id: 'item-1',
      cake: MOCK_CAKES[0],
      customization: {
        sizeKg: 1.0,
        isEggless: true,
        messageOnCake: 'Happy 28th Birthday Kabir!',
        specialInstructions: 'Please include extra wooden cake knife and birthday sparkler.',
        deliverySlot: 'Today · 6:30 PM – 7:30 PM'
      },
      unitPrice: 1150,
      quantity: 1
    }
  ],
  subtotal: 1150,
  deliveryFee: 49,
  discount: 100,
  total: 1099,
  paymentMethod: 'UPI',
  status: 'preparing',
  createdAt: '6:02 PM',
  estimatedDeliveryTime: '6:45 PM Today',
  bakerName: 'Sunita Kulkarni',
  bakerPhone: '+91 94220 18274',
  deliveryPartner: {
    name: 'Vikram Shinde',
    provider: 'Shadowfax Express (Pune Fleet)',
    phone: '+91 97640 88219',
    otp: '4471'
  },
  source: 'BakeGhar App'
};

export const MOCK_ORDERS_LIST: Order[] = [
  INITIAL_LIVE_ORDER,
  {
    id: 'order-bg-4822',
    orderNumber: 'BG-4822',
    customerName: 'Rohan Mehta',
    customerPhone: '+91 98811 23456',
    deliveryAddress: {
      street: 'Apt 12, Amar Paradigm, Baner Main Road',
      area: 'Baner',
      city: 'Pune',
      pincode: '411045'
    },
    items: [
      {
        id: 'item-2',
        cake: MOCK_CAKES[1],
        customization: {
          sizeKg: 0.5,
          isEggless: true,
          messageOnCake: 'Happy Anniversary Mom & Dad',
          deliverySlot: 'Today · 8:00 PM'
        },
        unitPrice: 650,
        quantity: 1
      }
    ],
    subtotal: 650,
    deliveryFee: 40,
    discount: 0,
    total: 690,
    paymentMethod: 'Card',
    status: 'placed',
    createdAt: '6:15 PM',
    estimatedDeliveryTime: '8:00 PM Today',
    bakerName: 'Pooja Salvi',
    source: 'Zomato'
  },
  {
    id: 'order-bg-4820',
    orderNumber: 'BG-4820',
    customerName: 'Farida Noor',
    customerPhone: '+91 97300 67890',
    deliveryAddress: {
      street: 'Villa 7, Clover Palisades, Viman Nagar',
      area: 'Viman Nagar',
      city: 'Pune',
      pincode: '411014'
    },
    items: [
      {
        id: 'item-3',
        cake: MOCK_CAKES[2],
        customization: {
          sizeKg: 1.5,
          isEggless: false,
          messageOnCake: 'Welcome Little Prince',
          deliverySlot: 'Delivered at 5:15 PM'
        },
        unitPrice: 1450,
        quantity: 1
      }
    ],
    subtotal: 1450,
    deliveryFee: 0,
    discount: 50,
    total: 1400,
    paymentMethod: 'UPI',
    status: 'delivered',
    createdAt: '3:30 PM',
    estimatedDeliveryTime: 'Delivered',
    bakerName: 'Meena Dani',
    deliveryPartner: {
      name: 'Salman Qureshi',
      provider: 'BakeGhar Dedicated Fleet',
      phone: '+91 99220 54100',
      otp: '7192'
    },
    source: 'BakeGhar App'
  },
  {
    id: 'order-bg-4819',
    orderNumber: 'BG-4819',
    customerName: 'Karan Verma',
    customerPhone: '+91 98224 11987',
    deliveryAddress: {
      street: 'Tower 4, Magarpatta City, Hadapsar',
      area: 'Hadapsar',
      city: 'Pune',
      pincode: '411028'
    },
    items: [
      {
        id: 'item-4',
        cake: MOCK_CAKES[4],
        customization: {
          sizeKg: 1.0,
          isEggless: true,
          messageOnCake: 'Team Victory Celebration',
          deliverySlot: 'Today · 7:00 PM'
        },
        unitPrice: 950,
        quantity: 1
      }
    ],
    subtotal: 950,
    deliveryFee: 50,
    discount: 0,
    total: 1000,
    paymentMethod: 'Cash on Delivery',
    status: 'preparing',
    createdAt: '5:45 PM',
    estimatedDeliveryTime: '7:15 PM Today (SLA Risk)',
    bakerName: 'Rekha Tambe',
    source: 'Swiggy'
  }
];

export const MOCK_DEPOSITS_LEDGER: DepositLedgerEntry[] = [
  {
    id: 'dep-101',
    date: '20 Jul 2026',
    bakerName: 'Pooja Salvi',
    type: 'Credit',
    amount: 1000,
    balanceAfter: 3500,
    reason: 'Monthly security reserve top-up'
  },
  {
    id: 'dep-102',
    date: '19 Jul 2026',
    bakerName: 'Rekha Tambe',
    type: 'Penalty',
    amount: -950,
    relatedOrderId: '#BG-4790',
    balanceAfter: 1100,
    reason: 'Prep SLA breach (>45 min late dispatch)'
  },
  {
    id: 'dep-103',
    date: '19 Jul 2026',
    bakerName: 'Meena Dani',
    type: 'Payout',
    amount: 3200,
    relatedOrderId: '#BG-4780',
    balanceAfter: 4750,
    reason: 'Batch weekly fulfillment disbursement'
  },
  {
    id: 'dep-104',
    date: '18 Jul 2026',
    bakerName: 'Sunita Kulkarni',
    type: 'Credit',
    amount: 5000,
    balanceAfter: 5000,
    reason: 'Initial artisan onboarding security escrow'
  }
];

export const MOCK_AGGREGATORS: AggregatorPartner[] = [
  {
    name: 'Zomato Merchant Partner',
    service: 'Zomato Live Food Engine',
    status: 'Connected',
    menuSyncStatus: 'Up to date',
    ordersPulledToday: 41,
    lastSync: '2 minutes ago'
  },
  {
    name: 'Swiggy Minis & Gourmet',
    service: 'Swiggy Partner Orders API v2',
    status: 'Connected',
    menuSyncStatus: 'Syncing',
    ordersPulledToday: 27,
    lastSync: '6 minutes ago'
  }
];
