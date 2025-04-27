const fs = require("fs");
const path = require("path");
const uploadImage = require("../utils/uploadBlob");

const folderPath = path.join(__dirname, "../../event-images");

async function uploadAllImages() {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const localPath = path.join(folderPath, file);
    const url = await uploadImage(localPath);
    console.log(`${file} -> ${url}`);
  }
}

uploadAllImages();
