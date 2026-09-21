import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  ShoppingCart, 
  User, 
  LogOut, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function CustomerNavbar({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}) {
  const { user, logout, toggleViewMode, setUserRole } = useAuth();
  const { 
    totalItemsCount, 
    setIsCartOpen, 
    locationName, 
    setIsPincodeModalOpen 
  } = useCart();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const categories = ["All Departments", "Audio", "Mobiles", "Electronics", "Fashion", "Home"];

  return (
    <header className="sticky top-0 z-40 bg-amazon-navy text-white shadow-md">
      
      {/* Top Navbar Row */}
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 h-16 flex items-center gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-1 cursor-pointer pr-1 hover:border hover:border-white/30 rounded p-1 transition-all">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amazon-yellow to-amazon-orange flex items-center justify-center text-amazon-navy shadow-md">
            <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-extrabold tracking-tight text-white leading-none">AdharshMart</span>
              <span className="bg-amazon-yellow text-amazon-navy text-[9px] font-black px-1 py-0.5 rounded ml-0.5">.in</span>
            </div>
            <span className="text-[9px] text-amazon-yellow font-semibold leading-none mt-0.5">Coimbatore Fulfillment</span>
          </div>
        </div>

        {/* Pincode Delivery Picker */}
        <button
          onClick={() => setIsPincodeModalOpen(true)}
          className="hidden md:flex items-center space-x-1 hover:border hover:border-white/30 rounded p-1.5 text-left transition-all group"
        >
          <MapPin className="w-4 h-4 text-amazon-yellow group-hover:animate-bounce shrink-0" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-[10px] text-gray-300">Deliver to</span>
            <span className="font-bold text-white truncate max-w-[130px]">{locationName}</span>
          </div>
        </button>

        {/* Amazon-Style Search Bar */}
        <div className="flex-1 flex items-center max-w-3xl">
          <div className="w-full flex rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amazon-yellow">
            
            {/* Category Select */}
            <div className="relative bg-gray-100 border-r border-gray-300 text-gray-700 text-xs font-medium">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 px-2 pr-6 bg-transparent appearance-none cursor-pointer outline-none font-medium text-xs text-gray-800"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-3.5 pointer-events-none" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search AdharshMart.in (Headphones, Titanium 5G, Smartwatches...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-3 bg-white text-gray-900 text-sm outline-none placeholder-gray-500"
            />

            {/* Search Submit Button */}
            <button className="h-10 px-4 bg-amazon-yellow hover:bg-amazon-amber text-amazon-navy flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-1 sm:space-x-3 ml-auto">
          
          {/* Admin Mode Switcher Button (For Admin Users) */}
          {user?.role === 'admin' && (
            <button
              onClick={toggleViewMode}
              className="hidden lg:flex items-center space-x-1.5 bg-amazon-yellow text-amazon-navy font-black text-xs px-3 py-1.5 rounded-md hover:brightness-110 shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin ERP Dashboard</span>
            </button>
          )}

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-1 hover:border hover:border-white/30 rounded p-1.5 text-left transition-all"
            >
              <User className="w-5 h-5 text-gray-200" />
              <div className="hidden sm:flex flex-col text-xs leading-tight">
                <span className="text-[10px] text-gray-300">Hello, {user?.displayName || 'Sign in'}</span>
                <span className="font-bold text-white flex items-center">
                  <span>Account & Lists</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl py-2 text-gray-800 z-50 border border-gray-100 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900 truncate">{user?.displayName || 'Guest Customer'}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user?.email || 'Not signed in'}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    user?.role === 'admin' ? 'bg-amazon-navy text-amazon-yellow' : 'bg-amber-100 text-amber-900'
                  }`}>
                    Role: {user?.role || 'customer'}
                  </span>
                </div>

                {user?.role === 'admin' ? (
                  <button
                    onClick={() => { toggleViewMode(); setIsUserMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-amazon-navy hover:bg-amber-50 flex items-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amazon-orange" />
                    <span>Open Admin ERP Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { setUserRole('admin'); setIsUserMenuOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-amazon-navy hover:bg-amber-50 flex items-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amazon-orange" />
                    <span>Switch Role to Admin ERP</span>
                  </button>
                )}

                <button
                  onClick={() => { logout(); setIsUserMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Animated Cart Drawer Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-1 hover:border hover:border-white/30 rounded p-1.5 transition-all relative group"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white group-hover:text-amazon-yellow transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-amazon-orange text-white font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-amazon-navy shadow-md animate-pulse">
                {totalItemsCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-xs text-white pt-2">Cart</span>
          </button>

        </div>

      </div>

    </header>
  );
}
