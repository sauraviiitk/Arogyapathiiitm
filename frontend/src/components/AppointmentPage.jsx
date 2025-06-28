// import React, { useEffect, useState } from "react";
// import {
//   CalendarCheck,
//   UserCheck,
//   Stethoscope,
//   Send,
//   MailCheck,
// } from "lucide-react";
// import { useFirebase } from "../Context/Firebase";
// import { useLocation } from "react-router-dom";
// import { db } from "../Context/Firebase";
// import { setDoc, doc,where,query,collection,getDocs,getDoc,updateDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const AppointmentPage = () => {
//   const navigate=useNavigate();
//   const location = useLocation();
//   const doctorInfo = location.state?.doctor;
//   const { user } = useFirebase();

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     email: "",
//     city: "",
//     date: "",
//     time: "",
//     selectdoctor: "",
//     specialization: "",
//     doctorId: "",
//   });

//   useEffect(() => {
//     if (doctorInfo) {
//       setFormData((prev) => ({
//         ...prev,
//         selectdoctor: doctorInfo.fullName || "",
//         specialization: doctorInfo.specialization || "",
//         doctorId: doctorInfo.doctorId || "",
//       }));
//     }

//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.displayName || "",
//         email: user.email || "",
//         phone: user.phoneNumber || "",
//       }));
//     }
//   }, [doctorInfo, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const submitForm = async (e) => {
//   e.preventDefault();

//   const {
//     name,
//     age,
//     gender,
//     phone,
//     email,
//     city,
//     date,
//     time,
//     selectdoctor,
//     specialization,
//     doctorId,
//   } = formData;

//   if (!user) {
//     alert("Please login first.");
//     return;
//   }

//   if (
//     !name || !age || !gender || !phone || !email ||
//     !city || !date || !time || !selectdoctor || !specialization || !doctorId
//   ) {
//     alert("Please fill in all the fields.");
//     return;
//   }

//   const appointmentId = `${user.uid}-${Date.now()}`;
//   const appointmentData = {
//     ...formData,
//     userId: user.uid,
//     createdAt: new Date(),
//   };
//   try {

//     const patientDocRef = doc(db, "Patient", user.uid);
//     const patientSnap = await getDoc(patientDocRef);

//       if (!patientSnap.exists()) {
//          alert("Patient record not found.");
//         return;
//       }

//   const patientData = patientSnap.data();
//   const patientCoins = patientData.Coins || 0;
//   console.log(patientData);
//   // Step 2: Check if coins are enough
//   if (patientCoins < 100) {
//     alert(`❌ Not enough coins. Required: 100. You have: ${patientCoins}.`);
//     return;
//   }

//     // 1. Save to global Appointment collection
//     await setDoc(doc(db, "Appointment", appointmentId), appointmentData);
//     // 2. Find the doctor UID by querying "publishedDoctors" using doctorId
//     const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       console.error("Doctor not found in publishedDoctors collection.");
//       alert("Doctor not found.");
//       return;
//     }
//     // Get the UID of the doctor document
//     const doctorDoc = snapshot.docs[0]; // assuming only one match
//     const doctorUID = doctorDoc.id;

//     // 3. Inside that doctor’s doc, store the appointment under patient's UID
//     await setDoc(
//       doc(db, "publishedDoctors", doctorUID, "appointments", user.uid),
//       appointmentData
//     );
//     const convoRef = doc(db, "DoctorPatientConvo", doctorUID);
//     await setDoc(
//       convoRef,
//       {
//         patients: {
//           [user.uid]: {
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             age: formData.age,
//             gender: formData.gender,
//             city: formData.city,
//             appointmentTime: `${formData.date} at ${formData.time}`,
//             status: "pending",
//             submittedHealthRecord: false,
//           },
//         },
//       },
//       { merge: true }
//     );
//     await updateDoc(patientDocRef, {
//     Coins: patientCoins - 100,
//     });
//     localStorage.setItem("forceCoinUpdate", Date.now().toString());
//     toast.success(`✅ Appointment booked. 100 coins deducted! Remaining: ${patientCoins - 100}`);
//     alert("✅ Appointment booked successfully!");
//     setFormData({
//       name: "",
//       age: "",
//       gender: "",
//       phone: "",
//       email: "",
//       city: "",
//       date: "",
//       time: "",
//       selectdoctor: "",
//       specialization: "",
//       doctorId: "",
//     });

