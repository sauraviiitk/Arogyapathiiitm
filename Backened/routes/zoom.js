const express = require("express");
const axios = require("axios");
const router = express.Router();

// Replace these with your actual Zoom credentials
const ZOOM_ACCOUNT_ID = "UG-2FjLsT8CIxXRJ-PjyCA";
const ZOOM_CLIENT_ID = "ctP4OCFhQJWNnao77SDNDQ";
const ZOOM_CLIENT_SECRET = "NKIAv9fSCbOe8wXwAgYez97fig2hSY8W";

async function getAccessToken() {
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
  const response = await axios.post(tokenUrl, null, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64"),
    },
  });
  return response.data.access_token;
}

router.post("/create-meeting", async (req, res) => {
  const { hostEmail } = req.body;

  if (!hostEmail) {
    return res.status(400).json({ error: "hostEmail is required" });
  }

  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `https://api.zoom.us/v2/users/${hostEmail}/meetings`,
      {
        topic: "Video Consultation",
        type: 1,
        settings: {
          join_before_host: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Zoom meeting creation error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to create Zoom meeting" });
  }
});

module.exports = router;
