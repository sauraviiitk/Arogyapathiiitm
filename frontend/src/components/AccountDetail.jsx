import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../Context/Firebase";

function AccountDetail() {
    const { user } = useFirebase();
    const navigate = useNavigate();

    if (!user) {
      navigate("/");
      return null;
    }

    async function Logout() {
        try {
            await signOut(getAuth());
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to log out. Please try again.");
        }
    }

    return (
        

  <div className="mt-6 border-t pt-4">
    <button
      onClick={Logout}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
    >
      Logout
    </button>
  </div>


    );
}

export default AccountDetail;
