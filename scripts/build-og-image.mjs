/**
 * Генерує public/og-default.png (1200x630) з SVG-макета в кольорах сайту.
 * Запуск: node scripts/build-og-image.mjs
 * PNG потрібен тому, що Facebook, LinkedIn, X і Telegram не рендерять SVG у прев'ю.
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#17213c" opacity=".12"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#f7f3e8"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- вікно profile.exe -->
  <rect x="70" y="66" width="1060" height="498" rx="22" fill="#17213c"/>
  <rect x="62" y="58" width="1060" height="498" rx="22" fill="#f7f3e8" stroke="#17213c" stroke-width="4"/>

  <!-- смуга заголовка вікна -->
  <path d="M62 80a22 22 0 0 1 22-22h1016a22 22 0 0 1 22 22v46H62Z" fill="#bde8d4" stroke="#17213c" stroke-width="4"/>
  <circle cx="106" cy="92" r="9" fill="#f05a3f" stroke="#17213c" stroke-width="3"/>
  <circle cx="136" cy="92" r="9" fill="#ffca5f" stroke="#17213c" stroke-width="3"/>
  <circle cx="166" cy="92" r="9" fill="#d9f45d" stroke="#17213c" stroke-width="3"/>
  <text x="196" y="100" fill="#17213c" font-family="Consolas, monospace" font-size="24" font-weight="bold">profile.exe</text>

  <!-- ім'я -->
  <text x="112" y="286" fill="#17213c" font-family="Trebuchet MS, Arial, sans-serif" font-size="104" font-weight="bold" letter-spacing="-4">Артем Кисляков</text>
  <rect x="112" y="300" width="742" height="10" fill="#f05a3f"/>

  <!-- підпис -->
  <text x="112" y="372" fill="#17213c" font-family="Trebuchet MS, Arial, sans-serif" font-size="40" font-weight="bold">Вчитель інформатики</text>
  <text x="112" y="428" fill="#17213c" font-family="Trebuchet MS, Arial, sans-serif" font-size="40" font-weight="bold" opacity=".72">і розробник освітніх рішень</text>

  <!-- теги -->
  <rect x="112" y="466" width="196" height="52" rx="26" fill="#d9f45d" stroke="#17213c" stroke-width="4"/>
  <text x="210" y="500" fill="#17213c" font-family="Consolas, monospace" font-size="24" font-weight="bold" text-anchor="middle">РАВЛИК</text>
  <rect x="326" y="466" width="222" height="52" rx="26" fill="#ffd1c8" stroke="#17213c" stroke-width="4"/>
  <text x="437" y="500" fill="#17213c" font-family="Consolas, monospace" font-size="24" font-weight="bold" text-anchor="middle">itnauka.org</text>
  <rect x="566" y="466" width="150" height="52" rx="26" fill="#d8ddff" stroke="#17213c" stroke-width="4"/>
  <text x="641" y="500" fill="#17213c" font-family="Consolas, monospace" font-size="24" font-weight="bold" text-anchor="middle">уроки</text>

  <!-- равлик у правому нижньому куті вікна -->
  <g transform="translate(838 330) scale(1.55)" stroke="#17213c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path fill="none" d="M105 42c4-20 10-29 18-35M112 41c13-14 22-18 30-17"/>
    <circle cx="124" cy="7" r="4" fill="#17213c"/>
    <circle cx="143" cy="24" r="4" fill="#17213c"/>
    <path fill="#a8e06f" d="M15 62c14-15 36-17 55-12 18 5 34-10 51-8 12 1 20 8 24 18 3 8-5 14-16 14H20C8 74 7 68 15 62Z"/>
    <circle cx="65" cy="38" r="31" fill="#ffca5f"/>
    <path fill="none" d="M65 20c-15 0-20 19-8 27 12 8 26-3 22-15-3-9-15-11-20-5"/>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync('public/og-default.png', png);
console.log(`public/og-default.png — ${(png.length / 1024).toFixed(1)} KB`);
