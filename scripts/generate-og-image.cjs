/**
 * Generate the default OG image for Stewardship Advisory.
 * Produces a 1200x630px PNG at public/image/og-default.png.
 * Uses sharp + SVG approach (no native canvas bindings required).
 */

const path = require("path");
const fs = require("fs");

// Dynamically require sharp (devDependency)
let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error("sharp package not found. Run: npm install -D sharp");
  process.exit(1);
}

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_PATH = path.join(__dirname, "..", "public", "image", "og-default.png");

// SVG template — navy background, decorative circle, firm name, tagline
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Navy background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0A1628"/>

  <!-- Decorative ambient circle — upper right, low opacity -->
  <circle cx="980" cy="120" r="320" fill="#FFFFFF" fill-opacity="0.04"/>

  <!-- Subtle second circle for depth -->
  <circle cx="1100" cy="280" r="180" fill="#FFFFFF" fill-opacity="0.03"/>

  <!-- Thin left accent bar -->
  <rect x="80" y="220" width="3" height="190" fill="#FFFFFF" fill-opacity="0.25"/>

  <!-- Firm name: STEWARDSHIP -->
  <text
    x="120"
    y="295"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="68"
    font-weight="700"
    letter-spacing="8"
    fill="#FFFFFF"
    fill-opacity="1"
  >STEWARDSHIP</text>

  <!-- Firm name: ADVISORY -->
  <text
    x="120"
    y="370"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="68"
    font-weight="300"
    letter-spacing="24"
    fill="#FFFFFF"
    fill-opacity="0.90"
  >ADVISORY</text>

  <!-- Horizontal divider line -->
  <line x1="120" y1="400" x2="680" y2="400" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.20"/>

  <!-- Tagline -->
  <text
    x="120"
    y="435"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="20"
    font-weight="300"
    letter-spacing="1"
    fill="#FFFFFF"
    fill-opacity="0.55"
  >Institutional Communications &amp; Reputation Advisory</text>
</svg>
`.trim();

async function generateOgImage() {
  try {
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .png({ quality: 95 })
      .toFile(OUTPUT_PATH);

    const stats = fs.statSync(OUTPUT_PATH);
    console.log(`OG image generated: ${OUTPUT_PATH}`);
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error("Failed to generate OG image:", err.message);
    process.exit(1);
  }
}

generateOgImage();
