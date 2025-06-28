import React, { useEffect, useState } from "react";
import { db } from "../Context/Firebase";
import { useFirebase } from "../Context/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const MedicalRecord = () => {
  const { user } = useFirebase();
  const [appointments, setAppointments] = useState([]);
  const [healthInputs, setHealthInputs] = useState({});
  const [reportFile, setReportFile] = useState({});
  const [loading, setLoading] = useState({});
  const [submittedDoctors, setSubmittedDoctors] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      const q = query(collection(db, "Appointment"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);

      // Now check which doctors already have records
      const submitted = {};

      for (const appt of data) {
        const docQuery = query(
          collection(db, "publishedDoctors"),
          where("doctorId", "==", appt.doctorId)
        );
        const doctorSnap = await getDocs(docQuery);
        if (doctorSnap.empty) continue;

        const doctorUID = doctorSnap.docs[0].id;
        const convoRef = doc(db, "DoctorPatientConvo", doctorUID);
        const convoDoc = await getDoc(convoRef);
        const patientData = convoDoc.data()?.patients || {};

        if (patientData[user.uid]?.submittedHealthRecord) {
          submitted[appt.doctorId] = true;
        }
      }

      setSubmittedDoctors(submitted);
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
  const reader = new FileReader();

  reader.onloadend = () => {
    setReportFile((prev) => ({
      ...prev,
      [doctorId]: {
        name: file.name,
        type: file.type,
        data: reader.result, // base64 string
      },
    }));
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = async (appt) => {
    const doctorId = appt.doctorId;

    if (submittedDoctors[doctorId]) {
      alert("Health record already submitted to this doctor.");
      return;
    }

    setLoading((prev) => ({ ...prev, [doctorId]: true }));

    try {
      const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Doctor UID not found.");
        setLoading((prev) => ({ ...prev, [doctorId]: false }));
        return;
      }

      const doctorUID = snapshot.docs[0].id;
      const convoRef = doc(db, "DoctorPatientConvo", doctorUID);

      await setDoc(
  convoRef,
  {
    patients: {
      [user.uid]: {
        healthHistory: healthInputs[doctorId] || "",
        reportFile: reportFile[doctorId] || null,
        submittedAt: new Date(),
        submittedHealthRecord: true,
      },
    },
  },
  { merge: true }
);

      setSubmittedDoctors((prev) => ({ ...prev, [doctorId]: true }));
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
                <p className="text-sm text-gray-600">
                  Specialization: {appt.specialization}
                </p>
              </div>

              {submittedDoctors[appt.doctorId] ? (
                <p className="text-green-600">
                  ✅ Health record already submitted to this doctor.
                </p>
              ) : (
                <>
                  <textarea
                    className="w-full border rounded p-2"
                    rows={3}
                    placeholder="Write past illnesses, allergies, symptoms etc..."
                    value={healthInputs[appt.doctorId] || ""}
                    onChange={(e) => handleTextChange(e, appt.doctorId)}
                  />

                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, appt.doctorId)}
                  />

                  <button
                    disabled={loading[appt.doctorId]}
                    onClick={() => handleSubmit(appt)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading[appt.doctorId] ? "Submitting..." : "Submit to Doctor"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;
