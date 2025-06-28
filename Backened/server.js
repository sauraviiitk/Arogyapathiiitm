// const express = require("express");
// const cors = require("cors");
// const http = require("http");


// const reminderRoute = require("./routes/reminder");
// const prescriptionRoute = require("./routes/prescription");
// const chatRoute = require("./routes/chatback");
// const reframeRoute = require("./routes/reframe");

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/reframe", reframeRoute);
// app.use("/api/reminder", reminderRoute);
// app.use("/api/prescription", prescriptionRoute);
// app.use("/api/chat", chatRoute);
// const mood=require('./routes/moodcheckin')
// const timeMachineRoute = require("./routes/timemachine");
// app.use("/api/emotion-memory", timeMachineRoute);
// app.use('/api/mood',mood);
// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws"); // ✅ Add WebSocket import

const reminderRoute = require("./routes/reminder");
const prescriptionRoute = require("./routes/prescription");
const chatRoute = require("./routes/chatback");
const reframeRoute = require("./routes/reframe");
const mood = require('./routes/moodcheckin');
const timeMachineRoute = require("./routes/timemachine");

const app = express();
const server = http.createServer(app); // ✅ keep as is

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reframe", reframeRoute);
app.use("/api/reminder", reminderRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/chat", chatRoute);
app.use("/api/emotion-memory", timeMachineRoute);
app.use("/api/mood", mood);

// ✅ WebSocket setup
const wss = new WebSocket.Server({ server }); // Attach to existing HTTP server

wss.on("connection", (ws) => {
  console.log("🔌 WebSocket client connected");

  ws.on("message", (message) => {
    try {
      const parsed = JSON.parse(message);
      console.log("💬 Received from client:", parsed.message);

      // Broadcast to all other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ fromServer: parsed.message }));
        }
      });

      // Echo back to sender
      ws.send(JSON.stringify({ fromServer: parsed.message }));
    } catch (err) {
      console.error("❌ Invalid WebSocket message:", err.message);
    }
  });

  ws.on("close", () => {
    console.log("❌ WebSocket client disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
