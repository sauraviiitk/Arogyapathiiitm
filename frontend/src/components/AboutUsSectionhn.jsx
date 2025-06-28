import React from "react";

const AboutUsSectionhn = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">🧠 हमारे बारे में</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-blue-700">आरोग्यपथ</span> में, हम प्राचीन आध्यात्मिक प्रथाओं को आधुनिक चिकित्सा नवाचारों के साथ जोड़कर आपके मन, शरीर और आत्मा के लिए एक समग्र डिजिटल वेलनेस प्लेटफ़ॉर्म बनाते हैं।
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

const features = [
  {
    icon: "🧘‍♂️",
    title: "आध्यात्मिक और योग उपचार",
    description: "मार्गदर्शित ध्यान का अभ्यास करें, भजन सुनें, और हमारे समग्र योग टूल्स से अपनी आंतरिक ऊर्जा को संतुलित करें।",
  },
  {
    icon: "👩‍⚕️",
    title: "थेरेपी और परामर्श",
    description: "मानसिक और शारीरिक स्वास्थ्य के लिए प्रमाणित चिकित्सकों और डॉक्टरों से अपॉइंटमेंट बुक करें।",
  },
  {
    icon: "📲",
    title: "एआई-समर्थित स्वास्थ्य ट्रैकर",
    description: "अपने मूड, नींद और तनाव को ट्रैक करें और स्मार्ट विश्लेषण के साथ व्यक्तिगत सुझाव प्राप्त करें।",
  },
  {
    icon: "📄",
    title: "पर्ची और दवा एआई",
    description: "पर्चियों को स्कैन करें और हमारे बुद्धिमान एआई सिस्टम से डोज़ अलर्ट, रिमाइंडर और स्पष्टता पाएं।",
  },
  {
    icon: "⏰",
    title: "स्मार्ट दैनिक अनुस्मारक",
    description: "दवाओं, ध्यान, थेरेपी और आत्म-देखभाल में निरंतरता बनाए रखें कस्टमाइज़ेबल अलर्ट्स के साथ।",
  },
  {
    icon: "🤝",
    title: "डॉक्टर डैशबोर्ड",
    description: "डॉक्टर अपॉइंटमेंट्स प्रबंधित कर सकते हैं, लॉग्स की समीक्षा कर सकते हैं, और उपचार सामग्री सीधे रोगियों के साथ साझा कर सकते हैं।",
  },
];

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-lg border border-blue-100 shadow-lg rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default AboutUsSectionhn;
