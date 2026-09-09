import { publicPath } from '../utils/paths.js';

const sectionIds = ['intro', 'entrance', 'locker', 'training', 'development', 'progress'];
const sectionTypes = ['hero', 'entrance', 'locker', 'training', 'development', 'progress'];
const isText = value => typeof value === 'string' && value.trim().length > 0;
const isLines = value => Array.isArray(value) && value.length > 0 && value.every(isText);

/** Catch incomplete content before rendering the page. */
export function validateSiteData(data) {
  if (!data || !isText(data.brand?.name) || !isText(data.brand?.ageRange) || !isText(data.meta?.title)) {
    throw new Error('Invalid site brand or metadata');
  }
  publicPath(data.brand.logo);
  if (!Array.isArray(data.sections) || data.sections.length !== sectionIds.length || !Array.isArray(data.navigation) || data.navigation.length !== sectionIds.length) {
    throw new Error('Expected the story, development and progress sections');
  }
  data.sections.forEach((section, index) => {
    if (section.id !== sectionIds[index] || section.type !== sectionTypes[index] || !isText(section.title) || !isText(section.accent) || !isLines(section.description) || !isText(section.footer?.english)) {
      throw new Error(`Invalid story section at index ${index}`);
    }
    if (index < 4) {
      publicPath(section.image?.desktop);
      publicPath(section.image?.mobile);
    }
    for (const cta of [section.cta, section.secondaryCta]) {
      if (cta && (!sectionIds.includes(cta.target) || !isText(cta.label))) {
        throw new Error('Invalid section destination');
      }
    }
    const nav = data.navigation[index];
    if (nav.id !== section.id || !isText(nav.label) || !isText(nav.mobileLabel)) throw new Error('Invalid navigation');
  });
  if (!isLines(data.sections[1].note?.lines)) throw new Error('Invalid entrance note');
  if (!Array.isArray(data.sections[2].kits) || !data.sections[2].kits.length || !data.sections[2].kits.every(kit => isText(kit.label) && ['navy', 'orange', 'white'].includes(kit.color))) {
    throw new Error('Invalid kit palette');
  }
  if (!Array.isArray(data.sections[3].drills) || !data.sections[3].drills.length || !data.sections[3].drills.every(drill => isText(drill.title) && isText(drill.description))) {
    throw new Error('Invalid training content');
  }
  if (!data.sections[0].secondaryCta || !data.sections[3].cta) throw new Error('Missing development links');
  const development = data.sections[4];
  if (!isText(development.principle) || !Array.isArray(development.services) || !development.services.length || !development.services.every(service => isText(service.icon) && isText(service.title) && isText(service.description))) {
    throw new Error('Invalid development services');
  }
  if (!development.cta || !['title', 'description', 'label'].every(key => isText(development.facilities?.[key]))) {
    throw new Error('Invalid training facilities');
  }
  const progress = data.sections[5];
  if (!isText(progress.familyNote) || !['prefix', 'value', 'unit', 'title', 'description'].every(key => isText(progress.cadence?.[key]))) {
    throw new Error('Invalid assessment cadence');
  }
  if (!['eyebrow', 'title', 'caption', 'footer'].every(key => isText(progress.report?.[key])) || !Array.isArray(progress.report.steps) || progress.report.steps.length !== 3 || !progress.report.steps.every(step => isText(step.title) && isText(step.description))) {
    throw new Error('Invalid progress report');
  }
  if (!isLines(data.closing?.description) || !isText(data.loader?.title)) throw new Error('Invalid closing or loading content');
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
