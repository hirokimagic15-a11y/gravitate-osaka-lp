const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgDir = path.join(__dirname, 'assets', 'img');

const tasks = [
  // Hero: tall viewport-filling image, portrait-friendly crop
  { input: 'experience-bg.jpg', output: 'hero-bg-opt.jpg', width: 1920, height: 1080, quality: 82 },
  // Experience section parallax bg
  { input: 'experience-bg.jpg', output: 'experience-bg-opt.jpg', width: 1440, height: 900, quality: 78 },
  // Activity panels — square-ish crops, card size
  { input: 'activity-walk.jpg', output: 'activity-walk-opt.jpg', width: 900, height: 600, quality: 78 },
  { input: 'activity-swing.jpg', output: 'activity-swing-opt.jpg', width: 900, height: 600, quality: 78 },
  { input: 'activity-climb.jpg', output: 'activity-climb-opt.jpg', width: 900, height: 600, quality: 78 },
  // Booking bg
  { input: 'booking-bg.jpg', output: 'booking-bg-opt.jpg', width: 1440, height: 900, quality: 75 },
];

(async () => {
  for (const t of tasks) {
    const inPath  = path.join(imgDir, t.input);
    const outPath = path.join(imgDir, t.output);
    if (!fs.existsSync(inPath)) { console.log(`SKIP (not found): ${t.input}`); continue; }

    const before = fs.statSync(inPath).size;
    await sharp(inPath)
      .resize(t.width, t.height, { fit: 'cover', position: 'center' })
      .jpeg({ quality: t.quality, mozjpeg: true })
      .toFile(outPath);
    const after = fs.statSync(outPath).size;
    console.log(`${t.output}: ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB`);
  }
  console.log('Done.');
})();
