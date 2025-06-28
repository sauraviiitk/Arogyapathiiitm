import React, { useEffect, useState } from "react";
import { useFirebase } from "../../Context/Firebase";
import { collection, getDocs } from "firebase/firestore";
import DayTracker from "./DayTracker";
import DayCard from "./DayCard";
import dayTasks from "./dayTasks";
import { doc, getDoc } from "firebase/firestore";

const ReliefPage = () => {
  const { db, user } = useFirebase();
  const [completedDays, setCompletedDays] = useState([]);
  const [unlockedDay, setUnlockedDay] = useState(1);
  const [score, setScore] = useState(null); // ⬅️ Add score state

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // ✅ Fetch completed days
      const progressRef = collection(db, "Depressed-patients", user.uid, "dayProgress");
      const snap = await getDocs(progressRef);
      const completed = snap.docs
        .filter((doc) => doc.data().completed)
        .map((doc) => Number(doc.id.replace("day", "")));
      setCompletedDays(completed);
      setUnlockedDay(completed.length + 1);

      // ✅ Fetch depression score
      const scoreRef = doc(db, "Score-depression", user.uid);
      const scoreSnap = await getDoc(scoreRef);
      if (scoreSnap.exists()) {
        setScore(scoreSnap.data().score);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6">
      <DayTracker completedDays={completedDays} />
      <div className="mt-6 space-y-4">
        {dayTasks.map((task) => (
          <DayCard
            key={task.day}
            task={task}
            completed={completedDays.includes(task.day)}
            setCompletedDays={setCompletedDays}
            isLocked={task.day > unlockedDay}
            score={score} // ⬅️ Pass score to each card
          />
        ))}
      </div>
    </div>
  );
};
export default ReliefPage;