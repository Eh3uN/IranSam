import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { validateSiteData } from '../src/services/api.js';
import { renderSections } from '../src/components/sections.js';
import { renderHeader, renderMobileNavigation, renderLoader } from '../src/components/header.js';
import { renderFooter } from '../src/components/footer.js';
import { renderContact } from '../src/components/contact.js';

const root = new URL('../', import.meta.url);
const data = validateSiteData(JSON.parse(await readFile(new URL('public/data/site.json', root), 'utf8')));
const assets = [data.brand.logo, ...data.sections.flatMap(section => section.image ? [section.image.desktop, section.image.mobile] : [])];
await Promise.all(assets.map(path => access(new URL(`public/${path}`, root))));
const html = renderHeader(data) + renderLoader(data) + renderSections(data) + renderFooter(data) + renderMobileNavigation(data.navigation) + renderContact(data);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids');
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(target), `Missing anchor destination: ${target}`);
}
assert.equal((html.match(/<section /g) ?? []).length, data.sections.length, 'Expected all story and development sections');
assert.ok(!html.includes('undefined'), 'Incomplete content rendered');
console.log(`Content valid: ${data.sections.length} sections, ${assets.length} image references, navigation targets resolved.`);
