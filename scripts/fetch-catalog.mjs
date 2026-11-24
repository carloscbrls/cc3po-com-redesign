#!/usr/bin/env node
/**
 * Refresh the committed catalog snapshot (src/data/catalog-snapshot.json)
 * from the published catalog. Run after a catalog version bump in
 * offers-cc3po-astro, then commit the refreshed snapshot in the same motion:
 *   npm run catalog:refresh
 * Pins must move together: PINNED_CATALOG_VERSION in src/lib/catalog.ts,
 * this snapshot, and the offers catalogVersion.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const URL = 'https://offers.cc3po.com/catalog/pricing-v1.json';
const res = await fetch(`${URL}?cb=${Date.now()}`, { headers: { 'cache-control': 'no-cache' } });
if (!res.ok) throw new Error(`catalog fetch HTTP ${res.status}`);
const catalog = await res.json();
if (!catalog.catalogVersion || !Array.isArray(catalog.ladder)) throw new Error('catalog payload malformed');
const dest = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/data/catalog-snapshot.json');
writeFileSync(dest, JSON.stringify(catalog, null, 2) + '\n');
console.log(`snapshot refreshed: catalogVersion ${catalog.catalogVersion} -> ${dest}`);
