// src/Context/socket.js
let socket;

export const initSocket = () => {
const socket = new WebSocket("ws://localhost:5173/ws");

  socket.onopen = () => console.log("✅ WebSocket connected");
  socket.onerror = (e) => console.error("❌ WebSocket error", e);
  socket.onclose = () => console.log("🔌 WebSocket closed");

  return socket;
};

export const getSocket = () => socket;
