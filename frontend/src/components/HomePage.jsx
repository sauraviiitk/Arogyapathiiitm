import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import TestimonialsSection from "./TestimonialsSection";
import AboutUsSection from "./AboutUsSection";       // English
import AboutUsSectionhn from "./AboutUsSectionhn";   // Hindi
import AboutUsSectionmr from "./AboutUsSectionmr";   // Marathi
import AboutUsSectiontm from "./AboutUsSectionhntm"; // Telugu

import Footer from "./Footer";
import FloatingChatbotIcon from "./FloatingChatbotIcon";
import { useFirebase } from "../Context/Firebase";
import { useUserRole } from "../Context/UserContext";
import CommunityFeed from "../depression/community/PostInput";
const HomePage = () => {
  const { role } = useUserRole();
  const { user } = useFirebase();

  // 🟡 Language state
  const [language, setLanguage] = useState("en");

  // 🔁 Render About section based on language
  const renderAboutSection = () => {
    switch (language) {
      case "hi":
        return <AboutUsSectionhn />;
      case "mr":
        return <AboutUsSectionmr />;
      case "te":
        return <AboutUsSectiontm />;
      default:
        return <AboutUsSection />;
    }
  };

  return (
    <div className="pt-0">
      {/* 🌐 Language Switcher */}
      <div className="w-full flex justify-end items-center p-4 bg-blue-100">
        <label htmlFor="lang" className="mr-2 font-semibold text-blue-900">Language:</label>
        <select
          id="lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      {/* 🖼️ Hero Swiper Banner */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[vh]"
      >
        <SwiperSlide>
          <img src="/images/banner1.png" alt="Banner 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/banner2.png" alt="Banner 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/banner3.png" alt="Banner 3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>

      {/* 🧠 About Section (Language-dependent) */}
      {renderAboutSection()}

      {/* 🌟 Testimonials */}
      <TestimonialsSection />
      {/* <CommunityForum /> */}
      <CommunityFeed/>

      {/* 👥 Community Forum */}
      {/* <CommunityForum /> */}

      {/* 🔻 Footer */}
      <Footer />

      {/* 🤖 Chatbot for patients only */}
      {user && role === "Patient" && <FloatingChatbotIcon />}
    </div>
  );
};

export default HomePage;