//     navigate("/patient-appointments");

//   } catch (error) {
//     console.error("❌ Error booking appointment:", error);
//     alert("Failed to book appointment. Try again.");
//   }
// };
//   return (
//     <div>
//       {/* Header */}
//       <div
//         className="w-full h-[400px] bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://ascbuffalo.com/wp-content/uploads/2017/05/page-banner-clinical-request-appointment1.jpg')",
//         }}
//       >
//         <div className="h-full w-full flex items-center justify-center">
//           <h1 className="text-white text-5xl font-bold text-center">
//             Book Your Appointment
//           </h1>
//         </div>
//       </div>

//       {/* Main Section */}
//       <div className="bg-blue-50 py-10">
//         <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* How It Works Section */}
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
//             <div>
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//                 How It Works
//               </h2>
//               <div className="space-y-6 text-gray-700">
//                 <div className="flex items-start space-x-4">
//                   <CalendarCheck className="w-6 h-6 text-blue-600 mt-1" />
//                   <p>
//                     <strong>Select</strong> your preferred date and time.
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <UserCheck className="w-6 h-6 text-blue-600 mt-1" />
//                   <p>
//                     <strong>Fill</strong> in your personal details accurately.
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <Stethoscope className="w-6 h-6 text-blue-600 mt-1" />
//                   <p>
//                     <strong>Choose</strong> your doctor and specialization.
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <Send className="w-6 h-6 text-blue-600 mt-1" />
//                   <p>
//                     <strong>Click Confirm</strong> to schedule the appointment.
//                   </p>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <MailCheck className="w-6 h-6 text-blue-600 mt-1" />
//                   <p>
//                     <strong>Receive</strong> confirmation via email/SMS.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-8">
//               <img
//                 src="https://t3.ftcdn.net/jpg/02/60/79/68/360_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg"
//                 alt="How it works illustration"
//                 className="w-full h-52 object-cover rounded-md shadow"
//               />
//             </div>
//           </div>

//           {/* Appointment Form */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <form
//               onSubmit={submitForm}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             >
//               {/* Left */}
//               <div className="space-y-4">
//                 <input
//                   onChange={handleChange}
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   placeholder="Full Name"
//                   className="w-full p-3 border rounded"
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   placeholder="Age"
//                   className="w-full p-3 border rounded"
//                 />
//                 <select
//                   onChange={handleChange}
//                   name="gender"
//                   value={formData.gender}
//                   className="w-full p-3 border rounded"
//                 >
//                   <option>Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//                 <input
//                   onChange={handleChange}
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   placeholder="Phone Number"
//                   className="w-full p-3 border rounded"
//                 />
//               </div>

//               {/* Right */}
//               <div className="space-y-4">
//                 <input
//                   onChange={handleChange}
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   placeholder="Email"
//                   className="w-full p-3 border rounded"
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   placeholder="City"
//                   className="w-full p-3 border rounded"
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   className="w-full p-3 border rounded"
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   className="w-full p-3 border rounded"
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="text"
//                   name="selectdoctor"
//                   value={formData.selectdoctor}
//                   placeholder="Doctor Name"
//                   className="w-full p-3 border rounded bg-gray-100"
//                   readOnly
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="text"
//                   name="specialization"
//                   value={formData.specialization}
//                   placeholder="Specialization"
//                   className="w-full p-3 border rounded bg-gray-100"
//                   readOnly
//                 />
//                 <input
//                   onChange={handleChange}
//                   type="text"
//                   name="doctorId"
//                   value={formData.doctorId}
//                   placeholder="Doctor ID"
//                   className="w-full p-3 border rounded bg-gray-100"
//                   readOnly
//                 />
//               </div>
//               {/* <button onClick={handlePayment}>Proceed to Pay & Confirm</button> */}
//               <div className="md:col-span-2 mt-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg"
//                 >
//                   Confirm Appointment & Pay
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentPage;
// import React, { useEffect, useState } from "react";
// import {
//   CalendarCheck,
//   UserCheck,
//   Stethoscope,
//   Send,
//   MailCheck,
// } from "lucide-react";
// import { useFirebase } from "../Context/Firebase";
// import { useLocation, useNavigate } from "react-router-dom";
// import { db } from "../Context/Firebase";
// import {
//   setDoc,
//   doc,
//   where,
//   query,
//   collection,
//   getDocs,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast } from "react-toastify";

