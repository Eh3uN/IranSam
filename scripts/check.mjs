import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { validateSiteData } from '../src/services/api.js';
import { renderSections } from '../src/components/sections.js';
import { renderHeader, renderMobileNavigation, renderLoader } from '../src/components/header.js';
import { renderFooter } from '../src/components/footer.js';
import { renderContact } from '../src/components/contact.js';
import { renderAbout } from '../src/components/about.js';

const root = new URL('../', import.meta.url);
const data = validateSiteData(JSON.parse(await readFile(new URL('public/data/site.json', root), 'utf8')));
const assets = [data.brand.logo, ...data.sections.flatMap(section => [
  ...(section.image ? [section.image.desktop, section.image.mobile] : []),
  ...(section.stations?.map(station => station.image.src) ?? []),
])];
await Promise.all(assets.map(path => access(new URL(`public/${path}`, root))));
const sectionsHtml = renderSections(data);
const html = renderHeader(data) + renderLoader(data) + sectionsHtml + renderFooter(data) + renderMobileNavigation(data.navigation) + renderContact(data) + renderAbout(data);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids');
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(target), `Missing anchor destination: ${target}`);
}
assert.equal((sectionsHtml.match(/<section /g) ?? []).length, data.sections.length, 'Expected all story and development sections');
assert.ok(!html.includes('undefined'), 'Incomplete content rendered');
assert.ok(html.includes('<em>مسیر</em> رشدت را فقط'), 'Progress heading accent is missing');
assert.ok(html.includes('احساس نکن؛ آن را <em>ببین</em>.'), 'Progress heading highlight is missing');
assert.ok(html.includes('ایران <em>سام</em>'), 'Brand accent is missing in the progress section');
assert.ok(!html.includes('assessment-cadence'), 'Removed assessment cadence is still rendered');
assert.ok(!html.includes('family-note'), 'Removed family note is still rendered');
assert.ok(html.includes('data-open-panel="about-panel"'), 'About trigger is missing');
assert.ok(html.includes('class="contact-panel about-panel"'), 'About dialog is missing');
assert.ok(html.includes('class="closing-cta-copy"'), 'Footer conversation note is missing');
assert.ok(!html.includes('مسیری حرفه‌ای برای ساختن بازیکنی آماده، توانمند و رو به پیشرفت.'), 'Removed footer sentence is still rendered');
console.log(`Content valid: ${data.sections.length} sections, ${assets.length} image references, navigation targets resolved.`);
