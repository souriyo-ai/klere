// Souriyo — konfigirasyon piblik (pa gen sekrè isit la)
window.SOURIYO = {
  SUPABASE_URL: 'https://udvaaoguknrsqucdonco.supabase.co',
  SUPABASE_KEY: 'sb_publishable_z0LsPpZ8msDatjt0hc9H_A_Kkb5eFMz',
  IA_URL: 'https://udvaaoguknrsqucdonco.supabase.co/functions/v1/souriyo-ia',
  WA: '50900000000',            // ⚠️ nimewo WhatsApp Business Souriyo a (pou peman ak kontak)
  MONCASH: { num: '+509 0000-0000', nom: 'Souriyo' },   // ⚠️ pou konfime
  SITE: 'souriyo.com',
  INSTAGRAM: 'https://www.instagram.com/souriyo.ai/',
  PACKS: [{ n: 1, p: 100 }, { n: 3, p: 250, tag: 'save' }, { n: 5, p: 350, tag: 'best' }],
};
window.SOURIYO.PEMAN_URL = 'https://udvaaoguknrsqucdonco.supabase.co/functions/v1/souriyo-peman';
// Peman MonCash otomatik : èske li aktif ? (rezilta a kenbe pou paj la)
window.SOURIYO.pemanAktif = () => (window.SOURIYO._pa ||= fetch(window.SOURIYO.PEMAN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"action":"konfig"}' })
  .then((r) => r.json()).then((j) => !!j.aktif).catch(() => false));
// Kreye yon peman, louvri MonCash nan yon lòt onglè, epi tann peman an isit la.
// (Pa bezwen Return URL MonCash la : paj la verifye kòmand lan li menm.)
window.SOURIYO.peye = async (body, jwt, back) => {
  const S = window.SOURIYO;
  try {
    const r = await fetch(S.PEMAN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}) }, body: JSON.stringify({ action: 'kreye', ...body }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.url) return j.error || 'server';
    try { localStorage.setItem('souriyo_peman', JSON.stringify({ order: j.order, back: back || location.href, t: Date.now() })); } catch {}
    const w = window.open(j.url, '_blank');
    if (!w) { location.href = j.url; return null; }
    S.tannPeman(j.order, j.url); return null;
  } catch { return 'network'; }
};
// Verifye yon kòmand ; si li peye, ale sou paj konfimasyon an
window.SOURIYO.verifyeKomand = async (order) => {
  const S = window.SOURIYO;
  try {
    const r = await fetch(S.PEMAN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'verifye', orderId: order }) });
    const j = await r.json(); if (j.ok) { let b = ''; try { b = JSON.parse(localStorage.getItem('souriyo_peman') || '{}').back || ''; } catch {} location.href = `${S.BASE}peman/?orderId=${encodeURIComponent(order)}${b ? '&back=' + encodeURIComponent(b) : ''}`; return true; }
  } catch {}
  return false;
};
// Fenèt « n ap tann peman an » ak verifikasyon chak 4 segonn (15 minit maks.)
window.SOURIYO.tannPeman = (order, url) => {
  const S = window.SOURIYO; const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;background:rgba(21,24,72,.55);display:grid;place-items:center;z-index:9999;padding:16px;font-family:"DM Sans",system-ui,sans-serif';
  d.innerHTML = `<div style="background:#fff;border-radius:22px;padding:24px 20px;max-width:380px;width:100%;text-align:center;color:#151848">
    <div style="width:40px;height:40px;border:4px solid #f1e6dc;border-top-color:#FF5A36;border-radius:50%;margin:4px auto 14px;animation:sry-s 1s linear infinite"></div>
    <b style="font-size:19px">N ap tann peman MonCash la…</b><p style="color:#4b5085;margin:8px 0 16px;font-size:14px">Peye nan onglè MonCash la. Lè w fini, tounen isit la : n ap konfime l otomatikman.</p>
    <a href="${url}" target="_blank" rel="noopener" style="display:block;background:#FF5A36;color:#fff;border-radius:999px;padding:11px;font-weight:700;text-decoration:none">Louvri MonCash ankò</a>
    <button type="button" data-sry="ok" style="display:block;width:100%;margin-top:8px;border:1.5px solid #ece4dc;background:#fff;border-radius:999px;padding:11px;font-weight:700;cursor:pointer;color:#151848">Mwen fin peye</button>
    <button type="button" data-sry="x" style="margin-top:10px;border:0;background:none;color:#4b5085;cursor:pointer;text-decoration:underline">Fèmen</button>
    <p data-sry="m" style="color:#b3261e;font-size:13px;min-height:1em;margin:8px 0 0"></p></div><style>@keyframes sry-s{to{transform:rotate(360deg)}}</style>`;
  document.body.appendChild(d);
  const t0 = Date.now(); let on = true;
  const tick = async () => { if (!on) return; if (await S.verifyeKomand(order)) return; if (Date.now() - t0 < 9e5) setTimeout(tick, 4000); };
  setTimeout(tick, 5000);
  d.querySelector('[data-sry="ok"]').onclick = async () => { d.querySelector('[data-sry="m"]').textContent = ''; if (!(await S.verifyeKomand(order))) d.querySelector('[data-sry="m"]').textContent = 'Nou poko wè peman an. Tann kèk segonn epi eseye ankò.'; };
  d.querySelector('[data-sry="x"]').onclick = () => { on = false; d.remove(); };
};
// Si gen yon peman ki te kòmanse (mwens pase 2 è), tcheke l lè paj la louvri
setTimeout(() => {
  try {
    const S = window.SOURIYO, p = JSON.parse(localStorage.getItem('souriyo_peman') || 'null');
    if (!p || p.fini || /\/peman\/?$/.test(location.pathname)) return;
    if (Date.now() - p.t > 72e5) { localStorage.removeItem('souriyo_peman'); return; }
    if (Date.now() - (p.c || 0) < 3e4) return;
    p.c = Date.now(); localStorage.setItem('souriyo_peman', JSON.stringify(p)); S.verifyeKomand(p.order);
  } catch {}
}, 1500);
// Baz URL la (GitHub Pages : /souriyo/… ; domèn pa l : /…)
window.SOURIYO.BASE = (() => {
  const seg = location.pathname.split('/').filter(Boolean);
  return location.hostname.endsWith('github.io') && seg.length ? `/${seg[0]}/` : '/';
})();
window.SOURIYO.groupUrl = (slug) => `${location.origin}${window.SOURIYO.BASE}${slug}`;
// Ti kliyan REST Supabase (san bibliyotèk)
window.SOURIYO.api = async (path, opts = {}) => {
  const S = window.SOURIYO;
  const r = await fetch(`${S.SUPABASE_URL}/rest/v1/${path}`, {
    ...opts, headers: { apikey: S.SUPABASE_KEY, Authorization: `Bearer ${S.SUPABASE_KEY}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  if (!r.ok) throw new Error(`api ${r.status}`);
  const t = await r.text(); return t ? JSON.parse(t) : null;
};
