import { useEffect, useRef, useState } from "react";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:5000");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <div className="p-4 max-h-[400px] overflow-y-scroll space-y-2 bg-gray-100 rounded-xl m-4">
      {messages.map((msg, index) => (
        <div key={index} className="bg-white p-3 rounded-xl shadow-sm">
          <div className="font-semibold text-sm text-gray-800">
            {msg.name}
          </div>
          <div className="text-gray-600">{msg.message}</div>
          <div className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
