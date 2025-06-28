import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db, auth } from '../../Context/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FiArrowRight, FiActivity } from 'react-icons/fi';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

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
        console.log("✅ Score-Depression entry created");
        console.log(user)
        navigate("/test");
      } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Something went wrong. Try again.");
      }
    } else {
      toast.error("Please login first to start the test.");
      navigate("/auth/patient");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-4 py-10 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#6366f1",
              },
              links: {
                color: "#818cf8",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Animated Blob */}
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={ChangeDatabase}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium shadow-lg transition-all duration-300"
        >
          Take the Depression Test
        </button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
          onClick={() => navigate("/tools/letter")}
        >
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Letter to Future Me</h3>
          <p className="text-gray-600">
            Write a letter to your future self – what do you hope, dream, or fear?
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
          onClick={() => navigate("/tools/time-machine")}
        >
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Emotional Time Machine</h3>
          <p className="text-gray-600">Revisit a past emotion and observe your growth.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
          onClick={() => navigate("/tools/reframe")}
        >
          <h3 className="text-xl font-semibold text-rose-700 mb-2">Reframe a Negative Thought</h3>
          <p className="text-gray-600">
            Challenge and positively reframe something you’re struggling with.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 cursor-pointer"
          onClick={() => navigate("/tools/mood-ai")}
        >
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Mood Check-in + AI Reflection
          </h3>
          <p className="text-gray-600">
            Track your mood and get thoughtful responses from an AI guide.
          </p>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
export default Home;

