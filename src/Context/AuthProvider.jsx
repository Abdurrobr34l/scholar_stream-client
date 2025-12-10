import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //* REGISTER USERS
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //* LOGIN USERS
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //* LOGIN USERS WITH GOOGLE
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //* LOGOUT USERS
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //* UPDATE USER PROFILE
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //* OBSERVE USER STATE
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = { user, loading, registerUser, signInUser, signInWithGoogle, logOut, updateUserProfile };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
