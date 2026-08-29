import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const name = "NZ BEEF PREMIUM MINCE";
const store = "new world";
const productId = "67a5b555b7d6439fc8e56ecf";

const nameWithStore = name + " " + store;
const data = JSON.stringify({
  "q": nameWithStore,
  "gl": "nz"
});

const options = {
  hostname: 'google.serper.dev',
  path: '/images',
  method: 'POST',
  headers: {
    'X-API-KEY': '50468e5b5dc466f3f3a0921b178d0f9e1ee2ddaa',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      const imagesArray = jsonData.images;
      if (imagesArray && imagesArray.length > 0) {
        const firstImage = imagesArray[0];
        const firstImageUrl = firstImage.imageUrl;
        const tempPath = path.join(__dirname, 'temp.png');
        const targetDir = path.join(__dirname, '..', '..', 'data', 'products', 'origin');
        const thumbDir = path.join(__dirname, '..', '..', 'data', 'products', 'thumbs');
        const finalPath = path.join(targetDir, `${productId}.png`);
        const thumbPath = path.join(thumbDir, `thumb_${productId}.png`);

        fs.mkdirSync(targetDir, { recursive: true });
        fs.mkdirSync(thumbDir, { recursive: true });

        const file = fs.createWriteStream(tempPath);
        https.get(firstImageUrl, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              fs.rename(tempPath, finalPath, (err) => {
                if (err) {
                  console.error("Error moving file:", err);
                  fs.unlink(tempPath, () => {});
                } else {
                  fs.copyFile(finalPath, thumbPath, (err) => {
                    if (err) {
                      console.error("Error copying thumbnail:", err);
                    }
                  });
                }
              });
            });
          });
        }).on('error', (err) => {
          console.error("Error downloading image:", err);
          fs.unlink(tempPath, () => {});
        });
      } else {
        console.log("No images found in the JSON data.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
