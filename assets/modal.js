/* Souriyo — bèl fenèt (ranplase alert / confirm / prompt navigatè a).
   SM.alert(tèks) · await SM.confirm(tèks, { ok, danger }) → true/false · await SM.prompt(tèks, valè, { placeholder, type, multi }) → tèks oswa null */
(function () {
  const css = `.sm-bg{position:fixed;inset:0;background:rgba(21,24,72,.55);backdrop-filter:blur(3px);display:grid;place-items:center;z-index:10000;padding:16px;animation:smf .15s ease}
  .sm{background:#fff;border-radius:22px;width:100%;max-width:460px;box-shadow:0 30px 80px rgba(0,0,0,.35);overflow:hidden;animation:smu .18s ease;font:15px/1.5 "DM Sans",system-ui,sans-serif;color:#151848}
  .sm-h{display:flex;gap:12px;align-items:flex-start;padding:20px 22px 6px}.sm-i{font-size:28px;line-height:1}.sm-t{white-space:pre-line;font-weight:600;font-size:16px;padding-top:3px}
  .sm-b{padding:8px 22px 0}.sm-b input,.sm-b textarea{width:100%;border:1.5px solid #ece4dc;border-radius:14px;padding:11px 12px;font:15px "DM Sans",system-ui,sans-serif;color:#151848;background:#fff}
  .sm-b textarea{min-height:90px;resize:vertical}.sm-b input:focus,.sm-b textarea:focus{outline:none;border-color:#FF5A36;box-shadow:0 0 0 4px rgba(255,90,54,.15)}
  .sm-f{display:flex;justify-content:flex-end;gap:8px;padding:16px 22px 20px}
  .sm-f button{border:1.5px solid #ece4dc;background:#fff;color:#151848;border-radius:999px;padding:10px 18px;font:700 14px "DM Sans",system-ui,sans-serif;cursor:pointer}
  .sm-f .ok{background:#FF5A36;border-color:#FF5A36;color:#fff}.sm-f .ok.danger{background:#b3261e;border-color:#b3261e}
  @keyframes smf{from{opacity:0}}@keyframes smu{from{transform:translateY(12px);opacity:0}}`;
  const st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);
  const T = { ht: ['OK', 'Anile'], fr: ['OK', 'Annuler'], en: ['OK', 'Cancel'] };
  const lang = () => { try { return (location.pathname.includes('/admin') ? localStorage.getItem('souriyo_admin_lang') : localStorage.getItem('souriyo_lang')) || 'ht'; } catch { return 'ht'; } };
  const tr = (s) => (window.SOURIYO_ADMIN_TR ? window.SOURIYO_ADMIN_TR(String(s)) : String(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function open(kind, msg, def, o = {}) {
    return new Promise((res) => {
      if (kind === 'confirm' && o.danger === undefined && /^(Efase|Retire|Refize|Anile)/.test(String(msg))) o = { ...o, danger: true };
      const L = T[lang()] || T.ht, icon = o.icon || { alert: 'ℹ️', confirm: o.danger ? '⚠️' : '❓', prompt: '✏️' }[kind];
      const bg = document.createElement('div'); bg.className = 'sm-bg';
      const field = kind === 'prompt' ? (o.multi ? `<textarea maxlength="${o.max || 1000}" placeholder="${esc(o.placeholder || '')}">${esc(def || '')}</textarea>` : `<input type="${o.type || 'text'}" maxlength="${o.max || 300}" placeholder="${esc(o.placeholder || '')}" value="${esc(def || '')}" />`) : '';
      bg.innerHTML = `<div class="sm" role="dialog" aria-modal="true"><div class="sm-h"><span class="sm-i">${icon}</span><div class="sm-t">${esc(tr(msg))}</div></div>${field ? `<div class="sm-b">${field}</div>` : ''}
        <div class="sm-f">${kind !== 'alert' ? `<button type="button" data-x>${esc(tr(o.cancel || L[1]))}</button>` : ''}<button type="button" class="ok${o.danger ? ' danger' : ''}" data-ok>${esc(tr(o.ok || L[0]))}</button></div></div>`;
      document.body.appendChild(bg);
      const inp = bg.querySelector('input,textarea'), okb = bg.querySelector('[data-ok]');
      setTimeout(() => (inp ? (inp.focus(), inp.select && inp.select()) : okb.focus()), 30);
      const end = (v) => { document.removeEventListener('keydown', key, true); bg.remove(); res(v); };
      const no = kind === 'confirm' ? false : kind === 'prompt' ? null : undefined;
      const yes = () => end(kind === 'confirm' ? true : kind === 'prompt' ? inp.value : undefined);
      const key = (e) => { if (e.key === 'Escape') { e.preventDefault(); end(no); } else if (e.key === 'Enter' && (!inp || inp.tagName === 'INPUT' || e.ctrlKey || e.metaKey)) { e.preventDefault(); yes(); } };
      document.addEventListener('keydown', key, true);
      okb.onclick = yes; const x = bg.querySelector('[data-x]'); if (x) x.onclick = () => end(no);
      bg.onclick = (e) => { if (e.target === bg) end(no); };
    });
  }
  window.SM = {
    alert: (m, o) => open('alert', m, null, o),
    confirm: (m, o) => open('confirm', m, null, o),
    prompt: (m, d, o) => open('prompt', m, d, o),
  };
})();
