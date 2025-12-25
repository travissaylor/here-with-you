#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

const svgBuffer = readFileSync(join(projectRoot, 'public/favicon.svg'));

async function generateIcons() {
  console.log('Generating PWA icons...\n');

  for (const size of sizes) {
    const fileName =
      size === 180
        ? `apple-touch-icon-v1-${size}x${size}.png`
        : `icon-${size}x${size}.png`;

    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(join(projectRoot, 'public/icons', fileName));

    console.log(`✓ Generated ${fileName}`);
  }

  console.log('\n✅ All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
