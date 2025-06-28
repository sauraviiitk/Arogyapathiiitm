const express = require("express");
const cors = require("cors");
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Route Imports
const reminderRoute = require("./routes/reminder");
const prescriptionRoute = require("./routes/prescription");
const chatRoute = require("./routes/chatback");
// Route Mounting (all under /api)
app.use("/api/reminder", reminderRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/chat", chatRoute);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
