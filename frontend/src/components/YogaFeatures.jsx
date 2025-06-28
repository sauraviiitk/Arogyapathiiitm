import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaDumbbell,
  FaBed,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBrain size={30} className="text-indigo-600" />,
    title: "Mental Clarity",
    description: "Yoga improves focus, reduces stress and enhances peace of mind.",
  },
  {
    icon: <FaDumbbell size={30} className="text-green-600" />,
    title: "Physical Strength",
    description: "Regular practice boosts flexibility, strength, and posture.",
  },
  {
    icon: <FaHeartbeat size={30} className="text-red-500" />,
    title: "Heart Health",
    description: "Helps improve circulation, blood pressure and lung capacity.",
  },
  {
    icon: <FaBed size={30} className="text-blue-500" />,
    title: "Better Sleep",
    description: "Relieves anxiety and calms your system for deeper rest.",
  },
];

const yogaAsanas = [
  {
    title: "Tadasana (Mountain Pose)",
    image: "/images/asan-1.png",
    description: "Improves posture and balance. A foundational standing pose promoting mental clarity and alignment.",
    quote: "Stand tall like a mountain — still, strong, and grounded.",
  },
  {
    title: "Bhujangasana (Cobra Pose)",
    image: "/images/asan-2.png",
    description: "Expands the chest, strengthens spine, and relieves back pain.",
    quote: "Rise like a cobra — awaken your inner strength.",
  },
  {
    title: "Vrikshasana (Tree Pose)",
    image: "/images/asan-3.png",
    description: "Strengthens legs, improves focus, and cultivates inner steadiness.",
    quote: "Balance in body, balance in life.",
  },
  {
    title: "Dhanurasana (Bow Pose)",
    image: "/images/asan-4.png",
    description: "Opens the chest, stimulates digestion, and strengthens the back.",
    quote: "Be flexible, yet strong like the bow.",
  },
  {
    title: "Adho Mukha Svanasana",
    image: "/images/asan-5.png",
    description: "Strengthens arms and legs, stretches the spine. Refreshes the body.",
    quote: "Flow and stretch — restore your energy.",
  },
  {
    title: "Trikonasana (Triangle Pose)",
    image: "/images/asan-61.png",
    description: "Lengthens waist, improves digestion, and strengthens core.",
    quote: "Find harmony in the angles of life.",
  },
  {
    title: "Setu Bandhasana (Bridge Pose)",
    image: "/images/asan.png",
    description: "Strengthens back, opens the heart, and calms the brain.",
    quote: "Build bridges to balance mind and body.",
  },
  {
    title: "Paschimottanasana (Forward Bend)",
    image: "/images/asan-8.png",
    description: "Stretches spine & hamstrings, promotes calmness and introspection.",
    quote: "Bend gently, reflect deeply.",
  },
];

const YogaFeatures = () => {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="px-6 md:px-16 py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      
      {/* Section Title */}
      <motion.h2
        className="text-4xl font-bold text-center text-blue-800 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Practice Yoga?
      </motion.h2>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-3xl border border-blue-200 shadow-xl transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-center text-lg font-semibold text-blue-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-center text-gray-700 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Asana Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700">
          🧘‍♀️ Types of Yogāsans
        </h2> */}
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
  🧘‍♀️ Types of Yogāsans
</h2>

        <p className="mt-3 text-blue-700 text-base">
          Explore yoga postures to harmonize mind, body & spirit.
        </p>
      </motion.div>

      {/* Asana Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {yogaAsanas.map((asana, index) => (
          <motion.div
            key={index}
            className="relative h-[450px] perspective cursor-pointer"
            onClick={() => toggleFlip(index)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-3xl shadow-xl ${
                flipped[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full bg-white rounded-3xl overflow-hidden backface-hidden">
                <img src={asana.image} alt={asana.title} className="w-full h-56 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-indigo-700 mt-2">
                    {asana.title}
                  </h3>
                </div>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-6 transform rotate-y-180 backface-hidden flex flex-col justify-center items-center text-center">
                <p className="text-sm text-gray-700 italic mb-4">{asana.description}</p>
              </div>
            </div>

            {/* Quote */}
            <p className="mt-3 text-center text-gray-600 text-sm italic">“{asana.quote}”</p>
          </motion.div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default YogaFeatures;

