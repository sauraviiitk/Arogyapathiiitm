const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Replace with your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyAl1V8RgeQKSrtV43A70vtHYkACwQ1yb7s";

router.post("/analyze-prescription", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' in request body." });
  }

  const prompt = `
You are a medical assistant. Analyze the following prescription:
"${text}"

Extract:
1. List of medicines
2. Purpose of each medicine
3. Dosage instructions
4. Warnings or important notes

Respond in Markdown with headings for each medicine.
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

    const analysis =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No analysis generated.";

    res.json({ analysis });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "AI analysis failed." });
  }
});

module.exports = router;
