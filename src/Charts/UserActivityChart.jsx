// import {
//   BarChart, LineChart, PieChart, Pie, Line, Tooltip,
//   CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar
// } from "recharts";
// import { useAuth } from "../Context/Auth/AuthContext";
// import { useUserActivity } from "../utils/useUserActivity";
// import { DemoActivity } from "../utils/DemoUserData";
// const UserActivityChart = ({ chartType }) => {
//   const { currentUser } = useAuth();
//   const dataToShow = currentUser ? useUserActivity(currentUser?.uid) : DemoActivity;

//   const sharedTooltip = (
//     <Tooltip
//       contentStyle={{
//         backgroundColor: "#1f2937",
//         border: "none",
//         borderRadius: "6px",
//         padding: "6px 10px",
//         fontSize: "12px",
//         color: "#fff",
//         boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//       }}
//       cursor={{ fill: "#374151", radius: 4 }}
//     />
//   );

//   return (
//     <div className="w-full h-48">
//       <ResponsiveContainer width="100%" height="100%">
//         {chartType === "bar" && (
//           <BarChart data={dataToShow}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//             <XAxis dataKey="date" stroke="#ccc" />
//             <YAxis allowDecimals={false} stroke="#ccc" />
//             {sharedTooltip}
//             <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         )}

//         {chartType === "line" && (
//           <LineChart data={dataToShow}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//             <XAxis dataKey="date" stroke="#ccc" />
//             <YAxis allowDecimals={false} stroke="#ccc" />
//             {sharedTooltip}
//             <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={2} />
//           </LineChart>
//         )}

//         {chartType === "pie" && (
//           <PieChart>
//             {sharedTooltip}
//             <Pie
//               data={dataToShow}
//               dataKey="count"
//               nameKey="date"
//               cx="50%"
//               cy="50%"
//               outerRadius={60}
//               fill="#38bdf8"
//               label
//             />
//           </PieChart>
//         )}
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default UserActivityChart;




import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Pie,
  Line,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  Cell,
  Legend
} from "recharts";
import { useAuth } from "../Context/Auth/AuthContext";
import { useUserActivity } from "../utils/useUserActivity";
import { DemoActivity } from "../utils/DemoUserData";
import { MdBarChart, MdShowChart, MdPieChart, MdAreaChart } from "react-icons/md";

const UserActivityChart = ({ chartType: initialChartType = "bar" }) => {
  const { currentUser } = useAuth();
  const [chartType, setChartType] = useState(initialChartType);
  const [hoveredData, setHoveredData] = useState(null);
  
  const rawData = currentUser ? useUserActivity(currentUser?.uid) : DemoActivity;
  
  // Process data for better visualization
  const dataToShow = rawData?.map((item, index) => ({
    ...item,
    date: item.date || `Day ${index + 1}`,
    count: item.count || 0,
    color: `hsl(${200 + index * 30}, 70%, 60%)` // Dynamic colors for pie chart
  })) || [];

  // Calculate stats
  const totalActivity = dataToShow.reduce((sum, item) => sum + item.count, 0);
  const avgActivity = dataToShow.length > 0 ? (totalActivity / dataToShow.length).toFixed(1) : 0;
  const maxActivity = Math.max(...dataToShow.map(item => item.count), 0);

  // Chart type options
  const chartTypes = [
    { type: "bar", icon: MdBarChart, label: "Bar" },
    { type: "line", icon: MdShowChart, label: "Line" },
    { type: "pie", icon: MdPieChart, label: "Pie" }
  ];

  // Colors for pie chart
  const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium">{`${label}`}</p>
          <p className="text-blue-400 text-sm">
            {`Activity: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot for line chart
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (hoveredData && payload.date === hoveredData.date) {
      return <circle cx={cx} cy={cy} r={6} fill="#3B82F6" stroke="#fff" strokeWidth={2} />;
    }
    return <circle cx={cx} cy={cy} r={3} fill="#3B82F6" />;
  };

  return (
    <div className="w-full">
      {/* Header with Chart Type Selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-cyan-400">Activity</h3>
          
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Total: {totalActivity}</span>
            <span>Avg: {avgActivity}</span>
            <span>Max: {maxActivity}</span>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex items-center gap-1 bg-gray-700 rounded-md p-1">
          {chartTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                chartType === type
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-600"
              }`}
              title={label}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-48 bg-gray-800/30 rounded-lg p-3 border border-gray-700">
        {dataToShow.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">No activity data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" && (
              <BarChart 
                data={dataToShow}
                onMouseEnter={(data) => setHoveredData(data?.activePayload?.[0]?.payload)}
                onMouseLeave={() => setHoveredData(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF" 
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="#9CA3AF" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#3B82F6" 
                  radius={[3, 3, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            )}

            {chartType === "line" && (
              <LineChart 
                data={dataToShow}
                onMouseEnter={(data) => setHoveredData(data?.activePayload?.[0]?.payload)}
                onMouseLeave={() => setHoveredData(null)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF" 
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="#9CA3AF" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={800}
                />
              </LineChart>
            )}

            {chartType === "pie" && (
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={dataToShow}
                  dataKey="count"
                  nameKey="date"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={25}
                  paddingAngle={2}
                  animationDuration={800}
                >
                  {dataToShow.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={pieColors[index % pieColors.length]} 
                    />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: '#9CA3AF', fontSize: '11px' }}>{value}</span>
                  )}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default UserActivityChart;
