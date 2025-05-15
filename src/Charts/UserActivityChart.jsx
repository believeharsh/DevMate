import {
  BarChart, LineChart, PieChart, Pie, Line, Tooltip,
  CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar
} from "recharts";
import { useAuth } from "../Context/Auth/AuthContext";
import { useUserActivity } from "../utils/useUserActivity";
import { DemoActivity } from "../utils/DemoUserData";
const UserActivityChart = ({ chartType }) => {
  const { currentUser } = useAuth();
  const dataToShow = currentUser ? useUserActivity(currentUser?.uid) : DemoActivity;

  const sharedTooltip = (
    <Tooltip
      contentStyle={{
        backgroundColor: "#1f2937",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "12px",
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
      cursor={{ fill: "#374151", radius: 4 }}
    />
  );

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "bar" && (
          <BarChart data={dataToShow}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis allowDecimals={false} stroke="#ccc" />
            {sharedTooltip}
            <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}

        {chartType === "line" && (
          <LineChart data={dataToShow}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis allowDecimals={false} stroke="#ccc" />
            {sharedTooltip}
            <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={2} />
          </LineChart>
        )}

        {chartType === "pie" && (
          <PieChart>
            {sharedTooltip}
            <Pie
              data={dataToShow}
              dataKey="count"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#38bdf8"
              label
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;