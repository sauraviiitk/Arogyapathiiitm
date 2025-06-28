import React from "react";

const AboutUsSectionmr = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">🧠 आमच्याबद्दल</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-blue-700">आरोग्यपथ</span> मध्ये, आम्ही प्राचीन आध्यात्मिक पद्धती आणि आधुनिक वैद्यकीय नवकल्पनांचे एकत्रीकरण करून तुमच्या मन, शरीर आणि आत्म्यासाठी एक सर्वसमावेशक डिजिटल आरोग्य प्लॅटफॉर्म तयार करतो.
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
    title: "आध्यात्मिक आणि योग उपचार",
    description: "मार्गदर्शित ध्यान करा, भजन ऐका आणि आमच्या समग्र योग साधनांनी तुमची ऊर्जा संतुलित करा.",
  },
  {
    icon: "👩‍⚕️",
    title: "थेरपी आणि सल्लामसलत",
    description: "मानसिक आणि शारीरिक आरोग्यासाठी प्रमाणित तज्ञांशी अपॉइंटमेंट बुक करा.",
  },
  {
    icon: "📲",
    title: "एआय-सक्षम आरोग्य ट्रॅकर",
    description: "तुमचे मूड, झोप आणि तणाव ट्रॅक करा आणि वैयक्तिक सल्ले मिळवा.",
  },
  {
    icon: "📄",
    title: "प्रिस्क्रिप्शन आणि औषध एआय",
    description: "पर्चे स्कॅन करा आणि आमच्या स्मार्ट सिस्टममधून डोज़ अलर्ट आणि रिमाइंडर्स मिळवा.",
  },
  {
    icon: "⏰",
    title: "स्मार्ट डेली रिमाइंडर्स",
    description: "दैनंदिन औषधे, ध्यान, थेरपी आणि सेल्फ-केअरसाठी वेळेवर सूचना मिळवा.",
  },
  {
    icon: "🤝",
    title: "डॉक्टर डॅशबोर्ड",
    description: "डॉक्टर अपॉइंटमेंट्स, रिपोर्ट्स आणि सामग्री रोग्यांसोबत सहज शेअर करू शकतात.",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-lg border border-blue-100 shadow-lg rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default AboutUsSectionmr;
