import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectFile = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

// Export the generated artwork at the standard Open Graph dimensions.
await sharp(projectFile("output/imagegen/hirance-og-source.png"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9 })
  .toFile(projectFile("public/og.png"));
