import React from 'react';
import { Menu, ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';

export default function SubNavbar({ 
  selectedCategory, 
  setSelectedCategory, 
  assuredOnly, 
  setAssuredOnly 
}) {
  const categories = ["All", "Audio", "Mobiles", "Electronics", "Fashion", "Home"];

  return (
    <div className="bg-amazon-lightnavy text-white text-xs border-b border-gray-700">
      <div className="max-w-[1500px] mx-auto px-4 h-10 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        
        {/* Left Category Quick Filters */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          <button 
            onClick={() => setSelectedCategory("All")}
            className="flex items-center space-x-1 font-bold px-2.5 py-1 rounded hover:border hover:border-white/40 transition-all text-white"
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          {categories.slice(1).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amazon-yellow text-amazon-navy font-bold'
                  : 'text-gray-200 hover:border hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Filter Controls & Delivery Badge */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Adharsh Assured Only Toggle */}
          <button
            onClick={() => setAssuredOnly(!assuredOnly)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              assuredOnly
                ? 'bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy border-amazon-yellow shadow-sm'
                : 'bg-white/10 text-gray-300 border-white/20 hover:border-white/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amazon-orange" />
            <span>Adharsh Assured Only</span>
            {assuredOnly && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          {/* Express Delivery Notice */}
          <div className="hidden lg:flex items-center space-x-1 text-amazon-yellow text-[11px] font-semibold bg-black/30 px-3 py-1 rounded-md border border-white/10">
            <Zap className="w-3.5 h-3.5 fill-amazon-yellow" />
            <span>Express 24-48h Dispatch • Coimbatore Logistics</span>
          </div>

        </div>

      </div>
    </div>
  );
}

