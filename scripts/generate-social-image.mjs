import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectFile = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

// Reproducible brand artwork: use only the official Hirance logo.
const logo = await sharp(projectFile("public/images/icon.png"))
  .resize(230, 214, { fit: "contain", background: "#ffffff" })
  .png()
  .toBuffer();
const lettering = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <g font-family="Arial, sans-serif" fill="#0b1648">
    <text x="360" y="245" font-size="92" font-weight="700">Hirance</text>
    <text x="360" y="310" font-size="32">Swipe. Match. Get Hired.</text>
    <text x="100" y="450" font-size="38" font-weight="700">Your next opportunity starts here.</text>
    <text x="100" y="526" font-size="27" fill="#005cff">hirance.com</text>
  </g>
</svg>`);
const image = await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#ffffff" },
})
  .composite([{ input: logo, left: 100, top: 130 }, { input: lettering }])
  .png({ compressionLevel: 9 })
  .toBuffer();

// Keep the previous public URL safe for old shares and external references too.
const { writeFile } = await import("node:fs/promises");
await writeFile(projectFile("public/images/hirance-social.png"), image);
await writeFile(projectFile("public/og.png"), image);
