import React, { useState, useEffect } from "react";
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  UserPlus,
  FileText,
  Video,
  Activity,
  Download,
  Upload,
  FolderOpen,
  History,
  UserCog
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useFirebase } from "../Context/Firebase";
import { useUserRole } from "../Context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Context/Firebase";
import { Home } from "lucide-react";
import { BellPlus } from "lucide-react";
import { query, where, getDocs, collection } from "firebase/firestore";
// ... imports remain the same

const NavbarWithSidebar = () => {
  const { role } = useUserRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [therapyDropdownOpen, setTherapyDropdownOpen] = useState(false);
  const [medicalSubOpen, setMedicalSubOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useFirebase();
  const [userDetail, setUserDetail] = useState("");
  const [hasLetter, setHasLetter] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (user && role) {
        const docRef = doc(db, role, user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail(docSnap.data());
        }

        // 📨 Check if letter exists
        const letterQuery = query(
          collection(db, "letters"),
          where("uid", "==", user.uid)
        );
        const letterSnap = await getDocs(letterQuery);
        if (!letterSnap.empty) {
          setHasLetter(true);
        } else {
          setHasLetter(false);
        }
      }
    } catch (error) {
      console.error("FetchData error:", error.message);
    }
  };

  fetchData();
  const handleFocus = () => {
    fetchData();
  };

  const handleStorage = (e) => {
    if (e.key === "forceCoinUpdate") {
      fetchData();
    }
  };

  window.addEventListener("focus", handleFocus);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("storage", handleStorage);
  };
}, [user, role]);


  // console.log("I am user Details",user,role);
  // console.log("User Detail",userDetail);
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <h1 className="flex items-center space-x-2 text-xl font-bold text-blue-700">
            <img src="/images/arogya.png" alt="Arogya Logo" className="h-20 w-auto" />
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition duration-200"
            title="Home"
          >
            <Home size={24} />
            <span className="hidden md:inline font-medium">Home</span>
          </button>
        </div>

        {user && role === "Patient" && (
          <>
            <div className="hidden md:flex gap-6 text-gray-700 font-medium items-center">

              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-500 text-yellow-700 bg-yellow-100 font-semibold">
                  <img src="/images/coin.png" alt="Coins" className="w-5 h-5" />
                  <span>{userDetail?.Coins} Coins</span>
              </div>
              <div className="relative">
                <button
                  className="flex items-center gap-1"
                  onClick={() => setTherapyDropdownOpen(!therapyDropdownOpen)}
                >
                  Spiritual Therapy{" "}
                  {therapyDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {therapyDropdownOpen && (
                  <div className="absolute top-full mt-2 bg-white border rounded shadow w-60 z-20 p-3">
                    <div
                      className="mb-3 cursor-pointer"
                      onClick={() => {
                        navigate("/bhajans");
                        setSidebarOpen(false);
                      }}
                    >
                      <p className="font-semibold text-blue-600">Bhajans</p>
                      <p className="text-sm text-gray-600">
                        Peaceful devotional songs to calm your mind and soul.
                      </p>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        navigate("/mantras");
                        setSidebarOpen(false);
                      }}
                    >
                      <p className="font-semibold text-blue-600">Mantras</p>
                      <p className="text-sm text-gray-600">
                        Recite powerful mantras to restore balance and focus.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  navigate("/yoga");
                  setSidebarOpen(false);
                }}
                className="hover:text-blue-600"
              >
                Yoga
              </button>
              <div
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => {
                  navigate("/find-doctor");
                  setSidebarOpen(false);
                }}
              >
                Find a Doctor
              </div>
              <div className="hover:text-blue-600 cursor-pointer" onClick={()=>{
                navigate("/home-depression")
                setSidebarOpen(false);
              }}>Depression test</div>
            </div>

            <div className="flex items-center gap-4 relative">
              {/* <Bell className="text-gray-600" /> */}
              {/* ✅ Medicine Reminder Button */}
              <button
                onClick={() => {
                  navigate("/medicinereminder");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-100 transition duration-300"
              >
                <BellPlus size={20} />
                <span className="hidden md:inline font-semibold">Medicine Reminder</span>
              </button>
            
                          {/* Book Appointment Button */}
              <button
                onClick={() => {
                              navigate("/book-appointment");
                  setSidebarOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>

          </>
        )}

        {/* User Account Icon */}
        <div className="ml-14 relative group mr-12">
          <FaUserCircle
            size={45}
            onClick={() => {
              if (!user) {
              navigate("/choice");
              }
              setSidebarOpen(false);
            }}
            className="text-gray-600 cursor-pointer"
          />
          <div className="absolute -right-12 top-full mt-2 w-56 bg-white shadow-lg rounded-lg hidden group-hover:block z-50 p-4">
            {!user ? (
              <p className="text-sm text-gray-700">
                Please{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => {
                    navigate("/choice");
                    setSidebarOpen(false);
                  }}
                >
                  log in
                </span>{" "}
                to access your account.
              </p>
            ) : (
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {userDetail?.fullname || user?.displayName || "XYZ"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {userDetail?.email || user?.email || "example@email.com"}
                </p>
                {role && (
                  <p className="mt-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded ${
                        role === "Doctor"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {role}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`transition-transform duration-300 fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-30 p-8 w-80 flex flex-col gap-6 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <X onClick={() => setSidebarOpen(false)} className="cursor-pointer" />
        </div>

        <nav className="flex flex-col gap-4">
          {!user && (
            <button
              onClick={() => {
                navigate("/choice");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
            >
              <UserPlus size={24} className="text-blue-600" />
              Login / Signup
            </button>
          )}
          {user && role === "Doctor" && (
            <>
              <button
                onClick={() => {
                  navigate("/update-info");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-green-100 shadow-md text-gray-700 font-semibold text-lg"
              >
                <UserCog size={24} className="text-green-600" />
                Update Profile Info
              </button>
              <button
                onClick={() => {
                  navigate("/Doctor-side-appointments");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-green-100 shadow-md text-gray-700 font-semibold text-lg"
              >
                <Video size={24} className="text-green-600" />
                View Appointments
              </button>
              <button
                   onClick={() => {
                       navigate("/doctor-patient-reports");
                       setSidebarOpen(false);
                      }}
                      className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-green-100 shadow-md text-gray-700 font-semibold text-lg"
                         >
                        <FileText size={24} className="text-green-600" />
                        Patient Reports & Respond
                      </button>
            </>
          )}

          {user && role === "Patient" && (
  <>
    <button
      onClick={() => {
        navigate("/medicalRecordOfPatient");
        setSidebarOpen(false);
      }}
      className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
    >
      <FileText size={24} className="text-blue-600" />
      Medical Records
    </button>

    {hasLetter && (
    <button
    onClick={() => {
      navigate("/Letter-history");
      setSidebarOpen(false);
    }}
    className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
    >
    <History size={24} className="text-blue-600" />
    Letter History
  </button>
    )}
         <button
           onClick={() => {
             navigate("/health-tracker");
             setSidebarOpen(false);
           }}
           className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
         >
           <Activity size={24} className="text-blue-600" />
           Health Tracker
         </button>
         <button
           onClick={() => {
             navigate("/canva");
             setSidebarOpen(false);
           }}
           className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
         >
           <Activity size={24} className="text-blue-600" />
           Canvas
         </button>
         
         <button
           onClick={() => {
             navigate("/prescriptions");
             setSidebarOpen(false);
           }}
           className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
         >
           <Download size={24} className="text-blue-600" />
           Prescription Downloads
         </button>
       </>
      )}
         {user && (
  <div className="mt-auto pt-6 border-t border-gray-300">
    <button
      onClick={async () => {
        try {
          await import("firebase/auth").then(({ getAuth, signOut }) => {
            const auth = getAuth();
            signOut(auth);
          });
          navigate("/choice");
          setSidebarOpen(false);
        } catch (error) {
          console.error("Logout error:", error);
        }
      }}
      className="flex items-center gap-4 p-4 rounded-md bg-red-50 hover:bg-red-100 shadow-md text-red-600 font-semibold text-lg w-full"
    >
      <X size={24} className="text-red-600" />
      Logout
    </button>
  </div>
)}

        </nav>
      </div>

    </div>
  );
};

export default NavbarWithSidebar;
