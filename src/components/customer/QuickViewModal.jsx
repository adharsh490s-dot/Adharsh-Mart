import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingCart, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function QuickViewModal() {
  const { 
    isQuickViewOpen, 
    closeQuickView, 
    quickViewProduct: product, 
    addToCart, 
    locationName,
    setIsCheckoutOpen
  } = useCart();

  const [qty, setQty] = useState(1);

  if (!isQuickViewOpen || !product) return null;

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100 transform transition-all relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image & Badges */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-xl p-4 flex items-center justify-center border border-gray-200 overflow-hidden">
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amazon-navy text-amazon-yellow text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center space-x-2">
                <Truck className="w-4 h-4 text-amazon-orange shrink-0" />
                <span className="font-semibold text-amber-950">Fast 24h Dispatch to {locationName}</span>
              </div>
              <div className="bg-green-50 border border-green-200 p-2.5 rounded-lg flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-green-700 shrink-0" />
                <span className="font-semibold text-green-950">7-Day Replacement Policy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold text-amazon-orange uppercase tracking-wider">
                  {product.category}
                </span>
                {product.adharshAssured && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-amazon-orange" />
                    <span>Adharsh Assured</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-gray-900 leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-amazon-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'fill-amazon-amber text-amazon-amber'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-amazon-link">{product.rating || 4.8} / 5.0</span>
                <span className="text-xs text-gray-400">({product.reviewCount || 340} verified ratings)</span>
              </div>

              {/* Price */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-baseline space-x-3">
                <span className="text-2xl font-black text-gray-900">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.mrp?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-black text-amazon-orange bg-orange-100 px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Specs */}
              {product.specs && (
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Key Specifications:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amazon-orange shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-gray-700">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 rounded-lg text-xs font-bold px-3 py-1.5 outline-none"
                >
                  {[...Array(Math.min(10, product.stock || 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <span className="text-xs text-gray-500 font-medium">({product.stock} units available)</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-extrabold text-xs py-3 px-4 rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-amazon-orange hover:bg-orange-600 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Buy Now Instant</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

