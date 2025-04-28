// api/index.js (Assuming this is now at the ROOT of your dedicated backend project folder)

// Load environment variables FIRST (important for other modules)
if (process.env.NODE_ENV !== "production") {
  // Ensure .env is in the root of THIS backend project
  require("dotenv").config({
    path: require("path").resolve(process.cwd(), ".env"),
  });
}

const express = require("express");
const cors = require("cors");
// Ensure these paths are relative to THIS index.js location
const corsOptions = require("./config/corsOptions");
const { handleContactForm } = require("./controllers/contactController");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
app.use("/api/events", eventRoutes);
app.post("/api/contact", handleContactForm);

// Example: If you wanted the function at your-backend.vercel.app/ to handle POST directly:
// app.post("/", handleContactForm);
// However, sticking with /api/contact is often clearer if you might add other /api routes later.

// --- Error Handling ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred."
      : err.message;
  res.status(statusCode).json({ success: false, message });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001; // Use port from env var or default to 3001
  app.listen(PORT, () => {
    console.log(`✅ API server listening for local testing on port ${PORT}`);
    console.log(`   Try: POST http://localhost:${PORT}/api/contact`);
    // Add Swagger UI path if you implement it:
    // console.log(`   Swagger UI: http://localhost:${PORT}/api-docs`);
  });
}

// --- Vercel Export ---
// Exports the Express app for Vercel's Node.js runtime
module.exports = app;
