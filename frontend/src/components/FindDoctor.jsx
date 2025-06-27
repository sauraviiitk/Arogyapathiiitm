import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "publishedDoctors"));
      const docList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(docList);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Find a Doctor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => (
            
          <div key={doc.id} className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between">
            <div>
              {/* Uncomment if you have photo */}
              {/* <img
                src={doc.photoURL || "/images/doctor-placeholder.png"}
                alt={doc.fullName}
                className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
              /> */}
              <p className="text-sm text-gray-600 mb-1"><strong>Doctor ID:</strong> {doc.doctorId || "Not Assigned"}</p>
              <h2 className="text-xl font-bold text-center text-gray-800">{doc.fullName}</h2>
              <p className="text-center text-blue-600">{doc.specialization}</p>
              <p className="text-center text-sm text-gray-600 mb-2">{doc.qualifications}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Experience:</strong> {doc.experience} years</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Contact:</strong> {doc.contactNumber}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {doc.clinicAddress}</p>
              <p className="text-sm mt-4 italic text-gray-700">“{doc.about}”</p>
            </div>

            <button
              onClick={() => navigate("/book-appointment", { state: { doctor: doc } })}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  

};

export default FindDoctor;
