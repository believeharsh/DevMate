import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Wait for auth check
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

  const openPrompt = () => setIsAuthPromptOpen(true);
  const closePrompt = () => setIsAuthPromptOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthPromptOpen, openPrompt, closePrompt }}>
      {!loading && children} {/* 👈 Don’t render app until auth is checked */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
