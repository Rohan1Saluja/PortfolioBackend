// api/services/mailer.js
const nodemailer = require("nodemailer");

// Ensure env vars are loaded by the main index.js first if running locally
// Validate environment variables
if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.EMAIL_TO
) {
  console.error(
    "Mailer Service: Missing required email environment variables!"
  );
  // Decide how to handle this - throw error? return null transporter?
  // Throwing an error might be best to prevent app start without config.
  throw new Error(
    "Missing required email environment variables for mailer service."
  );
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE === "gmail" ? "gmail" : undefined,
  host:
    process.env.EMAIL_SERVICE !== "gmail"
      ? process.env.EMAIL_SERVICE
      : undefined,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer config error:", error);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});

module.exports = transporter; // Export the configured transporter instance
