const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function optimizeDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await optimizeDir(fullPath);
    } else if (file.endsWith(".jpg") || file.endsWith(".jpeg") || (file.endsWith(".png") && !file.endsWith(".webp"))) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const webpPath = path.join(dir, `${base}.webp`);

      const inputBuffer = fs.readFileSync(fullPath);
      // Generate webp if doesn't exist or is older
      if (!fs.existsSync(webpPath)) {
        await sharp(inputBuffer)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);
        console.log(`Generated WebP for: ${file}`);
      }

      // If it's a jpg, optimize jpg
      if (ext === ".jpg" || ext === ".jpeg") {
        const optimizedJpg = await sharp(inputBuffer)
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        if (optimizedJpg.length < inputBuffer.length) {
          fs.writeFileSync(fullPath, optimizedJpg);
          console.log(`Compressed JPG: ${file} (${inputBuffer.length} -> ${optimizedJpg.length})`);
        }
      }
    }
  }
}

async function main() {
  const imagesDir = path.join(__dirname, "..", "public", "images");
  await optimizeDir(imagesDir);
  console.log("All directory images optimized!");
}

main().catch(console.error);
