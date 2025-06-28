import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {doc,getDoc} from 'firebase/firestore';
import { useFirebase } from "../Context/Firebase";

const MedicineReminder = () => {
  const { user, db } = useFirebase();

  const [medicineList, setMedicineList] = useState(() => {
    return JSON.parse(localStorage.getItem("medicineReminders")) || [];
  });
  const [userEmail, setUserEmail] = useState("");
useEffect(() => {
  const fetchEmail = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserEmail(userSnap.data().email);
      }
    }
  };
  fetchEmail();
}, [user]);

  const [form, setForm] = useState({
    name: "",
    dosage: "",
    time: "",
    notes: "",
    // email: "", // new field for reminder email
  });

  useEffect(() => {
    localStorage.setItem("medicineReminders", JSON.stringify(medicineList));
  }, [medicineList]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      medicineList.forEach((med) => {
        if (med.time === currentTime && !med.notifiedToday) {
          toast.info(`💊 Time to take: ${med.name} (${med.dosage})`, {
            position: "top-right",
            autoClose: 8000,
          });
          med.notifiedToday = true;
          setMedicineList([...medicineList]);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [medicineList]);

  useEffect(() => {
    const reset = setInterval(() => {
      const updated = medicineList.map((med) => ({
        ...med,
        notifiedToday: false,
      }));
      setMedicineList(updated);
    }, 86400000);
    return () => clearInterval(reset);
  }, []);

  const handleAdd = async () => {
  const { name, time } = form;
  if (!name || !time || !userEmail) {
    alert("Missing data");
    return;
  }

  const newReminder = { ...form, notifiedToday: false };
  setMedicineList((prev) => [...prev, newReminder]);
  setForm({ name: "", dosage: "", time: "", notes: "" });

  try {
    const res = await fetch("http://localhost:5000/api/reminder/schedule-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userEmail,
        subject: `Reminder: ${form.name}`,
        message: `It's time to take your medicine: ${form.name} (${form.dosage}). Notes: ${form.notes}`,
        time: form.time,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("✅ Email reminder scheduled!");
    } else {
      toast.error("❌ Failed to schedule email");
    }
  } catch (err) {
    console.error(err);
    toast.error("❌ Server error while scheduling reminder");
  }
};


  const handleDelete = (index) => {
    const updated = medicineList.filter((_, i) => i !== index);
    setMedicineList(updated);
  };


return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-10 px-4">
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          ⏰ Medicine Reminder
        </h2>
        <div className="text-blue-600 text-xl bg-blue-100 px-4 py-2 rounded-full shadow-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Illustration */}
      <div className="flex justify-center mb-8">
        <img
          src="/images/medicine.png" // You should save the uploaded image as /public/images/medicine-reminder.png
          alt="Reminder Illustration"
          className="w-52 md:w-64"
        />
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          placeholder="💊 Medicine Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="📦 Dosage"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="📝 Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          🔔 Add Reminder
        </button>
      </div>

      {/* Reminder List */}
      <ul className="space-y-4">
        {medicineList.map((med, index) => (
          <li
            key={index}
            className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-xl shadow flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold text-blue-800 text-lg">
                💊 {med.name} ({med.dosage})
              </h3>
              <p className="text-sm text-gray-700">⏰ Time: {med.time}</p>
              {med.notes && (
                <p className="text-sm italic text-gray-600">📝 {med.notes}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              ✖ Remove
            </button>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  </div>
);

 };

export default MedicineReminder;