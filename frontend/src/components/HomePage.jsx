// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { useParams } from "react-router-dom";
// import TestimonialsSection from "./TestimonialsSection";
// import AboutUsSection from "./AboutUsSection";
// import CommunityForum from "./CommunityForum";
// import Footer from "./Footer";
// const HomePage = () => {
//   const {role}=useParams();
//   return (
//     <div className="pt-0"> {/* Pushes content below fixed navbar */}
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={true}
//         className="w-full h-[vh]"
//       >
//         <SwiperSlide>
//           <img
//             src="/images/banner1.png"
//             alt="Banner 1"
//             className="w-full h-full object-cover"
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/images/banner2.png"
//             alt="Banner 2"
//             className="w-full h-full object-cover"
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="images/banner3.png"
//             alt="Banner 3"
//             className="w-full h-full object-cover"
//           />
//         </SwiperSlide>
//       </Swiper>

//       {/* Optional Welcome Content */}
//        <AboutUsSection/>
//       <TestimonialsSection />
//       {/* <AboutUsSection/> */}
//        <CommunityForum  />
//        <Footer/>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import { useParams } from "react-router-dom";
import TestimonialsSection from "./TestimonialsSection";
import AboutUsSection from "./AboutUsSection";
import CommunityForum from "./CommunityForum";
import Footer from "./Footer";
import FloatingChatbotIcon from "./FloatingChatbotIcon"; // make sure this is correctly imported
import { useFirebase } from "../Context/Firebase";
import { useUserRole } from "../Context/UserContext";
import CommunityFeed from "../depression/community/PostInput";
const HomePage = () => {
  // const { role } = useParams(); // URL like /home/patient or /home/doctor
    const { role } = useUserRole();
const { user } = useFirebase();
  return (
    <div className="pt-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[vh]"
      >
        <SwiperSlide>
          <img
            src="/images/banner1.png"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/banner2.png"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="images/banner3.png"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <AboutUsSection />
      <TestimonialsSection />
      {/* <CommunityForum /> */}
      <CommunityFeed/>
      <Footer />

      {/* Only show chatbot to patients
      {role === "Patient" && <FloatingChatbotIcon />} */}
      {user && role === "Patient" && <FloatingChatbotIcon />}
    </div>
  );
};

export default HomePage;