// const AppointmentPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const doctorInfo = location.state?.doctor;
//   const { user } = useFirebase();

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     email: "",
//     city: "",
//     date: "",
//     time: "",
//     selectdoctor: "",
//     specialization: "",
//     doctorId: "",
//   });

//   useEffect(() => {
//     if (doctorInfo) {
//       setFormData((prev) => ({
//         ...prev,
//         selectdoctor: doctorInfo.fullName || "",
//         specialization: doctorInfo.specialization || "",
//         doctorId: doctorInfo.doctorId || "",
//       }));
//     }

//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.displayName || "",
//         email: user.email || "",
//         phone: user.phoneNumber || "",
//       }));
//     }
//   }, [doctorInfo, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const {
//       name,
//       age,
//       gender,
//       phone,
//       email,
//       city,
//       date,
//       time,
//       selectdoctor,
//       specialization,
//       doctorId,
//     } = formData;

//     if (!user) {
//       alert("Please login first.");
//       return;
//     }

//     if (!name || !age || !gender || !phone || !email || !city || !date || !time || !selectdoctor || !specialization || !doctorId) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     const appointmentId = `${user.uid}-${Date.now()}`;
//     const appointmentData = {
//       ...formData,
//       userId: user.uid,
//       createdAt: new Date(),
//     };

//     try {
//       const patientDocRef = doc(db, "Patient", user.uid);
//       const patientSnap = await getDoc(patientDocRef);
//       if (!patientSnap.exists()) {
//         alert("Patient record not found.");
//         return;
//       }

//       const patientData = patientSnap.data();
//       const patientCoins = patientData.Coins || 0;

//       if (patientCoins < 100) {
//         alert(`❌ Not enough coins. Required: 100. You have: ${patientCoins}.`);
//         return;
//       }

//       await setDoc(doc(db, "Appointment", appointmentId), appointmentData);

//       const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
//       const snapshot = await getDocs(q);
//       if (snapshot.empty) {
//         alert("Doctor not found.");
//         return;
//       }

//       const doctorDoc = snapshot.docs[0];
//       const doctorUID = doctorDoc.id;

//       await setDoc(doc(db, "publishedDoctors", doctorUID, "appointments", user.uid), appointmentData);

//       const convoRef = doc(db, "DoctorPatientConvo", doctorUID);
//       await setDoc(
//         convoRef,
//         {
//           patients: {
//             [user.uid]: {
//               name: formData.name,
//               email: formData.email,
//               phone: formData.phone,
//               age: formData.age,
//               gender: formData.gender,
//               city: formData.city,
//               appointmentTime: `${formData.date} at ${formData.time}`,
//               status: "pending",
//               submittedHealthRecord: false,
//             },
//           },
//         },
//         { merge: true }
//       );

//       await updateDoc(patientDocRef, {
//         Coins: patientCoins - 100,
//       });

//       localStorage.setItem("forceCoinUpdate", Date.now().toString());
//       toast.success(`✅ Appointment booked. 100 coins deducted! Remaining: ${patientCoins - 100}`);
//       alert("✅ Appointment booked successfully!");

//       setFormData({
//         name: "",
//         age: "",
//         gender: "",
//         phone: "",
//         email: "",
//         city: "",
//         date: "",
//         time: "",
//         selectdoctor: "",
//         specialization: "",
//         doctorId: "",
//       });

//       navigate("/patient-appointments");
//     } catch (error) {
//       console.error("❌ Error booking appointment:", error);
//       alert("Failed to book appointment. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
//       <div className="w-full h-[350px] bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
//         {/* <h1 className="text-white text-5xl font-bold text-center drop-shadow-lg">
//           Book Your Appointment
//         </h1> */}
//         <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
//   ✍️ Book Your Appointment Details
// </h2>

