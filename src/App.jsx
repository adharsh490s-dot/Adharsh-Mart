import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LandingPage from './components/landing/LandingPage';
import CustomerPortal from './components/customer/CustomerPortal';
import AdminDashboard from './components/admin/AdminDashboard';

function MainAppContent() {
  const { user, loading, viewMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-amazon-navy flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-amazon-yellow border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold tracking-wider uppercase text-amazon-yellow">Initializing AdharshMart.in...</p>
      </div>
    );
  }

  // Pre-Authentication: Render 3D Scroll-Driven Landing Page
  if (!user) {
    return <LandingPage />;
  }

  // Post-Authentication: Role-Based & View Toggle Routing
  if (viewMode === 'admin' && user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <CustomerPortal />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </AuthProvider>
  );
}

