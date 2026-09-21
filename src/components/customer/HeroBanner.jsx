import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function HeroBanner({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Adharsh Great Indian Shopping Festival",
      subtitle: "Up to 60% OFF on Flagship 5G Smartphones & Studio ANC Audio",
      badge: "Festive Exclusive",
      bgGradient: "from-blue-900 via-slate-900 to-amazon-navy",
      category: "Mobiles",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Adharsh Assured Precision Acoustics",
      subtitle: "Experience 42dB Active Noise Cancellation with High-Res Audio Drivers",
      badge: "Adharsh Choice",
      bgGradient: "from-amber-950 via-slate-900 to-amazon-navy",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Next-Gen Smart Home & Gaming Gear",
      subtitle: "Elevate your work & gaming setup with RGB Mechanical Keyboards & Ergonomics",
      badge: "Top Trending",
      bgGradient: "from-emerald-950 via-slate-900 to-amazon-navy",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative bg-amazon-navy overflow-hidden">
      
      {/* Banner Container */}
      <div className={`relative h-[300px] sm:h-[380px] bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 ease-in-out`}>
        
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={slide.image} 
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />

        {/* Slide Content */}
        <div className="relative z-20 max-w-[1500px] mx-auto h-full px-6 sm:px-12 flex flex-col justify-center space-y-4">
          
          <div className="inline-flex items-center space-x-2 bg-amazon-yellow text-amazon-navy font-black text-xs px-3 py-1 rounded-full w-fit shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-amazon-navy" />
            <span>{slide.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white max-w-2xl leading-tight">
            {slide.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-200 max-w-xl font-medium">
            {slide.subtitle}
          </p>

          <div>
            <button
              onClick={() => onSelectCategory(slide.category)}
              className="bg-gradient-to-r from-amazon-yellow to-amazon-amber text-amazon-navy font-black text-sm px-6 py-3 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>Shop {slide.category} Deals</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

        {/* Carousel Navigation Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amazon-yellow' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