//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
//           <h2 className="text-2xl font-semibold mb-6 text-blue-800">How It Works</h2>
//           <div className="space-y-5 text-gray-700">
//             {[{
//               icon: CalendarCheck,
//               text: "Select your preferred date and time."
//             },{
//               icon: UserCheck,
//               text: "Fill in your personal details accurately."
//             },{
//               icon: Stethoscope,
//               text: "Choose your doctor and specialization."
//             },{
//               icon: Send,
//               text: "Click Confirm to schedule the appointment."
//             },{
//               icon: MailCheck,
//               text: "Receive confirmation via email/SMS."
//             }].map(({ icon: Icon, text }, i) => (
//               <div key={i} className="flex items-start gap-4">
//                 <Icon className="w-6 h-6 text-blue-500 mt-1" />
//                 <p><strong>{text.split(" ")[0]}</strong> {text.slice(text.indexOf(" ") + 1)}</p>
//               </div>
//             ))}
//           </div>
//           <img
//             src="https://t3.ftcdn.net/jpg/02/60/79/68/360_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg"
//             alt="How it works"
//             className="w-full mt-8 h-52 object-cover rounded-xl shadow-md"
//           />
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
//           <h2 className="text-xl font-semibold mb-4 text-blue-700">Fill Appointment Details</h2>
//           <form
//             onSubmit={submitForm}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {["name", "age", "gender", "phone", "email", "city", "date", "time", "selectdoctor", "specialization", "doctorId"].map((field, index) => (
//               <input
//                 key={field}
//                 onChange={handleChange}
//                 type={field === "email" ? "email" : field === "date" ? "date" : field === "time" ? "time" : field === "age" ? "number" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//                 className={`w-full p-3 border rounded ${field === "selectdoctor" || field === "specialization" || field === "doctorId" ? "bg-gray-100" : ""}`}
//                 readOnly={field === "selectdoctor" || field === "specialization" || field === "doctorId"}
//               />
//             ))}
//             <div className="md:col-span-2 mt-2">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-lg"
//               >
//                 Confirm Appointment & Pay
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentPage;
// import React, { useEffect, useState } from "react";
// import {
//   CalendarCheck,
//   UserCheck,
//   Stethoscope,
//   Send,
//   MailCheck,
// } from "lucide-react";
// import { useFirebase } from "../Context/Firebase";
// import { useLocation, useNavigate } from "react-router-dom";
// import { db } from "../Context/Firebase";
// import {
//   setDoc,
//   doc,
//   where,
//   query,
//   collection,
//   getDocs,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast } from "react-toastify";

// const AppointmentPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const doctorInfo = location.state?.doctor;
//   const { user } = useFirebase();

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phone: "",
//     email: "",
//     city: "",
//     date: "",
//     time: "",
//     selectdoctor: "",
//     specialization: "",
//     doctorId: "",
//   });

//   useEffect(() => {
//     if (doctorInfo) {
//       setFormData((prev) => ({
//         ...prev,
//         selectdoctor: doctorInfo.fullName || "",
//         specialization: doctorInfo.specialization || "",
//         doctorId: doctorInfo.doctorId || "",
//       }));
//     }

//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.displayName || "",
//         email: user.email || "",
//         phone: user.phoneNumber || "",
//       }));
//     }
//   }, [doctorInfo, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const {
//       name,
//       age,
//       gender,
//       phone,
//       email,
//       city,
//       date,
//       time,
//       selectdoctor,
//       specialization,
//       doctorId,
//     } = formData;

//     if (!user) {
//       alert("Please login first.");
//       return;
//     }

//     if (!name || !age || !gender || !phone || !email || !city || !date || !time || !selectdoctor || !specialization || !doctorId) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     const appointmentId = `${user.uid}-${Date.now()}`;
//     const appointmentData = {
//       ...formData,
//       userId: user.uid,
//       createdAt: new Date(),
//     };

//     try {
//       const patientDocRef = doc(db, "Patient", user.uid);
//       const patientSnap = await getDoc(patientDocRef);
//       if (!patientSnap.exists()) {
//         alert("Patient record not found.");
//         return;
//       }

//       const patientData = patientSnap.data();
//       const patientCoins = patientData.Coins || 0;

//       if (patientCoins < 100) {
//         alert(`❌ Not enough coins. Required: 100. You have: ${patientCoins}.`);
//         return;
//       }

//       await setDoc(doc(db, "Appointment", appointmentId), appointmentData);

//       const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
//       const snapshot = await getDocs(q);
//       if (snapshot.empty) {
//         alert("Doctor not found.");
//         return;
//       }

