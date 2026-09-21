import React, { useState } from 'react';
import ThreeCanvas from './ThreeCanvas';
import AuthModal from './AuthModal';
import ContactModal from './ContactModal';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Sparkles, 
  Headphones, 
  Smartphone, 
  ChevronDown,
  ArrowRight,
  MessageSquare,
  UserCheck
} from 'lucide-react';

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openAuth = (tabName = 'login') => {
    setAuthTab(tabName);
    setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-amazon-navy text-white overflow-x-hidden selection:bg-amazon-yellow selection:text-amazon-navy">
      
      {/* 3D WebGL Three.js Canvas Stage */}
      <ThreeCanvas />

      {/* ------------------------------------------------------------- */}
      {/* FROSTED GLASS NAVBAR */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-amazon-navy/80 backdrop-blur-lg border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amazon-yellow to-amazon-orange flex items-center justify-center text-amazon-navy shadow-lg shadow-amazon-yellow/20">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black tracking-tight text-white">AdharshMart</span>
                <span className="bg-amazon-yellow text-amazon-navy text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm">.in</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Coimbatore Hub</p>
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amazon-yellow" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => openAuth('login')}
              className="text-sm font-bold text-white hover:text-amazon-yellow px-4 py-2 rounded-lg transition-colors border border-white/20 hover:border-amazon-yellow"
            >
              Sign In
            </button>

            <button
              onClick={() => openAuth('register')}
              className="bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-extrabold text-sm px-5 py-2.5 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-semibold text-amazon-yellow shadow-inner">
            <Sparkles className="w-4 h-4 text-amazon-yellow animate-pulse" />
            <span>Interactive 3D E-Commerce Platform for India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white">
            Shop Smarter in <br />
            <span className="bg-gradient-to-r from-amazon-yellow via-amber-300 to-amazon-orange bg-clip-text text-transparent">
              Full 3D Dimension
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Experience next-generation e-commerce with real-time Three.js product inspection, Firebase Cloud synchronization, and instant Coimbatore fast delivery routing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openAuth('login')}
              className="w-full sm:w-auto bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-extrabold text-base px-8 py-4 rounded-xl shadow-xl shadow-amazon-yellow/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3"
            >
              <span>Explore Shopping Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-base px-8 py-4 rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-5 h-5 text-amazon-yellow" />
              <span>Support & Partner Inquiry</span>
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-16 flex justify-center animate-bounce">
            <a href="#features" className="text-gray-400 hover:text-amazon-yellow transition-colors flex flex-col items-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-widest">Scroll to Inspect 3D Tech</span>
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE SECTION 1: PRECISION ACOUSTICS & TECH */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amazon-yellow/20 border border-amazon-yellow/30 flex items-center justify-center text-amazon-yellow">
              <Headphones className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Precision Acoustics & Tech <br />
              <span className="text-amazon-yellow">Rendered in Real-Time 3D</span>
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              Every gadget in AdharshMart is procedurally modeled to perfection. Inspect headband flexibility, ear cushion density, and titanium bezel finishes before placing an order.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Active Noise Cancellation (ANC) up to 42dB Studio Precision",
                "Aerospace-Grade Titanium Smartphone Chassis",
                "Hi-Res Spatial Audio Drivers with Custom EQ Tuning"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-amazon-yellow"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amazon-yellow uppercase tracking-wider">3D Model Spotlight</span>
              <span className="text-xs text-gray-400">FPS: 60 | WebGL 2.0</span>
            </div>
            <div className="h-48 border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-black/20">
              <Smartphone className="w-12 h-12 text-amazon-yellow mb-2 animate-pulse" />
              <p className="text-sm font-bold text-white">Interactive 3D Stage Active</p>
              <p className="text-xs text-gray-400">Scroll up or down to rotate camera angle & perspective</p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE SECTION 2: VALUE GUARANTEES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-amazon-lightnavy/60 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-white">The Adharsh Trust Guarantee</h2>
            <p className="text-gray-300 text-sm">
              Engineered to meet Amazon's rigorous fulfillment standards across Coimbatore and all Indian postal pin codes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amazon-yellow/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amazon-yellow/20 flex items-center justify-center text-amazon-yellow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Adharsh Assured™ 100% Genuine</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Multi-point serial number verification and authentic brand authorization guarantees 100% original products.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amazon-yellow/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amazon-yellow/20 flex items-center justify-center text-amazon-yellow">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">24-48hr Fast Dispatch</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Direct fulfillment out of Coimbatore distribution hubs (Pincode 641001) with express tracking updates.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amazon-yellow/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amazon-yellow/20 flex items-center justify-center text-amazon-yellow">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Firebase Realtime Sync</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Cloud Firestore `onSnapshot` ensures inventory counts and order updates sync across buyer and admin ERP instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="bg-amazon-navy text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amazon-yellow flex items-center justify-center text-amazon-navy font-black text-sm">
              AM
            </div>
            <div>
              <p className="text-white font-bold text-sm">AdharshMart India</p>
              <p className="text-xs text-gray-500">Coimbatore • Tamil Nadu 641001</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs font-semibold">
            <button onClick={() => setIsContactOpen(true)} className="hover:text-amazon-yellow transition-colors">
              Support Center
            </button>
            <button onClick={() => openAuth('login')} className="hover:text-amazon-yellow transition-colors">
              Customer Sign In
            </button>
            <button onClick={() => openAuth('login')} className="hover:text-amazon-yellow transition-colors">
              Admin ERP Dashboard
            </button>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AdharshMart.in. Powered by live Firebase Authentication & Firestore.
          </p>

        </div>
      </footer>

      {/* Auth & Contact Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialTab={authTab}
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </div>
  );
}
