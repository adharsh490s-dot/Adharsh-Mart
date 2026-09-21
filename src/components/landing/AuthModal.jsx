import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' or 'admin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { 
    loginWithEmail, 
    registerWithEmail, 
    loginWithGoogle 
  } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name, role);
      }
      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error("Google Auth error:", err);
      setError("Google Sign-In failed or was cancelled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
        
        {/* Header Tabs */}
        <div className="bg-amazon-navy text-white px-6 pt-5 pb-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-extrabold text-white tracking-tight">AdharshMart</span>
            <span className="bg-amazon-yellow text-amazon-navy text-[10px] font-black px-1.5 py-0.5 rounded">.in</span>
          </div>

          <div className="flex border-b border-gray-700">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                tab === 'login'
                  ? 'border-amazon-yellow text-amazon-yellow'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                tab === 'register'
                  ? 'border-amazon-yellow text-amazon-yellow'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-amazon-yellow outline-none"
                />
              </div>
            </div>

            {/* Role selection for registration */}
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Account Type (Firebase Role Claim)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                      role === 'customer'
                        ? 'bg-amber-100 border-amazon-orange text-amazon-navy'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amazon-orange" />
                    <span>Customer Shopper</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                      role === 'admin'
                        ? 'bg-amazon-navy text-white border-amazon-navy'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amazon-yellow" />
                    <span>Admin ERP Manager</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-black py-3 px-6 rounded-lg shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-amazon-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tab === 'login' ? 'Sign In to AdharshMart' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Google Sign In Button */}
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-xs">Continue with Google</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
