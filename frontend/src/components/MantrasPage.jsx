

import React, { useState } from "react";
import { FaTired, FaFireAlt } from "react-icons/fa";
import { GiBrain, GiHealing } from "react-icons/gi";
import { MdOutlineMoodBad } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { TbBulb } from "react-icons/tb";

const allMantras = [
  {
    title: "Gayatri Mantra",
    image: "/images/gaytri_mantra.png",
    audio: "/audio/gayatri.mp3",
    moods: ["clarity", "focus", "joy"],
  },
  {
    title: "Mahamrityunjaya Mantra",
    image: "/images/maha_mritu.png",
    audio: "/audio/Maha.mp3",
    moods: ["healing", "stress", "fear"],
  },
  {
    title: "Ganesh Mantra",
    image: "/images/ganesh.png",
    audio: "/audio/ganesh.mp3",
    moods: ["clarity", "motivation"],
  },
  {
    title: "Saraswati Vandana",
    image: "/images/saraswati.png",
    audio: "/audio/Saraswati.mp3",
    moods: ["focus", "clarity", "joy"],
  },
  {
    title: "Durga Mantra",
    image: "/images/durga.png",
    audio: "/audio/durga.mp3",
    moods: ["depression", "fear"],
  },
  {
    title: "Lakshmi Mantra",
    image: "/images/Lakshmi.png",
    audio: "/audio/lakshmi.mp3",
    moods: ["motivation", "joy"],
  },
  {
    title: "Hanuman Mantra",
    image: "/images/hanuman1.png",
    audio: "/audio/Hanuman_mantra.mp3",
    moods: ["anxiety", "stress", "motivation"],
  },
  {
    title: "Krishna Mantra",
    image: "/images/krishna.png",
        audio: "/audio/Krishna.mp3",
    moods: ["joy", "focus"],
  },
  {
    title: "Shiva Mantra",
    image: "/images/shiv.png",
    audio: "/audio/shiva.mp3",
    moods: ["depression", "clarity"],
  },
  {
    title: "Buddha Mantra",
    image: "/images/buddha.png",
    audio: "/audio/buddha.mp3",
    moods: ["anxiety", "focus"],
  },
  {
    title: "Navgrah Mantra",
    image: "/images/nav.png",
    audio: "/audio/navgrah.mp3",
    moods: ["clarity", "stress"],
  },
];

const feelings = [
  { mood: "stress", label: "Stress", icon: <FaTired size={24} /> },
  { mood: "anxiety", label: "Anxiety", icon: <GiBrain size={24} /> },
  { mood: "depression", label: "Depression", icon: <MdOutlineMoodBad size={24} /> },
  { mood: "healing", label: "Healing", icon: <GiHealing size={24} /> },
  { mood: "motivation", label: "Motivation", icon: <FaFireAlt size={24} /> },
  { mood: "joy", label: "Joy", icon: <BsEmojiSmile size={24} /> },
  { mood: "focus", label: "Focus", icon: <AiOutlineEye size={24} /> },
  { mood: "clarity", label: "Clarity", icon: <TbBulb size={24} /> },
];
const MantrasPage = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const filteredMantras = selectedMood
    ? allMantras.filter((mantra) => mantra.moods.includes(selectedMood))
    : allMantras;

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-95 z-0"
        style={{
          backgroundImage: "url('/images/bg_spiritual.png')",
        }}
      />

      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Title and Description */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-tangerine text-blue-700">
            🕉️ Mantras Collection
          </h2>
          <p className="mt-2 text-lg font-cormorant text-gray-700 italic">
            "Let these sacred sounds guide your soul and calm your mind."
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-gradient-to-br from-white to-indigo-50 border border-indigo-200 rounded-2xl shadow-xl p-6 h-fit sticky top-6">
            <h3 className="text-3xl font-tangerine text-indigo-800 mb-6 text-center leading-snug">
              🌿 How Are You <br /> Feeling Today?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {feelings.map(({ mood, label, icon }) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center justify-center text-sm p-3 rounded-xl border transition duration-300 ${
                    selectedMood === mood
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700 shadow"
                      : "bg-white border-gray-200 hover:bg-indigo-50 text-gray-700"
                  }`}
                >
                  <div className="mb-1">{icon}</div>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <button
                onClick={() => setSelectedMood("")}
                className="mt-6 w-full bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
              >
                ❌ Clear Filter
              </button>
            )}
          </div>

          {/* Mantra Grid */}
          <div className="flex-1">
            {filteredMantras.length === 0 ? (
              <p className="text-center text-gray-500">
                No mantras found for this mood.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMantras.map((mantra, index) => (
                  <div
                    key={index}
                    className="group bg-white border border-indigo-100 hover:border-indigo-300 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="overflow-hidden rounded-t-xl">
                      <img
                        src={mantra.image}
                        alt={mantra.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition duration-300">
                        {mantra.title}
                      </h3>
                      <audio controls className="w-full mt-2">
                        <source src={mantra.audio} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantrasPage;
