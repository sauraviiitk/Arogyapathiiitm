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

        <div className="backdrop-blur-sm bg-white/30 p-8 sm:p-12 rounded-3xl shadow-xl border border-white/20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 rounded-full shadow-lg mb-6">
              <FiActivity className="text-indigo-600 text-3xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Welcome to ArogyaPath
            </h1>
            <p className="text-sm text-indigo-500 font-semibold tracking-wide uppercase">
              Your Mental Well-being Companion
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-10"
          >
            Begin your personalized journey to better mental health with our clinically-validated depression assessment and tailored 10-day recovery program.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={ChangeDatabase}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1"
            >
              Take the Depression Test
              <FiArrowRight className="text-xl" />
            </button>
            
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white/90 hover:bg-white text-indigo-600 border border-indigo-100 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1"
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 text-sm text-gray-500 flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Clinically Validated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Personalized</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default Home;