import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 NEW — to stop Firebase from auto-login after register
  const [preventAutoLogin, setPreventAutoLogin] = useState(false);

  // REGISTER
  const registerUser = (email, password) => {
    setPreventAutoLogin(true); // prevent onAuthStateChanged auto login
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // GOOGLE LOGIN
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // LOGOUT
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // UPDATE PROFILE
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // OBSERVE USER
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (preventAutoLogin) {
        // block auto-login after registration
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, [preventAutoLogin]);

  const authInfo = {
    user,
    setUser,   // 👈 NEW — allow manual control
    loading,
    registerUser,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    setPreventAutoLogin // 👈 NEW — needed for register page
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
