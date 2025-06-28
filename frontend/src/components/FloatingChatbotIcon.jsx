import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function FloatingChatbotIcon() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate("/chatapp")}
        className="bg-blue-800 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 animate-bounce hover:animate-none"
        title="Talk to Arogyapath Assistant"
      >
        <BsStars className="w-6 h-6" />
      </button>
    </div>
  );
}
