import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😭" },
  { label: "Anxious", emoji: "😟" },
  { label: "Peaceful", emoji: "🧘‍♂️" },
  { label: "Angry", emoji: "😡" },
];

const bhajans = [
  {
    title: "Ganesh Aarti",
    duration: "3:25",
    image: "/images/ganesh.png",
    mood: "Peaceful",
    audio: "/audio/ganesh.mp3",
  },
  {
    title: "Krishna Bhajan",
    duration: "4:10",
    image: "/images/krishna.png",
    mood: "Happy",
    audio: "/audio/krishna_bhajan.mp3",
  },
  {
    title: "Durga Bhajan",
    duration: "5:00",
    image: "/images/durga.png",
    mood: "Anxious",
    audio: "/audio/durga_b.mp3",
  },
  {
    title: "Hanuman Chalisa",
    duration: "3:45",
    image: "/images/hanuman.png",
    mood: "Angry",
    audio: "/audio/Hanuman-Chalisa.mp3",
  },
  {
    title: "Shiv Tandav",
    duration: "4:40",
    image: "/images/shiv.png",
    mood: "Sad",
    audio: "/audio/Shiv-Tandav.mp3",
  },
  {
    title: "Ram Bhajan",
    duration: "3:50",
    image: "/images/ram.png",
    mood: "Peaceful",
    audio: "/audio/ram.mp3",
  },
  {
    title: "Laxmi Aarti",
    duration: "4:05",
    image: "/images/lakshmi_b.png",
    mood: "Happy",
    audio: "/audio/laxmi-A.mp3",
  },
];

const BhajansPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);

  const filteredBhajans = selectedMood
    ? bhajans.filter((b) => b.mood === selectedMood)
    : bhajans;

  const handlePlay = (index) => {
    if (playingIndex !== null && playingIndex !== index) {
      audioRefs.current[playingIndex]?.pause();
      audioRefs.current[playingIndex].currentTime = 0;
    }

    if (playingIndex === index) {
      audioRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      audioRefs.current[index].play();
      setPlayingIndex(index);
    }
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-700 font-serif">🎵 Bhajans Recommendation</h2>
        <p className="text-md text-gray-600 mt-2">
          Let your mind be calm and your heart be full. Discover devotional bhajans based on your mood.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 max-h-[600px] overflow-hidden">
        {/* Bhajan Cards List with Scroll */}
        <div className="md:w-2/3 pr-2 overflow-y-auto space-y-4">
          {filteredBhajans.map((b, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-start gap-4 shadow-md hover:scale-[1.02] transition"
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{b.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{b.duration}</p>
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={b.audio}
                  onEnded={() => setPlayingIndex(null)}
                />
              </div>
              <button
                className="bg-blue-100 p-3 rounded-full hover:bg-blue-200"
                onClick={() => handlePlay(index)}
              >
                {playingIndex === index ? (
                  <FaPause className="text-blue-600" />
                ) : (
                  <FaPlay className="text-blue-600" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Mood Selector - Fixed Height */}
        <div className="md:w-1/3 bg-white rounded-2xl p-6 shadow-md flex flex-col h-fit">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How Are You Feeling Today?</h3>
          <div className="space-y-3">
            <button
              onClick={() => setSelectedMood(null)}
              className="w-full flex items-center justify-center px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              No Filter
            </button>
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => {
                  setSelectedMood(mood.label);
                  setPlayingIndex(null);
                }}
                className={`w-full flex items-center justify-start px-4 py-2 rounded-xl border 
                  ${
                    selectedMood === mood.label
                      ? "bg-blue-100 border-blue-400 text-blue-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
              >
                <span className="text-xl mr-3">{mood.emoji}</span>
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhajansPage;
