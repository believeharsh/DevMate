import { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc, deleteDoc, doc, onSnapshot, query, collection, where, updateDoc, serverTimestamp
} from "firebase/firestore";

import { db } from "../../firebase-config";
import { useAuth } from "../Auth/AuthContext";
import withAuth from "../../utils/HelperWithAuth";
import { useNavigate } from "react-router-dom";


const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const { currentUser, openPrompt } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = collection(db, "users", currentUser.uid, "bookmarks");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookmarks(fetched);
    });

    return () => unsubscribe();
  }, [currentUser]);



  // Add new bookmark
  const addBookmark = withAuth(currentUser, async ({ text, url, category }) => {
    if (!currentUser) return;

    if (!category) {
      console.error("Bookmark must have a category");
      return;
    }

    await addDoc(collection(db, "users", currentUser.uid, "bookmarks"), {
      text,
      url,
      category, // ✅ Add category
      createdAt: serverTimestamp()
    });
  }, openPrompt)

  // Delete bookmark
  const deleteBookmark = withAuth(currentUser, async (id) => {
    if (!currentUser) return;

    await deleteDoc(doc(db, "users", currentUser.uid, "bookmarks", id));
  }, openPrompt)

  // Filter by category
  const getBookmarksByCategory = (category) => {
    return bookmarks.filter((bm) => bm.category === category);
  };


  // update the existing bookmarks 
  const updateBookmark = withAuth(currentUser, async (id, updatedFields) => {
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid, "bookmarks", id);
    await updateDoc(docRef, {
      ...updatedFields,
      updatedAt: serverTimestamp()
    });
  }, openPrompt)

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        deleteBookmark,
        getBookmarksByCategory,
        updateBookmark
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
