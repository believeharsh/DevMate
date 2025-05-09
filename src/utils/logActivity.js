import { db } from "../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const logUserActivity = async (uid, type, meta = {}) => {
  try {
    await addDoc(collection(db, "users", uid, "activityLog"), {
      type,
      timestamp: serverTimestamp(),
      meta,
    });
  } catch (err) {
    console.error("Error logging activity:", err);
  }
};
