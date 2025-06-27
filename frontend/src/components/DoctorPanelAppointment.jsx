import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../Context/Firebase";
import {
  CalendarDays,
  Clock,
  Locate,
  UserRoundCheck,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const DoctorPanelAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctor = auth.currentUser;

  useEffect(() => {
  const fetchAppointments = async () => {
    if (!doctor) return;
    setLoading(true);

    try {
      // 1. Find the doctor in publishedDoctors collection
      const q = query(
        collection(db, "publishedDoctors"),
        where("uid", "==", doctor.uid)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.warn("Doctor not found in publishedDoctors.");
        setAppointments([]);
        return;
      }

      // 2. Get the doc ID of that publishedDoctor
      const doctorDoc = snapshot.docs[0];
      const doctorDocId = doctorDoc.id;

      // 3. Access the 'appointments' subcollection under that doctor
      const appointmentsRef = collection(
        db,
        "publishedDoctors",
        doctorDocId,
        "appointments"
      );
      const appointmentsSnap = await getDocs(appointmentsRef);

      // 4. Extract patient UIDs and appointment data
      const appointmentsData = appointmentsSnap.docs.map(doc => ({
        id: doc.id, // usually patient UID
        ...doc.data(),
      }));

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, [doctor]);


  const isExpired = (date, time) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime < now;
  };

  if (!doctor) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Please log in as a doctor to view your appointments.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Incoming Appointments
      </h1>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No appointments found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((app, index) => {
            const expired = isExpired(app.date, app.time);
            return (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-xl border ${
                  expired ? "bg-red-50 border-red-200" : "bg-white"
                } hover:shadow-2xl transition`}
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <UserRoundCheck className="text-green-600" />
                    {app.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Age:</strong> {app.age} | <strong>Gender:</strong> {app.gender}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {app.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {app.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>City:</strong> {app.city}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center text-blue-700">
                    <Locate className="w-5 h-5 mr-2" />
                    Specialization: <span className="ml-1 font-semibold">{app.specialization}</span>
                  </p>
                  <p className="flex items-center text-blue-700">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Date: <span className="ml-1 font-semibold">{app.date}</span>
                  </p>
                  <p className="flex items-center text-blue-700">
                    <Clock className="w-5 h-5 mr-2" />
                    Time: <span className="ml-1 font-semibold">{app.time}</span>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  {expired ? (
                    <p className="text-red-500 flex items-center justify-center gap-2 text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      Appointment Expired
                    </p>
                  ) : (
                    <p className="text-green-600 flex items-center justify-center gap-2 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmed
                    </p>
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

export default DoctorPanelAppointment;
