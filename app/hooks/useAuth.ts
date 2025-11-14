"use client";

import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const registerWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  return {
    user,
    loading,
    loginWithGoogle,
    loginWithFacebook,
    registerWithEmail,
    loginWithEmail,
    logout,
    resetPassword,
  };
}