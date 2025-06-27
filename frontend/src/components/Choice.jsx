import React from 'react';
import { useNavigate } from 'react-router-dom';

function Choice() {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    navigate('/auth/doctor'); // adjust as needed
  };

  const handlePatientClick = () => {
    navigate('/auth/patient'); // adjust as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800">Welcome To ArogyaPath!</h1>
        <p className="text-gray-500 text-center">
          Please choose your login or signup role.
        </p>

        <button
          onClick={handleDoctorClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
        >
          Login / Signup as Doctor
        </button>

        <button
          onClick={handlePatientClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
        >
          Login / Signup as Patient
        </button>
      </div>
    </div>
  );
}

export default Choice;
