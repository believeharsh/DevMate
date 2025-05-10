import {collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, where} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import withAuth from "../../utils/HelperWithAuth";

const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

const TodoContextProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);
  const { currentUser, openPrompt} = useAuth();
  const navigate = useNavigate();
  const userId = currentUser?.uid || "demo_user_uid";

  // Only fetch real todos if logged in
  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "todos"), where("uid", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, [currentUser]);


  const addTodo = withAuth(currentUser, async (todo) => {
    await addDoc(collection(db, "todos"), {
      ...todo,
      uid: currentUser.uid,
      createdAt: Date.now(),
      completed: false
    });
  }, openPrompt);

  const toggleTaskCompletion = withAuth(currentUser, async (id, currentStatus) => {
    await updateDoc(doc(db, "todos", id), {
      completed: !currentStatus
    });
  }, openPrompt);

  const deleteTodo = withAuth(currentUser, async (id) => {
    await deleteDoc(doc(db, "todos", id));
  }, openPrompt);

  const editTodo = withAuth(currentUser, async (id, updatedTodo) => {
    await updateDoc(doc(db, "todos", id), updatedTodo);
  }, openPrompt);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        toggleTaskCompletion
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
