const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = "AIzaSyAl1V8RgeQKSrtV43A70vtHYkACwQ1yb7s";

router.post("/", async (req, res) => {
  const { thought } = req.body;

  if (!thought) {
    return res.status(400).json({ error: "Missing 'thought' in request body." });
  }

  const prompt = `
  your name is akshita 
  Give response in English language
  
You're a kind and caring mental wellness coach.



Please gently help them reframe it in a compassionate and non-judgmental way. Use friendly and encouraging language. Make it short (3-5 sentences), supportive, and emotionally warm. If possible, end with a hopeful or empowering reminder.

You're a compassionate therapist using Cognitive Behavioral Therapy (CBT) techniques.

A user has shared the following negative thought:
"${thought}"

Please respond with:
1. A gentle reframe of the thought using CBT techniques.
2. The cognitive distortion involved (if any).
3. A helpful CBT-based tip to address this pattern.

Format your response like:
**Reframe**: ...
**Distortion**: ...
**Tip**: ...
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI.";

    // Optional: parse Markdown-style output into a structured response
    const match = text.match(
      /\*\*Reframe\*\*:\s*(.+?)\n\*\*Distortion\*\*:\s*(.+?)\n\*\*Tip\*\*:\s*(.+)/s
    );

    if (match) {
      res.json({
        reframe: match[1].trim(),
        distortion: match[2].trim(),
        tip: match[3].trim(),
      });
    } else {
      res.json({ raw: text });
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "AI service failed." });
  }
});

module.exports = router;
