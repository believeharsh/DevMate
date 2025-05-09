import react from "react";
import { useEffect, useState } from "react";
import { db } from "../../../firebase-config"; // your Firebase config
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { format } from "date-fns";
const DailyFocus = () => {
    const { currentUser } = useAuth();
    const [goal, setGoal] = useState("");
    const [completed, setCompleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const today = format(new Date(), "yyyy-MM-dd");

    const docRef = doc(db, "dailyGoals", `${currentUser?.uid}_${today}`);

    useEffect(() => {
        const fetchGoal = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setGoal(data.goal);
                setCompleted(data.completed);
            }
        };
        if (currentUser) fetchGoal();
    }, [currentUser]);

    const saveGoal = async () => {
        await setDoc(docRef, {
            uid: currentUser.uid,
            date: today,
            goal,
            completed: false,
        });
        setIsEditing(false);
    };

    const toggleComplete = async () => {
        await setDoc(docRef, {
            uid: currentUser.uid,
            date: today,
            goal,
            completed: !completed,
        });
        setCompleted(!completed);
    };

    return (
        <>
            <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">🎯 Today's Focus</h2>
                {goal && !isEditing ? (
                    <div className="flex justify-between items-center">
                        <div className={`text-lg ${completed ? "line-through text-green-400" : ""}`}>
                            {goal}
                        </div>
                        <div className="space-x-2">
                            <button onClick={toggleComplete} className="text-sm text-white px-2 py-1 rounded bg-green-600">
                                {completed ? "Undo" : "Mark Done"}
                            </button>
                            <button onClick={() => setIsEditing(true)} className="text-sm text-white px-2 py-1 rounded bg-blue-500">
                                Edit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <input
                            type="text"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            placeholder="Set your focus for today..."
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                        <button
                            onClick={saveGoal}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>


        </>
    )
}

export default DailyFocus; 