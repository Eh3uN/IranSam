import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateSiteData } from '../src/services/api.js';
import { renderSections } from '../src/components/sections.js';
import { renderHeader, renderMobileNavigation, renderLoader } from '../src/components/header.js';
import { renderFooter } from '../src/components/footer.js';
import { renderContact } from '../src/components/contact.js';
import { renderAbout } from '../src/components/about.js';

const original = JSON.parse(await readFile(new URL('../public/data/site.json', import.meta.url), 'utf8'));
const render = data => renderHeader(data) + renderLoader(data) + renderSections(data)
  + renderFooter(data) + renderMobileNavigation(data.navigation) + renderContact(data) + renderAbout(data);
assert.equal(validateSiteData(original), original, 'Validation must preserve the editable content');
assert.ok(render(original).includes('id="progress"'), 'Validated site content must render completely');

let rejectedCases = 0;
function rejectChange(path, value) {
  const data = structuredClone(original);
  const keys = path.split('.');
  const field = keys.pop();
  const parent = keys.reduce((item, key) => item[key], data);
  if (value === undefined) delete parent[field];
  else parent[field] = value;
  assert.throws(() => validateSiteData(data), error => error.name === 'Error' && /^Invalid /.test(error.message),
    `${path} must reject ${String(value)} before rendering, with a content error rather than a TypeError`);
  rejectedCases++;
}

// These missing strings previously passed validation and silently rendered blank.
const requiredTextPaths = [
  'meta.title', 'meta.description',
  'brand.name', 'brand.subtitle', 'brand.ageRange', 'brand.ageUnit',
  ...['kicker', 'title', 'status', 'skipLabel', 'signature'].map(key => `loader.${key}`),
  ...['eyebrow', 'title', 'accent', 'backLabel'].map(key => `closing.${key}`),
  'closing.availability.label', 'closing.availability.caption',
  'sections.0.titleSecond', 'sections.0.ageHighlight', 'sections.0.ageCaption',
  'sections.1.titleSecond', 'sections.1.note.tag', 'sections.2.invitation',
  'sections.4.routeLabel', 'sections.4.routeEnd', 'sections.4.stations.0.image.alt',
  'sections.5.subtitle', 'sections.5.report.caption', 'sections.5.report.steps.0.description',
  'about.lead', 'about.profile.description', 'about.highlights.0.title',
  ...original.sections.flatMap((section, index) => [
    ...['eyebrow', 'title', 'accent', 'footer.english', 'footer.caption'].map(key => `sections.${index}.${key}`),
    ...(section.image ? [`sections.${index}.image.alt`] : []),
    ...(section.cta ? [`sections.${index}.cta.label`] : []),
  ]),
];
for (const path of requiredTextPaths) {
  for (const value of [undefined, null, '', '   ', 42]) rejectChange(path, value);
}

// Missing CTAs used to fail only after validation, inside the section renderer.
for (let index = 0; index < 5; index++) {
  for (const value of [undefined, null, {}, [], 'entrance']) rejectChange(`sections.${index}.cta`, value);
  for (const value of [undefined, null, '', 'missing-section', '#intro', 'javascript:alert(1)']) {
    rejectChange(`sections.${index}.cta.target`, value);
  }
}

const objectPaths = [
  'brand', 'meta', 'loader', 'closing', 'closing.availability', 'about', 'about.profile',
  'sections.0.image', 'sections.1.note', 'sections.4.stations.0.image', 'sections.5.report',
  ...original.sections.map((_, index) => `sections.${index}.footer`),
];
for (const path of objectPaths) {
  for (const value of [undefined, null, [], 'content']) rejectChange(path, value);
}

// Preserve array lengths so a length check cannot mask a crash on a null entry.
const arrayPaths = [
  'navigation', 'sections', 'sections.1.note.lines', 'sections.2.kits', 'sections.3.drills',
  'sections.4.stations', 'sections.5.report.steps', 'about.paragraphs', 'about.profile.credentials',
  'about.highlights', 'closing.description', 'contact.faqs',
  ...original.sections.map((_, index) => `sections.${index}.description`),
];
for (const path of arrayPaths) {
  for (const value of [undefined, null, {}, [], 'content']) rejectChange(path, value);
  rejectChange(`${path}.0`, null);
}
rejectChange('navigation.0.id', 'progress');
rejectChange('sections.0.type', 'training');
rejectChange('sections.2.kits.0.color', 'red');

const assetPaths = [
  'brand.logo', 'sections.4.stations.0.image.src',
  ...original.sections.flatMap((section, index) => section.image
    ? [`sections.${index}.image.desktop`, `sections.${index}.image.mobile`] : []),
];
for (const path of assetPaths) {
  for (const value of [undefined, null, '', 'images/../private.json', 'https://example.com/image.webp', 'javascript:alert(1)']) {
    rejectChange(path, value);
  }
}

// Optional heading continuation and deliberately empty second fragments remain supported.
const optionalHeadings = structuredClone(original);
optionalHeadings.sections[2].titleSecond = '';
optionalHeadings.sections[3].titleSecond = '';
for (const section of optionalHeadings.sections) delete section.headingContinuation;
assert.doesNotThrow(() => render(validateSiteData(optionalHeadings)));
rejectChange('sections.2.headingContinuation', {});
for (const invalid of [undefined, null, [], 'content']) {
  assert.throws(() => validateSiteData(invalid), { name: 'Error', message: /Invalid site/ });
}

console.log(`Site validation passed: real content renders and ${rejectedCases} malformed content cases are rejected.`);
