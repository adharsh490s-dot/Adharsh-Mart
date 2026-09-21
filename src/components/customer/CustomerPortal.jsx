import React, { useState, useEffect } from 'react';
import CustomerNavbar from './CustomerNavbar';
import SubNavbar from './SubNavbar';
import HeroBanner from './HeroBanner';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import { subscribeProducts } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import { MapPin, X, Sparkles, Filter, Check, ShoppingBag } from 'lucide-react';

export default function CustomerPortal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [assuredOnly, setAssuredOnly] = useState(false);

  const { 
    isPincodeModalOpen, 
    setIsPincodeModalOpen, 
    pincode, 
    updateDeliveryPincode 
  } = useCart();

  const [tempPincode, setTempPincode] = useState(pincode);

  // Live Firestore product subscription
  useEffect(() => {
    const unsubscribe = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Filter products by category, search query, and Adharsh Assured
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = 
      selectedCategory === "All Departments" || 
      selectedCategory === "All" || 
      prod.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = 
      !searchQuery || 
      prod.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAssured = !assuredOnly || prod.adharshAssured === true;

    return matchesCategory && matchesSearch && matchesAssured;
  });

  const presetPincodes = [
    { code: "641001", name: "Coimbatore Central (RS Puram)" },
    { code: "641002", name: "Coimbatore North (Gandhipuram)" },
    { code: "641004", name: "Coimbatore East (Peelamedu)" },
    { code: "600001", name: "Chennai High Court / Fort" },
    { code: "560001", name: "Bengaluru MG Road Hub" }
  ];

  const handleSavePincode = (e) => {
    e.preventDefault();
    if (tempPincode.trim()) {
      updateDeliveryPincode(tempPincode);
      setIsPincodeModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-amazon-bg text-gray-900 pb-16">
      
      {/* Multi-Tier Amazon Header */}
      <CustomerNavbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Sub-Header Navigation */}
      <SubNavbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        assuredOnly={assuredOnly}
        setAssuredOnly={setAssuredOnly}
      />

      {/* Hero Banner Carousel */}
      <HeroBanner onSelectCategory={(cat) => setSelectedCategory(cat)} />

      {/* Main Catalog Grid */}
      <main className="max-w-[1500px] mx-auto px-4 py-8">
        
        {/* Section Title & Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-gray-300 gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center space-x-2">
              <span>{selectedCategory === "All Departments" ? "Flagship Tech & Fashion Catalog" : selectedCategory}</span>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} Items
              </span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Live Firestore synchronized stock with express Coimbatore logistics dispatch
            </p>
          </div>

          {(searchQuery || assuredOnly || selectedCategory !== "All Departments") && (
            <button
              onClick={() => {
                setSelectedCategory("All Departments");
                setSearchQuery("");
                setAssuredOnly(false);
              }}
              className="text-xs text-amazon-link hover:underline font-bold"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-shimmer border border-gray-200" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Catalog State */
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto my-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amazon-orange rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Products Found</h3>
            <p className="text-xs text-gray-500">
              No matching products found for "{searchQuery || selectedCategory}". Try adjusting your search query or filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Departments");
                setSearchQuery("");
                setAssuredOnly(false);
              }}
              className="bg-amazon-yellow text-amazon-navy font-bold text-xs py-2.5 px-5 rounded-lg shadow-sm hover:brightness-105"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>

      {/* Quick View & Cart Modals */}
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Pincode Selection Modal */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="bg-amazon-navy text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amazon-yellow" />
                <h3 className="font-bold text-base">Choose Delivery Location</h3>
              </div>
              <button onClick={() => setIsPincodeModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600">
                Delivery options and dispatch speeds depend on your postal pincode. Defaulting to Coimbatore 641001 hub.
              </p>

              <form onSubmit={handleSavePincode} className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit Indian Pincode"
                    value={tempPincode}
                    onChange={(e) => setTempPincode(e.target.value)}
                    className="flex-1 p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-amazon-yellow"
                  />
                  <button
                    type="submit"
                    className="bg-amazon-yellow text-amazon-navy font-bold text-xs px-4 py-2.5 rounded-lg hover:brightness-105"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Select Quick Regional Hub:
                </p>
                <div className="space-y-1.5">
                  {presetPincodes.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        updateDeliveryPincode(item.code, item.name);
                        setIsPincodeModalOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                        pincode === item.code
                          ? 'bg-amber-50 border-amazon-orange text-amazon-navy'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{item.name} ({item.code})</span>
                      {pincode === item.code && <Check className="w-4 h-4 text-amazon-orange" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

