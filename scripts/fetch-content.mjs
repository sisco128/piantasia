// Build-time content sync: pull products and reviews from the Strapi CMS and
// write them as static data bundled into the app. Runs in `prebuild` (and
// `sync:content`).
//
// On failure (CMS unreachable / sleeping) it keeps the committed snapshot so
// builds never break. Set VITE_STRAPI_URL to target a CMS instance.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../src/data');

const BASE = (process.env.VITE_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
const TIMEOUT_MS = 60_000;
const RETRIES = 3;

const absUrl = (url) => (!url ? url : /^https?:\/\//.test(url) ? url : `${BASE}${url}`);

function mapProduct(e) {
  const images = (e.images || []).map((m) => absUrl(m?.url)).filter(Boolean);

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
    ...(e.description ? { description: e.description } : {}),
  };
}

function mapReview(e) {
  return {
    id: String(e.documentId || e.id),
    authorName: e.authorName || '',
    rating: Number(e.rating) || 5,
    body: e.body || '',
    ...(e.country ? { country: e.country } : {}),
    ...(e.title ? { title: e.title } : {}),
  };
}

async function fetchData(endpoint) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data)) throw new Error('Unexpected response shape');
    return json.data;
  } finally {
    clearTimeout(t);
  }
}

// Fetch one collection with retries; on failure keep the committed snapshot
// (or fail the build if none exists). Returns true on success.
async function sync({ label, endpoint, map, file, keep }) {
  const out = resolve(DATA_DIR, file);
  let lastErr;
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      const data = await fetchData(endpoint);
      const mapped = data.map(map).filter(keep);
      mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(out, `${JSON.stringify(mapped, null, 2)}\n`);
      console.log(`[content] wrote ${mapped.length} ${label} -> src/data/${file}`);
      return true;
    } catch (err) {
      lastErr = err;
      console.warn(`[content] ${label} attempt ${attempt}/${RETRIES} failed: ${err.message}`);
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 3000 * attempt));
    }
  }

  if (existsSync(out)) {
    console.warn(`[content] CMS unreachable — keeping existing ${label} snapshot. (${lastErr?.message})`);
    return false;
  }
  console.error(`[content] CMS unreachable and no ${label} snapshot exists. Failing build. (${lastErr?.message})`);
  process.exit(1);
}

async function main() {
  console.log(`[content] syncing from ${BASE} ...`);
  await sync({
    label: 'products',
    endpoint: `${BASE}/api/products?populate=*&sort=galleryOrder&pagination[pageSize]=100`,
    map: mapProduct,
    file: 'products.generated.json',
    keep: (p) => p.id && p.name,
  });
  await sync({
    label: 'reviews',
    endpoint: `${BASE}/api/reviews?sort=displayOrder:asc&pagination[pageSize]=100`,
    map: mapReview,
    file: 'reviews.generated.json',
    keep: (r) => r.authorName && r.body,
  });
}

main();
