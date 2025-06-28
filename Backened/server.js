const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend to talk to backend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json()); // Don't forget this to parse JSON bodies

// Your existing routes
const zoomRoutes = require("./routes/zoom");
app.use("/api/zoom", zoomRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
