import React from "react";
import YogaFeatures from "./YogaFeatures";
const YogaPage = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
    <div className="w-full flex justify-center  bg-gray-50">
      <img
        src="/images/yoga_banner.png"
        alt="Yoga Banner"
        className="max-w-full h-auto"
        style={{ display: "block" }}
      />
    </div>
     <YogaFeatures />
    </div>
  );
};

export default YogaPage;
