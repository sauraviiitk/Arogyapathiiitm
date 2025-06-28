const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = "AIzaSyAl1V8RgeQKSrtV43A70vtHYkACwQ1yb7s";

router.post("/", async (req, res) => {
  const { memory } = req.body;

  if (!memory || memory.trim().length < 10) {
    return res.status(400).json({ error: "Please provide a meaningful memory." });
  }

  const prompt = `
You are an empathetic therapist and emotional guide. A user is recalling a meaningful emotional memory:

"${memory}"

Please reflect on this memory by answering:
1. What emotions are present?
2. What might this memory reveal about the user's values, fears, or personal growth?
3. What lessons or strengths might the user have taken from this moment?

Respond with warmth, emotional insight, and encouragement.
Format your answer in three sections:
- **Emotional Insight**
- **Personal Growth**
- **Encouragement**
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const analysis =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Gemini could not reflect on the memory.";

    res.json({ analysis });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "Reflection failed. Please try again later." });
  }
});

module.exports = router;
