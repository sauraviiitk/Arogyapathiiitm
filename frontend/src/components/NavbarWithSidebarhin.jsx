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
import { useTranslation } from 'react-i18next';

const NavbarWithSidebarhin = () => {
  const { t } = useTranslation();
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
        console.error("डेटा प्राप्त करने में त्रुटि:", error.message);
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

  return (
    <div className="relative">
      {/* नेविगेशन बार */}
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <h1 className="flex items-center space-x-2 text-xl font-bold text-blue-700">
            <img src="/images/arogya.png" alt="आरोग्य लोगो" className="h-20 w-auto" />
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition duration-200"
            title="होम"
          >
            <Home size={24} />
            <span className="hidden md:inline font-medium">होम</span>
          </button>
        </div>

        {user && role === "Patient" && (
          <>
            <div className="hidden md:flex gap-6 text-gray-700 font-medium items-center">

              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-500 text-yellow-700 bg-yellow-100 font-semibold">
                  <img src="/images/coin.png" alt="सिक्के" className="w-5 h-5" />
                  <span>{userDetail?.Coins} सिक्के</span>
              </div>
              <div className="relative">
                <button
                  className="flex items-center gap-1"
                  onClick={() => setTherapyDropdownOpen(!therapyDropdownOpen)}
                >
                  आध्यात्मिक चिकित्सा{" "}
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
                      <p className="font-semibold text-blue-600">भजन</p>
                      <p className="text-sm text-gray-600">
                        मन और आत्मा को शांत करने वाले भक्ति गीत।
                      </p>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        navigate("/mantras");
                        setSidebarOpen(false);
                      }}
                    >
                      <p className="font-semibold text-blue-600">मंत्र</p>
                      <p className="text-sm text-gray-600">
                        संतुलन और फोकस बहाल करने के लिए शक्तिशाली मंत्र।
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
                योग
              </button>
              <div
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => {
                  navigate("/find-doctor");
                  setSidebarOpen(false);
                }}
              >
                डॉक्टर खोजें
              </div>
              <div className="hover:text-blue-600 cursor-pointer" onClick={()=>{
                navigate("/home-depression")
                setSidebarOpen(false);
              }}>अवसाद परीक्षण</div>
            </div>

            <div className="flex items-center gap-4 relative">
              <button
                onClick={() => {
                  navigate("/medicinereminder");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-100 transition duration-300"
              >
                <BellPlus size={20} />
                <span className="hidden md:inline font-semibold">दवा अनुस्मारक</span>
              </button>
            
              <button
                onClick={() => {
                  navigate("/book-appointment");
                  setSidebarOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                अपॉइंटमेंट बुक करें
              </button>
            </div>
          </>
        )}

        {/* उपयोगकर्ता खाता आइकन */}
        <div className="ml-14 relative group mr-12">
          <FaUserCircle
            size={45}
            onClick={() => {
              navigate(user ? "/account-detail" : "/choice");
              setSidebarOpen(false);
            }}
            className="text-gray-600 cursor-pointer"
          />
          <div className="absolute -right-12 top-full mt-2 w-56 bg-white shadow-lg rounded-lg hidden group-hover:block z-50 p-4">
            {!user ? (
              <p className="text-sm text-gray-700">
                कृपया{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => {
                    navigate("/choice");
                    setSidebarOpen(false);
                  }}
                >
                  लॉग इन करें
                </span>{" "}
                अपने खाते तक पहुंचने के लिए।
              </p>
            ) : (
              <div className="text-sm text-gray-700">
                <p>
                  <strong>नाम:</strong> {userDetail?.fullname || user?.displayName || "XYZ"}
                </p>
                <p>
                  <strong>ईमेल:</strong>{" "}
                  {userDetail?.email || user?.email || "example@email.com"}
                </p>
                {role && (
                  <p className="mt-1">
                    <strong>स्थिति:</strong>{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded ${
                        role === "Doctor"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {role === "Doctor" ? "डॉक्टर" : "मरीज"}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* साइडबार */}
      <div
        className={`transition-transform duration-300 fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-30 p-8 w-80 flex flex-col gap-6 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">मेनू</h2>
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
              लॉगिन / साइनअप
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
                प्रोफाइल अपडेट करें
              </button>
              <button
                onClick={() => {
                  navigate("/Doctor-side-appointments");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-green-100 shadow-md text-gray-700 font-semibold text-lg"
              >
                <Video size={24} className="text-green-600" />
                अपॉइंटमेंट देखें
              </button>
              <button
                   onClick={() => {
                       navigate("/doctor-patient-reports");
                       setSidebarOpen(false);
                      }}
                      className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-green-100 shadow-md text-gray-700 font-semibold text-lg"
                         >
                        <FileText size={24} className="text-green-600" />
                        मरीज रिपोर्ट और जवाब
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
      मेडिकल रिकॉर्ड
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
    पत्र इतिहास
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
           स्वास्थ्य ट्रैकर
         </button>
         <button
           onClick={() => {
             navigate("/canva");
             setSidebarOpen(false);
           }}
           className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
         >
           <Activity size={24} className="text-blue-600" />
           कैनवास
         </button>
         
         <button
           onClick={() => {
             navigate("/prescriptions");
             setSidebarOpen(false);
           }}
           className="flex items-center gap-4 p-4 rounded-md bg-white hover:bg-blue-100 shadow-md text-gray-700 font-semibold text-lg"
         >
           <Download size={24} className="text-blue-600" />
           प्रिस्क्रिप्शन डाउनलोड
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
          console.error("लॉगआउट त्रुटि:", error);
        }
      }}
      className="flex items-center gap-4 p-4 rounded-md bg-red-50 hover:bg-red-100 shadow-md text-red-600 font-semibold text-lg w-full"
    >
      <X size={24} className="text-red-600" />
      लॉगआउट
    </button>
  </div>
)}

        </nav>
      </div>
    </div>
  );
};

export default NavbarWithSidebarhin;