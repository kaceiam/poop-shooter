// ===== Poop Pocket: the places =====
// Everything about the 13 places lives here: the list of places (PLACES), which place each level is in,
// how each place's scenery is drawn (drawPlace), and the seasonal touches (pumpkins, snow, hearts).
// It loads before the main game code in index.html and shares its variables (like W, H, level and emoji()).
//
// To add a new place: add it to PLACES, then add an "if (here.name === '...')" block in drawPlace().

// ---- Places: the place changes every 2 levels ----
// people: full-body emoji only. props: things they carry (only some people carry one).
// deco: things on the ground as [across 0-1, down 0-1, emoji, size].
const PLACES = [
  { name: 'The Park', icon: '🌳', sky: ['#6ec6ff', '#bfe8ff'], ground: '#7cc95a', path: '#d9c08a',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️', '🕺', '💃'], props: ['🎈', '🐕', '☕'],
    deco: [[0.08, 0.85, '🌷', 30], [0.9, 0.15, '🌼', 26], [0.6, 0.9, '🌷', 28]] },
  { name: 'The Beach', icon: '🏖️', sky: ['#4fc3f7', '#e1f5fe'], ground: '#f4dca0', path: null,
    people: ['🚶', '🚶‍♀️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️', '🏄', '🏄‍♀️', '🤸', '🤸‍♀️'], props: ['🍦', '🏐', '🛟', '🍉'],
    deco: [[0.06, 0.2, '🌴', 70], [0.94, 0.25, '🌴', 70], [0.3, 0.75, '⛱️', 50], [0.75, 0.85, '🏰', 40], [0.5, 0.15, '🐚', 24]] },
  { name: 'The School', icon: '🏫', sky: ['#90caf9', '#e3f2fd'], ground: '#a7adb3', path: '#f2c14e',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🎒', '🎒', '🎒', '📚', '🍎'],
    deco: [[0.12, 0.8, '⚽', 26], [0.85, 0.7, '🏀', 26]] },
  { name: 'The Zoo', icon: '🦁', sky: ['#81d4fa', '#e1f5fe'], ground: '#8bc96a', path: '#d9c08a',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🎈', '🎈', '🎈', '🍿', '🪣', '🍌'],
    deco: [[0.1, 0.82, '🌿', 30], [0.9, 0.78, '🪨', 30], [0.55, 0.92, '🦩', 40]] },
  { name: 'The Carnival', icon: '🎪', sky: ['#7e57c2', '#f8bbd0'], ground: '#d8b98a', path: '#c49a6c',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️', '🕺', '💃'], props: ['🍭', '🌭', '🧸', '🎈', '🍦'],
    deco: [[0.08, 0.8, '🎯', 30], [0.88, 0.85, '🍿', 30], [0.5, 0.95, '🎠', 44]] },
  { name: 'The Mall', icon: '🛍️', indoor: true, sky: ['#e8dcc8', '#f6efe4'], ground: '#dcdfe3', path: null,
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🛍️', '🛍️', '🛍️', '🥤', '🎁'],
    deco: [[0.5, 0.88, '⛲', 56], [0.08, 0.8, '🪴', 34], [0.92, 0.8, '🪴', 34]] },
  { name: 'The Farm', icon: '🚜', sky: ['#81d4fa', '#fff9c4'], ground: '#9ccc65', path: '#bcaaa4',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🌽', '🥕', '🪣', '🧺', '🥚'],
    deco: [[0.6, 0.9, '🌻', 34], [0.95, 0.88, '🌻', 30]] },
  { name: 'The Moon', icon: '🌙', indoor: true, lowGravity: true, helmets: true, sky: ['#000010', '#1a237e'], ground: '#9e9e9e', path: null,
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🚩', '🔭', '🪐', '🛰️'],
    deco: [[0.12, 0.85, '🪨', 30], [0.9, 0.9, '🪨', 26]] },
  { name: 'The Reef', icon: '🐠', indoor: true, underwater: true, helmets: true, sky: ['#0d47a1', '#4fc3f7'], ground: '#e6d3a3', path: null,
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🧍', '🧍‍♀️', '🏃', '🏃‍♀️'], props: ['🐚', '🦀', '🐠'],
    deco: [[0.08, 0.8, '🪸', 44], [0.3, 0.92, '🐚', 26], [0.72, 0.86, '🪸', 40], [0.94, 0.75, '🌿', 36]] },
  { name: 'The Mountain', icon: '🏔️', snowy: true, sky: ['#90caf9', '#e3f2fd'], ground: '#f5f9ff', path: null,
    people: ['⛷️', '🏂', '⛷️', '🏂', '🚶', '🚶‍♀️', '🧍', '🧍‍♀️'], props: ['☕', '🧣', '🎿'],
    deco: [[0.08, 0.82, '☃️', 50], [0.9, 0.7, '🌲', 50], [0.6, 0.92, '🌲', 40]] },
  { name: 'The City', icon: '🌃', indoor: true, rainy: true, sky: ['#0b0f2b', '#2c2a5a'], ground: '#3b3b48', path: '#f2c14e',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️', '🕺', '💃'], props: ['📱', '📱', '🍕', '🛍️', '🌂'],
    deco: [[0.1, 0.9, '🚏', 40], [0.88, 0.85, '🗑️', 30]] },
  { name: 'The Jungle', icon: '🌴', sky: ['#1b5e20', '#81c784'], ground: '#558b2f', path: '#8d6e63',
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['🧭', '🗺️', '🔭', '🍌'],
    deco: [[0.06, 0.85, '🌿', 46], [0.5, 0.95, '🍄', 30], [0.7, 0.82, '🌺', 32]] },
  { name: 'The Desert', icon: '🏜️', sky: ['#ff8f00', '#ffe082'], ground: '#e9c46a', path: null,
    people: ['🚶', '🚶‍♀️', '🚶‍♂️', '🏃', '🏃‍♀️', '🧍', '🧍‍♀️'], props: ['📷', '📷', '🗺️', '🧃'],
    deco: [[0.08, 0.82, '🌵', 46], [0.62, 0.95, '🌵', 36], [0.92, 0.88, '🦂', 22]] },
];
const ZOO_ANIMALS = ['🦁', '🐯', '🦒', '🐼', '🦓', '🐵'];
let lastShotX = 0;                                       // zoo animals turn to watch where you shot
const place = () => PLACES[Math.floor((level - 1) / 2) % PLACES.length];

