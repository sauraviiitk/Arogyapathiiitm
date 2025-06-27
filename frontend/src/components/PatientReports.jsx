import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { db, } from "../Context/Firebase";
import { doc, getDoc } from "firebase/firestore";

const PatientReports = () => {
  const { user } = useFirebase(); // doctor is logged in
  const [patientsData, setPatientsData] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user) return;

      try {
        // Get the DoctorPatientConvo doc for this doctor
        const convoRef = doc(db, "DoctorPatientConvo", user.uid);
        const convoSnap = await getDoc(convoRef);

        if (convoSnap.exists()) {
          const data = convoSnap.data();
          setPatientsData(data.patients || {});
        } else {
          console.log("No patient data found for this doctor.");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [user]);

  const patientUIDs = Object.keys(patientsData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Connected Patients</h1>

      {patientUIDs.length === 0 ? (
        <p className="text-gray-600">No patients have submitted their health records yet.</p>
      ) : (
        <div className="grid gap-6">
          {patientUIDs.map((uid) => {
            const patient = patientsData[uid];
            return (
              <div
                key={uid}
                className="bg-white shadow p-4 rounded-lg border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {patient.name || "Unnamed Patient"}
                </h2>
                <p className="text-sm text-gray-700 mb-1">Age: {patient.age || "N/A"}</p>
                <p className="text-sm text-gray-700 mb-1">Gender: {patient.gender || "N/A"}</p>
                <p className="text-sm text-gray-700 mb-1">Email: {patient.email || "N/A"}</p>
                <p className="text-sm text-gray-700 mb-1">
                  Appointment Time: {patient.appointmentTime || "N/A"}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Health History: {patient.healthHistory || "Not submitted yet."}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PatientReports;
