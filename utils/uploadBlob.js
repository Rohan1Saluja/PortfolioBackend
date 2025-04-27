const { put } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function uploadImage(localFilePath) {
  const fileStream = fs.createReadStream(localFilePath);

  console.log("Using token:", process.env.BLOB_READ_WRITE_TOKEN);

  const { url } = await put(path.basename(localFilePath), fileStream, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
  });

  console.log("✅ Uploaded:", url);
  return url;
}

module.exports = uploadImage;
