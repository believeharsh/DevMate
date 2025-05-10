import {XAxis, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, YAxis, Bar } from "recharts";
import { useAuth } from "../Context/Auth/AuthContext";
import { useUserActivity } from "../utils/useUserActivity";
import { DemoActivity } from "../utils/DemoUserData";


const UserActivityChart = () => {
  const { currentUser } = useAuth();
  const data = useUserActivity(currentUser?.uid);

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={currentUser ? data : DemoActivity}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;







