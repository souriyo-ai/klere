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
// Kreye yon peman epi ale sou MonCash. Retounen yon erè si sa pa mache.
window.SOURIYO.peye = async (body, jwt, back) => {
  const S = window.SOURIYO;
  try {
    const r = await fetch(S.PEMAN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}) }, body: JSON.stringify({ action: 'kreye', ...body }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.url) return j.error || 'server';
    try { localStorage.setItem('souriyo_peman', JSON.stringify({ order: j.order, back: back || location.href, t: Date.now() })); } catch {}
    location.href = j.url; return null;
  } catch { return 'network'; }
};
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
