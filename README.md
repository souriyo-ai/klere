# Souriyo — Foto pa w, fyète nou

Platfòm foto pou **gwoup** : lekòl, inivèsite, evènman, legliz, asosyasyon, antrepriz.
- **Kad gwoup (gratis) :** manm yo mete selfi yo nan kad gwoup la. Foto a fèt **nan navigatè a** : li pa janm voye sou yon sèvè.
- **Pòtrè IA (peye) :** rad pwofesyonèl (28 metye), fèt ak IA, nan kad gwoup la. Peman MonCash + koupon.
- **Klasman :** ki gwoup ki fè plis foto.

## Paj yo
| Adrès | Fichye | Wòl |
|---|---|---|
| `/` | `index.html` | Paj prezantasyon Souriyo |
| `/{gwoup}` (ex. `/flanbwayan`) | `404.html` → `g/index.html?s=…` | Paj gwoup la : kad gratis + pòtrè IA + achte |
| `/klasman/` | `klasman/index.html` | Klasman gwoup yo |
| `/admin/` | `admin/index.html` | Kreye ak jere gwoup yo, koupon yo, demand metye yo |

`assets/kad.js` desine 3 modèl kad yo (`sek`, `polaroid`, `pwo`) sou yon canvas 1080 × 1350. Menm kòd la sèvi pou paj gwoup la ak pou aperçu admin an.

## Backend (Supabase `souriyo`, `udvaaoguknrsqucdonco`)
- **Tab yo :**
  - `groupes` : konfigirasyon gwoup yo (piblik si `aktif`) ;
  - `groupe_kontak`, `manm` : prive, admin sèlman ;
  - `stats` : kad / IA pa jou ;
  - `ia_usage` ;
  - `coupons` ;
  - `demandes` ;
  - `admins`.
- **Fonksyon piblik :**
  - `konte_kad(slug)` ;
  - `klasman(type)` ;
  - `utiliser_coupon(code, tel, slug)`.
- **Fonksyon admin :** `creer_coupon(photos, tel, note, slug)`.
- **Fonksyon sèvè :** `souriyo-ia` (Edge Function) → OpenRouter (`google/gemini-nano-banana-2.1`, ~0,038 $ / pòtrè).
  - Li verifye gwoup la, lis manm lan, kantite pòtrè gratis yo ak plafon an.
  - Si IA a echwe, li remèt esè a.
- **Logo yo :** bucket `logos` (piblik pou li, admin sèlman pou ekri).
- **Sekrè pou ajoute :** `OPENROUTER_API_KEY`. Ou mete l nan Dashboard → Edge Functions → Secrets.

## Konfigirasyon
Fichye `assets/config.js` :
- URL ak kle piblik Supabase ;
- **nimewo WhatsApp** ak **MonCash** Souriyo (⚠️ pou konfime) ;
- pri pakè yo.

## Pou konnen
- **Kontè kad yo** (`konte_kad`) se yon fonksyon piblik. Yon moun ki konn sa l ap fè ta ka fè chif klasman an monte. Si sa rive, n ap mete yon limit pa IP nan yon fonksyon sèvè.
- **Paj gwoup yo** sèvi ak `404.html` pou adrès kout yo (`/flanbwayan`). Aperçu WhatsApp lan montre imaj Souriyo jeneral la, pa logo gwoup la.
