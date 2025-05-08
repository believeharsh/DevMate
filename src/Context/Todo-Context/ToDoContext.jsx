import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../Auth/AuthContext";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "todos"), where("uid", "==", currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTodo = async (todo) => {
    await addDoc(collection(db, "todos"), {
      ...todo,
      uid: currentUser.uid,
      createdAt: Date.now(),
      completed: false, 
    });
    
  };

  const toggleTaskCompletion = async (id, currentStatus) => {
    try {

      await updateDoc(doc(db, "todos", id), {
        completed: !currentStatus,  // Toggle the completed status
      });

    } catch (error) {
      console.error("Error updating task completion: ", error);
    }
  };
  

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const editTodo = async (id, updatedTodo) => {
    await updateDoc(doc(db, "todos", id), updatedTodo);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo, toggleTaskCompletion }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
