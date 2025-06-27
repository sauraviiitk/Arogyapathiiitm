import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Stethoscope,
  Clock,
  Locate,
  UserRoundCheck,
  TimerOff,
  CheckCircle2,
} from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../Context/Firebase";
const PatientAppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "Appointment"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(list);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);
  const isAppointmentExpired = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    return now > appointmentDateTime;
  };
  if (!user) {
    return <div className="text-center mt-10 text-xl text-red-600">Please log in to view your appointments.</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Your Appointments</h1>
      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No appointments found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((app, index) => {
            const isExpired = isAppointmentExpired(app.date,app.time);
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <UserRoundCheck className="text-green-600" /> {app.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">Age: {app.age} | Gender: {app.gender}</p>
                  <p className="text-sm text-gray-600 mb-2">Contact: {app.phone}</p>
                  <p className="text-sm text-gray-600 mb-2">Email: {app.email}</p>
                  <p className="text-sm text-gray-600 mb-2">City: {app.city}</p>

                  <div className="mt-4 space-y-2">
                    <p className="flex items-center text-blue-700">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Doctor: <span className="font-semibold ml-1">{app.selectdoctor}</span>
                    </p>
                    <p className="flex items-center text-blue-700">
                      <Locate className="w-5 h-5 mr-2" />
                      Specialization: <span className="font-semibold ml-1">{app.specialization}</span>
                    </p>
                    <p className="flex items-center text-blue-700">
                      <CalendarDays className="w-5 h-5 mr-2" />
                      Date: <span className="font-semibold ml-1">{app.date}</span>
                    </p>
                    <p className="flex items-center text-blue-700">
                      <Clock className="w-5 h-5 mr-2" />
                      Time: <span className="font-semibold ml-1">{app.time}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-sm text-center font-medium">
                  {isExpired ? (
                    <span className="text-red-600 flex items-center justify-center gap-1">
                      <TimerOff className="w-5 h-5" /> ❌ Appointment Expired
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-5 h-5" /> ✅ Appointment Confirmed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PatientAppointmentDetails;
