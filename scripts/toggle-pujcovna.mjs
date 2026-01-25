#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const action = process.argv[2]; // 'enable' nebo 'disable'

if (!['enable', 'disable'].includes(action)) {
  console.error('❌ Použití: npm run pujcovna:enable nebo npm run pujcovna:disable');
  process.exit(1);
}

const featuresPath = join(rootDir, 'src/config/features.ts');
const appPath = join(rootDir, 'src/App.tsx');

// 1. Změň features.ts
let featuresContent = readFileSync(featuresPath, 'utf8');
if (action === 'enable') {
  featuresContent = featuresContent.replace(
    'ENABLE_PUJCOVNA: false',
    'ENABLE_PUJCOVNA: true'
  );
} else {
  featuresContent = featuresContent.replace(
    'ENABLE_PUJCOVNA: true',
    'ENABLE_PUJCOVNA: false'
  );
}
writeFileSync(featuresPath, featuresContent);

// 2. Změň App.tsx
let appContent = readFileSync(appPath, 'utf8');

// Definujte 3 routy
const routes = [
  '<Route path="/pujcovna" element={<Pujcovna />} />',
  '<Route path="/vozidlo/:id" element={<VehicleDetail />} />',
  '<Route path="/kontakt-pujcovna" element={<KontaktPujcovna />} />'
];

if (action === 'enable') {
  // Odkomentuj importy
  appContent = appContent.replace(
    /\/\/ import Pujcovna from "\.\/pages\/Pujcovna";/g,
    'import Pujcovna from "./pages/Pujcovna";'
  );
  appContent = appContent.replace(
    /\/\/ import KontaktPujcovna from "\.\/pages\/KontaktPujcovna";/g,
    'import KontaktPujcovna from "./pages/KontaktPujcovna";'
  );
  appContent = appContent.replace(
    /\/\/ import VehicleDetail from "\.\/pages\/VehicleDetail";/g,
    'import VehicleDetail from "./pages/VehicleDetail";'
  );

  // Odkomentuj každou routu
  routes.forEach(route => {
    const commented = `{/* __PUJCOVNA_START__ ${route} __PUJCOVNA_END__ */}`;
    appContent = appContent.replace(commented, route);
  });
} else {
  // Zakomentuj importy
  appContent = appContent.replace(
    /^import Pujcovna from "\.\/pages\/Pujcovna";/gm,
    '// import Pujcovna from "./pages/Pujcovna";'
  );
  appContent = appContent.replace(
    /^import KontaktPujcovna from "\.\/pages\/KontaktPujcovna";/gm,
    '// import KontaktPujcovna from "./pages/KontaktPujcovna";'
  );
  appContent = appContent.replace(
    /^import VehicleDetail from "\.\/pages\/VehicleDetail";/gm,
    '// import VehicleDetail from "./pages/VehicleDetail";'
  );

  // Zakomentuj každou routu
  routes.forEach(route => {
    const commented = `{/* __PUJCOVNA_START__ ${route} __PUJCOVNA_END__ */}`;
    appContent = appContent.replace(route, commented);
  });
}

writeFileSync(appPath, appContent);

if (action === 'enable') {
  console.log('✅ Půjčovna byla ZAPNUTA!');
  console.log('💡 Restartuj dev server (Ctrl+C a pak npm run dev)');
} else {
  console.log('✅ Půjčovna byla VYPNUTA!');
  console.log('💡 Restartuj dev server (Ctrl+C a pak npm run dev)');
}
