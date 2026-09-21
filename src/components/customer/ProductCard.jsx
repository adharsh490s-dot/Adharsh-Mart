import React from 'react';
import { Star, ShieldCheck, Eye, ShoppingCart, AlertTriangle, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, openQuickView } = useCart();

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
        
        {/* Promotional Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-amazon-navy text-amazon-yellow text-[10px] font-black px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        {/* Adharsh Assured Badge */}
        {product.adharshAssured && (
          <span className="absolute top-2 right-2 z-10 bg-gradient-to-r from-amber-500 to-amazon-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 fill-white text-amazon-orange" />
            <span>Assured</span>
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Quick View Trigger */}
        <button
          onClick={() => openQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-amazon-navy text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all flex items-center space-x-1 backdrop-blur-sm"
        >
          <Eye className="w-3.5 h-3.5 text-amazon-blue" />
          <span>Quick View</span>
        </button>

      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {product.category}
          </span>

          <h3 className="font-bold text-sm text-gray-900 line-clamp-2 hover:text-amazon-link cursor-pointer leading-snug">
            {product.title}
          </h3>

          {/* Ratings */}
          <div className="flex items-center space-x-1 text-xs">
            <div className="flex items-center text-amazon-amber">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 4.5)
                      ? 'fill-amazon-amber text-amazon-amber'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-amazon-link">{product.rating || 4.5}</span>
            <span className="text-gray-400">({product.reviewCount || 120})</span>
          </div>
        </div>

        {/* Pricing & Stock Warning */}
        <div className="space-y-1 pt-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs font-medium text-gray-500">₹</span>
            <span className="text-xl font-black text-gray-900">
              {product.price?.toLocaleString('en-IN')}
            </span>

            {product.mrp > product.price && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.mrp?.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-extrabold text-amazon-orange">
                  ({discountPercent}% off)
                </span>
              </>
            )}
          </div>

          {/* Low Stock Alert */}
          {isLowStock ? (
            <p className="text-[11px] font-bold text-red-600 flex items-center space-x-1 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>Only {product.stock} left in stock - order soon!</span>
            </p>
          ) : product.stock > 0 ? (
            <p className="text-[11px] text-green-700 font-semibold flex items-center space-x-1">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>In Stock (Ready to Dispatch)</span>
            </p>
          ) : (
            <p className="text-[11px] font-bold text-gray-500">Currently Out of Stock</p>
          )}
        </div>

        {/* Add to Cart CTA */}
        <div className="pt-2">
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="w-full bg-gradient-to-r from-amazon-yellow to-amazon-amber hover:brightness-105 active:scale-95 text-amazon-navy font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
}

