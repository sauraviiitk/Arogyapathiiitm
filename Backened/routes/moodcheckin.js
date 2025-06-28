const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = "AIzaSyAl1V8RgeQKSrtV43A70vtHYkACwQ1yb7s"; // Replace with your actual API key

router.post("/reflect", async (req, res) => {
  const { mood, text } = req.body;

  if (!text || !mood) {
    return res.status(400).json({ error: "Missing mood or text in request." });
  }

  const prompt = `
You are a compassionate mental wellness assistant.
The user checked in with the mood: "${mood}" and wrote:
"${text}"

Respond with:
1. A brief emotional reflection (2-3 sentences)
2. An uplifting affirmation
3. A gentle suggestion or coping tip if the mood is negative.

Use friendly, empathetic tone.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Reflection service failed." });
  }
});

module.exports = router;