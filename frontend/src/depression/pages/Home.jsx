// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { db, auth } from '../../Context/Firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { FiArrowRight, FiActivity } from 'react-icons/fi';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

// function Home() {
//   const navigate = useNavigate();

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const ChangeDatabase = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         const docRef = doc(db, "Score-Depression", user.uid);
//         await setDoc(docRef, {
//           uid: user.uid,
//           email: user.email,
//           startedAt: new Date(),
//           score: null,
//           status: "started",
//           name: user.displayName,
//         });
//         console.log("✅ Score-Depression entry created");
//         console.log(user)
//         navigate("/test");
//       } catch (error) {
//         console.error("Error writing document: ", error);
//         toast.error("Something went wrong. Try again.");
//       }
//     } else {
//       toast.error("Please login first to start the test.");
//       navigate("/auth/patient");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-4 py-10 relative overflow-hidden">
//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 z-0">
//         <Particles
//           id="tsparticles"
//           init={particlesInit}
//           options={{
//             fpsLimit: 60,
//             interactivity: {
//               events: {
//                 onHover: {
//                   enable: true,
//                   mode: "repulse",
//                 },
//               },
//               modes: {
//                 repulse: {
//                   distance: 100,
//                   duration: 0.4,
//                 },
//               },
//             },
//             particles: {
//               color: {
//                 value: "#6366f1",
//               },
//               links: {
//                 color: "#818cf8",
//                 distance: 150,
//                 enable: true,
//                 opacity: 0.3,
//                 width: 1,
//               },
//               collisions: {
//                 enable: true,
//               },
//               move: {
//                 direction: "none",
//                 enable: true,
//                 outModes: {
//                   default: "bounce",
//                 },
//                 random: false,
//                 speed: 1,
//                 straight: false,
//               },
//               number: {
//                 density: {
//                   enable: true,
//                   area: 800,
//                 },
//                 value: 60,
//               },
//               opacity: {
//                 value: 0.5,
//               },
//               shape: {
//                 type: "circle",
//               },
//               size: {
//                 value: { min: 1, max: 3 },
//               },
//             },
//             detectRetina: true,
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-6xl w-full">
//         {/* Animated Blob */}
//         <motion.div 
//           className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 0.7 }}
//           transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
//         />
        
//         <motion.div 
//           className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 0.7 }}
//           transition={{ duration: 2, delay: 2, repeat: Infinity, repeatType: "reverse" }}
//         />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//       >
//         <button
//           onClick={ChangeDatabase}
//           className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium shadow-lg transition-all duration-300"
//         >
//           Take the Depression Test
//         </button>
//       </motion.div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-10">
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
//           onClick={() => navigate("/tools/letter")}
//         >
//           <h3 className="text-xl font-semibold text-indigo-700 mb-2">Letter to Future Me</h3>
//           <p className="text-gray-600">
//             Write a letter to your future self – what do you hope, dream, or fear?
//           </p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
//           onClick={() => navigate("/tools/time-machine")}
//         >
//           <h3 className="text-xl font-semibold text-purple-700 mb-2">Emotional Time Machine</h3>
//           <p className="text-gray-600">Revisit a past emotion and observe your growth.</p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
//           onClick={() => navigate("/tools/reframe")}
//         >
//           <h3 className="text-xl font-semibold text-rose-700 mb-2">Reframe a Negative Thought</h3>
//           <p className="text-gray-600">
//             Challenge and positively reframe something you’re struggling with.
//           </p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
//           onClick={() => navigate("/tools/mood-ai")}
//         >
//           <h3 className="text-xl font-semibold text-green-700 mb-2">
//             Mood Check-in + AI Reflection
//           </h3>
//           <p className="text-gray-600">
//             Track your mood and get thoughtful responses from an AI guide.
//           </p>
//         </motion.div>
//       </div>
//       </div>
//     </div>
//   );
// }
// export default Home;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { auth, db } from "../../Context/Firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// function Home() {
//   const navigate = useNavigate();

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const ChangeDatabase = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         const docRef = doc(db, "Score-Depression", user.uid);
//         await setDoc(docRef, {
//           uid: user.uid,
//           email: user.email,
//           startedAt: new Date(),
//           score: null,
//           status: "started",
//           name: user.displayName,
//         });
//         navigate("/test");
//       } catch (error) {
//         toast.error("Something went wrong. Try again.");
//       }
//     } else {
//       toast.error("Please login first to start the test.");
//       navigate("/auth/patient");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] text-white px-6 py-16 relative overflow-hidden">
//       {/* Particle background */}
//       <div className="absolute inset-0 z-0">
//         <Particles
//           id="particles"
//           init={particlesInit}
//           options={{
//             fpsLimit: 60,
//             particles: {
//               number: { value: 60, density: { enable: true, area: 800 } },
//               color: { value: "#ffffff" },
//               shape: { type: "circle" },
//               opacity: { value: 0.3 },
//               size: { value: { min: 1, max: 4 } },
//               links: {
//                 enable: true,
//                 distance: 150,
//                 color: "#ffffff",
//                 opacity: 0.2,
//                 width: 1,
//               },
//               move: {
//                 enable: true,
//                 speed: 1,
//                 direction: "none",
//                 outModes: { default: "bounce" },
//               },
//             },
//             interactivity: {
//               events: {
//                 onHover: { enable: true, mode: "repulse" },
//               },
//               modes: {
//                 repulse: { distance: 100, duration: 0.4 },
//               },
//             },
//             detectRetina: true,
//           }}
//         />
//       </div>

