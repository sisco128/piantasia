// Build-time content sync: pull products from the Strapi CMS and write them
// as static data bundled into the app. Runs in `prebuild` (and `sync:content`).
//
// On failure (CMS unreachable / sleeping) it keeps the committed snapshot so
// builds never break. Set VITE_STRAPI_URL to target a CMS instance.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/data/products.generated.json');

const BASE = (process.env.VITE_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
const ENDPOINT = `${BASE}/api/products?populate=*&sort=galleryOrder&pagination[pageSize]=100`;
const TIMEOUT_MS = 60_000;
const RETRIES = 3;

const absUrl = (url) => (!url ? url : /^https?:\/\//.test(url) ? url : `${BASE}${url}`);

function mapProduct(e) {
  const images = (e.images || []).map((m) => absUrl(m?.url)).filter(Boolean);

  const ingredientNotes = {};
  for (const n of e.ingredientNotes || []) {
    if (n?.name) ingredientNotes[n.name] = n.note || '';
  }

  const sp = e.sensoryPyramid;
  const r = e.ritual;

  // Build with all required Product fields present (defaults for bundles).
  return {
    id: e.slug,
    productType: e.productType === 'bundle' ? 'bundle' : 'blend',
    name: e.name,
    tagline: e.tagline || '',
    tastingNotes: e.tastingNotes || '',
    ingredients: Array.isArray(e.ingredients) ? e.ingredients : [],
    origin: e.origin || '',
    weight: e.weight || '',
    portions: e.portions || '',
    disclaimer: e.disclaimer || '',
    price: e.price || '',
    images,
    ...(e.badge ? { badge: e.badge } : {}),
    ...(e.buyUrl ? { buyUrl: e.buyUrl } : {}),
    ...(e.descriptor ? { descriptor: e.descriptor } : {}),
    ...(Array.isArray(e.moodLines) && e.moodLines.length ? { moodLines: e.moodLines } : {}),
    ...(sp ? { sensoryPyramid: { top: sp.top || '', heart: sp.heart || '', base: sp.base || '' } } : {}),
    ...(Object.keys(ingredientNotes).length ? { ingredientNotes } : {}),
    ...(e.description ? { description: e.description } : {}),
    ...(r ? { ritual: { when: r.when || '', how: r.how || '', time: r.time || '', context: r.context || '' } } : {}),
  };
}

async function fetchOnce() {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data)) throw new Error('Unexpected response shape');
    return json.data;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  console.log(`[content] fetching products from ${BASE} ...`);
  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      const data = await fetchOnce();
      const products = data.map(mapProduct).filter((p) => p.id && p.name);
      mkdirSync(dirname(OUT), { recursive: true });
      writeFileSync(OUT, `${JSON.stringify(products, null, 2)}\n`);
      console.log(`[content] wrote ${products.length} products -> src/data/products.generated.json`);
      return;
    } catch (err) {
      lastErr = err;
      console.warn(`[content] attempt ${attempt}/${RETRIES} failed: ${err.message}`);
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 3000 * attempt));
    }
  }

  if (existsSync(OUT)) {
    console.warn(`[content] CMS unreachable — keeping existing snapshot. (${lastErr?.message})`);
    process.exit(0);
  }
  console.error(`[content] CMS unreachable and no snapshot exists. Failing build. (${lastErr?.message})`);
  process.exit(1);
}

main();
