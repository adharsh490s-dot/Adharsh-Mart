export const INITIAL_PRODUCTS = [
  {
    id: "prod-101",
    title: "AdharshMart Pro Wireless ANC Over-Ear Headphones (Titanium Gray)",
    category: "Audio",
    price: 4999,
    mrp: 12999,
    rating: 4.8,
    reviewCount: 3420,
    stock: 24,
    salesCount: 1280,
    badge: "Best Seller",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Active Noise Cancellation (ANC) up to 42dB",
      "50mm Neodymium Hi-Res Audio Drivers",
      "60-Hour Ultra Battery Life with Fast Charge",
      "Bluetooth 5.3 & Low-Latency Gaming Mode"
    ],
    description: "Experience studio-grade acoustics with dual active noise cancellation and custom-tuned 50mm drivers. Ergonomic memory foam ear cushions ensure all-day comfort for home, office, and transit."
  },
  {
    id: "prod-102",
    title: "AdharshMart Ultra Smartphone 5G (Titanium Black, 12GB RAM, 256GB)",
    category: "Mobiles",
    price: 42999,
    mrp: 59999,
    rating: 4.9,
    reviewCount: 1890,
    stock: 12,
    salesCount: 940,
    badge: "Deal of the Day",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    specs: [
      "6.7-inch 120Hz LTPO AMOLED Display (2000 nits Peak)",
      "Snapdragon 8 Gen 3 Processor",
      "200MP Main Camera with OIS & Periscope Zoom",
      "5000mAh Battery with 100W SuperVOOC Charging"
    ],
    description: "Built with a aerospace-grade titanium frame, dynamic 120Hz LTPO display, and groundbreaking AI imaging system. Includes Adharsh Assured 1-Year Screen Replacement Warranty."
  },
  {
    id: "prod-103",
    title: "AdharshMart Neo Smartwatch (AMOLED Display, BT Calling, Black)",
    category: "Electronics",
    price: 2499,
    mrp: 6999,
    rating: 4.6,
    reviewCount: 5210,
    stock: 4, // Intentionally <= 5 for stock alert test!
    salesCount: 2150,
    badge: "Limited Time",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    specs: [
      "1.96-inch Always-On AMOLED Display",
      "Bluetooth HD Calling & Voice Assistant",
      "100+ Sports Modes & Continuous SpO2/Heart Rate Monitoring",
      "IP68 Water & Dust Resistance"
    ],
    description: "Stay connected in style with crisp AMOLED clarity, real-time biometric tracking, and durable IP68 metallic casing."
  },
  {
    id: "prod-104",
    title: "AdharshMart Sonic 60W Soundbar with Wireless Subwoofer",
    category: "Audio",
    price: 5999,
    mrp: 14999,
    rating: 4.7,
    reviewCount: 890,
    stock: 15,
    salesCount: 420,
    badge: "Adharsh Choice",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    specs: [
      "60W RMS Cinematic Bass Output",
      "Dolby Atmos Supported 2.1 Channel",
      "HDMI ARC, Optical, Aux, Bluetooth 5.0 Input",
      "Preset EQ Modes (Movies, Music, News)"
    ],
    description: "Transform your home theater experience with deep room-shaking bass and crystal clear dialogue delivery."
  },
  {
    id: "prod-105",
    title: "AdharshMart Minimalist Mechanical Gaming Keyboard (RGB Backlit)",
    category: "Electronics",
    price: 3299,
    mrp: 7999,
    rating: 4.8,
    reviewCount: 1120,
    stock: 3, // Low stock warning test!
    salesCount: 670,
    badge: "Best Seller",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Hot-Swappable Tactile Brown Switches",
      "Per-Key RGB Lighting with 18 Effects",
      "Solid Aluminum Top Plate",
      "Type-C Detachable Braided Cable"
    ],
    description: "Engineered for speed, durability, and satisfying tactile feedback. Compact 75% layout saves desk space while retaining dedicated arrow keys."
  },
  {
    id: "prod-106",
    title: "AdharshMart Urban Fit Denim Jacket (Indigo Blue, Premium Cotton)",
    category: "Fashion",
    price: 1799,
    mrp: 3999,
    rating: 4.5,
    reviewCount: 640,
    stock: 28,
    salesCount: 310,
    badge: "Limited Time",
    adharshAssured: false,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    specs: [
      "100% Heavyweight Cotton Denim",
      "Classic Button Closure & Dual Chest Pockets",
      "Pre-shrunk Wash for Vintage Aesthetic",
      "Machine Washable"
    ],
    description: "Versatile outerwear crafted from premium breathable cotton. Features reinforced stitching for lasting everyday durability."
  },
  {
    id: "prod-107",
    title: "AdharshMart Smart Espresso & Coffee Maker (Touch Panel)",
    category: "Home",
    price: 7499,
    mrp: 15999,
    rating: 4.9,
    reviewCount: 430,
    stock: 8,
    salesCount: 520,
    badge: "Adharsh Choice",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1517668808822-9eaa03afd2af?auto=format&fit=crop&w=800&q=80",
    specs: [
      "15-Bar Italian Electromagnetic Pump",
      "Integrated Milk Frother for Cappuccino & Latte",
      "Touch Control Digital Panel",
      "1.5L Removable Transparent Water Reservoir"
    ],
    description: "Brew barista-quality espressos, lattes, and cappuccinos in seconds with automatic temperature control and micro-foam steam wand."
  },
  {
    id: "prod-108",
    title: "AdharshMart Ergonomic Mesh Executive Office Chair (Lumbar Support)",
    category: "Home",
    price: 6899,
    mrp: 13999,
    rating: 4.6,
    reviewCount: 980,
    stock: 14,
    salesCount: 480,
    badge: "Best Seller",
    adharshAssured: true,
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Adjustable Dynamic Lumbar Support & Headrest",
      "High-Density Molded Foam Seat Cushion",
      "Heavy-Duty BIFMA Certified Gas Lift",
      "360-Degree Mute Nylon Casters"
    ],
    description: "Designed for 8+ hour work sessions. Breathable Korean mesh back keeps you cool while maintaining anatomical posture alignment."
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ADM-948210",
    customerName: "Rahul Sharma",
    pincode: "641001",
    city: "Coimbatore",
    items: [
      { id: "prod-101", title: "AdharshMart Pro Wireless ANC Headphones", price: 4999, qty: 1 }
    ],
    totalAmount: 4999,
    paymentMethod: "UPI",
    status: "Dispatched",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "ADM-731049",
    customerName: "Priya Nair",
    pincode: "641002",
    city: "Coimbatore",
    items: [
      { id: "prod-103", title: "AdharshMart Neo Smartwatch", price: 2499, qty: 2 }
    ],
    totalAmount: 4998,
    paymentMethod: "Credit Card",
    status: "Processing",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "inq-01",
    name: "Vikram Raj",
    email: "vikram@example.com",
    phone: "9876543210",
    message: "Interested in bulk seller partnership for electronics distribution in Tamil Nadu.",
    createdAt: new Date().toISOString()
  }
];

