import React, { useState, useEffect } from 'react';
import { X, Save, ShieldCheck, Image, DollarSign, Tag, Check, Package } from 'lucide-react';
import { saveProduct } from '../../firebase/config';

export default function ProductFormModal({ isOpen, onClose, initialProduct = null }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Electronics',
    price: 999,
    mrp: 1999,
    stock: 20,
    salesCount: 0,
    badge: 'Deal of the Day',
    adharshAssured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    specs: 'Active Noise Cancellation\nBluetooth 5.3\n60-Hour Battery',
    description: 'High-performance audio gear engineered for acoustic clarity.'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        specs: Array.isArray(initialProduct.specs) ? initialProduct.specs.join('\n') : (initialProduct.specs || '')
      });
    } else {
      setFormData({
        id: `prod-${Date.now()}`,
        title: '',
        category: 'Electronics',
        price: 2999,
        mrp: 5999,
        stock: 25,
        salesCount: 0,
        badge: 'Deal of the Day',
        adharshAssured: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        specs: '1-Year Warranty\nPremium Metal Body',
        description: 'Quality product guaranteed under Adharsh Assured standard.'
      });
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specsArray = typeof formData.specs === 'string'
        ? formData.specs.split('\n').filter(s => s.trim().length > 0)
        : formData.specs;

      const payload = {
        ...formData,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        stock: Number(formData.stock),
        salesCount: Number(formData.salesCount || 0),
        specs: specsArray
      };

      await saveProduct(payload);
      onClose();
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("Error saving product to inventory.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Audio", "Mobiles", "Electronics", "Fashion", "Home"];
  const badges = ["Deal of the Day", "Best Seller", "Limited Time", "Adharsh Choice"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 transform transition-all relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-amazon-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-amazon-yellow" />
            <h3 className="font-bold text-base">
              {initialProduct ? "Edit Product Specs & Inventory" : "Create New Catalog Product"}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Product Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AdharshMart Pro Wireless Headphones"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 outline-none"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Promotional Badge Tag
              </label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 outline-none"
              >
                {badges.map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Selling Price (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Stock Inventory
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Image URL (Unsplash or CDN)
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 outline-none"
            />
          </div>

          {/* Adharsh Assured Checkbox */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="assuredCheck"
              checked={formData.adharshAssured}
              onChange={(e) => setFormData({ ...formData, adharshAssured: e.target.checked })}
              className="w-4 h-4 text-amazon-orange rounded accent-amazon-orange cursor-pointer"
            />
            <label htmlFor="assuredCheck" className="text-xs font-bold text-gray-800 cursor-pointer flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-amazon-orange" />
              <span>Adharsh Assured Verification Seal</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Key Specifications (One per line)
            </label>
            <textarea
              rows={3}
              placeholder="Active Noise Cancellation&#10;50mm Drivers&#10;60-Hour Battery"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Detailed Description
            </label>
            <textarea
              rows={2}
              placeholder="Product summary..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-black text-sm py-3 px-6 rounded-xl shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-amazon-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{initialProduct ? "Save Changes to Firestore" : "Publish to Catalog"}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

