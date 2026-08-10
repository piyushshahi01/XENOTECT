const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');

// Compress all JPG/PNG images in a directory recursively
async function compressImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await compressImages(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (ext === '.jpg' || ext === '.jpeg') {
      const input = fs.readFileSync(fullPath);
      const metadata = await sharp(input).metadata();
      const originalSize = input.length;

      const compressed = await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true }) // max 1600px wide
        .jpeg({ quality: 72, progressive: true, mozjpeg: true })
        .toBuffer();

      if (compressed.length < originalSize) {
        fs.writeFileSync(fullPath, compressed);
        console.log(`✅ JPG  ${entry.name}: ${(originalSize / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB`);
      } else {
        console.log(`⏩ Skip ${entry.name} (already optimal)`);
      }
    }

    if (ext === '.png') {
      const input = fs.readFileSync(fullPath);
      const originalSize = input.length;

      const compressed = await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 80 })
        .toBuffer();

      if (compressed.length < originalSize) {
        fs.writeFileSync(fullPath, compressed);
        console.log(`✅ PNG  ${entry.name}: ${(originalSize / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB`);
      } else {
        console.log(`⏩ Skip ${entry.name} (already optimal)`);
      }
    }
  }
}

async function main() {
  console.log('🖼️  Compressing images in /public...\n');
  await compressImages(publicDir);
  console.log('\n✅ Image compression complete!');
}

main().catch(console.error);
