const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function optimize() {
  const imagesDir = path.join(__dirname, "..", "public", "images");
  const publicDir = path.join(__dirname, "..", "public");

  // 1. Optimize aura-glow-logo.png
  const logoPath = path.join(imagesDir, "aura-glow-logo.png");
  if (fs.existsSync(logoPath)) {
    console.log("Optimizing aura-glow-logo.png...");
    const originalSize = fs.statSync(logoPath).size;

    // Create high-res WebP (max width 600px, 90% quality)
    await sharp(logoPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(imagesDir, "aura-glow-logo.webp"));

    // Overwrite PNG with an optimized PNG (max width 600px, compressed)
    const pngBuffer = await sharp(logoPath)
      .resize({ width: 600, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 90 })
      .toBuffer();

    fs.writeFileSync(logoPath, pngBuffer);
    const newSize = fs.statSync(logoPath).size;
    const webpSize = fs.statSync(path.join(imagesDir, "aura-glow-logo.webp")).size;
    console.log(`aura-glow-logo.png: ${originalSize} -> ${newSize} bytes (WebP: ${webpSize} bytes)`);
  }

  // 2. Optimize brand-logo.png
  const brandLogoPath = path.join(imagesDir, "brand-logo.png");
  if (fs.existsSync(brandLogoPath)) {
    console.log("Optimizing brand-logo.png...");
    await sharp(brandLogoPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(imagesDir, "brand-logo.webp"));

    const pngBuffer = await sharp(brandLogoPath)
      .resize({ width: 600, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 90 })
      .toBuffer();

    fs.writeFileSync(brandLogoPath, pngBuffer);
  }

  // 3. Optimize icon-192x192.png
  const iconPath = path.join(publicDir, "icon-192x192.png");
  if (fs.existsSync(iconPath)) {
    console.log("Optimizing icon-192x192.png...");
    const originalSize = fs.statSync(iconPath).size;

    await sharp(iconPath)
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(publicDir, "icon-192x192.webp"));

    const pngBuffer = await sharp(iconPath)
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(iconPath, pngBuffer);
    const newSize = fs.statSync(iconPath).size;
    console.log(`icon-192x192.png: ${originalSize} -> ${newSize} bytes`);
  }

  // 4. Optimize lash-lift-result.jpg
  const lashPath = path.join(imagesDir, "treatments", "lash-lift-result.jpg");
  if (fs.existsSync(lashPath)) {
    console.log("Optimizing lash-lift-result.jpg...");
    const originalSize = fs.statSync(lashPath).size;

    const inputBuffer = fs.readFileSync(lashPath);
    await sharp(inputBuffer)
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(imagesDir, "treatments", "lash-lift-result.webp"));

    const jpgBuffer = await sharp(inputBuffer)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(lashPath, jpgBuffer);
    const newSize = fs.statSync(lashPath).size;
    console.log(`lash-lift-result.jpg: ${originalSize} -> ${newSize} bytes`);
  }

  console.log("Image optimization completed!");
}

optimize().catch(console.error);
