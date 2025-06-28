// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { SendHorizonal } from 'lucide-react';

// export default function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { id: Date.now(), sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = input;
//     setInput('');

//     try {
//       const res = await fetch('http://localhost:5000/api/chatback/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: currentInput }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         id: Date.now() + 1,
//         sender: 'bot',
//         text: data.reply || '⚠️ No response from Arogyapath.',
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           sender: 'bot',
//           text: '❌ Arogyapath is currently unavailable. Please try again.',
//         },
//       ]);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl h-[85vh] flex flex-col rounded-2xl shadow-lg overflow-hidden bg-white">
//         <div className="bg-blue-600 text-white text-xl font-semibold px-6 py-4 shadow-sm">
//           Arogyapath Chat Assistant
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg) => (
//             <motion.div
//               key={msg.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`rounded-xl px-4 py-2 max-w-xs text-sm md:text-base shadow-md transition-all duration-300 ${
//                   msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </motion.div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="p-4 border-t bg-white flex items-center gap-2">
//           <input
//             className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//             placeholder="Ask me anything about your health..."
//           />
//           <button
//             onClick={sendMessage}
//             className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             <SendHorizonal className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { SendHorizonal } from 'lucide-react';

// export default function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { id: Date.now(), sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = input;
//     setInput('');

//     try {
//       const res = await fetch('http://localhost:5000/api/chatback/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: currentInput }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         id: Date.now() + 1,
//         sender: 'bot',
//         text: data.reply || '⚠️ No response from Arogyapath.',
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           sender: 'bot',
//           text: '❌ Arogyapath is currently unavailable. Please try again.',
//         },
//       ]);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Side Image Section */}
//       <div className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
//         <img
//           src="/images/chatbot.png" // make sure this image exists in your public folder
//           alt="Chatbot Assistant"
//           className="w-full h-full object-contain max-h-[500px]"
//         />
//       </div>

//       {/* Right Side Chat Section */}
//       <div className="md:w-1/2 w-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
//         <div className="w-full max-w-xl h-[85vh] flex flex-col rounded-2xl shadow-lg overflow-hidden bg-white">
//           <div className="bg-blue-600 text-white text-xl font-semibold px-6 py-4 shadow-sm">
//             Arogyapath Chat Assistant
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((msg) => (
//               <motion.div
//                 key={msg.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`rounded-xl px-4 py-2 max-w-xs text-sm md:text-base shadow-md ${
//                     msg.sender === 'user'
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </motion.div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-4 border-t bg-white flex items-center gap-2">
//             <input
//               className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               placeholder="Ask me anything about your health..."
//             />
//             <button
//               onClick={sendMessage}
//               className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 text-white"
//             >
//               <SendHorizonal className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/api/chatback/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply || '⚠️ No response from Arogyapath.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: '❌ Arogyapath is currently unavailable. Please try again.',
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100">
      {/* Left Side Image Section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-200 p-6">
        <img
          src="/images/chatbot.png"
          alt="Chatbot Assistant"
          className="w-full h-full object-contain max-h-[500px]"
        />
      </div>

      {/* Right Side Chat Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden bg-white/70 backdrop-blur-lg border border-white">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-semibold px-6 py-4 shadow-sm">
            💬 Arogyapath Chat Assistant
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/30">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-5 py-3 max-w-xs md:max-w-sm rounded-2xl text-sm md:text-base shadow-md whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/80 backdrop-blur-md border-t border-white flex items-center gap-2">
            <input
              className="flex-1 border-none bg-white/80 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message here..."
            />
            <button
              onClick={sendMessage}
              className="rounded-full p-3 bg-gradient-to-tr from-indigo-500 to-blue-500 hover:scale-105 text-white shadow-lg transition"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
