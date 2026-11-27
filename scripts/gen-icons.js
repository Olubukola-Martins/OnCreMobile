#!/usr/bin/env node
/**
 * Regenerates src/components/Icon/registry.ts from the SVGs in
 * src/assets/icons. Run after adding/removing an icon:
 *
 *   node scripts/gen-icons.js
 *
 * Every icon SVG must use `currentColor` for stroke/fill so <Icon> can recolour
 * it per theme. New SVGs with hard-coded colours should be converted first.
 */
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'src', 'assets', 'icons');
const outFile = path.join(__dirname, '..', 'src', 'components', 'Icon', 'registry.ts');

const names = fs
  .readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'))
  .map(f => f.replace(/\.svg$/, ''))
  .sort();

// PascalCase so reserved words (e.g. `delete`) become safe identifiers (`Delete`).
const ident = n => n.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());

let out = '// AUTO-GENERATED icon registry. Run scripts/gen-icons to refresh.\n';
out += '// Each SVG uses `currentColor`, so <Icon> recolours it via the `color` prop.\n';
out += "import type React from 'react';\n";
out += "import type { SvgProps } from 'react-native-svg';\n\n";
for (const n of names) out += `import ${ident(n)} from '@/assets/icons/${n}.svg';\n`;
out += '\nexport const icons = {\n';
for (const n of names) out += `  '${n}': ${ident(n)},\n`;
out += '} as const satisfies Record<string, React.FC<SvgProps>>;\n\n';
out += 'export type IconName = keyof typeof icons;\n';

fs.writeFileSync(outFile, out);
console.log(`Wrote ${names.length} icons to registry.ts`);
