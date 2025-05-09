import {XAxis, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, YAxis, Bar } from "recharts";
import { useAuth } from "../Context/Auth/AuthContext";
import { useUserActivity } from "../utils/useUserActivity";

const UserActivityChart = () => {
  const { currentUser } = useAuth();
  const data = useUserActivity(currentUser?.uid);
  // const mockData = [
  //   { date: "May 3", count: 1 },
  //   { date: "May 4", count: 4 },
  //   { date: "May 5", count: 2 },
  //   { date: "May 6", count: 0 },
  //   { date: "May 7", count: 6 },
  //   { date: "May 8", count: 3 },
  //   { date: "May 9", count: 5 },
  // ];


  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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







