import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    return;
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    return;
  }
  async function logout() {
    await signOut(auth);
    return;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // * this is the cleanup function of the useeffect
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Below code means that return the children iff the loading state is false */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
