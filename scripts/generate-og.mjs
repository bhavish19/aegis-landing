import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "public/assets/og-image.png");
const logoPath = join(root, "public/assets/aegis-logo.png");

const LOGO_HEIGHT = 300;
const PANEL_PAD = 28;
const PANEL_X = 748;
const PANEL_Y = 118;

const logo = await sharp(logoPath)
  .resize({ height: LOGO_HEIGHT, fit: "inside" })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

const panelW = logoMeta.width + PANEL_PAD * 2;
const panelH = logoMeta.height + PANEL_PAD * 2;
const logoX = PANEL_X + PANEL_PAD;
const logoY = PANEL_Y + PANEL_PAD;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#060d18"/>
      <stop offset="1" stop-color="#0a1525"/>
    </linearGradient>
    <filter id="grain" x="0" y="0">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0"/>
      <feBlend in="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" filter="url(#grain)" opacity="0.35"/>
  <rect x="0" y="0" width="6" height="630" fill="#2a9d8f"/>

  <text x="72" y="88" fill="#8ba5bf" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="0.02em">
    University of Manchester × University of Sheffield
  </text>

  <text x="72" y="168" fill="#3bbfad" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic">
    Compliance without Compromise
  </text>

  <text x="72" y="218" fill="#8ba5bf" font-family="Arial, Helvetica, sans-serif" font-size="24">
    Client-side zero-knowledge compliance middleware
  </text>

  <rect x="${PANEL_X}" y="${PANEL_Y}" width="${panelW}" height="${panelH}" rx="16" fill="#ffffff" fill-opacity="0.98"/>
  <rect x="${PANEL_X}" y="${PANEL_Y}" width="${panelW}" height="${panelH}" rx="16" fill="none" stroke="#d8dee8" stroke-width="1"/>

  <rect x="72" y="258" width="340" height="72" rx="10" fill="#3bbfad"/>
  <rect x="72" y="258" width="340" height="72" rx="10" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
  <text x="242" y="303" fill="#060d18" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" text-anchor="middle">
    Learn More
  </text>

  <text x="72" y="378" fill="#f0f4f8" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600">
    Request a pilot integration
  </text>

  <text x="72" y="408" fill="#4a6278" font-family="Arial, Helvetica, sans-serif" font-size="18">
    aegis-proof.vercel.app
  </text>

  <rect x="72" y="448" width="220" height="40" rx="6" fill="#2a9d8f" fill-opacity="0.12" stroke="#2a9d8f" stroke-opacity="0.35"/>
  <text x="182" y="474" fill="#3bbfad" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="600" text-anchor="middle">
    No PII shared
  </text>
</svg>`;

const png = await sharp(Buffer.from(svg))
  .resize(1200, 630, { fit: "fill" })
  .composite([{ input: logo, left: logoX, top: logoY }])
  .png({
    compressionLevel: 9,
    palette: true,
    quality: 90,
    effort: 10,
  })
  .toBuffer();

writeFileSync(outPath, png);

const kb = (png.length / 1024).toFixed(1);
console.log(`Wrote ${outPath} (1200×630, ${kb} KB)`);
