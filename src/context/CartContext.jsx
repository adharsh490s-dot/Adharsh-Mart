import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("adharshmart_cart");
    return saved ? JSON.parse(saved) : [
      {
        id: "prod-101",
        title: "AdharshMart Pro Wireless ANC Over-Ear Headphones (Titanium Gray)",
        price: 4999,
        mrp: 12999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        qty: 1,
        stock: 24
      }
    ];
  });

  const [pincode, setPincode] = useState(() => {
    return localStorage.getItem("adharshmart_pincode") || "641001";
  });

  const [locationName, setLocationName] = useState(() => {
    return localStorage.getItem("adharshmart_location") || "Coimbatore 641001";
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("adharshmart_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("adharshmart_pincode", pincode);
    localStorage.setItem("adharshmart_location", locationName);
  }, [pincode, locationName]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, qty: Math.min(product.stock || 99, item.qty + quantity) }
            : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        title: product.title, 
        price: product.price,
        mrp: product.mrp,
        image: product.image, 
        qty: quantity,
        stock: product.stock 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, qty: Math.min(item.stock || 99, newQty) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const updateDeliveryPincode = (newPin, loc = null) => {
    setPincode(newPin);
    const locText = loc || (newPin.startsWith("641") ? `Coimbatore ${newPin}` : `Pin ${newPin}`);
    setLocationName(locText);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const FREE_SHIPPING_THRESHOLD = 499;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider value={{
      cart,
      pincode,
      locationName,
      isCartOpen,
      setIsCartOpen,
      isQuickViewOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isPincodeModalOpen,
      setIsPincodeModalOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      updateDeliveryPincode,
      subtotal,
      totalItemsCount,
      FREE_SHIPPING_THRESHOLD,
      freeShippingProgress,
      amountNeededForFreeShipping
    }}>
      {children}
    </CartContext.Provider>
  );
};