// ---- Seasons (looks only): the game checks today's date ----
let season = (() => { const m = new Date().getMonth(); return m === 9 ? 'fall' : m === 11 ? 'winter' : m === 1 ? 'love' : ''; })();
const SEASON_TEXT = { fall: '🎃 Happy Halloween season!', winter: '❄️ Happy holidays!', love: "💕 Happy Valentine's month!" };
function drawSeason(here, hz, top) {
  if (!season) return;
  const now = performance.now() / 1000;
  if (season === 'fall') {
    emoji('🎃', 0.36 * W, hz + 0.93 * (top - hz), 34); emoji('🎃', 0.8 * W, hz + 0.97 * (top - hz), 28);
    if (here.underwater || here.name === 'The Moon') return;
    for (let i = 0; i < 6; i++) {                                                   // falling leaves
      const x = ((i * 173) % W) + Math.sin(now + i) * 30, y = (now * (30 + i * 6) + i * 90) % top;
      emoji('🍂', x, y, 18);
    }
  } else if (season === 'winter') {
    emoji('🎄', 0.44 * W, hz + 0.95 * (top - hz), 44);
    if (here.underwater || here.name === 'The Moon' || here.name === 'The Mall') return;
    ctx.fillStyle = '#fff';                                                          // snow everywhere
    ctx.beginPath();                                                                 // all drawn in one go (faster)
    for (let i = 0; i < 35; i++) {
      const x = ((i * 89) % W + Math.sin(now + i) * 10 + W) % W, y = (now * (22 + (i % 4) * 7) + i * 41) % top;
      ctx.moveTo(x + 1.5 + (i % 3), y); ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
    }
    ctx.fill();
  } else if (season === 'love') {
    for (let i = 0; i < 5; i++) {                                                    // little hearts floating up
      const x = ((i * 211) % W) + Math.sin(now * 1.5 + i) * 20, y = top - ((now * 25 + i * 120) % top);
      ctx.globalAlpha = 0.7; emoji('💕', x, y, 18); ctx.globalAlpha = 1;
    }
  }
}

