import React, { useEffect, useState } from "react";
import { db } from "../Context/Firebase";
import { useFirebase } from "../Context/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";

const MedicalRecord = () => {
  const { user } = useFirebase();
  const [appointments, setAppointments] = useState([]);
  const [healthInputs, setHealthInputs] = useState({});
  const [reportFile, setReportFile] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      const q = query(
        collection(db, "Appointment"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    };
    fetchAppointments();
  }, [user]);

  const handleTextChange = (e, doctorId) => {
    setHealthInputs((prev) => ({
      ...prev,
      [doctorId]: e.target.value,
    }));
  };

  const handleFileChange = (e, doctorId) => {
    const file = e.target.files[0];
    setReportFile((prev) => ({
      ...prev,
      [doctorId]: file,
    }));
  };

  const handleSubmit = async (appt) => {
  const doctorId = appt.doctorId;

  setLoading((prev) => ({ ...prev, [doctorId]: true }));

  try {
    // 1. Get doctor UID
    const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("Doctor UID not found.");
      setLoading((prev) => ({ ...prev, [doctorId]: false }));
      return;
    }

    const doctorUID = snapshot.docs[0].id;

    // 2. Reference to DoctorPatientConvo doc
    const convoRef = doc(db, "DoctorPatientConvo", doctorUID);

    // 3. Update the specific patient data
    await setDoc(
      convoRef,
      {
        patients: {
          [user.uid]: {
            healthHistory: healthInputs[doctorId] || "",
            submittedAt: new Date(),
            submittedHealthRecord: true,
          },
        },
      },
      { merge: true }
    );

    alert("✅ Health record submitted!");
  } catch (err) {
    console.error("❌ Error submitting medical record:", err);
    alert("Something went wrong.");
  } finally {
    setLoading((prev) => ({ ...prev, [doctorId]: false }));
  }
};



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Your Medical Records for Booked Doctors
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border border-gray-300 rounded-lg shadow p-4 bg-white space-y-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{appt.selectdoctor}</h2>
                <p className="text-sm text-gray-600">Specialization: {appt.specialization}</p>
              </div>

              <textarea
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Write past illnesses, allergies, symptoms etc..."
                value={healthInputs[appt.doctorId] || ""}
                onChange={(e) => handleTextChange(e, appt.doctorId)}
              />

              <input type="file" onChange={(e) => handleFileChange(e, appt.doctorId)} />

              <button
                  disabled={loading[appt.doctorId]}
                  onClick={() => handleSubmit(appt)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading[appt.doctorId] ? "Submitting..." : "Submit to Doctor"}
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;
