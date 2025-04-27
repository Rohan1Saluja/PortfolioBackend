// api/config/corsOptions.js

// Ensure env vars are loaded by the main index.js first if running locally
const allowedOrigins = [
  process.env.FRONTEND_URL_DEV,
  process.env.FRONTEND_URL_PROD,
].filter(Boolean); // Filter out undefined values if some aren't set

if (allowedOrigins.length === 0 && process.env.NODE_ENV !== "production") {
  console.warn(
    "CORS Warning: No FRONTEND_URL_DEV or FRONTEND_URL_PROD defined in env. Allowing all origins for local development ONLY."
  );
} else if (
  allowedOrigins.length === 0 &&
  process.env.NODE_ENV === "production"
) {
  console.error(
    "CORS Error: No FRONTEND_URL_PROD defined in production environment!"
  );
  // Consider throwing an error in production if no origins are set
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin OR from allowed domains
    // For local development, you might want less strict checking ONLY if allowedOrigins is empty
    const isAllowed = !origin || allowedOrigins.indexOf(origin) !== -1;

    // Less strict local development check (use with caution)
    // const isDev = process.env.NODE_ENV !== 'production';
    // const isAllowed = !origin || allowedOrigins.indexOf(origin) !== -1 || (isDev && allowedOrigins.length === 0);

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`); // Log blocked origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "POST, OPTIONS", // Methods your API uses
  allowedHeaders: "Content-Type, Accept", // Headers your frontend sends
  // credentials: true, // Add if you need to handle cookies/sessions
};

module.exports = corsOptions;