//       {/* Main container */}
//       <div className="relative z-10 max-w-6xl mx-auto text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-5xl font-extrabold text-white mb-6"
//         >
//           Welcome to ArogyaPath 🌿
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.3 }}
//           className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
//         >
//           Your journey to mental wellness begins here. Explore interactive tools,
//           guided self-reflection, and AI-powered insights.
//         </motion.p>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={ChangeDatabase}
//           className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition"
//         >
//           Start Depression Test
//         </motion.button>

//         {/* Tool Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//           {tools.map((tool, i) => (
//             <motion.div
//               key={tool.title}
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.2 }}
//               onClick={() => navigate(tool.route)}
//               className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-left text-white shadow-xl cursor-pointer"
//             >
//               <div className="text-2xl mb-3">{tool.icon}</div>
//               <h3 className="font-bold text-lg mb-1">{tool.title}</h3>
//               <p className="text-sm text-white/80">{tool.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const tools = [
//   {
//     title: "Letter to Future Me",
//     description: "Write a personal letter to your future self.",
//     route: "/tools/letter",
//     icon: "📬",
//   },
//   {
//     title: "Emotional Time Machine",
//     description: "Revisit past emotions and reflect on growth.",
//     route: "/tools/time-machine",
//     icon: "⏳",
//   },
//   {
//     title: "Reframe a Negative Thought",
//     description: "Challenge and reframe your struggles positively.",
//     route: "/tools/reframe",
//     icon: "💭",
//   },
//   {
//     title: "Mood Check-in + AI Reflection",
//     description: "Track mood and receive AI-based guidance.",
//     route: "/tools/mood-ai",
//     icon: "🧠",
//   },
// ];

// export default Home;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { auth, db } from "../../Context/Firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import { FaBrain } from "react-icons/fa";

// function Home() {
//   const navigate = useNavigate();

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const ChangeDatabase = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         const docRef = doc(db, "Score-Depression", user.uid);
//         await setDoc(docRef, {
//           uid: user.uid,
//           email: user.email,
//           startedAt: new Date(),
//           score: null,
//           status: "started",
//           name: user.displayName,
//         });
//         navigate("/test");
//       } catch (error) {
//         toast.error("Something went wrong. Try again.");
//       }
//     } else {
//       toast.error("Please login first to start the test.");
//       navigate("/auth/patient");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#b3e5fc] to-[#81d4fa] text-gray-800 px-6 py-16 relative overflow-hidden">
//       {/* Particle Background */}
//       <div className="absolute inset-0 z-0">
//         <Particles
//           id="particles"
//           init={particlesInit}
//           options={{
//             fpsLimit: 60,
//             particles: {
//               number: { value: 40, density: { enable: true, area: 800 } },
//               color: { value: "#90caf9" },
//               shape: { type: "circle" },
//               opacity: { value: 0.3 },
//               size: { value: { min: 1, max: 3 } },
//               links: {
//                 enable: true,
//                 distance: 120,
//                 color: "#90caf9",
//                 opacity: 0.2,
//                 width: 1,
//               },
//               move: {
//                 enable: true,
//                 speed: 1,
//                 direction: "none",
//                 outModes: { default: "bounce" },
//               },
//             },
//             interactivity: {
//               events: { onHover: { enable: true, mode: "repulse" } },
//               modes: { repulse: { distance: 100, duration: 0.4 } },
//             },
//             detectRetina: true,
//           }}
//         />
//       </div>

