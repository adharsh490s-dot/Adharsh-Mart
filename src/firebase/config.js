import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

// Firebase configuration from environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== "your_api_key_here"
);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { auth, db };

// -------------------------------------------------------------
// LOCAL BACKUP PERSISTENCE STORE
// -------------------------------------------------------------
const STORAGE_KEY_PRODUCTS = "adharshmart_local_products_v3";
const STORAGE_KEY_ORDERS = "adharshmart_local_orders_v3";

const getLocalProducts = () => {
  const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

const saveLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
};

const getLocalOrders = () => {
  const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

const saveLocalOrders = (orders) => {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
};

// -------------------------------------------------------------
// PURE FIRESTORE REAL-TIME API
// -------------------------------------------------------------

// 1. Subscribe to Live Firestore Products Catalog
export const subscribeProducts = (callback) => {
  if (!db) {
    callback(getLocalProducts());
    return () => {};
  }

  const productsRef = collection(db, "products");
  const unsubscribe = onSnapshot(productsRef, (snapshot) => {
    if (snapshot.empty) {
      console.log("🌱 Firestore products collection is empty. Seeding catalog into Firestore...");
      INITIAL_PRODUCTS.forEach(async (prod) => {
        try {
          await setDoc(doc(db, "products", prod.id), {
            ...prod,
            createdAt: new Date().toISOString()
          });
        } catch (e) {
          console.warn("Seeding product skipped:", prod.id, e);
        }
      });
      callback(INITIAL_PRODUCTS);
    } else {
      const remoteProds = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      saveLocalProducts(remoteProds);
      callback(remoteProds);
    }
  }, (error) => {
    console.error("⚠️ Firestore products snapshot error:", error);
    alert("Firebase Firestore Permission Warning: Please check Firebase Console -> Firestore Database -> Rules (allow read, write: if true;)");
    callback(getLocalProducts());
  });

  return unsubscribe;
};

// 2. Add / Save Product directly to Cloud Firestore permanently
export const saveProduct = async (productData) => {
  const id = productData.id || `prod-${Date.now()}`;
  const fullProd = {
    ...productData,
    id,
    updatedAt: new Date().toISOString()
  };

  // Save to local cache first
  const prods = getLocalProducts();
  const existingIdx = prods.findIndex(p => p.id === id);
  if (existingIdx >= 0) {
    prods[existingIdx] = fullProd;
  } else {
    prods.unshift(fullProd);
  }
  saveLocalProducts(prods);

  // Write directly to Cloud Firestore
  if (db) {
    try {
      await setDoc(doc(db, "products", id), fullProd, { merge: true });
      console.log("✅ Product permanently saved to Cloud Firestore:", id);
    } catch (err) {
      console.error("⚠️ Failed to write product to Firestore:", err);
      alert(`Firestore Write Error: ${err.message}. Please enable read/write rules in Firebase Console!`);
    }
  }

  return id;
};

// 3. Remove Product directly from Cloud Firestore
export const removeProduct = async (productId) => {
  const prods = getLocalProducts().filter(p => p.id !== productId);
  saveLocalProducts(prods);

  if (db) {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("✅ Product permanently deleted from Cloud Firestore:", productId);
    } catch (err) {
      console.error("⚠️ Failed to delete product from Firestore:", err);
      alert(`Firestore Delete Error: ${err.message}`);
    }
  }
};

// 4. Subscribe to Live Firestore Customer Orders
export const subscribeOrders = (callback) => {
  if (!db) {
    callback(getLocalOrders());
    return () => {};
  }

  const ordersRef = collection(db, "orders");
  const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
    const remoteOrders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    remoteOrders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    saveLocalOrders(remoteOrders);
    callback(remoteOrders);
  }, (error) => {
    console.error("⚠️ Firestore orders snapshot error:", error);
    callback(getLocalOrders());
  });

  return unsubscribe;
};

// 5. Update Order Status in Cloud Firestore
export const updateOrderStatus = async (orderId, newStatus) => {
  const savedOrders = getLocalOrders();
  const found = savedOrders.find(o => o.id === orderId);
  if (found) {
    found.status = newStatus;
    saveLocalOrders(savedOrders);
  }

  if (db) {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      console.log("✅ Order status updated in Firestore:", orderId, newStatus);
    } catch (err) {
      console.error("⚠️ Failed to update order status in Firestore:", err);
    }
  }
};

// 6. Place Order (Writes to Cloud Firestore `/orders` & decrements `/products` stock)
export const placeOrder = async (orderData) => {
  const trackingId = `ADM-${Math.floor(100000 + Math.random() * 900000)}`;
  const finalOrder = {
    ...orderData,
    id: trackingId,
    status: "Processing",
    createdAt: new Date().toISOString()
  };

  // Local optimistic save
  const savedOrders = getLocalOrders();
  savedOrders.unshift(finalOrder);
  saveLocalOrders(savedOrders);

  const prods = getLocalProducts();
  orderData.items.forEach(item => {
    const p = prods.find(prod => prod.id === item.id);
    if (p) {
      p.stock = Math.max(0, (p.stock || 0) - item.qty);
      p.salesCount = (p.salesCount || 0) + item.qty;
    }
  });
  saveLocalProducts(prods);

  // Write permanently to Cloud Firestore
  if (db) {
    try {
      await setDoc(doc(db, "orders", trackingId), finalOrder);
      console.log("✅ Order permanently saved to Cloud Firestore:", trackingId);

      for (const item of orderData.items) {
        try {
          const prodRef = doc(db, "products", item.id);
          const prodSnap = await getDoc(prodRef);
          if (prodSnap.exists()) {
            const currentData = prodSnap.data();
            const newStock = Math.max(0, (currentData.stock || 0) - item.qty);
            const newSales = (currentData.salesCount || 0) + item.qty;
            await updateDoc(prodRef, { stock: newStock, salesCount: newSales });
          }
        } catch (e) {
          console.warn("Error updating product stock in Firestore:", item.id, e);
        }
      }
    } catch (err) {
      console.error("⚠️ Failed to write order to Cloud Firestore:", err);
      alert(`Firestore Order Error: ${err.message}. Please check Firebase Security Rules!`);
    }
  }

  return trackingId;
};

// 7. Submit Contact Inquiry
export const submitInquiry = async (inquiryData) => {
  const inq = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  if (db) {
    try {
      await addDoc(collection(db, "inquiries"), inq);
      console.log("✅ Inquiry saved to Firestore");
    } catch (err) {
      console.error("⚠️ Inquiry write error:", err);
    }
  }
  return true;
};
