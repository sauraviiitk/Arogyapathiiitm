const express = require("express");
const cors = require("cors");
const http = require("http"); // Required to attach WebSocket
const { setupWebSocket } = require("./routes/websocket");

// Route Imports
const reminderRoute = require("./routes/reminder");
const prescriptionRoute = require("./routes/prescription");
const chatRoute = require("./routes/chatback");
const reframeRoute = require("./routes/reframe");

const app = express();
const server = http.createServer(app); // Create HTTP server for WS

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (all under /api)
app.use("/api/reframe", reframeRoute);
app.use("/api/reminder", reminderRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/chat", chatRoute);

// WebSocket Setup
setupWebSocket(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ HTTP + WebSocket server running on http://localhost:${PORT}`);
});