//       const doctorDoc = snapshot.docs[0];
//       const doctorUID = doctorDoc.id;

//       await setDoc(doc(db, "publishedDoctors", doctorUID, "appointments", user.uid), appointmentData);

//       const convoRef = doc(db, "DoctorPatientConvo", doctorUID);
//       await setDoc(
//         convoRef,
//         {
//           patients: {
//             [user.uid]: {
//               name: formData.name,
//               email: formData.email,
//               phone: formData.phone,
//               age: formData.age,
//               gender: formData.gender,
//               city: formData.city,
//               appointmentTime: `${formData.date} at ${formData.time}`,
//               status: "pending",
//               submittedHealthRecord: false,
//             },
//           },
//         },
//         { merge: true }
//       );

//       await updateDoc(patientDocRef, {
//         Coins: patientCoins - 100,
//       });

//       localStorage.setItem("forceCoinUpdate", Date.now().toString());
//       toast.success(`✅ Appointment booked. 100 coins deducted! Remaining: ${patientCoins - 100}`);
//       alert("✅ Appointment booked successfully!");

//       setFormData({
//         name: "",
//         age: "",
//         gender: "",
//         phone: "",
//         email: "",
//         city: "",
//         date: "",
//         time: "",
//         selectdoctor: "",
//         specialization: "",
//         doctorId: "",
//       });

//       navigate("/patient-appointments");
//     } catch (error) {
//       console.error("❌ Error booking appointment:", error);
//       alert("Failed to book appointment. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
//       {/* Banner Image */}
//       <div className="w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/08/06/05/38/banner-2581403_1280.jpg')" }}></div>

