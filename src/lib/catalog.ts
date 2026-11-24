/**
 * CC3PO Pricing Catalog — build-time consumer (agency merge map §3, step 2).
 *
 * The catalog's source of truth is offers-cc3po-astro `src/data/pricing.json`,
 * published as a versioned JSON at https://offers.cc3po.com/catalog/pricing-v1.json
 * (catalogVersion pinned below). Pages fetch it at BUILD time only — never at
 * runtime — validate the entries they use, and render from it.
 *
 * Fallback: if the fetch fails or validation fails, the build uses the
 * committed snapshot `src/data/catalog-snapshot.json` (last-good catalog,
 * refreshed by `npm run catalog:refresh`) and logs a warning. A catalog
 * outage can never break this site's build; the drift watchdog flags a
 * stale snapshot as drift.
 *
 * Never hardcode a ladder or setup price in a page again — render from here.
 */
import snapshotData from '../data/catalog-snapshot.json';

export const CATALOG_URL = 'https://offers.cc3po.com/catalog/pricing-v1.json';
export const PINNED_CATALOG_VERSION = '2026-11-24.1';

export interface CatalogItem {
  id: string;
  name: string;
  displayName?: string;
  monthlyPrice: number | null;
  setupPrice?: number | null;
  annualPrepayMonthlyPrice?: number | null;
  pricePrefix: string | null;
  stripeLink: string | null;
  source: string;
}

export interface Catalog {
  catalogVersion: string;
  ladder: CatalogItem[];
  setupOffers: CatalogItem[];
  [key: string]: unknown;
}

/** "$1,997" style formatting — matches offers-cc3po-astro src/lib/pricing.ts. */
export const fmt = (n: number): string => '$' + n.toLocaleString('en-US');

function validate(data: unknown): Catalog {
  const d = data as Catalog;
  if (!d || typeof d.catalogVersion !== 'string' || !Array.isArray(d.ladder) || !Array.isArray(d.setupOffers)) {
    throw new Error('catalog: malformed payload');
  }
  for (const [section, ids] of [['ladder', ['shield', 'fortress', 'village', 'citadel']], ['setupOffers', ['agent-launch', 'custom-agent-build']]] as const) {
    for (const id of ids) {
      const item = (d[section] as CatalogItem[]).find((i) => i.id === id);
      if (!item) throw new Error(`catalog: missing ${section}.${id}`);
      const price = section === 'ladder' ? item.monthlyPrice : item.setupPrice;
      if (typeof price !== 'number') throw new Error(`catalog: ${section}.${id} has no numeric price`);
    }
  }
  return d;
}

let cached: Promise<{ catalog: Catalog; source: 'live' | 'snapshot' }> | null = null;

export function getCatalog() {
  if (!cached) {
    cached = (async () => {
      try {
        const res = await fetch(`${CATALOG_URL}?v=${PINNED_CATALOG_VERSION}`, {
          signal: AbortSignal.timeout(8000),
          headers: { 'cache-control': 'no-cache' },
        });
        if (!res.ok) throw new Error(`catalog fetch HTTP ${res.status}`);
        const catalog = validate(await res.json());
        if (catalog.catalogVersion !== PINNED_CATALOG_VERSION) {
          console.warn(`[catalog] live catalogVersion ${catalog.catalogVersion} != pinned ${PINNED_CATALOG_VERSION}; using live (bump the pin + snapshot).`);
        }
        return { catalog, source: 'live' as const };
      } catch (err) {
        console.warn(`[catalog] live fetch failed (${(err as Error).message}); falling back to committed snapshot ${snapshotData.catalogVersion}.`);
        return { catalog: validate(snapshotData), source: 'snapshot' as const };
      }
    })();
  }
  return cached;
}

export interface CatalogHelpers {
  catalog: Catalog;
  source: 'live' | 'snapshot';
  ladderTier: (id: string) => CatalogItem;
  setupOffer: (id: string) => CatalogItem;
  fmt: (n: number) => string;
}

export async function catalogHelpers(): Promise<CatalogHelpers> {
  const { catalog, source } = await getCatalog();
  const byId = (list: CatalogItem[], id: string): CatalogItem => {
    const hit = list.find((i) => i.id === id);
    if (!hit) throw new Error(`catalog: no entry with id "${id}"`);
    return hit;
  };
  return {
    catalog,
    source,
    ladderTier: (id) => byId(catalog.ladder, id),
    setupOffer: (id) => byId(catalog.setupOffers, id),
    fmt,
  };
}
