import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingProgress,
    amountNeededForFreeShipping,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-amazon-navy text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amazon-yellow" />
              <h2 className="text-lg font-bold">Your AdharshMart Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Bar (Threshold: ₹499) */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-amazon-orange" />
                <span>
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} for FREE Express Delivery!`
                    : "🎉 You qualify for FREE Express Shipping to Coimbatore!"}
                </span>
              </div>
              <span>{freeShippingProgress}%</span>
            </div>

            <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amazon-yellow to-amazon-orange h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-gray-800">Your cart is currently empty</p>
                <p className="text-xs text-gray-500">Explore our 3D catalog and add flagship gadgets.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2 border border-gray-200 shrink-0"
                  />

                  <div className="flex-1 space-y-1.5">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-sm font-black text-gray-900">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="p-1 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-3 text-xs font-bold text-gray-800">{item.qty}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="p-1 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-green-700">
                    {subtotal >= 499 ? "FREE" : "₹40"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-lg text-amazon-orange">
                    ₹{(subtotal + (subtotal >= 499 ? 0 : 40)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

