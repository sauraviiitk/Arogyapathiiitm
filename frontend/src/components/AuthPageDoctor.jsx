// import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
// import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
// import { auth ,db} from "../Context/Firebase";
// import { setDoc,doc,getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useUserRole } from "../Context/UserContext";
// import { sendEmailVerification } from "firebase/auth";
// import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
// function AuthPageDoctor() {
//   const {setRole}=useUserRole();
//   const navigate = useNavigate();

//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [email,Setemail]=useState("");
//   const [fullname,setFullname]=useState("");
//   const [password,setPassword]=useState("");
//   const togglePassword = () => setShowPassword(!showPassword);
  
//    async function GoogleLogin() {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
  
//       setRole("Doctor");
//       localStorage.setItem("role", "Doctor");
  
//       const docRef = doc(db, "Doctor", user.uid);
//       const docSnap = await getDoc(docRef);
  
//       if (!docSnap.exists()) {
//         await setDoc(docRef, {
//           email: user.email,
//           fullname: user.displayName || "No Name Provided",
//         });
//       }
  
//       toast.success("Login successful!", { position: "top-center" });
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       toast.error("Google login failed: " + error.message, {
//         position: "top-center",
//       });
//     }
//   }

//   async function ForgetPassword(e){
//     e.preventDefault();
//     console.log(email);
//     sendPasswordResetEmail(auth,email).then(data=>{
//       toast.info("Check Your email")
//       navigate("/auth/doctor");
//     }).catch(error=>{
//       alert(error.code);
//     })
//   }
//   async function handleSignup(e) {
//   e.preventDefault();
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Send email verification
//     await sendEmailVerification(user);

//     toast.info("Verification email sent. Please verify your email before logging in.", {
//       position: "top-center",
//     });

//     await auth.signOut(); // Logout immediately
//     setIsSignup(false); // Switch to login form
//   } catch (error) {
//     console.error(error.message);
//     toast.error(error.message, {
//       position: "bottom-center",
//     });
//   }
// }

// async function handleLogin(e) {
//   e.preventDefault();
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     if (!user.emailVerified) {
//       toast.error("Email not verified. Please check your inbox.", {
//         position: "top-center",
//       });
//       await auth.signOut();
//       return;
//     }
//     const docRef = doc(db, "Doctor", user.uid);
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//       await setDoc(docRef, {
//         email: user.email,
//         fullname: fullname || "No Name Provided",
//       });
//     }
//     setRole("Doctor");
//     localStorage.setItem("role", "Doctor");
//     toast.success("Doctor logged in successfully!", {
//       position: "top-center",
//     });
//     navigate("/");
//   } catch (error) {
//     console.error(error.message);
//     toast.error(error.message, {
//       position: "bottom-center",
//     });
//   }
// }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left: Form Section */}
//       <div className="w-full md:w-1/2 flex justify-center items-start pt-6 p-6 md:p-12 bg-gray-50">
//         <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-xl min-h-[80vh] self-start">
//           <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
//             {isSignup ? "Doctor Registration" : "Doctor Login"}
//           </h2>

//           <form className="space-y-5">
//             {isSignup && (
//               <input
//                 type="text"
//                 value={fullname}
//                 placeholder="Full Name"
//                 className="w-full p-3 border border-gray-300 rounded"
//                 required
//                 onChange={(e)=>setFullname(e.target.value || "")}
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               className="w-full p-3 border border-gray-300 rounded"
//               onChange={(e)=>Setemail(e.target.value)}
//               required
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 className="w-full p-3 border border-gray-300 rounded pr-10"
//                 onChange={(e)=>setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 onClick={togglePassword}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                 />
//                 Remember Me
//               </label>
//               {!isSignup && (
//                 <button onClick={ForgetPassword} type="button" className="text-green-600 hover:underline">
//                   Forgot Password?
//                 </button>
//               )}
//             </div>

//             <button
//               type="submit"
//               onClick={isSignup ? handleSignup : handleLogin}
//               className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg"
//             >
//               {isSignup ? "Sign Up as Doctor" : "Login as Doctor"}
//             </button>
//           </form>

//           <div className="flex items-center my-6">
//             <hr className="flex-grow border-t" />
//             <span className="mx-3 text-gray-500 text-sm">OR</span>
//             <hr className="flex-grow border-t" />
//           </div>

//           <div className="flex flex-col gap-3">
//             <button onClick={GoogleLogin} className="flex items-center justify-center gap-2 border p-3 rounded hover:bg-gray-100">
//               <FcGoogle size={20} />
//               Continue with Google
//             </button>
//           </div>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             {isSignup ? "Already registered as a doctor?" : "New to our platform?"}{" "}
//             <span
//               onClick={() => setIsSignup(!isSignup)}
//               className="text-green-600 cursor-pointer hover:underline"
//             >
//               {isSignup ? "Login here" : "Sign up here"}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Right: Image Section */}
//       <div className="w-full md:w-1/2 bg-green-100 flex items-center justify-center">
//         <img
//           src="/images/doctor.png"
//           alt="Doctor Illustration"
//           className="object-cover w-full h-full max-h-[1500px]"
//         />
//       </div>
//     </div>
//   );
// }

// export default AuthPageDoctor;

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../Context/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../Context/UserContext";

function AuthPageDoctor() {
  const { setRole } = useUserRole();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const togglePassword = () => setShowPassword(!showPassword);

  async function GoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      setRole("Doctor");
      localStorage.setItem("role", "Doctor");
  
      const docRef = doc(db, "Doctor", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          fullname: user.displayName || "No Name Provided",
        });
      }
  
      toast.success("Login successful!", { position: "top-center" });
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Google login failed: " + error.message, {
        position: "top-center",
      });
    }
  }

  async function ForgetPassword(e) {
    e.preventDefault();
    console.log(email);
    sendPasswordResetEmail(auth, email).then(data => {
      toast.info("Check Your email")
      navigate("/auth/doctor");
    }).catch(error => {
      alert(error.code);
    })
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      toast.info("Verification email sent. Please verify your email before logging in.", {
        position: "top-center",
      });

      await auth.signOut();
      setIsSignup(false);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Email not verified. Please check your inbox.", {
          position: "top-center",
        });
        await auth.signOut();
        return;
      }

      const docRef = doc(db, "Doctor", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          fullname: fullname || "No Name Provided",
        });
      }

      setRole("Doctor");
      localStorage.setItem("role", "Doctor");
      toast.success("Doctor logged in successfully!", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center py-16 px-6">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-blue-100 hover:shadow-blue-200 w-full max-w-xl transition duration-300">
          <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
            {isSignup ? "Doctor Registration" : "Doctor Login"}
          </h2>

          <form className="space-y-6">
            {isSignup && (
              <input
                type="text"
                value={fullname}
                placeholder="Full Name"
                className="w-full p-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 transition"
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full p-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="w-full p-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 transition pr-12"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Remember Me
              </label>
              {!isSignup && (
                <button 
                  onClick={ForgetPassword} 
                  type="button" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full text-lg font-semibold shadow-md hover:shadow-blue-300 transition duration-300"
            >
              {isSignup ? "Sign Up as Doctor" : "Login as Doctor"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            onClick={GoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-md hover:bg-gray-50 transition shadow-sm"
          >
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-gray-600">
            {isSignup ? "Already registered as a doctor?" : "New to our platform?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 font-medium hover:text-blue-800 transition"
            >
              {isSignup ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </div>

      {/* Sidebar Image */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <img
          src="/images/doct.png"
          alt="Doctor Illustration"
          className="object-cover w-full h-full max-h-[1500px]"
        />
      </div>
    </div>
  );
}

export default AuthPageDoctor;