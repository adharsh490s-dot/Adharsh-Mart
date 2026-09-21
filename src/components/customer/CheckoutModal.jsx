import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, QrCode, Banknote, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../firebase/config';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart, 
    subtotal, 
    pincode, 
    locationName 
  } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '100 D.B. Road, R.S. Puram',
    city: 'Coimbatore',
    pincode: pincode || '641001',
    paymentMethod: 'UPI'
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const totalAmount = subtotal + (subtotal >= 499 ? 0 : 40);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customerName: formData.name,
        email: user?.email || 'guest@adharshmart.in',
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items: cart,
        totalAmount
      };

      const trackingId = await placeOrder(orderData);
      setCompletedOrder({ id: trackingId, ...orderData });
      clearCart();
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 transform transition-all relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-amazon-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amazon-yellow" />
            <h3 className="font-bold text-base text-white">AdharshMart Express Checkout</h3>
          </div>
          <button onClick={closeCheckout} className="text-gray-400 hover:text-white p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {completedOrder ? (
            /* Order Confirmation Screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Order Placed Successfully!</h3>
              
              <div className="inline-block bg-amber-50 border border-amber-300 rounded-xl p-4 text-left space-y-2 max-w-md w-full">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-600 uppercase">Tracking ID:</span>
                  <span className="font-black text-amazon-orange text-sm bg-white px-2 py-0.5 rounded border border-amber-200">
                    {completedOrder.id}
                  </span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Delivery Location:</span>
                  <span className="font-bold text-gray-900">{completedOrder.city} ({completedOrder.pincode})</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Payment Mode:</span>
                  <span className="font-bold text-gray-900">{completedOrder.paymentMethod}</span>
                </div>

                <div className="flex justify-between text-xs font-black pt-2 border-t border-amber-200">
                  <span>Total Amount Paid:</span>
                  <span className="text-sm text-amazon-navy">₹{completedOrder.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Inventory stock has been automatically decremented in Firestore. Estimated dispatch within 24-48 hours.
              </p>

              <div>
                <button
                  onClick={closeCheckout}
                  className="bg-amazon-navy hover:bg-amazon-lightnavy text-white font-bold text-xs py-3 px-8 rounded-xl shadow-md transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Order Placement Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Shipping Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-amazon-orange" />
                  <span>Shipping Address & Delivery Route</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Receiver name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Door no, Street name, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      placeholder="641001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-amazon-orange" />
                  <span>Select Payment Option</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / GPay', icon: QrCode },
                    { id: 'Card', label: 'Credit/Debit', icon: CreditCard },
                    { id: 'COD', label: 'Cash on Delivery', icon: Banknote }
                  ].map((pm) => {
                    const IconComponent = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                          formData.paymentMethod === pm.id
                            ? 'bg-amber-50 border-amazon-orange text-amazon-navy font-bold shadow-sm'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 text-amazon-orange" />
                        <span className="text-[11px]">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Shipping & Fulfillment:</span>
                  <span className="font-bold text-green-700">
                    {subtotal >= 499 ? "FREE" : "₹40"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span className="text-lg text-amazon-orange">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-black text-sm py-3.5 px-6 rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-amazon-navy border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Place Order & Decrement Inventory</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

