const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const router = express.Router();

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sauraviiitk18@gmail.com",
    pass: "vpoz jjjw kbwz ksvq",
  },
});

// In-memory task storage (in production, use a DB)
const reminders = [];

router.post("/schedule-reminder", (req, res) => {
  const { to, subject, message, time } = req.body;

  const [hour, minute] = time.split(":"); // e.g., "09:30"

  // Create a cron expression like "30 9 * * *" → every day at 09:30
  const cronTime = `${minute} ${hour} * * *`;

  const task = cron.schedule(cronTime, () => {
    transporter.sendMail(
      {
        from: '"Arogyapath Reminder" <sauraviiitk18@gmail.com>',
        to,
        subject,
        text: message,
      },
      (err, info) => {
        if (err) {
          console.error("Email failed:", err);
        } else {
          console.log(`Email sent to ${to}:`, info.response);
        }
      }
    );
  });

  reminders.push({ to, subject, time, task }); // for reference

  res.json({ success: true, message: "Reminder scheduled via cron!" });
});

module.exports = router;