function drawPlace() {
  const here = place(), hz = horizon(), top = pocketTop();
  const sky = ctx.createLinearGradient(0, 0, 0, hz);
  sky.addColorStop(0, here.sky[0]); sky.addColorStop(1, here.sky[1]);
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz);
  if (!here.indoor) {                                  // no sun or clouds inside the mall
    emoji('☀️', W * 0.8, 92, 50);
    emoji('☁️', W * 0.25, 50, 50); emoji('☁️', W * 0.6, 80, 40);
  }
  ctx.fillStyle = here.ground; ctx.fillRect(0, hz, W, H);

  if (here.name === 'The Desert') {
    const top = pocketTop(), now = performance.now() / 1000;
    for (const [fx, fs] of [[0.22, 0.9], [0.5, 1.15], [0.74, 0.75]]) {             // pyramids (light side and shady side)
      const cx = fx * W, h = hz * 0.62 * fs, w = h * 1.2;
      ctx.fillStyle = '#e0b15c'; ctx.beginPath(); ctx.moveTo(cx - w, hz); ctx.lineTo(cx, hz - h); ctx.lineTo(cx, hz); ctx.fill();
      ctx.fillStyle = '#c49140'; ctx.beginPath(); ctx.moveTo(cx, hz - h); ctx.lineTo(cx + w, hz); ctx.lineTo(cx, hz); ctx.fill();
    }
    const cx1 = ((now * 18) % (W + 200)) - 100;                                     // camels plodding along
    emoji('🐪', cx1, hz - 14, 40, true); emoji('🐫', cx1 - 50, hz - 12, 36, true);
    ctx.strokeStyle = 'rgba(255,248,225,0.6)'; ctx.lineWidth = 2;                   // sand blowing in the wind
    ctx.beginPath();                                                                 // all drawn in one go (faster)
    for (let i = 0; i < 18; i++) {
      const y = hz + ((i * 47) % Math.max(1, top - hz)), x = (now * (160 + (i % 4) * 40) + i * 131) % (W + 80) - 40;
      ctx.moveTo(x, y); ctx.lineTo(x + 22 + (i % 3) * 10, y - 2);
    }
    ctx.stroke();
  }
  if (here.name === 'The Jungle') {
    const top = pocketTop(), now = performance.now() / 1000;
    for (let i = 0; i < 6; i++) emoji('🌴', (i + 0.5) * W / 6, hz - 20, Math.min(70, hz * 0.6));   // jungle trees
    const wx = W * 0.82, ww = Math.min(60, W * 0.08);                                // waterfall
    ctx.fillStyle = '#4fc3f7'; ctx.fillRect(wx, 0, ww, hz + 20);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const sx = wx + 6 + i * (ww - 12) / 5, sy = (now * 220 + i * 37) % (hz + 20);
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy + 18); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(179,229,252,0.6)';                                          // splashy pool at the bottom
    ctx.beginPath(); ctx.ellipse(wx + ww / 2, hz + 22, ww, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 3;                                   // hanging vines that sway
    for (let i = 0; i < 7; i++) {
      const vx = (i + 0.3) * W / 7, len = hz * (0.4 + (i % 3) * 0.15), sway = Math.sin(now * 1.2 + i) * 8;
      ctx.beginPath(); ctx.moveTo(vx, 0); ctx.quadraticCurveTo(vx + sway, len / 2, vx + sway * 1.5, len); ctx.stroke();
      emoji('🍃', vx + sway * 1.5, len, 16);
    }
    const px = ((now * 90) % (W + 160)) - 80;                                        // parrots flying across
    emoji('🦜', px, hz * 0.3 + Math.sin(now * 3) * 10, 32, true);
    emoji('🦜', W - ((now * 70 + 400) % (W + 160)) + 80, hz * 0.5 + Math.sin(now * 2.5) * 8, 26);
    const mx = W * 0.3 + Math.sin(now * 1.5) * 40;                                   // a monkey swinging on a vine
    ctx.strokeStyle = '#33691e'; ctx.beginPath(); ctx.moveTo(W * 0.3, 0); ctx.lineTo(mx, hz * 0.55); ctx.stroke();
    emoji('🐒', mx, hz * 0.55 + 12, 30);
  }
  if (here.name === 'The City') {
    const top = pocketTop(), now = performance.now() / 1000;
    emoji('🌙', W * 0.85, hz * 0.3, Math.min(44, hz * 0.35));
    ctx.drawImage(citySkyline(hz), 0, 0);                                            // buildings (drawn once, then reused)
    const signs = [['PIZZA 🍕', '#ff4081'], ['OPEN', '#40c4ff'], ['CINEMA 🎬', '#b388ff']];   // neon signs
    signs.forEach(([text, c], i) => {
      const x = (i + 0.5) * W / signs.length, y = hz - 26, on = Math.sin(now * 3 + i * 2) > -0.8;   // they flicker
      ctx.strokeStyle = on ? c : '#444'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(x - 52, y - 15, 104, 30, 8); ctx.stroke();
      label(text, x, y, 15, on ? c : '#555', false, 'center', 96);
    });
    for (let i = 0; i < 4; i++) {                                                     // street lamps
      const x = (i + 0.5) * W / 4;
      ctx.fillStyle = '#555'; ctx.fillRect(x - 2, hz - 4, 4, 34);
      ctx.fillStyle = 'rgba(255,224,130,0.25)'; ctx.beginPath(); ctx.arc(x, hz - 4, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffe082'; ctx.beginPath(); ctx.arc(x, hz - 4, 5, 0, Math.PI * 2); ctx.fill();
    }
    const tx = ((now * 160) % (W + 200)) - 100, tx2 = W - ((now * 120 + 300) % (W + 200)) + 100;   // taxis
    emoji('🚕', tx, hz + 18, 40, true); emoji('🚕', tx2, hz + 30, 36);
    ctx.strokeStyle = 'rgba(180,200,255,0.35)'; ctx.lineWidth = 1;                    // a little rain (all drawn in one go)
    ctx.beginPath();
    for (let i = 0; i < 50; i++) {
      const x = (i * 53) % W, y = (now * 420 + i * 47) % top;
      ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 10);
    }
    ctx.stroke();
  }
  if (here.name === 'The Mountain') {
    const top = pocketTop(), now = performance.now() / 1000;
    for (const [fx, fw, fh, c] of [[0.15, 0.5, 0.9, '#b0bec5'], [0.55, 0.6, 1.0, '#90a4ae'], [0.9, 0.45, 0.75, '#b0bec5']]) {
      const cx = fx * W, w = fw * W / 2, h = fh * hz * 0.85;                         // mountains with snowy tops
      ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(cx - w, hz); ctx.lineTo(cx, hz - h); ctx.lineTo(cx + w, hz); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(cx - w * 0.3, hz - h * 0.7); ctx.lineTo(cx, hz - h); ctx.lineTo(cx + w * 0.3, hz - h * 0.7); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(144,164,174,0.35)'; ctx.lineWidth = 2;                   // the slope runs downhill to the right
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, hz + i * (top - hz) / 5); ctx.lineTo(W, hz + (i + 0.6) * (top - hz) / 5); ctx.stroke(); }
    for (let i = 0; i < 8; i++) emoji('🌲', (i + 0.5) * W / 8, hz - 12, 34);
    ctx.fillStyle = '#fff';                                                           // falling snow
    ctx.beginPath();                                                                 // all drawn in one go (faster)
    for (let i = 0; i < 40; i++) {
      const x = ((i * 61) % W + Math.sin(now + i) * 12 + W) % W, y = (now * (25 + (i % 5) * 8) + i * 37) % top;
      ctx.moveTo(x + 1.5 + (i % 3), y); ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
    }
    ctx.fill();
  }
  if (here.name === 'The Reef') {
    const now = performance.now() / 1000, top = pocketTop();
    ctx.fillStyle = 'rgba(79,195,247,0.35)'; ctx.fillRect(0, hz, W, top - hz);    // water over the sand
    ctx.fillStyle = 'rgba(255,255,255,0.08)';                                       // light rays from the surface
    for (let i = 0; i < 5; i++) {
      const x = (i + 0.5) * W / 5;
      ctx.beginPath(); ctx.moveTo(x - 20, 0); ctx.lineTo(x + 20, 0); ctx.lineTo(x + 70, top); ctx.lineTo(x + 10, top); ctx.fill();
    }
    const fish = ['🐠', '🐟', '🐡', '🐠'];                                          // fish swimming by
    fish.forEach((f, i) => {
      const dir = i % 2 ? 1 : -1, sp = 30 + i * 12;
      const x = ((now * sp * dir + i * 300) % (W + 120) + W + 120) % (W + 120) - 60;
      emoji(f, x, hz * (0.3 + i * 0.15) + Math.sin(now * 2 + i) * 6, 30 + (i % 2) * 8, dir === 1);
    });
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5;                 // bubbles rising
    ctx.beginPath();                                                                 // all drawn in one go (faster)
    for (let i = 0; i < 14; i++) {
      const bx = (i * 97) % W + Math.sin(now * 2 + i) * 6, by = top - ((now * (30 + (i % 4) * 12) + i * 60) % top);
      ctx.moveTo(bx + 2 + (i % 3) * 2, by); ctx.arc(bx, by, 2 + (i % 3) * 2, 0, Math.PI * 2);
    }
    ctx.stroke();
  }
  if (here.name === 'The Moon') {
    ctx.fillStyle = '#fff';                                                         // stars (same spots every time)
    ctx.beginPath();                                                                 // all drawn in one go (faster)
    for (let i = 0; i < 70; i++) {
      const fx = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1, fy = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
      const r = (i % 3) * 0.6 + 0.8;
      ctx.moveTo(fx * W + r, fy * hz * 0.95); ctx.arc(fx * W, fy * hz * 0.95, r, 0, Math.PI * 2);
    }
    ctx.fill();
    emoji('🌍', W * 0.82, hz * 0.42, Math.min(64, hz * 0.45));                      // the Earth in the sky
    emoji('🚀', W * 0.14, hz - 38, Math.min(76, hz * 0.6));
    emoji('🚩', W * 0.32, hz - 14, 34);
    const top = pocketTop();
    ctx.fillStyle = '#7d7d7d';                                                      // craters
    for (const [fx, fy, r] of [[0.22, 0.3, 40], [0.55, 0.6, 55], [0.82, 0.25, 30], [0.4, 0.88, 35], [0.92, 0.75, 45]]) {
      ctx.beginPath(); ctx.ellipse(fx * W, hz + fy * (top - hz), r, r * 0.35, 0, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (here.name === 'The Farm') {
    const bh = Math.min(110, hz * 0.8), bw = Math.min(140, W * 0.22), bx = W * 0.06;
    ctx.fillStyle = '#c62828'; ctx.fillRect(bx, hz - bh * 0.7, bw, bh * 0.7);                     // barn
    ctx.fillStyle = '#8e0000';
    ctx.beginPath(); ctx.moveTo(bx - 8, hz - bh * 0.7); ctx.lineTo(bx + bw / 2, hz - bh); ctx.lineTo(bx + bw + 8, hz - bh * 0.7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(bx + bw * 0.3, hz - bh * 0.42, bw * 0.4, bh * 0.42);      // barn door
    ctx.strokeStyle = '#c62828'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(bx + bw * 0.3, hz - bh * 0.42); ctx.lineTo(bx + bw * 0.7, hz);
    ctx.moveTo(bx + bw * 0.7, hz - bh * 0.42); ctx.lineTo(bx + bw * 0.3, hz); ctx.stroke();
    ctx.fillStyle = '#b0bec5'; ctx.fillRect(bx + bw + 14, hz - bh * 0.95, bw * 0.28, bh * 0.95);   // silo
    ctx.beginPath(); ctx.arc(bx + bw + 14 + bw * 0.14, hz - bh * 0.95, bw * 0.14, Math.PI, 0); ctx.fill();
    for (const [fx, e] of [[0.55, '🐄'], [0.68, '🐑'], [0.8, '🐓']]) emoji(e, fx * W, hz - 16, 34);   // farm animals
    const tx = (performance.now() / 40) % (W + 200) - 100;                                         // tractor driving by
    emoji('🚜', tx, hz - 14, 44, true);
    ctx.fillStyle = '#8d6e63';                                                                     // fence
    for (let x = 10; x < W; x += 40) ctx.fillRect(x, hz - 26, 6, 28);
    ctx.fillRect(0, hz - 22, W, 4); ctx.fillRect(0, hz - 10, W, 4);
    const top = pocketTop();
    for (const [fx, fy] of [[0.25, 0.82], [0.8, 0.7]]) {                                           // hay bales
      const x = fx * W, y = hz + fy * (top - hz);
      ctx.fillStyle = '#f9d976'; ctx.beginPath(); ctx.roundRect(x - 28, y - 18, 56, 30, 6); ctx.fill();
      ctx.strokeStyle = '#c9a43c'; ctx.lineWidth = 2;
      for (const k of [-12, 0, 12]) { ctx.beginPath(); ctx.moveTo(x + k, y - 18); ctx.lineTo(x + k, y + 12); ctx.stroke(); }
    }
  }
  if (here.name === 'The Mall') {
    const top = pocketTop();
    ctx.strokeStyle = 'rgba(0,0,0,0.07)'; ctx.lineWidth = 2;                       // floor tiles
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, hz); ctx.lineTo(x, top); ctx.stroke(); }
    for (let y = hz + 40; y < top; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    const sh = Math.min(100, hz * 0.7), count = Math.max(3, Math.floor(W / 180)), sw = W / count;
    const signs = ['👗', '👟', '🍕', '🎮', '🧸', '📚'], colors = ['#ef9a9a', '#90caf9', '#ffcc80', '#ce93d8', '#a5d6a7', '#fff59d'];
    for (let i = 0; i < count; i++) {                                              // shop fronts
      const x = i * sw + 8;
      ctx.fillStyle = colors[i % colors.length]; ctx.fillRect(x, hz - sh, sw - 16, sh);
      ctx.fillStyle = '#cfe8ff'; ctx.fillRect(x + 8, hz - sh * 0.62, sw - 32, sh * 0.62);   // shop window
      emoji(signs[i % signs.length], x + (sw - 16) / 2, hz - sh * 0.8, Math.min(30, sh * 0.32));
    }
    const ex = W * 0.7, eh = sh * 0.95;                                            // escalator
    ctx.fillStyle = '#9e9e9e';
    ctx.beginPath(); ctx.moveTo(ex, hz); ctx.lineTo(ex + 34, hz); ctx.lineTo(ex + 34 + eh * 0.8, hz - eh); ctx.lineTo(ex + eh * 0.8, hz - eh); ctx.fill();
    ctx.strokeStyle = '#616161'; ctx.lineWidth = 2;
    for (let k = 0.1; k < 1; k += 0.12) { ctx.beginPath(); ctx.moveTo(ex + eh * 0.8 * k, hz - eh * k); ctx.lineTo(ex + 34 + eh * 0.8 * k, hz - eh * k); ctx.stroke(); }
  }
  if (here.name === 'The Park') {
    for (let i = 0; i < 7; i++) emoji('🌳', (i + 0.5) * W / 7, hz - 10, 55);
  } else if (here.name === 'The Beach') {
    ctx.fillStyle = '#2b9be0'; ctx.fillRect(0, hz - 45, W, 55);                 // the sea
    ctx.fillStyle = '#7fd0ff'; ctx.fillRect(0, hz - 45, W, 6);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.beginPath();            // waves on the sand
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, hz + 10 + Math.sin(x / 30 + performance.now() / 600) * 3);
    ctx.stroke();
    emoji('⛵', W * 0.35, hz - 30, 34); emoji('🐬', W * 0.68, hz - 22, 26);
  } else if (here.name === 'The School') {
    const bh = Math.min(95, hz * 0.65);                                         // shorter on small screens
    ctx.fillStyle = '#c0564b'; ctx.fillRect(0, hz - bh, W, bh);                 // brick building
    ctx.fillStyle = '#9e3f36'; ctx.fillRect(0, hz - bh - 5, W, 8);
    ctx.fillStyle = '#bfe3ff';
    for (let x = 30; x < W - 40; x += 70) {
      if (Math.abs(x + 15 - W / 2) < 50) continue;                            // leave room for the door
      ctx.fillRect(x, hz - bh * 0.84, 30, bh * 0.25); ctx.fillRect(x, hz - bh * 0.47, 30, bh * 0.25);
    }
    ctx.fillStyle = '#6d4c41'; ctx.fillRect(W / 2 - 25, hz - bh * 0.58, 50, bh * 0.58);   // door
  }
  if (here.name === 'The Carnival') {
    const big = Math.min(130, hz * 0.85);
    emoji('🎡', W * 0.18, hz - big * 0.45, big);                                  // Ferris wheel
    emoji('🎢', W * 0.78, hz - big * 0.35, big * 0.8);                            // roller coaster
    for (let i = 0; i < 4; i++) emoji('🎪', (i + 0.5) * W / 4 + 30, hz - 18, Math.min(56, hz * 0.4));
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5; ctx.beginPath();               // string lights
    for (let x = 0; x <= W; x += 10) ctx.lineTo(x, hz * 0.35 + Math.sin(x / 60) * 10);
    ctx.stroke();
    const colors = ['#ff5252', '#ffd740', '#69f0ae', '#40c4ff', '#e040fb'], blink = Math.floor(performance.now() / 400);
    for (let x = 20, i = 0; x < W; x += 40, i++) {
      ctx.fillStyle = colors[(i + blink) % colors.length];
      ctx.beginPath(); ctx.arc(x, hz * 0.35 + Math.sin(x / 60) * 10 + 4, 4, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (here.name === 'The Zoo') {
    const ch = Math.min(90, hz * 0.65), cw = 110, count = Math.max(2, Math.floor(W / 150));
    for (let i = 0; i < count; i++) {
      const cx = (i + 0.5) * W / count;
      ctx.fillStyle = '#e8d9b0'; ctx.fillRect(cx - cw / 2, hz - ch, cw, ch);         // inside the cage
      const who = ZOO_ANIMALS[i % ZOO_ANIMALS.length];
      emoji(who, cx, hz - ch * 0.4, ch * 0.6, lastShotX > cx);                     // watching your poop
      ctx.fillStyle = '#555';
      for (let x = cx - cw / 2; x <= cx + cw / 2; x += 14) ctx.fillRect(x, hz - ch, 3, ch);   // bars
      ctx.fillRect(cx - cw / 2 - 3, hz - ch - 6, cw + 6, 7);
    }
  }
  if (here.path) {
    ctx.fillStyle = here.path;
    ctx.fillRect(0, hz + (top - hz) * 0.45, W, here.name === 'The School' ? 8 : 26);
  }
  for (const [fx, fy, e, size] of here.deco) emoji(e, fx * W, hz + fy * (top - hz), size);
  drawSeason(here, hz, top);                           // pumpkins in October, snow in December...
}

// The city's buildings and windows never change, so they're drawn once into a picture and reused
// (drawing hundreds of little windows every frame was slow). Redrawn only if the screen size changes.
let skyline = null, skylineKey = '';
function citySkyline(hz) {
  const key = W + 'x' + Math.round(hz);
  if (skyline && skylineKey === key) return skyline;
  skyline = document.createElement('canvas'); skyline.width = W; skyline.height = Math.ceil(hz); skylineKey = key;
  const c = skyline.getContext('2d'), count = Math.max(4, Math.floor(W / 110));
  for (let i = 0; i < count; i++) {
    const bw = W / count, bx = i * bw, bh = hz * (0.55 + ((i * 37) % 40) / 100);
    c.fillStyle = i % 2 ? '#1c1f3f' : '#252850'; c.fillRect(bx + 3, hz - bh, bw - 6, bh);
    c.fillStyle = '#ffe082';
    for (let wy = hz - bh + 10; wy < hz - 14; wy += 16)
      for (let wx = bx + 10; wx < bx + bw - 14; wx += 14)
        if (((wx * 7 + wy * 13) | 0) % 5 < 2) c.fillRect(wx, wy, 6, 8);
  }
  return skyline;
}
