
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
    description: "Helps in improving circulation, blood pressure and lung capacity.",
  },
  {
    icon: <FaBed size={30} className="text-blue-500" />,
    title: "Better Sleep",
    description: "Relieves anxiety and helps calm your nervous system for deeper rest.",
  },
];


const yogaAsanas = [
  {
    title: "Tadasana (Mountain Pose)",
    image: "/images/asan-1.png",
    description:
      "Improves posture and balance. A foundational standing pose promoting mental clarity and physical alignment.",
    quote: "Stand tall like a mountain — still, strong, and grounded.",
  },
  {
    title: "Bhujangasana (Cobra Pose)",
    image: "/images/asan-2.png",
    description:
      "Expands the chest, strengthens spine, and helps relieve back pain by engaging core and back muscles.",
    quote: "Rise like a cobra — awaken your inner strength.",
  },
  {
    title: "Vrikshasana (Tree Pose)",
    image: "/images/asan-3.png",
    description:
      "A balancing pose that strengthens legs, improves focus, and cultivates inner steadiness.",
    quote: "Balance in body, balance in life.",
  },
  {
    title: "Dhanurasana (Bow Pose)",
    image: "/images/asan-4.png",
    description:
      "Opens the chest and shoulders, stimulates digestion, and strengthens the entire back.",
    quote: "Be flexible, yet strong like the bow.",
  },
  {
    title: "Adho Mukha Svanasana (Downward Dog)",
    image: "/images/asan-5.png",
    description:
      "Strengthens arms and legs, stretches the spine and hamstrings. Energizes and refreshes the body.",
    quote: "Flow and stretch — restore your energy.",
  },
  {
    title: "Trikonasana (Triangle Pose)",
    image: "/images/asan-61.png",
    description:
      "Lengthens the sides of the waist, improves digestion, and strengthens legs and core muscles.",
    quote: "Find harmony in the angles of life.",
  },
  {
    title: "Setu Bandhasana (Bridge Pose)",
    image: "/images/asan.png",
    description:
      "Strengthens the back and glutes, opens the heart, improves blood circulation and calms the brain.",
    quote: "Build bridges to balance mind and body.",
  },
  {
    title: "Paschimottanasana (Seated Forward Bend)",
    image: "/images/asan-8.png",
    description:
      "Stretches the spine and hamstrings deeply while promoting calmness and introspection.",
    quote: "Bend gently, reflect deeply.",
  },
];

const YogaFeatures = () => {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="px-6 md:px-16 py-12 bg-white text-gray-800">
      {/* Why Practice Yoga */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Practice Yoga?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

     
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center my-16 text-blue-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Types of Yogasans
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {yogaAsanas.map((asana, index) => (
          <motion.div
            key={index}
            className="w-full h-[440px] cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => toggleFlip(index)}
          >
            <div
              className={`relative w-full h-full rounded-xl shadow-lg transition-transform duration-700 [transform-style:preserve-3d] [perspective:1000px] ${
                flipped[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full rounded-xl overflow-hidden bg-white backface-hidden">
                <img
                  src={asana.image}
                  alt={asana.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-indigo-700 mt-2">
                    {asana.title}
                  </h3>
                </div>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full rounded-xl bg-indigo-100 text-gray-800 transform rotate-y-180 backface-hidden p-6 flex flex-col justify-center items-center text-center">
                <p className="text-sm leading-relaxed italic mb-4">
                  {asana.description}
                </p>
              </div>
            </div>
            {/* Quote */}
            <p className="mt-3 text-center text-gray-600 text-sm italic">
              “{asana.quote}”
            </p>
          </motion.div>
        ))}
      </div>

   
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        [transform-style='preserve-3d'] {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        [perspective='1000px'] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default YogaFeatures;
