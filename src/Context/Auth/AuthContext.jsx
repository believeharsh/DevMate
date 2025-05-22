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


  // Add to your existing AuthContext
const storeGitHubToken = async (token) => {
  if (!currentUser) return;
  
  try {
    await firebase.firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        githubToken: token
      });
  } catch (error) {
    console.error('Error storing GitHub token:', error);
  }
};

const getGitHubToken = async () => {
  if (!currentUser) return null;
  
  try {
    const doc = await firebase.firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get();
      
    return doc.data()?.githubToken || null;
  } catch (error) {
    console.error('Error getting GitHub token:', error);
    return null;
  }
};

  return (
    <AuthContext.Provider value={{ currentUser, isAuthPromptOpen, openPrompt, closePrompt, getGitHubToken, storeGitHubToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
