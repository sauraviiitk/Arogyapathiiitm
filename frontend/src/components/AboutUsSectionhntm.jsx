import React from "react";

const AboutUsSectiontm = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">🧠 మా గురించి</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold text-blue-700">ఆరోగ్యపథ్</span> లో, మేము పురాతన ఆధ్యాత్మిక పద్ధతులను ఆధునిక వైద్య పరిజ్ఞానంతో కలిపి మీ మైండ్, బాడీ, సోల్ కోసం సమగ్ర డిజిటల్ వెల్‌నెస్ ప్లాట్‌ఫారమ్‌ను రూపొందిస్తున్నాం.
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
    title: "ఆధ్యాత్మికత మరియు యోగ చికిత్స",
    description: "ధ్యానం చేయండి, భజనాలు వినండి, మరియు మా సమగ్ర యోగ సాధనాలతో అంతర్గత శక్తిని సుమేళనం చేయండి.",
  },
  {
    icon: "👩‍⚕️",
    title: "థెరపీ & సలహాలు",
    description: "మానసిక మరియు శారీరక ఆరోగ్యానికి నిపుణుల్ని కలవండి.",
  },
  {
    icon: "📲",
    title: "AI ఆధారిత హెల్త్ ట్రాకర్",
    description: "మీ మూడ్, నిద్ర మరియు ఒత్తిడిని ట్రాక్ చేయండి మరియు వ్యక్తిగత సలహాలు పొందండి.",
  },
  {
    icon: "📄",
    title: "ప్రిస్క్రిప్షన్ మరియు మెడిసిన్ AI",
    description: "పర్చా స్కాన్ చేసి, డోస్ అలర్ట్స్ మరియు రిమైండర్స్ పొందండి.",
  },
  {
    icon: "⏰",
    title: "స్మార్ట్ రోజువారీ రిమైండర్స్",
    description: "మందులు, ధ్యానం, థెరపీ మరియు సెల్ఫ్ కేర్‌కు రిమైండర్స్ పొందండి.",
  },
  {
    icon: "🤝",
    title: "డాక్టర్ డాష్‌బోర్డ్",
    description: "డాక్టర్లు అపాయింట్‌మెంట్‌లు నిర్వహించవచ్చు మరియు పేషెంట్స్‌తో సమాచారం పంచుకోవచ్చు.",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-lg border border-blue-100 shadow-lg rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default AboutUsSectiontm;
