import React from 'react';
import { TrendingUp, Trophy, AlertTriangle, Zap, ShoppingBag } from 'lucide-react';

export default function SalesChart({ products = [], orders = [] }) {
  
  // Calculate Dynamic 7-Day Revenue Trajectory from Live Orders
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const last7Days = [];

  // Initialize array for past 7 days ending today
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayName = daysOfWeek[d.getDay()];
    const dateStr = d.toISOString().split('T')[0];
    last7Days.push({ day: dayName, dateStr, revenue: 0 });
  }

  // Aggregate revenue from real orders
  orders.forEach(order => {
    if (order.createdAt) {
      const orderDateStr = new Date(order.createdAt).toISOString().split('T')[0];
      const found = last7Days.find(d => d.dateStr === orderDateStr);
      if (found) {
        found.revenue += (order.totalAmount || 0);
      }
    }
  });

  const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 1000);

  // Determine #1 Top Selling Product dynamically from live salesCount
  const topProduct = products.length > 0
    ? [...products].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))[0]
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Sales Trajectory Graph (Takes 2 Columns) */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-amazon-orange" />
              <span>Weekly Gross Sales Trajectory</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium">Dynamically computed from live Firestore customer orders</p>
          </div>
          <div className="bg-green-100 text-green-800 text-xs font-black px-2.5 py-1 rounded-full flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 fill-green-800" />
            <span>Live Sync</span>
          </div>
        </div>

        {/* Visual CSS-Bar Chart */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2">
          {last7Days.map((item, idx) => {
            const heightPercent = Math.max(10, Math.round((item.revenue / maxRevenue) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                
                {/* Hover Tooltip */}
                <div className="absolute -top-8 bg-amazon-navy text-white text-[10px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10 pointer-events-none">
                  ₹{item.revenue.toLocaleString('en-IN')}
                </div>

                {/* Bar */}
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-amazon-navy to-amazon-lightnavy group-hover:from-amazon-yellow group-hover:to-amazon-orange rounded-t-lg transition-all duration-300 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />

                <span className="text-xs font-bold text-gray-600 mt-2">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* #1 Top Performer Spotlight Card (Takes 1 Column) */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amazon-orange text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
        
        {/* Background Decorative Trophy */}
        <Trophy className="w-36 h-36 text-white/10 absolute -right-6 -bottom-6 pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
              <Trophy className="w-3 h-3 text-amazon-yellow fill-amazon-yellow" />
              <span>#1 Top Selling Product</span>
            </span>
            <span className="text-[10px] font-extrabold text-amber-100">Live Ranking</span>
          </div>

          {topProduct ? (
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-3">
                <img 
                  src={topProduct.image} 
                  alt={topProduct.title}
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1.5 shadow-md border border-white/30 shrink-0" 
                />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm text-white line-clamp-2 leading-snug">
                    {topProduct.title}
                  </h4>
                  <p className="text-xs font-bold text-amber-100">
                    ₹{topProduct.price?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/20 text-xs">
                <div>
                  <span className="text-[10px] text-amber-100 font-semibold block uppercase">Units Sold</span>
                  <span className="text-base font-black text-white">{topProduct.salesCount || 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-100 font-semibold block uppercase">Revenue Generated</span>
                  <span className="text-base font-black text-white">
                    ₹{((topProduct.salesCount || 0) * topProduct.price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Stock Depletion Alert */}
              {topProduct.stock <= 5 && (
                <div className="bg-red-900/80 backdrop-blur-md text-red-100 border border-red-400 p-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Stock Depletion Alert: Only {topProduct.stock} units left!</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-amber-100 font-medium py-8 text-center">
              No sales data recorded yet.
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
