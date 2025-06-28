import React, { useState, useEffect } from "react";
import { useUserRole } from "../../Context/UserContext";
import { useFirebase } from "../../Context/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import activityPlan from "./DayActivity"; // ✅ renamed correctly

const totalDays = 10;

const ReliefPage = () => {
  const { role } = useUserRole();
  const { user, db } = useFirebase();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    const fetchCompletedDays = async () => {
      if (!user) return;
      const ref = collection(db, "Depressed-patients", user.uid, "dayProgress");
      const snap = await getDocs(ref);
      const days = snap.docs
        .filter(doc => doc.data().completed)
        .map(doc => Number(doc.id.replace("day", "")));
      setCompletedDays(days);
    };

    fetchCompletedDays();
  }, [user]);

  if (role !== "Patient") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        🚫 Access Denied: Only Patients can view the Relief Tracker.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 flex flex-col items-center">
      {/* Curved Path with Dots */}
      <div className="w-full overflow-x-auto mb-8 relative">
        <svg viewBox="0 0 1200 250" className="w-[1200px] h-[200px] mx-auto relative z-0">
          <path
            d="M 50 200 Q 300 50 600 200 Q 900 350 1150 100"
            stroke="#d1d5db"
            strokeWidth="4"
            fill="none"
          />
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
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setActiveDay(dayNum)}
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

      {/* Active Day Content */}
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
        </div>
      )}

      {/* Wellness Tools */}
      
    </div>
  );
};

export default ReliefPage;
