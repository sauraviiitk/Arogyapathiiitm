import React, { useState, useEffect } from "react";
import { useUserRole } from "../../Context/UserContext";
import { useFirebase } from "../../Context/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { CheckCircle } from "lucide-react";
import activityPlan from "./DayActivity";
import Day1Activity from "./Days/Day1Activity";
import Day2Activity from "./Days/Day2Activity";

const totalDays = 10;

const dayComponents = {
  1: Day1Activity,
  2: Day2Activity,
};

const ReliefPage = () => {
  const { role } = useUserRole();
  const { user, db } = useFirebase();
  const [activeDay, setActiveDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // 👈 force refresh

   const devPreview =false; // ✅ Change to false before deploying

  useEffect(() => {
    const fetchCompletedDays = async () => {
      if (!user) return;
      const ref = collection(db, "Depressed-patients", user.uid, "dayProgress");
      const snap = await getDocs(ref);
      const days = snap.docs
        .filter((doc) => doc.data().completed)
        .map((doc) => Number(doc.id.replace("day", "")))
        .sort((a, b) => a - b);

      setCompletedDays(days);
      const maxCompleted = Math.max(...days, 0);

      if (devPreview) {
        setActiveDay(2); // 🔍 Preview specific day
      } else if (maxCompleted < totalDays) {
        setActiveDay(maxCompleted + 1);
      }
    };

    fetchCompletedDays();
  }, [user, refreshKey]);

  if (role !== "Patient") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        🚫 Access Denied: Only Patients can view the Relief Tracker.
      </div>
    );
  }

  const ActiveDayComponent = dayComponents[activeDay] || null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 flex flex-col items-center">
      {/* Progress SVG */}
      <div className="w-full overflow-x-auto mb-8 relative">
        <svg viewBox="0 0 1200 250" className="w-[1200px] h-[200px] mx-auto relative z-0">
          <path d="M 50 200 Q 300 50 600 200 Q 900 350 1150 100" stroke="#d1d5db" strokeWidth="4" fill="none" />
          <path
            d="M 50 200 Q 300 50 600 200 Q 900 350 1150 100"
            stroke="#4f46e5"
            strokeWidth="4"
            fill="none"
            strokeDasharray="1400"
            strokeDashoffset={1400 - (completedDays.length / totalDays) * 1400}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
          {[...Array(totalDays)].map((_, index) => {
            const dayNum = index + 1;
            const x = 50 + (index * (1100 / (totalDays - 1)));
            const y = 200 - Math.sin((index / (totalDays - 1)) * Math.PI) * 150;
            const isActive = dayNum === activeDay;
            const isCompleted = completedDays.includes(dayNum);

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={isCompleted ? "#4f46e5" : isActive ? "#818cf8" : "#9ca3af"}
                  className={`cursor-pointer transition-all duration-300 ${
                    dayNum !== 1 && !completedDays.includes(dayNum - 1) ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => {
                    if (dayNum === 1 || completedDays.includes(dayNum - 1)) {
                      setActiveDay(dayNum);
                    }
                  }}
                />
                {isCompleted && (
                  <foreignObject x={x - 8} y={y - 8} width="16" height="16">
                    <CheckCircle size={16} color="white" />
                  </foreignObject>
                )}
                <text x={x} y={y + 30} fontSize="12" textAnchor="middle" fill="#4b5563">
                  Day {dayNum}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Day Content */}
      {activityPlan[activeDay] && (
  <div className="w-full max-w-3xl mt-8 p-6 bg-white shadow-xl rounded-xl border border-indigo-100">
    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
      {activityPlan[activeDay].title}
    </h2>
    <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
      {activityPlan[activeDay].activities.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    {/* 🔥 KEY CHANGE: Dynamically load component based on day */}
    {dayComponents[activeDay] &&
      React.createElement(dayComponents[activeDay], {
        onComplete: () => setRefreshKey((k) => k + 1),
      })}
  </div>
  )}

    </div>
  );
};

export default ReliefPage;
