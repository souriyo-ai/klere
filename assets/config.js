// Souriyo — konfigirasyon piblik (pa gen sekrè isit la)
window.SOURIYO = {
  SUPABASE_URL: 'https://udvaaoguknrsqucdonco.supabase.co',
  SUPABASE_KEY: 'sb_publishable_z0LsPpZ8msDatjt0hc9H_A_Kkb5eFMz',
  IA_URL: 'https://udvaaoguknrsqucdonco.supabase.co/functions/v1/souriyo-ia',
  WA: '50900000000',            // ⚠️ nimewo WhatsApp Business Souriyo a (pou peman ak kontak)
  MONCASH: { num: '+509 0000-0000', nom: 'Souriyo' },   // ⚠️ pou konfime
  SITE: 'souriyo.com',
  PACKS: [{ n: 1, p: 100 }, { n: 3, p: 250, tag: 'save' }, { n: 5, p: 350, tag: 'best' }],
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
