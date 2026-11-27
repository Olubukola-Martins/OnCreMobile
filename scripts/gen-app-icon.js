#!/usr/bin/env node
/**
 * Generates the app icon (iOS + Android) from the OnCRE logomark.
 *
 *   node scripts/gen-app-icon.js
 *
 * Uses the Blue brand variant (blue background, white mark) — the primary app
 * icon on the Foundations board. The mark path is read from the logo asset so
 * it stays in sync. Rasterised with @resvg/resvg-js (no system deps).
 */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const root = path.join(__dirname, '..');
const BG = '#1A44CA'; // brand/blue
const FG = '#FFFFFF';

// Pull the mark path from logo-md.svg (viewBox 0 0 113 128; mark spans ~32–81 x, 32–96 y).
const logo = fs.readFileSync(path.join(root, 'src/assets/logo/logo-md.svg'), 'utf8');
const match = logo.match(/<path d="([^"]+)"/);
if (!match) {
  throw new Error('Could not find mark path in logo-md.svg');
}
const markPath = match[1];

// Centre + scale the mark onto a 1024 canvas (~56% of the tile).
const markGroup = `<g transform="translate(3.5,-64) scale(9)"><path d="${markPath}" fill="${FG}"/></g>`;

function svg(shape) {
  const bg =
    shape === 'round'
      ? `<circle cx="512" cy="512" r="512" fill="${BG}"/>`
      : `<rect width="1024" height="1024" fill="${BG}"/>`;
  return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">${bg}${markGroup}</svg>`;
}

function render(svgStr, size) {
  return new Resvg(svgStr, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

// iOS — single universal 1024 icon (Xcode 14+ downsamples automatically).
const iosDir = path.join(root, 'ios/OnCreMobile/Images.xcassets/AppIcon.appiconset');
fs.writeFileSync(path.join(iosDir, 'icon-1024.png'), render(svg('square'), 1024));
fs.writeFileSync(
  path.join(iosDir, 'Contents.json'),
  JSON.stringify(
    {
      images: [{ filename: 'icon-1024.png', idiom: 'universal', platform: 'ios', size: '1024x1024' }],
      info: { author: 'xcode', version: 1 },
    },
    null,
    2,
  ) + '\n',
);

// Android — legacy launcher PNGs per density (square + round).
const densities = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
for (const [density, size] of Object.entries(densities)) {
  const dir = path.join(root, `android/app/src/main/res/mipmap-${density}`);
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), render(svg('square'), size));
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), render(svg('round'), size));
}

console.log('App icons generated (iOS 1024 + Android mdpi→xxxhdpi, square + round).');