//       {/* Main Section */}
//       <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
//           <h2 className="text-2xl font-semibold mb-6 text-blue-800">How It Works</h2>
//           <div className="space-y-5 text-gray-700">
//             {[{
//               icon: CalendarCheck,
//               text: "Select your preferred date and time."
//             },{
//               icon: UserCheck,
//               text: "Fill in your personal details accurately."
//             },{
//               icon: Stethoscope,
//               text: "Choose your doctor and specialization."
//             },{
//               icon: Send,
//               text: "Click Confirm to schedule the appointment."
//             },{
//               icon: MailCheck,
//               text: "Receive confirmation via email/SMS."
//             }].map(({ icon: Icon, text }, i) => (
//               <div key={i} className="flex items-start gap-4">
//                 <Icon className="w-6 h-6 text-blue-500 mt-1" />
//                 <p><strong>{text.split(" ")[0]}</strong> {text.slice(text.indexOf(" ") + 1)}</p>
//               </div>
//             ))}
//           </div>
//           <img
//             src="https://t3.ftcdn.net/jpg/02/60/79/68/360_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg"
//             alt="How it works"
//             className="w-full mt-8 h-52 object-cover rounded-xl shadow-md"
//           />
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
//           <h2 className="text-xl font-semibold mb-4 text-blue-700">Fill Appointment Details</h2>
//           <form
//             onSubmit={submitForm}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {["name", "age", "gender", "phone", "email", "city", "date", "time", "selectdoctor", "specialization", "doctorId"].map((field, index) => (
//               <input
//                 key={field}
//                 onChange={handleChange}
//                 type={field === "email" ? "email" : field === "date" ? "date" : field === "time" ? "time" : field === "age" ? "number" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//                 className={`w-full p-3 border rounded ${field === "selectdoctor" || field === "specialization" || field === "doctorId" ? "bg-gray-100" : ""}`}
//                 readOnly={field === "selectdoctor" || field === "specialization" || field === "doctorId"}
//               />
//             ))}
//             <div className="md:col-span-2 mt-2">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-lg"
//               >
//                 Confirm Appointment & Pay
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentPage;
import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  UserCheck,
  Stethoscope,
  Send,
  MailCheck,
} from "lucide-react";
import { useFirebase } from "../Context/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../Context/Firebase";
import {
  setDoc,
  doc,
  where,
  query,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";


const AppointmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorInfo = location.state?.doctor;
  const { user } = useFirebase();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    date: "",
    time: "",
    selectdoctor: "",
    specialization: "",
    doctorId: "",
  });

  useEffect(() => {
    if (doctorInfo) {
      setFormData((prev) => ({
        ...prev,
        selectdoctor: doctorInfo.fullName || "",
        specialization: doctorInfo.specialization || "",
        doctorId: doctorInfo.doctorId || "",
      }));
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [doctorInfo, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const {
      name,
      age,
      gender,
      phone,
      email,
      city,
      date,
      time,
      selectdoctor,
      specialization,
      doctorId,
    } = formData;

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!name || !age || !gender || !phone || !email || !city || !date || !time || !selectdoctor || !specialization || !doctorId) {
      alert("Please fill in all the fields.");
      return;
    }

    const appointmentId = `${user.uid}-${Date.now()}`;
    const appointmentData = {
      ...formData,
      userId: user.uid,
      createdAt: new Date(),
    };

    try {
      const patientDocRef = doc(db, "Patient", user.uid);
      const patientSnap = await getDoc(patientDocRef);
      if (!patientSnap.exists()) {
        alert("Patient record not found.");
        return;
      }

      const patientData = patientSnap.data();
      const patientCoins = patientData.Coins || 0;

      if (patientCoins < 100) {
        alert(`❌ Not enough coins. Required: 100. You have: ${patientCoins}.`);
        return;
      }

      await setDoc(doc(db, "Appointment", appointmentId), appointmentData);

      const q = query(collection(db, "publishedDoctors"), where("doctorId", "==", doctorId));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        alert("Doctor not found.");
        return;
      }

      const doctorDoc = snapshot.docs[0];
      const doctorUID = doctorDoc.id;

      await setDoc(doc(db, "publishedDoctors", doctorUID, "appointments", user.uid), appointmentData);

      const convoRef = doc(db, "DoctorPatientConvo", doctorUID);
      await setDoc(
        convoRef,
        {
          patients: {
            [user.uid]: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              age: formData.age,
              gender: formData.gender,
              city: formData.city,
              appointmentTime: `${formData.date} at ${formData.time}`,
              status: "pending",
              submittedHealthRecord: false,
            },
          },
        },
        { merge: true }
      );

      await updateDoc(patientDocRef, {
        Coins: patientCoins - 100,
      });

      localStorage.setItem("forceCoinUpdate", Date.now().toString());
      toast.success(`✅ Appointment booked. 100 coins deducted! Remaining: ${patientCoins - 100}`);
      alert("✅ Appointment booked successfully!");

      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        city: "",
        date: "",
        time: "",
        selectdoctor: "",
        specialization: "",
        doctorId: "",
      });

      navigate("/patient-appointments");
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert("Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Banner Circle Image */}
      <div className="w-full flex justify-center items-center py-10">
        <div className="w-72 h-72 rounded-full overflow-hidden shadow-xl">
          <img src="images/book.png" alt="appointment banner" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">How It Works</h2>
          <div className="space-y-5 text-gray-700">
            {[{
              icon: CalendarCheck,
              text: "Select your preferred date and time."
            },{
              icon: UserCheck,
              text: "Fill in your personal details accurately."
            },{
              icon: Stethoscope,
              text: "Choose your doctor and specialization."
            },{
              icon: Send,
              text: "Click Confirm to schedule the appointment."
            },{
              icon: MailCheck,
              text: "Receive confirmation via email/SMS."
            }].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-4">
                <Icon className="w-6 h-6 text-blue-500 mt-1" />
                <p><strong>{text.split(" ")[0]}</strong> {text.slice(text.indexOf(" ") + 1)}</p>
              </div>
            ))}
          </div>
          <img
            src="/images/book.png"
            alt="How it works"
            className="w-full mt-8 h-52 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Fill Appointment Details</h2>
          <form
            onSubmit={submitForm}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["name", "age", "gender", "phone", "email", "city", "date", "time", "selectdoctor", "specialization", "doctorId"].map((field, index) => (
              <input
                key={field}
                onChange={handleChange}
                type={field === "email" ? "email" : field === "date" ? "date" : field === "time" ? "time" : field === "age" ? "number" : "text"}
                name={field}
                value={formData[field]}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                className={`w-full p-3 border rounded ${field === "selectdoctor" || field === "specialization" || field === "doctorId" ? "bg-gray-100" : ""}`}
                readOnly={field === "selectdoctor" || field === "specialization" || field === "doctorId"}
              />
            ))}
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-lg"
              >
                Confirm Appointment & Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;