import React, { useEffect, useState } from "react";
import { db } from "../../Context/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUserRole } from "../../Context/UserContext";
import { useFirebase } from "../../Context/Firebase"; // ✅ import to get user

const LetterHistory = () => {
  const { user } = useFirebase(); // ✅ get current logged in user
  const { role } = useUserRole();
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchLetters = async () => {
      if (!user || role !== "Patient") {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "letters"), where("uid", "==", user.uid));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const letterData = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLetters(letterData);
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (err) {
        console.error("Failed to fetch letters", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [role, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-indigo-600 font-bold text-xl">
        Loading your letters...
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-semibold text-lg">
        ⛔ You are not authorized or don't have any letters.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        📜 My Past Letters
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
          >
            <p className="text-sm text-indigo-600 mb-1 font-medium">
              Emotion: {letter.emotion}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Created On:{" "}
              {letter.createdAt?.toDate
                ? letter.createdAt.toDate().toDateString()
                : "Unknown"}
            </p>
            <div className="text-gray-800 font-serif text-sm whitespace-pre-line max-h-40 overflow-y-auto">
              {letter.letter}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterHistory;
