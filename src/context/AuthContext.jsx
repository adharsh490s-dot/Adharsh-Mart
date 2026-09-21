import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider 
} from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Timeout helper for non-blocking Firestore calls
const timeoutPromise = (ms) => new Promise((_, reject) => 
  setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
);
const withTimeout = (promise, ms = 2500) => Promise.race([promise, timeoutPromise(ms)]);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('customer'); // 'customer' or 'admin'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Read cached role first to prevent race condition during registration
        const cachedRole = localStorage.getItem(`adharshmart_user_role_${firebaseUser.uid}`);
        let role = cachedRole || (firebaseUser.email?.toLowerCase().includes('admin') ? 'admin' : 'customer');

        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await withTimeout(getDoc(userDocRef), 2500);
          if (userSnap.exists()) {
            role = userSnap.data().role || role;
          } else {
            // Save initial user doc to Firestore
            setDoc(userDocRef, {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              role,
              createdAt: new Date().toISOString()
            }).catch(() => {});
          }
        } catch (e) {
          console.warn("Could not fetch user role from Firestore, using cached/fallback role:", e);
        }

        // Cache role locally
        localStorage.setItem(`adharshmart_user_role_${firebaseUser.uid}`, role);

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL || null,
          role
        };

        setUser(userData);
        if (role === 'admin') setViewMode('admin');
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Email & Password
  const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    let role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    
    // Check cached role first
    const cached = localStorage.getItem(`adharshmart_user_role_${res.user.uid}`);
    if (cached) role = cached;

    try {
      const snap = await withTimeout(getDoc(doc(db, "users", res.user.uid)), 2000);
      if (snap.exists()) role = snap.data().role || role;
    } catch (e) {}

    localStorage.setItem(`adharshmart_user_role_${res.user.uid}`, role);

    const u = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName || email.split('@')[0],
      role
    };
    setUser(u);
    if (role === 'admin') setViewMode('admin');
    return u;
  };

  // Register with Email, Password, Name & Selected Role Claims
  const registerWithEmail = async (email, password, name, role = 'customer') => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name });

    // Instantly cache selected role before onAuthStateChanged race condition
    localStorage.setItem(`adharshmart_user_role_${res.user.uid}`, role);

    // Save user role claims to Firestore /users/{uid}
    try {
      await withTimeout(setDoc(doc(db, "users", res.user.uid), {
        email,
        displayName: name,
        role,
        createdAt: new Date().toISOString()
      }), 3000);
    } catch (e) {
      console.warn("Background user role write skipped or timed out:", e);
    }

    const u = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: name,
      role
    };
    setUser(u);
    if (role === 'admin') setViewMode('admin');
    return u;
  };

  // Google Sign In
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    let role = res.user.email?.toLowerCase().includes('admin') ? 'admin' : 'customer';

    const cached = localStorage.getItem(`adharshmart_user_role_${res.user.uid}`);
    if (cached) role = cached;

    try {
      const userRef = doc(db, "users", res.user.uid);
      const snap = await withTimeout(getDoc(userRef), 2000);
      if (snap.exists()) {
        role = snap.data().role || role;
      } else {
        setDoc(userRef, {
          email: res.user.email,
          displayName: res.user.displayName,
          role,
          createdAt: new Date().toISOString()
        }).catch(() => {});
      }
    } catch (e) {}

    localStorage.setItem(`adharshmart_user_role_${res.user.uid}`, role);

    const u = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      role
    };
    setUser(u);
    if (role === 'admin') setViewMode('admin');
    return u;
  };

  // Explicitly promote user role to Admin if needed
  const setUserRole = async (newRole) => {
    if (!user) return;
    localStorage.setItem(`adharshmart_user_role_${user.uid}`, newRole);
    setUser(prev => ({ ...prev, role: newRole }));
    if (newRole === 'admin') setViewMode('admin');

    try {
      await setDoc(doc(db, "users", user.uid), { role: newRole }, { merge: true });
    } catch (e) {}
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setViewMode("customer");
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'admin' ? 'customer' : 'admin');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      viewMode,
      loginWithEmail,
      registerWithEmail,
      loginWithGoogle,
      setUserRole,
      logout,
      toggleViewMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};
