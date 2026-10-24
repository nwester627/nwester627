// Generates the arcade-themed SVG assets for the GitHub profile README.
// Run: node build.mjs  → writes ./assets/*.svg
// Everything is drawn with a built-in 5x7 pixel font so it renders the same
// everywhere (GitHub serves SVGs as images, so web fonts can't load).
import { mkdirSync, writeFileSync } from 'node:fs';

const C = {
  bg: '#0d0b1e',
  panel: '#17142e',
  border: '#2c2650',
  magenta: '#ff3e9a',
  cyan: '#3ee6ff',
  yellow: '#ffd23f',
  white: '#f4f1ff',
  dim: '#8a84b5',
  green: '#5dff8a',
  red: '#ff4d5e',
  gold: '#ffb703',
};

// ---------------------------------------------------------------- pixel font
const G = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  N: ['#...#', '#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
  ',': ['.....', '.....', '.....', '.....', '.##..', '..#..', '.#...'],
  ':': ['.....', '.##..', '.##..', '.....', '.##..', '.##..', '.....'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '&': ['.##..', '#..#.', '#.#..', '.#...', '#.#.#', '#..#.', '.##.#'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  "'": ['..#..', '..#..', '.#...', '.....', '.....', '.....', '.....'],
  '>': ['.#...', '..#..', '...#.', '....#', '...#.', '..#..', '.#...'],
  '<': ['...#.', '..#..', '.#...', '#....', '.#...', '..#..', '...#.'],
  '%': ['##...', '##..#', '...#.', '..#..', '.#...', '#..##', '...##'],
  '·': ['.....', '.....', '.....', '..#..', '.....', '.....', '.....'],
  '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
  '→': ['.....', '..#..', '...#.', '#####', '...#.', '..#..', '.....'],
  '←': ['.....', '..#..', '.#...', '#####', '.#...', '..#..', '.....'],
  '↓': ['..#..', '..#..', '..#..', '#.#.#', '.###.', '..#..', '.....'],
  '↘': ['.....', '#....', '.#..#', '..#.#', '...##', '.####', '.....'],
  '↙': ['.....', '....#', '#..#.', '#.#..', '##...', '####.', '.....'],
};

const ADV = 6; // 5px glyph + 1px gap
const textW = (s, k) => (s.length * ADV - 1) * k;

// One <path> per string; horizontal pixel runs are merged into single rects.
function text(str, x, y, k, fill, extra = '') {
  let d = '';
  [...str.toUpperCase()].forEach((ch, i) => {
    const g = G[ch];
    if (!g) throw new Error(`No glyph for "${ch}" in "${str}"`);
    g.forEach((row, ry) => {
      for (let rx = 0; rx < 5; rx++) {
        if (row[rx] !== '#') continue;
        let len = 1;
        while (row[rx + len] === '#') len++;
        d += `M${x + (i * ADV + rx) * k} ${y + ry * k}h${len * k}v${k}h${-len * k}z`;
        rx += len - 1;
      }
    });
  });
  return `<path d="${d}" fill="${fill}"${extra}/>`;
}

// Text with a hard drop shadow, the classic arcade look.
const shadowText = (s, x, y, k, fill, shadow, off = k) =>
  text(s, x + off, y + off, k, shadow) + text(s, x, y, k, fill);

const centerX = (s, k, width) => Math.round((width - textW(s, k)) / 2);

// ---------------------------------------------------------------- helpers
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASE_CSS = `
  .blink{animation:blink 1.1s steps(1) infinite}
  .twinkle{animation:twinkle 2.4s ease-in-out infinite}
  @keyframes blink{50%{opacity:0}}
  @keyframes twinkle{50%{opacity:.15}}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}}`;

function svg(w, h, body, css = '', title = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
<title>${title}</title>
<defs>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".28"/></pattern>
  <clipPath id="frame"><rect width="${w}" height="${h}" rx="14"/></clipPath>
</defs>
<style>${BASE_CSS}${css}</style>
<g clip-path="url(#frame)">
${body}
<rect width="${w}" height="${h}" fill="url(#scan)" pointer-events="none"/>
</g>
</svg>
`;
}

function stars(w, h, n, seed) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const s = r() < 0.2 ? 3 : 2;
    const cls = r() < 0.5 ? ` class="twinkle" style="animation-delay:${(r() * 2.4).toFixed(2)}s"` : '';
    out += `<rect x="${Math.floor(r() * w)}" y="${Math.floor(r() * h)}" width="${s}" height="${s}" fill="${r() < 0.3 ? C.cyan : C.white}" opacity="${(0.4 + r() * 0.6).toFixed(2)}"${cls}/>`;
  }
  return out;
}

// ---------------------------------------------------------------- banner
function banner() {
  const W = 1000, H = 320;
  const name = 'NICOLAS WESTER';
  let b = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22104a"/><stop offset="1" stop-color="${C.bg}"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
${stars(W, 220, 70, 7)}`;

  // HUD
  b += text('1UP', 30, 22, 2, C.magenta);
  b += text('NICOLAS', 30, 42, 2, C.white);
  b += text('HI-SCORE', centerX('HI-SCORE', 2, W), 22, 2, C.magenta);
  b += text('50% FASTER', centerX('50% FASTER', 2, W), 42, 2, C.white);
  b += text('EXP', W - 30 - textW('EXP', 2), 22, 2, C.magenta);
  b += text('NEARLY 5 YRS', W - 30 - textW('NEARLY 5 YRS', 2), 42, 2, C.white);

  // Title
  b += shadowText(name, centerX(name, 7, W), 82, 7, C.yellow, C.magenta, 6);
  b += text('FULL STACK DEVELOPER', centerX('FULL STACK DEVELOPER', 3, W), 150, 3, C.cyan);
  b += text('PRESS START', centerX('PRESS START', 3, W), 192, 3, C.white, ' class="blink"');

  // Wrestling ring: apron, posts, turnbuckles, ropes
  b += `<rect x="0" y="262" width="${W}" height="58" fill="#3a0f2e"/>
<rect x="0" y="262" width="${W}" height="6" fill="${C.magenta}" opacity=".7"/>`;
  b += text('LIVE FROM ORLANDO, FLORIDA', centerX('LIVE FROM ORLANDO, FLORIDA', 2, W), 284, 2, C.dim);
  for (const px of [36, W - 50]) {
    b += `<rect x="${px}" y="214" width="14" height="54" fill="#c9c4e8"/><rect x="${px - 3}" y="214" width="20" height="10" fill="${C.red}"/><rect x="${px - 3}" y="230" width="20" height="10" fill="${C.white}"/><rect x="${px - 3}" y="246" width="20" height="10" fill="${C.cyan}"/>`;
  }
  b += `<rect x="50" y="218" width="${W - 100}" height="3" fill="${C.red}"/>
<rect x="50" y="234" width="${W - 100}" height="3" fill="${C.white}"/>
<rect x="50" y="250" width="${W - 100}" height="3" fill="${C.cyan}"/>`;
  return svg(W, H, b, '', 'Nicolas Wester — Full Stack Developer');
}

// ---------------------------------------------------------------- fighter sprite
const SPRITE = [
  '.....kkkkkk.....',
  '....khhhhhhk....',
  '...khhhhhhhhk...',
  '...khsssssshk...',
  '...kskssssksk...',
  '...kssssssssk...',
  '...ksssKKsssk...',
  '....kssssssk....',
  '.....kssssk.....',
  '..kkttttttttkk..',
  '.kttttttttttttk.',
  'kskttttttttttksk',
  'kskttttttttttksk',
  'kskttttttttttksk',
  'kskggggwwggggksk',
  'ksskppppppppkssk',
  '...kppppppppk...',
  '...kpppkkpppk...',
  '...kpppkkpppk...',
  '...kpppkkpppk...',
  '..kwwwwkkwwwwk..',
  '..kkkkkkkkkkkk..',
];
const SPRITE_COLORS = { k: '#0a0814', K: '#7a2a3a', h: '#5b3a1e', s: '#f1c39a', t: C.magenta, g: C.gold, w: C.white, p: '#2b2f7a' };

function sprite(x, y, k) {
  const paths = {};
  SPRITE.forEach((row, ry) => {
    if (row.length !== 16) throw new Error(`Sprite row ${ry} is ${row.length} wide`);
    [...row].forEach((ch, rx) => {
      if (ch === '.') return;
      paths[ch] = (paths[ch] || '') + `M${x + rx * k} ${y + ry * k}h${k}v${k}h${-k}z`;
    });
  });
  return Object.entries(paths).map(([ch, d]) => `<path d="${d}" fill="${SPRITE_COLORS[ch]}"/>`).join('');
}

// ---------------------------------------------------------------- player card
function playerCard() {
  const W = 1000, H = 430;
  let b = `<rect width="${W}" height="${H}" fill="${C.panel}"/>
<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="13" fill="none" stroke="${C.cyan}" stroke-width="3"/>`;

  b += `<rect x="24" y="20" width="${textW('PLAYER 1', 3) + 24}" height="34" fill="${C.magenta}"/>`;
  b += text('PLAYER 1', 36, 27, 3, C.white);
  b += text('READY!', W - 30 - textW('READY!', 3), 27, 3, C.cyan);

  // Portrait
  b += `<defs><linearGradient id="port" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1d5c"/><stop offset="1" stop-color="#120f26"/></linearGradient></defs>
<rect x="30" y="74" width="260" height="326" fill="url(#port)" stroke="${C.yellow}" stroke-width="3"/>
${stars(250, 150, 18, 3).replace(/x="(\d+)"/g, (_, v) => `x="${+v + 35}"`).replace(/y="(\d+)"/g, (_, v) => `y="${+v + 80}"`)}
<rect x="40" y="290" width="240" height="8" fill="#000" opacity=".35"/>`;
  b += `<g class="bob">${sprite(96, 112, 8)}</g>`;
  b += `<rect x="30" y="340" width="260" height="60" fill="${C.yellow}"/>`;
  b += text('PIXEL PERFECT', centerX('PIXEL PERFECT', 3, 260) + 30, 360, 3, C.bg);

  // Bio sheet
  const rows = [
    ['NAME', 'NICOLAS WESTER'],
    ['CLASS', 'FULL STACK ENGINEER'],
    ['FACTION', 'DELOS INSURANCE SOLUTIONS'],
    ['HOMETOWN', 'ORLANDO, FL'],
    ['FINISHER', 'THE WORKFLOW DASHBOARD'],
  ];
  rows.forEach(([k, v], i) => {
    const y = 84 + i * 28;
    b += text(k, 330, y, 2, C.dim) + text(v, 470, y, 2, k === 'FINISHER' ? C.yellow : C.white);
  });

  // Stat bars
  const stats = [['FRONTEND', 95], ['BACKEND', 82], ['TESTING', 78], ['DEVOPS', 72], ['AUTOMATION', 90]];
  const bx = 470, bw = 440, col = C.cyan;
  stats.forEach(([label, val], i) => {
    const y = 240 + i * 32;
    b += text(label, 330, y + 1, 2, C.white);
    b += `<rect x="${bx}" y="${y - 2}" width="${bw}" height="18" fill="#0a0814" stroke="${C.border}" stroke-width="2"/>`;
    b += `<rect class="fill" style="animation-delay:${i * 0.15}s" x="${bx + 2}" y="${y}" width="${Math.round((bw - 4) * val / 100)}" height="14" fill="${col}"/>`;
    for (let sx = bx + 22; sx < bx + bw; sx += 22) b += `<rect x="${sx}" y="${y}" width="2" height="14" fill="#0a0814"/>`;
    b += text(String(val), bx + bw + 14, y + 1, 2, col);
  });

  const css = `
  .bob{animation:bob 1s steps(2) infinite}
  @keyframes bob{50%{transform:translateY(4px)}}
  .fill{transform-box:fill-box;transform-origin:left;animation:fill 1.4s cubic-bezier(.2,.8,.2,1) both}
  @keyframes fill{from{transform:scaleX(0)}}`;
  return svg(W, H, b, css, 'Player 1: Nicolas Wester, Full Stack Engineer at Delos Insurance Solutions');
}

// ---------------------------------------------------------------- section header
function header(label, tag, col) {
  const W = 1000, H = 64;
  let b = `<rect width="${W}" height="${H}" fill="${C.bg}"/>
<rect x="0" y="${H - 6}" width="${W}" height="6" fill="${col}"/>`;
  b += text('>', 24, 16, 4, col);
  b += shadowText(label, 64, 16, 4, C.white, col, 3);
  b += text(tag, W - 24 - textW(tag, 2), 24, 2, C.dim);
  return svg(W, H, b, '', label);
}

// ---------------------------------------------------------------- move list
function moveList() {
  const W = 1000;
  const moves = [
    ['↓↘→+P', 'COMPONENT COMBO', 'REACT, TYPESCRIPT, NEXT.JS, TANSTACK'],
    ['→↓↘+K', 'SCHEMA SLAM', 'SQL, POSTGRES, MONGODB, DATA MODELING'],
    ['←↙↓↘→+P', 'MICROSERVICE SUPLEX', 'REST APIS, NODE, PYTHON, FASTAPI'],
    ['↓↓+K', 'CLOUD DIVE', 'AWS, DOCKER, CI/CD PIPELINES'],
    ['←+P+K', 'TEST COUNTER', 'PLAYWRIGHT END-TO-END TESTING'],
    ['→→+P', 'DASHBOARD DROPKICK', 'TABLEAU DATA VISUALIZATION'],
    ['←→+K', 'LEGACY LARIAT', 'PHP, LARAVEL, ANGULAR, FIREBASE'],
  ];
  const H = 70 + moves.length * 40 + 70;
  let b = `<rect width="${W}" height="${H}" fill="${C.panel}"/>
<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="13" fill="none" stroke="${C.magenta}" stroke-width="3"/>`;
  b += text('INPUT', 30, 26, 2, C.dim) + text('MOVE', 190, 26, 2, C.dim) + text('EFFECT', 470, 26, 2, C.dim);
  b += `<rect x="30" y="50" width="${W - 60}" height="2" fill="${C.border}"/>`;
  moves.forEach(([inp, name, eff], i) => {
    const y = 70 + i * 40;
    b += text(inp, 30, y, 2, C.cyan) + text(name, 190, y, 2, C.yellow) + text(eff, 470, y, 2, C.white);
  });
  const fy = 70 + moves.length * 40 + 8;
  b += `<rect x="20" y="${fy}" width="${W - 40}" height="46" fill="${C.gold}" opacity=".14" stroke="${C.gold}" stroke-width="2"/>`;
  b += `<rect x="30" y="${fy + 11}" width="${textW('SUPER', 2) + 12}" height="24" fill="${C.red}"/>`;
  b += text('SUPER', 36, fy + 16, 2, C.white);
  b += text('↓↘→↓↘→+P', 110, fy + 16, 2, C.cyan);
  b += text('THE WORKFLOW DASHBOARD', 290, fy + 16, 2, C.gold);
  b += text('CUSTOMIZABLE WORKFLOWS AT DELOS', 590, fy + 16, 2, C.white);
  return svg(W, H, b, '', 'Move list: React, TypeScript, Next.js, TanStack, SQL, Postgres, Node, Python, FastAPI, AWS, Docker, CI/CD, Playwright, Tableau');
}

// ---------------------------------------------------------------- stage cards
function stageCard(arena, title, line1, line2, status, seed) {
  const col = status === 'LIVE' ? C.magenta : C.dim;
  const W = 490, H = 190;
  const r = rng(seed);
  let sky = '';
  for (let x = 0; x < W; x += 14) {
    const h = 12 + Math.floor(r() * 30);
    sky += `<rect x="${x}" y="${H - h}" width="13" height="${h}" fill="${col}" opacity=".10"/>`;
    if (r() < 0.5) sky += `<rect x="${x + 4}" y="${H - h + 6}" width="4" height="4" fill="${C.yellow}" opacity=".25"/>`;
  }
  let b = `<rect width="${W}" height="${H}" fill="${C.panel}"/>${sky}
<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="13" fill="none" stroke="${col}" stroke-width="3"/>`;
  b += text(arena, 24, 22, 2, C.cyan);
  b += shadowText(title, 24, 50, 3, C.white, col, 3);
  b += text(line1, 24, 96, 2, C.dim) + text(line2, 24, 120, 2, C.dim);
  const sc = status === 'LIVE' ? C.green : C.yellow;
  const sw = textW(status, 2) + 20;
  b += `<rect x="${W - 24 - sw}" y="146" width="${sw}" height="26" fill="${C.bg}" stroke="${sc}" stroke-width="2"/>`;
  b += text(status, W - 24 - sw + 10, 152, 2, sc);
  return svg(W, H, b, '', `${arena}: ${title}`);
}

// ---------------------------------------------------------------- new challenger
function challenger() {
  const W = 1000, H = 200;
  let stripes = '';
  for (let x = -200; x < W + 200; x += 40) stripes += `<path d="M${x} 0h20l-120 ${H}h-20z" fill="${C.red}" opacity=".18"/>`;
  let b = `<rect width="${W}" height="${H}" fill="#1c0710"/>${stripes}
<rect x="0" y="0" width="${W}" height="8" fill="${C.red}"/><rect x="0" y="${H - 8}" width="${W}" height="8" fill="${C.red}"/>`;
  b += shadowText('HERE COMES A NEW CHALLENGER!', centerX('HERE COMES A NEW CHALLENGER!', 4, W), 44, 4, C.white, C.red, 4);
  b += text('CLASSIC GAME RECOMPS, COMING SOON', centerX('CLASSIC GAME RECOMPS, COMING SOON', 2, W), 100, 2, C.cyan);
  const bx = 250, bw = 500;
  b += `<rect x="${bx}" y="134" width="${bw}" height="22" fill="#0a0814" stroke="${C.white}" stroke-width="2"/>
<rect class="load" x="${bx + 3}" y="137" width="${bw - 6}" height="16" fill="${C.yellow}"/>`;
  b += text('LOADING...', centerX('LOADING...', 2, W), 168, 2, C.dim, ' class="blink"');
  const css = `
  .load{transform-box:fill-box;transform-origin:left;animation:load 4s steps(20) infinite}
  @keyframes load{from{transform:scaleX(0)}90%,to{transform:scaleX(1)}}`;
  return svg(W, H, b, css, 'Here comes a new challenger: classic game recomp projects coming soon');
}

// ---------------------------------------------------------------- continue
function continueScreen() {
  const W = 1000, H = 150;
  let b = `<rect width="${W}" height="${H}" fill="${C.bg}"/>${stars(W, H, 40, 11)}`;
  const label = 'CONTINUE?';
  const lw = textW(label + ' 9', 5);
  const x0 = Math.round((W - lw) / 2);
  b += shadowText(label, x0, 30, 5, C.yellow, C.magenta, 4);
  const dx = x0 + textW(label + ' ', 5) + 5;
  for (let d = 9; d >= 0; d--) {
    b += `<g class="digit" style="animation-delay:${(9 - d)}s">${shadowText(String(d), dx, 30, 5, C.red, C.magenta, 4)}</g>`;
  }
  b += text('INSERT COIN TO CONNECT', centerX('INSERT COIN TO CONNECT', 2, W), 100, 2, C.white, ' class="blink"');
  const css = `
  .digit{opacity:0;animation:digit 10s steps(1) infinite}
  @keyframes digit{0%{opacity:1}10%,100%{opacity:0}}
  @media (prefers-reduced-motion:reduce){.digit{opacity:0}.digit:first-of-type{opacity:1}}`;
  return svg(W, H, b, css, 'Continue? Insert coin to connect');
}

// ---------------------------------------------------------------- write
mkdirSync('assets', { recursive: true });
const out = {
  'banner.svg': banner(),
  'player-card.svg': playerCard(),
  'header-title-reign.svg': header('CURRENT TITLE REIGN', 'MAIN EVENT', C.gold),
  'header-move-list.svg': header('MOVE LIST', 'TECH STACK', C.magenta),
  'header-stage-select.svg': header('STAGE SELECT', 'PROJECTS', C.magenta),
  'move-list.svg': moveList(),
  'stage-01.svg': stageCard('CITY HALL', 'POLITICAL TRANSPARENCY', 'CIVIC DATA, MAPS AND CHARTS', 'NEXT.JS + TYPESCRIPT + LEAFLET', 'LIVE', 21),
  'stage-02.svg': stageCard('HOME ARENA', 'NICOLASWESTER.COM', 'PERSONAL PORTFOLIO', 'NEXT.JS + REACT + TAILWIND', 'LIVE', 22),
  'stage-03.svg': stageCard('MAIN STREET', 'CLIENT SITES', 'SMALL BUSINESS WEBSITES', 'NEXT.JS + REACT + VERCEL', 'LIVE', 23),
  'stage-04.svg': stageCard('TRAINING GYM', 'HIRED.IO', 'JOB SEARCH PLATFORM', 'REACT + FASTAPI + POSTGRES', 'IN PROGRESS', 24),
  'challenger.svg': challenger(),
  'continue.svg': continueScreen(),
};
for (const [f, s] of Object.entries(out)) writeFileSync(`assets/${f}`, s);
console.log(`Wrote ${Object.keys(out).length} files to assets/`);
