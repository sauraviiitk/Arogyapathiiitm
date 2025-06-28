import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { db } from "../Context/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { FileDown, UserCircle2, CalendarDays } from "lucide-react";

const PatientReports = () => {
  const { user } = useFirebase();
  const [patientsData, setPatientsData] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user) return;

      try {
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
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <h1 className="text-4xl font-extrabold text-green-800 mb-10 text-center">Connected Patients</h1>

      {patientUIDs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          No patients have submitted their health records yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patientUIDs.map((uid) => {
            const patient = patientsData[uid];
            return (
              <div
                key={uid}
                className="bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <UserCircle2 className="text-green-700 w-10 h-10" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {patient.name || "Unnamed Patient"}
                  </h2>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Age:</strong> {patient.age || "N/A"}</p>
                  <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
                  <p><strong>Email:</strong> {patient.email || "N/A"}</p>
                  <p className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    {patient.appointmentTime || "N/A"}
                  </p>
                  <p>
                    <strong>Health History:</strong> {patient.healthHistory || "Not submitted yet."}
                  </p>
                </div>

                <div className="mt-4">
                  {patient.reportFile ? (
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = patient.reportFile.data;
                        link.download = patient.reportFile.name || "report";
                        link.click();
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition w-fit"
                    >
                      <FileDown className="w-4 h-4" />
                      Download Report
                    </button>
                  ) : (
                    <p className="text-gray-400 italic mt-2">No report uploaded.</p>
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

export default PatientReports;
