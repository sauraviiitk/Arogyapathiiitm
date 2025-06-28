
import React from "react";
import { useNavigate } from "react-router-dom";

function Choice() {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    navigate("/auth/doctor");
  };

  const handlePatientClick = () => {
    navigate("/auth/patient");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 px-4 py-10">
      {/* Inner Card with Gradient */}
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-100 p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-8 w-full max-w-xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-800 text-center font-[Poppins] tracking-wide">
          Welcome to ArogyaPath
        </h1>

        {/* Logo */}
        <img
          src="/images/logo1.png" // Replace with your actual logo path
          alt="ArogyaPath Logo"
          className="w-24 h-24 object-contain drop-shadow-md"
        />

        {/* Role Cards */}
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          {/* Doctor Card */}
          <div
            onClick={handleDoctorClick}
            className="flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="Doctor"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-lg font-bold text-blue-800 text-center">
              Signup / Login by Doctor
            </h2>
          </div>

          {/* Patient Card */}
          <div
            onClick={handlePatientClick}
            className="flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
              alt="Patient"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-lg font-bold text-blue-800 text-center">
              Signup / Login by Patient
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Choice;
