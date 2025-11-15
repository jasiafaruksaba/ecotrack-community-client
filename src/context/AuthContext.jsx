// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config'; // Import shared auth

const provider = new GoogleAuthProvider();

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const register = async (name, email, password, photoURL) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user) {
      await updateProfile(res.user, { displayName: name, photoURL });
    }
    setLoading(false);
    return res;
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider).finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};