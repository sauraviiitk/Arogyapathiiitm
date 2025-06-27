
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { MdVerified } from "react-icons/md";
import { FaLinkedin, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Yoga Practitioner",
    image: "/images/aarav.png",
    review:
      "This platform transformed my daily routine. The bhajans and mantras help me reconnect with myself deeply.",
    linkedIn: "https://linkedin.com/in/aarav-mehta",
  },
  {
    name: "Priya Sharma",
    role: "Therapy Seeker",
    image: "/images/priya.png",
    review:
      "An all-in-one spiritual wellness app. I start and end my day here and it feels like a digital sanctuary.",
    linkedIn: "https://linkedin.com/in/priya-sharma",
  },
  {
    name: "Rohan Verma",
    role: "Daily User",
    image: "/images/rohanverma.png",
    review:
      "Never seen such a peaceful UI and practical tools. This is my calm space every morning and night.",
    linkedIn: "https://linkedin.com/in/rohan-verma",
  },
  {
    name: "Meera Sinha",
    role: "Meditation Coach",
    image: "/images/meera.png",
    review:
      "The mantra section is my favorite. It helps me guide my students with the right sounds and vibration.",
    linkedIn: "https://linkedin.com/in/meera-sinha",
  },
  {
    name: "Ishaan Desai",
    role: "Mindfulness Blogger",
    image: "/images/user5.png",
    review:
      "I recommend this to everyone. It is like a mental reset button with sound guidance and meaningful practices.",
    linkedIn: "https://linkedin.com/in/ishaan-desai",
  },
  {
    name: "Tanvi Patel",
    role: "Student",
    image: "/images/tanvi.png",
    review:
      "During exam season, this platform became my peace partner. I listen to calming bhajans every night.",
    linkedIn: "https://linkedin.com/in/tanvi-patel",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
        ❤️ Hear from Our Community
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-br from-white/70 to-blue-100/30 backdrop-blur-xl border border-blue-200 shadow-xl rounded-2xl p-6 h-full min-h-[420px] flex flex-col items-center text-center relative overflow-hidden group hover:shadow-blue-300 transition-all duration-300">
              {/* Profile Picture */}
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />

              {/* Name and Role */}
              <h4 className="text-xl font-bold text-blue-900 flex items-center justify-center gap-1">
                {t.name}
                <MdVerified className="text-green-500 text-lg" />
              </h4>
              <p className="text-sm text-gray-600 mb-1">{t.role}</p>

              {/* LinkedIn */}
              <a
                href={t.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline text-xs flex items-center gap-1 justify-center mb-4"
              >
                <FaLinkedin /> LinkedIn
              </a>

              {/* Review */}
              <div className="relative px-4 mb-4">
                <FaQuoteLeft className="absolute left-0 top-0 text-blue-200 text-2xl -translate-x-4 -translate-y-1" />
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {t.review}
                </p>
              </div>

              {/* Star Rating */}
              <div className="text-yellow-400 text-lg">⭐️⭐️⭐️⭐️⭐️</div>

              {/* Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-yellow-300 via-pink-300 to-blue-300 transition-all duration-500"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSection;

