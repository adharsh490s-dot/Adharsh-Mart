import React, { useState } from 'react';
import { Edit2, Trash2, ShieldCheck, AlertTriangle, Check, Plus, Search } from 'lucide-react';
import { removeProduct } from '../../firebase/config';

export default function InventoryTable({ products = [], onEditProduct, onAddNewProduct }) {
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filtered = products.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await removeProduct(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error deleting product.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4">
      
      {/* Table Header Actions */}
      <div className="p-6 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-lg text-gray-900">ERP Inventory Control</h3>
          <p className="text-xs text-gray-500 font-medium">Real-time stock level synchronization across warehouses</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by SKU, title, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-amazon-yellow"
            />
          </div>

          <button
            onClick={onAddNewProduct}
            className="bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-black text-xs py-2.5 px-4 rounded-lg shadow-sm hover:brightness-105 transition-all flex items-center space-x-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200 text-[11px] font-black text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6">Product Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price / MRP</th>
              <th className="py-3 px-4">Stock Health</th>
              <th className="py-3 px-4">Units Sold</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                  No inventory products matching search filter.
                </td>
              </tr>
            ) : (
              filtered.map((prod) => {
                const isLow = prod.stock <= 5;
                return (
                  <tr key={prod.id} className="hover:bg-amber-50/40 transition-colors">
                    
                    {/* Item Thumbnail & Title */}
                    <td className="py-3 px-6 flex items-center space-x-3">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1 border border-gray-200 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                          SKU: {prod.id}
                        </span>
                        <h4 className="font-bold text-gray-900 line-clamp-1 max-w-xs">
                          {prod.title}
                        </h4>
                        {prod.adharshAssured && (
                          <span className="inline-flex items-center text-[9px] font-black text-amazon-orange bg-amber-100 px-1.5 py-0.2 rounded">
                            Adharsh Assured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-bold text-gray-700">
                      {prod.category}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-gray-900">
                      ₹{prod.price?.toLocaleString('en-IN')}
                      {prod.mrp > prod.price && (
                        <span className="block text-[10px] text-gray-400 line-through font-normal">
                          ₹{prod.mrp?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Stock Health */}
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="inline-flex items-center space-x-1 bg-red-100 text-red-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-red-200 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          <span>Alert: {prod.stock} left</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-green-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Healthy ({prod.stock})</span>
                        </span>
                      )}
                    </td>

                    {/* Units Sold */}
                    <td className="py-3 px-4 font-black text-gray-800">
                      {prod.salesCount || 0} units
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEditProduct(prod)}
                          className="p-1.5 text-gray-600 hover:text-amazon-navy hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-gray-900">Confirm Inventory Deletion</h4>
            <p className="text-xs text-gray-600">
              Are you sure you want to permanently delete SKU <span className="font-mono font-bold text-gray-900">{deleteConfirmId}</span> from Firestore?
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="bg-gray-100 text-gray-700 font-bold text-xs py-2.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-md"
              >
                Delete SKU
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

