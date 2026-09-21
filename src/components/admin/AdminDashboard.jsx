import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  LogOut, 
  Eye, 
  Users, 
  Plus, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subscribeProducts, subscribeOrders } from '../../firebase/config';
import SalesChart from './SalesChart';
import InventoryTable from './InventoryTable';
import OrdersTable from './OrdersTable';
import ProductFormModal from './ProductFormModal';

export default function AdminDashboard() {
  const { user, logout, toggleViewMode } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Subscribe live to Firestore `/products` and `/orders`
  useEffect(() => {
    const unsubProducts = subscribeProducts((data) => {
      setProducts(data);
    });

    const unsubOrders = subscribeOrders((data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => {
      if (typeof unsubProducts === 'function') unsubProducts();
      if (typeof unsubOrders === 'function') unsubOrders();
    };
  }, []);

  // Compute Live KPI Metric Cards from Firestore Data
  const totalGrossRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const totalUnitsDispatched = orders.reduce((acc, o) => {
    const orderItemsCount = o.items ? o.items.reduce((s, i) => s + (i.qty || 1), 0) : 0;
    return acc + orderItemsCount;
  }, 0);
  const totalActiveStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-amazon-bg text-gray-900 pb-16">
      
      {/* Admin Top Header */}
      <header className="bg-amazon-navy text-white border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amazon-yellow to-amazon-orange flex items-center justify-center text-amazon-navy shadow-md">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-white">AdharshMart ERP</span>
                <span className="bg-amazon-yellow text-amazon-navy text-[10px] font-black px-1.5 py-0.5 rounded">
                  Admin Control
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">Coimbatore Live Orders & Inventory HQ</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            
            {/* Seamless View Switcher Button */}
            <button
              onClick={toggleViewMode}
              className="bg-white/10 hover:bg-white/20 text-amazon-yellow border border-amazon-yellow/40 font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1.5"
            >
              <Eye className="w-4 h-4 text-amazon-yellow" />
              <span>Open Customer Shopping View</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Gross Revenue */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Gross Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amazon-orange flex items-center justify-center font-black">
                ₹
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              ₹{totalGrossRevenue.toLocaleString('en-IN')}
            </h3>
            <p className="text-[11px] text-green-700 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Calculated from {orders.length} orders</span>
            </p>
          </div>

          {/* Card 2: Units Sold */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Units Purchased</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-amazon-blue flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              {totalUnitsDispatched} Units
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">Real-time order fulfillment</p>
          </div>

          {/* Card 3: Active Stock */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Warehouse Stock</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              {totalActiveStock} Units
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">Across {products.length} SKUs</p>
          </div>

          {/* Card 4: Admin Account Status */}
          <div className="bg-gradient-to-tr from-amazon-navy to-amazon-lightnavy text-white rounded-2xl p-5 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amazon-yellow uppercase tracking-wider">Admin Status</span>
              <ShieldCheck className="w-5 h-5 text-amazon-yellow" />
            </div>
            <h3 className="text-sm font-extrabold text-white truncate">
              {user?.displayName || "Authenticated Admin"}
            </h3>
            <p className="text-[10px] text-gray-300 truncate">
              {user?.email || "admin@adharshmart.in"}
            </p>
          </div>

        </div>

        {/* Live Customer Orders Feed */}
        <OrdersTable orders={orders} />

        {/* Sales Trajectory Graph & #1 Top Performer Card */}
        <SalesChart products={products} orders={orders} />

        {/* Live Inventory CRUD Table */}
        <InventoryTable
          products={products}
          onEditProduct={handleOpenEditModal}
          onAddNewProduct={handleOpenAddModal}
        />

      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialProduct={editingProduct}
      />

    </div>
  );
}