//       {/* Main container */}
//       <div className="relative z-10 max-w-5xl mx-auto text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 flex justify-center items-center gap-3"
//         >
//           <FaBrain className="text-blue-700" />
//           Take Your Depression Test
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.3 }}
//           className="text-lg text-blue-800 mb-8 max-w-2xl mx-auto"
//         >
//           Begin your journey to emotional clarity and support. This quick and insightful test will help you understand your current mental health status.
//         </motion.p>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={ChangeDatabase}
//           className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition duration-300 ease-in-out flex items-center justify-center gap-2 mx-auto"
//         >
//           <FaBrain className="text-white" />
//           Start Depression Test
//         </motion.button>

//         {/* Modern Tool Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
//           {tools.map((tool, i) => (
//             <motion.div
//               key={tool.title}
//               whileHover={{ scale: 1.04 }}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: i * 0.2 }}
//               onClick={() => navigate(tool.route)}
//               className="bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-blue-200 rounded-3xl p-6 text-left shadow-2xl cursor-pointer transition-all duration-300"
//             >
//               <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl mb-4 shadow-md">
//                 {tool.icon}
//               </div>
//               <h3 className="font-semibold text-lg text-blue-900 mb-2">{tool.title}</h3>
//               <p className="text-sm text-blue-800">{tool.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const tools = [
//   {
//     title: "Letter to Future Me",
//     description: "Write a personal letter to your future self.",
//     route: "/tools/letter",
//     icon: "📬",
//   },
//   {
//     title: "Emotional Time Machine",
//     description: "Revisit past emotions and reflect on growth.",
//     route: "/tools/time-machine",
//     icon: "⏳",
//   },
//   {
//     title: "Reframe a Negative Thought",
//     description: "Challenge and reframe your struggles positively.",
//     route: "/tools/reframe",
//     icon: "💭",
//   },
//   {
//     title: "Mood Check-in + AI Reflection",
//     description: "Track mood and receive AI-based guidance.",
//     route: "/tools/mood-ai",
//     icon: "🧠",
//   },
// ];

// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../../Context/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaBrain } from "react-icons/fa";


function Home() {
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const ChangeDatabase = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "Score-Depression", user.uid);
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          startedAt: new Date(),
          score: null,
          status: "started",
          name: user.displayName,
        });
        navigate("/test");
      } catch (error) {
        toast.error("Something went wrong. Try again.");
      }
    } else {
      toast.error("Please login first to start the test.");
      navigate("/auth/patient");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#b3e5fc] to-[#81d4fa] text-gray-800 px-6 py-16 relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            particles: {
              number: { value: 40, density: { enable: true, area: 800 } },
              color: { value: "#90caf9" },
              shape: { type: "circle" },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
              links: {
                enable: true,
                distance: 120,
                color: "#90caf9",
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                outModes: { default: "bounce" },
              },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          {/* <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 flex justify-center lg:justify-start items-center gap-3"
          >
            <FaBrain className="text-blue-700" />
            Take Your Depression Test
          </motion.h1> */}
          <motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 flex justify-center lg:justify-start items-center gap-3"
>
  <FaBrain className="text-blue-700" />
  Take Your Depression Test
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-lg text-blue-800 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Begin your journey to emotional clarity and support. This quick and insightful test will help you understand your current mental health status.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={ChangeDatabase}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition duration-300 ease-in-out flex items-center justify-center gap-2 mx-auto lg:mx-0"
          >
            <FaBrain className="text-white" />
            Start Depression Test
          </motion.button>
        </div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex justify-center"
        >
          {/* <img
            src={illustration}
            alt="Depression Test Illustration"
            className="w-full max-w-md"
          /> */}<img src="/images/depression.png" alt="Description" />
        </motion.div>
      </div>

      {/* Modern Tool Cards */}
      <div className="relative z-10 mt-20 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.title}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            onClick={() => navigate(tool.route)}
            className="bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-blue-200 rounded-3xl p-6 text-left shadow-2xl cursor-pointer transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl mb-4 shadow-md">
              {tool.icon}
            </div>
            <h3 className="font-semibold text-lg text-blue-900 mb-2">{tool.title}</h3>
            <p className="text-sm text-blue-800">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const tools = [
  {
    title: "Letter to Future Me",
    description: "Write a personal letter to your future self.",
    route: "/tools/letter",
    icon: "📬",
  },
  {
    title: "Emotional Time Machine",
    description: "Revisit past emotions and reflect on growth.",
    route: "/tools/time-machine",
    icon: "⏳",
  },
  {
    title: "Reframe a Negative Thought",
    description: "Challenge and reframe your struggles positively.",
    route: "/tools/reframe",
    icon: "💭",
  },
  {
    title: "Mood Check-in + AI Reflection",
    description: "Track mood and receive AI-based guidance.",
    route: "/tools/mood-ai",
    icon: "🧠",
  },
];

export default Home;
