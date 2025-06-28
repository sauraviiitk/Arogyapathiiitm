import { useState, useEffect, useRef } from "react";
import { useFirebase } from "../../Context/Firebase";

const MessageSender = () => {
  const { user } = useFirebase();
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:5000");

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && message.trim()) {
      const payload = {
        uid: user?.uid || "anonymous",
        name: user?.email || "Guest",
        message,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessage("");
    }
  };

  return (
    <div className="p-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-xl px-4 py-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageSender;
