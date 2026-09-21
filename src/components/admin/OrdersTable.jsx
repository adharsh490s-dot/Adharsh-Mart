import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Clock, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Banknote,
  Search,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import { updateOrderStatus } from '../../firebase/config';

export default function OrdersTable({ orders = [] }) {
  const [search, setSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const filteredOrders = orders.filter(ord => 
    ord.id?.toLowerCase().includes(search.toLowerCase()) ||
    ord.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    ord.email?.toLowerCase().includes(search.toLowerCase()) ||
    ord.pincode?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Error updating order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4">
      
      {/* Header */}
      <div className="p-6 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-black text-lg text-gray-900">Live Customer Purchases & Orders</h3>
            <span className="bg-amazon-orange text-white text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse">
              {orders.length} Live Orders
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Real-time order feed synced from Firestore `/orders`</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Tracking ID, Name, Pincode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-amazon-yellow"
          />
        </div>
      </div>

      {/* Orders List Container */}
      <div className="px-6 pb-6 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-gray-500 space-y-2 border border-dashed border-gray-200 rounded-xl bg-gray-50">
            <ShoppingBag className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-sm font-bold text-gray-700">No Customer Orders Yet</p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              When customers place orders on AdharshMart, live order details (who is purchasing and what they purchased) will appear here instantly.
            </p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isExpanded = expandedOrderId === ord.id;
            const isUpdating = updatingId === ord.id;

            return (
              <div 
                key={ord.id} 
                className="border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:border-amber-300 transition-all bg-white"
              >
                {/* Main Order Card Header */}
                <div className="p-4 bg-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amazon-navy text-amazon-yellow font-black text-xs flex items-center justify-center shrink-0">
                      ADM
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-sm text-amazon-navy">{ord.id}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                          ord.status === 'Delivered'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : ord.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        }`}>
                          {ord.status || 'Processing'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium flex items-center space-x-2 mt-0.5">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{new Date(ord.createdAt || Date.now()).toLocaleString('en-IN')}</span>
                      </p>
                    </div>
                  </div>

                  {/* Customer Brief */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Purchased By</span>
                      <span className="font-bold text-gray-900">{ord.customerName}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Delivery Location</span>
                      <span className="font-bold text-gray-900">{ord.city} ({ord.pincode})</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Total Paid</span>
                      <span className="font-black text-sm text-amazon-orange">₹{ord.totalAmount?.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="flex items-center space-x-1.5 pt-1 md:pt-0">
                      {ord.status !== 'Dispatched' && ord.status !== 'Delivered' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'Dispatched')}
                          disabled={isUpdating}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center space-x-1"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Dispatch Order</span>
                        </button>
                      )}

                      {ord.status !== 'Delivered' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'Delivered')}
                          disabled={isUpdating}
                          className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Delivered</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleExpand(ord.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs p-1.5 rounded-lg transition-colors"
                        title="Toggle Items & Details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs animate-fadeIn">
                    
                    {/* Column 1: Customer Contact & Shipping Address */}
                    <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <h4 className="font-black text-gray-800 uppercase tracking-wider text-[11px] flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-amazon-orange" />
                        <span>Customer Contact & Address</span>
                      </h4>
                      <div className="space-y-1 text-gray-700 font-medium">
                        <p className="flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-900">{ord.customerName}</span>
                        </p>
                        {ord.email && (
                          <p className="flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span>{ord.email}</span>
                          </p>
                        )}
                        {ord.phone && (
                          <p className="flex items-center space-x-1.5">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{ord.phone}</span>
                          </p>
                        )}
                        <p className="flex items-start space-x-1.5 pt-1 border-t border-gray-200">
                          <MapPin className="w-3.5 h-3.5 text-amazon-orange shrink-0 mt-0.5" />
                          <span>{ord.address}, {ord.city} - {ord.pincode}</span>
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Items Purchased */}
                    <div className="md:col-span-2 space-y-2">
                      <h4 className="font-black text-gray-800 uppercase tracking-wider text-[11px] flex items-center space-x-1">
                        <Package className="w-3.5 h-3.5 text-amazon-orange" />
                        <span>Items Purchased ({ord.items?.length || 0})</span>
                      </h4>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {ord.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-10 h-10 object-contain bg-white rounded p-1 border border-gray-200 shrink-0"
                                />
                              )}
                              <div>
                                <h5 className="font-bold text-gray-900 line-clamp-1 max-w-sm">{item.title}</h5>
                                <span className="text-[10px] text-gray-500 font-medium">Qty: {item.qty} × ₹{item.price?.toLocaleString('en-IN')}</span>
                              </div>
                            </div>

                            <span className="font-black text-gray-900">
                              ₹{((item.qty || 1) * (item.price || 0)).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

