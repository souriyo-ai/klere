/* Souriyo — motè kad yo (canvas 1080 × 1350). Tout bagay fèt nan navigatè a : foto a pa janm kite telefòn nan. */
(function () {
  const W = 1080, H = 1350;
  const FONT = { t: '"Bricolage Grotesque", system-ui, sans-serif', b: '"DM Sans", system-ui, sans-serif', s: '"Playfair Display", Georgia, serif' };

  const hex = (h) => { const n = parseInt(String(h || '#000000').slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgb = (a, al = 1) => `rgba(${a[0]},${a[1]},${a[2]},${al})`;
  const mix = (h, k, to = [0, 0, 0]) => { const a = hex(h); return rgb(a.map((v, i) => Math.round(v + (to[i] - v) * k))); };
  const dark = (h, k) => mix(h, k, [0, 0, 0]);
  const light = (h, k) => mix(h, k, [255, 255, 255]);
  const lum = (h) => { const [r, g, b] = hex(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
  const onColor = (h) => (lum(h) > 0.6 ? '#151848' : '#ffffff');

  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function fit(x, text, font, max, size, min = 18) { let s = size; x.font = font.replace('{s}', s); while (x.measureText(text).width > max && s > min) { s -= 2; x.font = font.replace('{s}', s); } return s; }
  function spaced(x, text, cx, y, sp) {   // tèks ak espas ant lèt yo, santre
    const chars = [...text]; const w = chars.reduce((a, c) => a + x.measureText(c).width, 0) + sp * (chars.length - 1);
    let X = cx - w / 2; const al = x.textAlign; x.textAlign = 'left';
    for (const c of chars) { x.fillText(c, X, y); X += x.measureText(c).width + sp; } x.textAlign = al;
  }
  // Foto a nan yon fòm (sèk oswa rektang), ak zoom ak dekalaj
  function photo(x, img, X, Y, w, h, opt = {}) {
    if (!img) { x.fillStyle = 'rgba(255,255,255,.18)'; x.fillRect(X, Y, w, h); x.fillStyle = 'rgba(255,255,255,.75)'; x.font = `700 40px ${FONT.b}`; x.textAlign = 'center'; x.fillText('📸', X + w / 2, Y + h / 2 + 14); return; }
    const z = opt.zoom || 1, k = Math.max(w / img.width, h / img.height) * z;
    const dw = img.width * k, dh = img.height * k;
    const ox = (opt.dx || 0) * (dw - w) / 2, oy = (opt.dy || 0) * (dh - h) / 2;
    x.drawImage(img, X + (w - dw) / 2 + ox, Y + (h - dh) * 0.35 + oy, dw, dh);
  }
  function logo(x, img, cx, cy, maxH, maxW, plate) {
    if (!img) return;
    const k = Math.min(maxH / img.height, maxW / img.width), w = img.width * k, h = img.height * k;
    if (plate) { x.save(); rr(x, cx - w / 2 - 14, cy - h / 2 - 10, w + 28, h + 20, 16); x.fillStyle = '#fff'; x.fill(); x.restore(); }
    x.drawImage(img, cx - w / 2, cy - h / 2, w, h);
  }
  function footer(x, g, color) {
    x.textAlign = 'center'; x.fillStyle = color; x.globalAlpha = .85; x.font = `500 24px ${FONT.b}`;
    x.fillText(`Kad fèt ak Souriyo · ${window.SOURIYO ? window.SOURIYO.SITE : 'souriyo.com'}/${g.slug || ''}`, W / 2, H - 34); x.globalAlpha = 1;
  }
  function wrap(x, text, max) { const words = String(text).split(/\s+/); const lines = []; let l = ''; for (const w of words) { const t = l ? l + ' ' + w : w; if (x.measureText(t).width > max && l) { lines.push(l); l = w; } else l = t; } if (l) lines.push(l); return lines; }

  /* ---------- Modèl 1 : SÈK (lekòl, inivèsite) ---------- */
  function sek(x, g, img, o) {
    const bg = x.createLinearGradient(0, 0, W * 0.6, H);
    bg.addColorStop(0, dark(g.c1, 0.12)); bg.addColorStop(0.55, g.c1); bg.addColorStop(1, dark(g.c1, 0.35));
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 18; i < W; i += 36) for (let j = 18; j < H; j += 36) { x.beginPath(); x.arc(i, j, 2, 0, 7); x.fill(); }
    const txt = onColor(g.c1);
    let top = 70;
    if (o.logo) { logo(x, o.logo, W / 2, top + 30, 70, 260, lum(g.c1) < 0.6 && o.logoPlate); top += 80; }
    x.textAlign = 'center';
    if (g.sou_tit) { x.fillStyle = g.c2; fit(x, g.sou_tit.toUpperCase(), `700 {s}px ${FONT.b}`, W - 200, 30); spaced(x, g.sou_tit.toUpperCase(), W / 2, top + 30, 9); }
    if (g.tit) { x.fillStyle = txt; fit(x, g.tit, `800 {s}px ${FONT.t}`, W - 140, 84); x.fillText(g.tit, W / 2, top + 120); }
    const r = 400, cx = W / 2, cy = 650 + (o.logo ? 30 : 0);
    x.save(); x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 50; x.shadowOffsetY = 24;
    x.beginPath(); x.arc(cx, cy, r + 16, 0, Math.PI * 2); x.fillStyle = g.c2; x.fill(); x.restore();
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip(); photo(x, img, cx - r, cy - r, r * 2, r * 2, o); x.restore();
    if (g.riban) {
      x.save(); x.translate(W / 2, cy + r - 10); x.rotate(-0.05);
      x.font = `800 64px ${FONT.t}`; fit(x, g.riban.toUpperCase(), `800 {s}px ${FONT.t}`, W - 260, 64);
      const tw = x.measureText(g.riban.toUpperCase()).width + 92;
      x.shadowColor = 'rgba(0,0,0,.3)'; x.shadowBlur = 24; x.shadowOffsetY = 12;
      rr(x, -tw / 2, -50, tw, 100, 16); x.fillStyle = g.c2; x.fill(); x.shadowColor = 'transparent';
      x.fillStyle = onColor(g.c2) === '#ffffff' ? '#ffffff' : dark(g.c1, 0.45); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g.riban.toUpperCase(), 0, 4); x.textBaseline = 'alphabetic'; x.restore();
    }
    if (o.prenom) { x.fillStyle = txt; fit(x, o.prenom, `italic 500 {s}px ${FONT.s}`, W - 200, 66); x.fillText(o.prenom, W / 2, H - 120); }
    footer(x, g, txt);
  }

  /* ---------- Modèl 2 : POLAROID (evènman) ---------- */
  function polaroid(x, g, img, o) {
    x.fillStyle = g.c1; x.fillRect(0, 0, W, H);
    const b1 = x.createRadialGradient(W * 0.2, H * 0.15, 0, W * 0.2, H * 0.15, W * 0.6); b1.addColorStop(0, light(g.c1, 0.35)); b1.addColorStop(1, 'rgba(0,0,0,0)');
    const b2 = x.createRadialGradient(W * 0.85, H * 0.8, 0, W * 0.85, H * 0.8, W * 0.6); b2.addColorStop(0, rgb(hex(g.c2), 0.9)); b2.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = b1; x.fillRect(0, 0, W, H); x.fillStyle = b2; x.fillRect(0, 0, W, H);
    const txt = onColor(g.c1);
    x.save(); x.translate(W / 2, 560); x.rotate(-0.035);
    const pw = 900, ph = 860;
    x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 60; x.shadowOffsetY = 28;
    rr(x, -pw / 2 - 12, -ph / 2 - 12, pw + 24, ph + 24, 48); x.fillStyle = g.c3; x.fill(); x.shadowColor = 'transparent';
    x.save(); rr(x, -pw / 2, -ph / 2, pw, ph, 38); x.clip(); photo(x, img, -pw / 2, -ph / 2, pw, ph, o); x.restore();
    x.restore();
    if (g.badj) {
      x.save(); x.translate(W - 190, 190); x.rotate(0.17);
      x.shadowColor = 'rgba(0,0,0,.3)'; x.shadowBlur = 24; x.shadowOffsetY = 12;
      x.beginPath(); x.arc(0, 0, 125, 0, Math.PI * 2); x.fillStyle = g.c2; x.fill(); x.shadowColor = 'transparent';
      x.fillStyle = onColor(g.c2) === '#ffffff' ? '#ffffff' : dark(g.c1, 0.4); x.textAlign = 'center';
      x.font = `800 60px ${FONT.t}`; let lines = wrap(x, g.badj.toUpperCase(), 190);
      let s = 60; while ((lines.length > 3 || lines.some((l) => x.measureText(l).width > 200)) && s > 28) { s -= 4; x.font = `800 ${s}px ${FONT.t}`; lines = wrap(x, g.badj.toUpperCase(), 190); }
      const lh = s * 1.02; lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * lh + s * 0.35));
      x.restore();
    }
    if (o.logo) logo(x, o.logo, 150, 110, 90, 220, true);
    x.textAlign = 'center'; x.fillStyle = txt;
    const tit = g.tit || g.nom || '';
    fit(x, tit.toUpperCase(), `800 {s}px ${FONT.t}`, W - 120, 76); x.fillText(tit.toUpperCase(), W / 2, 1105);
    if (g.liy) { x.fillStyle = txt === '#ffffff' ? light(g.c2, 0.45) : dark(g.c1, 0.5); fit(x, g.liy, `700 {s}px ${FONT.b}`, W - 160, 34); x.fillText(g.liy, W / 2, 1160); }
    if (o.prenom) { x.fillStyle = txt; fit(x, o.prenom, `italic 500 {s}px ${FONT.s}`, W - 200, 44); x.fillText(o.prenom, W / 2, 1222); }
    footer(x, g, txt);
  }

  /* ---------- Modèl 3 : PWO (pòtrè IA, oswa kad elegan) ---------- */
  function pwo(x, g, img, o) {
    const bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, light(g.c1, 0.06)); bg.addColorStop(1, dark(g.c1, 0.45));
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.globalAlpha = .08; x.strokeStyle = g.c2; x.lineWidth = 2; for (let i = -H; i < W; i += 46) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + H, H); x.stroke(); } x.globalAlpha = 1;
    const txt = onColor(g.c1);
    if (o.logo) logo(x, o.logo, W / 2, 92, 70, 300, lum(g.c1) < 0.6 && o.logoPlate);
    const pw = 600, ph = 750, px = (W - pw) / 2, py = 190;
    x.save(); x.shadowColor = 'rgba(0,0,0,.45)'; x.shadowBlur = 40; x.shadowOffsetY = 18; rr(x, px - 12, py - 12, pw + 24, ph + 24, 40); x.fillStyle = g.c2; x.fill(); x.restore();
    const gold = x.createLinearGradient(px, py, px + pw, py + ph); gold.addColorStop(0, light(g.c2, 0.45)); gold.addColorStop(.5, g.c2); gold.addColorStop(1, light(g.c2, 0.45));
    rr(x, px - 12, py - 12, pw + 24, ph + 24, 40); x.fillStyle = gold; x.fill();
    x.save(); rr(x, px, py, pw, ph, 30); x.clip(); photo(x, img, px, py, pw, ph, o);
    const sh = x.createLinearGradient(0, py + ph * .6, 0, py + ph); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.82)'); x.fillStyle = sh; x.fillRect(px, py, pw, ph); x.restore();
    const kick = (g.riban || 'MA VERSION PRO').toUpperCase();
    x.textAlign = 'center'; x.font = `700 26px ${FONT.b}`; const kw = x.measureText(kick).width + 60;
    rr(x, W / 2 - kw / 2, py - 34, kw, 50, 25); x.fillStyle = dark(g.c1, 0.3); x.fill(); x.strokeStyle = g.c2; x.lineWidth = 3; x.stroke();
    x.fillStyle = light(g.c2, 0.5); x.fillText(kick, W / 2, py);
    if (o.prenom) { x.fillStyle = '#fff'; fit(x, o.prenom, `italic 500 {s}px ${FONT.s}`, pw - 80, 58); x.fillText(o.prenom, W / 2, py + ph - 118); }
    const big = (o.titre || g.tit || '').toUpperCase();
    if (big) { x.fillStyle = light(g.c2, 0.5); fit(x, big, `800 {s}px ${FONT.t}`, pw - 60, 80); x.fillText(big, W / 2, py + ph - 38); }
    let y = py + ph + 80;
    if (g.sou_tit) { x.fillStyle = txt === '#ffffff' ? '#c9d8ea' : dark(g.c1, 0.5); x.font = `500 30px ${FONT.b}`; x.fillText(g.sou_tit, W / 2, y); y += 62; }
    x.fillStyle = txt; fit(x, (g.nom || '').toUpperCase(), `800 {s}px ${FONT.t}`, W - 160, 60); x.fillText((g.nom || '').toUpperCase(), W / 2, y);
    if (g.liy) { y += 48; x.fillStyle = g.c2; fit(x, g.liy.toUpperCase(), `700 {s}px ${FONT.b}`, W - 160, 28); x.fillText(g.liy.toUpperCase(), W / 2, y); }
    footer(x, g, txt);
  }

  const MODELS = { sek, polaroid, pwo };
  window.SouriyoKad = {
    W, H, MODELS,
    // o : { prenom, zoom, dx, dy, logo (Image), logoPlate, titre }
    draw(canvas, g, img, o = {}) {
      canvas.width = W; canvas.height = H;
      const x = canvas.getContext('2d'); x.clearRect(0, 0, W, H); x.textBaseline = 'alphabetic';
      (MODELS[o.modele || g.modele] || sek)(x, g, img, o);
      return canvas;
    },
    fontsReady() {
      const f = ['800 50px "Bricolage Grotesque"', '700 50px "DM Sans"', '500 50px "DM Sans"', 'italic 500 50px "Playfair Display"'];
      return Promise.all(f.map((s) => document.fonts.load(s).catch(() => {}))).then(() => document.fonts.ready);
    },
    loadImage(src) { return new Promise((res) => { if (!src) return res(null); const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); },
  };
})();
