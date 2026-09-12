// Generates elegant placeholder images in the site palette.
// Run with: node scripts/generate-images.mjs
import sharp from "sharp";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const PALETTE = {
  cream: "#F4F1EA",
  warmWhite: "#FAF9F6",
  olive: "#404638",
  stone: "#AAA69D",
};

function svgGradient(width, height, from, to, label) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      ${
        label
          ? `<text x="50%" y="50%" font-family="Georgia, serif" font-size="${Math.round(
              width / 14
            )}" fill="#FAF9F6" text-anchor="middle" letter-spacing="6" opacity="0.55">${label}</text>`
          : ""
      }
    </svg>
  `);
}

const images = [
  { name: "hero.jpg", width: 1080, height: 1440, from: PALETTE.olive, to: "#20241c", label: "J · C" },
  { name: "story-1.jpg", width: 1000, height: 1250, from: PALETTE.stone, to: PALETTE.olive, label: "" },
  { name: "story-2.jpg", width: 1000, height: 1250, from: PALETTE.olive, to: PALETTE.stone, label: "" },
  { name: "venue.jpg", width: 1600, height: 1000, from: PALETTE.stone, to: "#8a8678", label: "" },
  { name: "gallery-1.jpg", width: 1000, height: 1250, from: PALETTE.cream, to: PALETTE.stone, label: "" },
  { name: "gallery-2.jpg", width: 1000, height: 1250, from: PALETTE.stone, to: PALETTE.cream, label: "" },
  { name: "gallery-3.jpg", width: 1000, height: 1250, from: PALETTE.olive, to: PALETTE.cream, label: "" },
  { name: "og-image.jpg", width: 1200, height: 630, from: PALETTE.olive, to: "#20241c", label: "Javier &amp; Carol" },
];

for (const img of images) {
  const svg = svgGradient(img.width, img.height, img.from, img.to, img.label);
  await sharp(svg).jpeg({ quality: 82 }).toFile(path.join(outDir, img.name));
  console.log(`Generated ${img.name}`);
}

console.log("Done.");
