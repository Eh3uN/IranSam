import { publicPath } from '../utils/paths.js';
import { validateContactData } from '../utils/contact.js';

const sectionIds = ['intro', 'entrance', 'locker', 'training', 'development', 'progress'];
const sectionTypes = ['hero', 'entrance', 'locker', 'training', 'development', 'progress'];
const isText = value => typeof value === 'string' && value.trim().length > 0;

function requireObject(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Invalid ${path}: expected an object`);
  }
}

function requireTextFields(value, fields, path) {
  requireObject(value, path);
  for (const field of fields) {
    if (!isText(value[field])) throw new Error(`Invalid ${path}.${field}: expected non-empty text`);
  }
}

function requireArray(value, path, { length, min = 1 } = {}) {
  if (!Array.isArray(value) || value.length < min || (length !== undefined && value.length !== length)) {
    throw new Error(`Invalid ${path}: expected ${length ?? `at least ${min}`} entries`);
  }
}

function requireLines(value, path, options) {
  requireArray(value, path, options);
  for (const [index, line] of value.entries()) {
    if (!isText(line)) throw new Error(`Invalid ${path}[${index}]: expected non-empty text`);
  }
}

function requireAsset(value, path) {
  try {
    publicPath(value);
  } catch {
    throw new Error(`Invalid ${path}: expected a local public asset path`);
  }
}

/** Catch incomplete content before rendering the page. */
export function validateSiteData(data) {
  requireObject(data, 'site');
  requireTextFields(data.brand, ['name', 'subtitle', 'ageRange', 'ageUnit'], 'brand');
  requireTextFields(data.meta, ['title', 'description'], 'meta');
  requireTextFields(data.loader, ['kicker', 'title', 'status', 'skipLabel', 'signature'], 'loader');
  requireAsset(data.brand.logo, 'brand.logo');
  requireArray(data.sections, 'sections', { length: sectionIds.length });
  requireArray(data.navigation, 'navigation', { length: sectionIds.length });

  for (const [index, section] of data.sections.entries()) {
    const path = `sections[${index}]`;
    requireTextFields(section, ['id', 'type', 'eyebrow', 'title', 'accent'], path);
    if (section.id !== sectionIds[index] || section.type !== sectionTypes[index]) {
      throw new Error(`Invalid ${path}: expected the ${sectionIds[index]} section`);
    }
    requireLines(section.description, `${path}.description`);
    requireTextFields(section.footer, ['english', 'caption'], `${path}.footer`);
    if (index < 4) {
      requireTextFields(section.image, ['alt'], `${path}.image`);
      requireAsset(section.image.desktop, `${path}.image.desktop`);
      requireAsset(section.image.mobile, `${path}.image.mobile`);
      // Locker and training intentionally use an empty second heading fragment.
      if (typeof section.titleSecond !== 'string' || (index < 2 && !isText(section.titleSecond))) {
        throw new Error(`Invalid ${path}.titleSecond: expected heading text`);
      }
    }
    if (section.headingContinuation !== undefined && typeof section.headingContinuation !== 'string') {
      throw new Error(`Invalid ${path}.headingContinuation: expected text`);
    }
    if (index < 5 || section.cta !== undefined) {
      requireTextFields(section.cta, ['label', 'target'], `${path}.cta`);
      if (!sectionIds.includes(section.cta.target)) throw new Error(`Invalid ${path}.cta.target: unknown section`);
    }
    const nav = data.navigation[index];
    requireTextFields(nav, ['id', 'label', 'mobileLabel'], `navigation[${index}]`);
    if (nav.id !== section.id) throw new Error(`Invalid navigation[${index}].id: expected ${section.id}`);
  }

  requireTextFields(data.sections[0], ['ageHighlight', 'ageCaption'], 'sections[0]');
  const entrance = data.sections[1];
  requireTextFields(entrance.note, ['tag'], 'sections[1].note');
  requireLines(entrance.note.lines, 'sections[1].note.lines');
  const locker = data.sections[2];
  requireTextFields(locker, ['invitation'], 'sections[2]');
  requireArray(locker.kits, 'sections[2].kits');
  for (const [index, kit] of locker.kits.entries()) {
    requireTextFields(kit, ['label', 'color'], `sections[2].kits[${index}]`);
    if (!['navy', 'orange', 'white'].includes(kit.color)) throw new Error(`Invalid sections[2].kits[${index}].color`);
  }
  const training = data.sections[3];
  requireArray(training.drills, 'sections[3].drills');
  for (const [index, drill] of training.drills.entries()) {
    requireTextFields(drill, ['title', 'description'], `sections[3].drills[${index}]`);
  }
  const development = data.sections[4];
  requireTextFields(development, ['routeLabel', 'routeEnd'], 'sections[4]');
  requireArray(development.stations, 'sections[4].stations', { length: 7 });
  for (const [index, station] of development.stations.entries()) {
    const path = `sections[4].stations[${index}]`;
    requireTextFields(station, ['title', 'description'], path);
    requireTextFields(station.image, ['alt'], `${path}.image`);
    requireAsset(station.image.src, `${path}.image.src`);
  }
  const progress = data.sections[5];
  requireTextFields(progress, ['subtitle'], 'sections[5]');
  requireArray(progress.description, 'sections[5].description', { length: 2 });
  requireTextFields(progress.report, ['eyebrow', 'title', 'caption', 'footer'], 'sections[5].report');
  requireArray(progress.report.steps, 'sections[5].report.steps', { length: 3 });
  for (const [index, step] of progress.report.steps.entries()) {
    requireTextFields(step, ['title', 'description'], `sections[5].report.steps[${index}]`);
  }
  const about = data.about;
  requireTextFields(about, ['eyebrow', 'title', 'lead', 'closing'], 'about');
  requireLines(about.paragraphs, 'about.paragraphs', { min: 4 });
  requireTextFields(about.profile, ['name', 'role', 'description'], 'about.profile');
  requireLines(about.profile.credentials, 'about.profile.credentials', { min: 3 });
  requireArray(about.highlights, 'about.highlights', { length: 3 });
  for (const [index, item] of about.highlights.entries()) {
    requireTextFields(item, ['title', 'description'], `about.highlights[${index}]`);
  }
  requireTextFields(data.closing, ['eyebrow', 'title', 'accent', 'backLabel'], 'closing');
  requireLines(data.closing.description, 'closing.description');
  requireTextFields(data.closing.availability, ['label', 'caption'], 'closing.availability');
  validateContactData(data.contact);
  return data;
}

/** Fetch API reads the editable local JSON; no backend is required. */
export async function fetchSiteData() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(publicPath('data/site.json'), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-cache',
    });
    if (!response.ok) throw new Error(`Content request failed (${response.status})`);
    return validateSiteData(await response.json());
  } finally {
    window.clearTimeout(timeout);
  }
}
