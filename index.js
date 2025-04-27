// api/index.js

// Load environment variables FIRST (important for other modules)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: require("path").resolve(process.cwd(), ".env"),
  }); // Ensure correct .env path
}

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions"); // Import CORS config
const { handleContactForm } = require("./controllers/contactController"); // Import controller

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
app.post("/api/contact", handleContactForm);

// --- Error Handling (Optional but Recommended) ---
// Add a simple error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  // Avoid sending stack trace in production
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred."
      : err.message;
  res.status(statusCode).json({ success: false, message });
});

// --- Vercel Export ---
module.exports = app;
