import React, { useEffect, useRef, useState } from "react";
import { useUserRole } from "../../Context/UserContext";
import { useFirebase } from "../../Context/Firebase";

const CommunityFeed = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [commentInput, setCommentInput] = useState({});

  const ws = useRef(null);
  const { role } = useUserRole();
  const { user, db } = useFirebase();

  useEffect(() => {
    const fetchFullName = async () => {
      if (!user || !user.uid) return;
      try {
        const docRef = db.collection("Patient").doc(user.uid);
        const docSnap = await docRef.get();
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSenderName(data.fullName || user.displayName || "Anonymous");
        } else {
          setSenderName(user.displayName || "Anonymous");
        }
      } catch (error) {
        console.error("Error fetching full name:", error);
        setSenderName(user.displayName || "Anonymous");
      }
    };
    fetchFullName();
  }, [user, db]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMsg = {
        id: Date.now(),
        sender: senderName,
        content: data.fromServer,
        timestamp: new Date().toISOString(),
        avatar: user?.photoURL || "https://via.placeholder.com/40",
      };
      setMessages((prev) => [newMsg, ...prev]);
      setLikes((prev) => ({ ...prev, [newMsg.id]: [] }));
      setComments((prev) => ({ ...prev, [newMsg.id]: [] }));
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, [senderName, user]);

  const handleSend = () => {
    if (input.trim() && ws.current.readyState === WebSocket.OPEN) {
      const payload = {
        message: input,
        sender: senderName,
        timestamp: new Date().toISOString(),
      };
      ws.current.send(JSON.stringify(payload));
      setInput("");
    }
  };

  const handleLike = (postId) => {
    setLikes((prev) => {
      const alreadyLiked = prev[postId]?.includes(user.uid);
      return {
        ...prev,
        [postId]: alreadyLiked
          ? prev[postId].filter((id) => id !== user.uid)
          : [...(prev[postId] || []), user.uid],
      };
    });
  };

  const handleAddComment = (postId) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;

    const newComment = {
      sender: senderName,
      content: text,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!user || role !== "Patient") return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* New Post Box */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-start space-x-3">
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="What's on your mind?"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-full font-medium text-sm ${
                  input.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex items-start space-x-3">
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{msg.sender}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-800">{msg.content}</p>

                {/* Actions */}
                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleLike(msg.id)}
                    className="hover:text-blue-500"
                  >
                    👍 {likes[msg.id]?.length || 0}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedMessage(
                        expandedMessage === msg.id ? null : msg.id
                      )
                    }
                    className="hover:text-blue-500"
                  >
                    💬 {comments[msg.id]?.length || 0}
                  </button>
                </div>

                {/* Comment Section */}
                {expandedMessage === msg.id && (
                  <div className="mt-3">
                    {(comments[msg.id] || []).map((c, i) => (
                      <div key={i} className="mb-2 pl-3 border-l">
                        <p className="text-sm font-semibold text-gray-700">
                          {c.sender}
                        </p>
                        <p className="text-sm text-gray-600">{c.content}</p>
                      </div>
                    ))}
                    <textarea
                      className="w-full mt-2 border rounded p-2 text-sm"
                      rows="2"
                      placeholder="Write a comment..."
                      value={commentInput[msg.id] || ""}
                      onChange={(e) =>
                        setCommentInput((prev) => ({
                          ...prev,
                          [msg.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAddComment(msg.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(msg.id)}
                      className="mt-1 text-blue-600 text-sm hover:underline"
                    >
                      Post Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No posts yet. Be the first to share something!
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
