
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">🧠 About Us</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At <span className="font-semibold text-blue-700">Aarogyapath</span>, we blend ancient spiritual practices with modern medical innovations to create a comprehensive digital wellness platform for your mind, body, and soul.
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
    title: "Spiritual & Yoga Healing",
    description: "Practice guided meditation, listen to bhajans, and align your inner energies with our holistic yoga tools.",
  },
  {
    icon: "👩‍⚕️",
    title: "Therapy & Consultations",
    description: "Book appointments with certified therapists and doctors for mental and physical health consultations.",
  },
  {
    icon: "📲",
    title: "AI-Powered Health Tracker",
    description: "Track your mood, sleep, and stress with smart analytics and receive personalized well-being suggestions.",
  },
  {
    icon: "📄",
    title: "Prescription & Medicine AI",
    description: "Scan prescriptions and get dosage alerts, reminders, and clarity using our intelligent AI system.",
  },
  {
    icon: "⏰",
    title: "Smart Daily Reminders",
    description: "Stay consistent with meds, mindfulness, therapy, and self-care through customizable alerts.",
  },
  {
    icon: "🤝",
    title: "Doctor Dashboard",
    description: "Doctors can manage appointments, review logs, and share healing content directly with patients.",
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

export default AboutUsSection;

