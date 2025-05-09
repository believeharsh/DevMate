import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { subDays } from "date-fns";

export const useUserActivity = (uid) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      const last7Days = subDays(new Date(), 6);
      const q = query(
        collection(db, "users", uid, "activityLog"),
        where("timestamp", ">=", last7Days)
      );

      const snapshot = await getDocs(q);
      const activityMap = {};

      snapshot.forEach(doc => {
        const { timestamp } = doc.data();
        const day = timestamp.toDate().toDateString();
        activityMap[day] = (activityMap[day] || 0) + 1;
      });

      // Convert to chart format
      const chartData = Object.entries(activityMap).map(([date, count]) => ({
        date,
        count
      }));

      setData(chartData);
    };

    fetchData();
  }, [uid]);

  return data;
};
