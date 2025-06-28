const express = require("express");
const cors = require("cors");
const http = require("http");


const reminderRoute = require("./routes/reminder");
const prescriptionRoute = require("./routes/prescription");
const chatRoute = require("./routes/chatback");
const reframeRoute = require("./routes/reframe");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reframe", reframeRoute);
app.use("/api/reminder", reminderRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/chatback", chatRoute);

const timeMachineRoute = require("./routes/timemachine");
app.use("/api/emotion-memory", timeMachineRoute);
const moodRoutes = require("./routes/moodCheckin");
app.use("/api/mood", moodRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
