import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, counter, arrow } from '../utils/html.js';

const iconPaths = {
  football: '<circle cx="16" cy="16" r="12"/><path d="m16 10 6 4-2 7h-8l-2-7 6-4Zm0-6v6m11 0-5 4m1 12-3-5M9 26l3-5M5 10l5 4"/>',
  strength: '<path d="M11 16h10M7 10v12m4-15v18m10-18v18m4-15v12M4 13v6m24-6v6"/>',
  mind: '<path d="M20 27v-5c5-2 7-5 7-9a10 10 0 0 0-20 0l-3 6h4v5h6v3"/><circle cx="17" cy="12" r="4"/><path d="m15 12 1.5 1.5L20 10"/>',
  nutrition: '<path d="M16 10c-8-5-13 2-10 10 2 5 6 8 10 5 4 3 8 0 10-5 3-8-2-15-10-10Zm0 0V6m0 0c0-3 3-4 7-3-1 4-4 5-7 3Z"/>',
  movement: '<circle cx="20" cy="6" r="3"/><path d="m7 14 6-4 7 5 6 1m-13-6-2 9 6 3-3 7m-3-10-4 7H3m15-12-1 5"/>',
  recovery: '<path d="M4 21c4-5 8 5 12 0s8 5 12 0M4 27c4-5 8 5 12 0s8 5 12 0M11 15V8a3 3 0 0 1 6 0m2 9V8a3 3 0 0 1 6 0M11 12h8"/>',
  pitch: '<rect x="3" y="6" width="26" height="20" rx="1"/><path d="M16 6v20M3 12h5v8H3m26-8h-5v8h5"/><circle cx="16" cy="16" r="4"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] ?? ''}</svg>`;
}

function chapter(section, index) {
  return `<p class="eyebrow"><span class="chapter-tag" dir="ltr">${counter(index)}</span>${e(section.eyebrow)}</p>`;
}

function sectionFooter(section, index, total) {
  return `<div class="scene-bottom editorial-bottom">
    <span lang="en" dir="ltr">${e(section.footer.english)}</span>
    <span class="scene-place">${e(section.footer.caption)}</span>
    <span class="scene-count" dir="ltr"><b>${counter(index)}</b> / ${String(total).padStart(2, '0')}</span>
  </div>`;
}

export function renderDevelopment(section, index, total) {
  return `<section id="${e(section.id)}" class="development-section" aria-labelledby="${e(section.id)}-heading" data-scene="${e(section.id)}">
    <div class="editorial-container">
      <div class="development-intro">
        <div>
          ${chapter(section, index)}
          <h2 id="${e(section.id)}-heading">${e(section.title)}<br><em>${e(section.accent)}</em></h2>
        </div>
        <div class="development-intro-copy">
          ${section.description.map(text => `<p>${e(text)}</p>`).join('')}
          <p class="development-principle"><span aria-hidden="true">✓</span>${e(section.principle)}</p>
        </div>
      </div>
      <div class="service-grid">
        ${section.services.map((service, serviceIndex) => `<article class="service-card">
          <div class="service-card-top"><span class="service-icon">${icon(service.icon)}</span><span class="service-index" dir="ltr" aria-hidden="true">${counter(serviceIndex)}</span></div>
          <h3>${e(service.title)}</h3>
          <p>${e(service.description)}</p>
        </article>`).join('')}
      </div>
      <div class="facilities-strip">
        <div class="facilities-icon">${icon('pitch')}<span>${e(section.facilities.label)}</span></div>
        <div class="facilities-copy"><h3>${e(section.facilities.title)}</h3><p>${e(section.facilities.description)}</p></div>
        <a class="text-link" href="#${e(section.cta.target)}">${e(section.cta.label)} ${arrow}</a>
      </div>
      ${sectionFooter(section, index, total)}
    </div>
  </section>`;
}

export function renderProgress(section, index, total, brand) {
  return `<section id="${e(section.id)}" class="progress-section" aria-labelledby="${e(section.id)}-heading" data-scene="${e(section.id)}">
    <div class="editorial-container">
      <div class="progress-layout">
        <div class="progress-copy">
          ${chapter(section, index)}
          <h2 id="${e(section.id)}-heading">${e(section.title)}<br><em>${e(section.accent)}</em></h2>
          ${section.description.map(text => `<p class="progress-description">${e(text)}</p>`).join('')}
          <div class="assessment-cadence">
            <div class="cadence-number"><span>${e(section.cadence.prefix)}</span><strong>${e(section.cadence.value)}</strong><span>${e(section.cadence.unit)}</span></div>
            <div><h3>${e(section.cadence.title)}</h3><p>${e(section.cadence.description)}</p></div>
          </div>
          <p class="family-note"><span class="tiny-line" aria-hidden="true"></span>${e(section.familyNote)}</p>
        </div>
        <article class="progress-report" aria-labelledby="report-heading">
          <div class="report-top">
            <div><p class="report-eyebrow">${e(section.report.eyebrow)}</p><h3 id="report-heading">${e(section.report.title)}</h3></div>
            <img src="${e(publicPath(brand.logo))}" alt="${e(brand.name)}" width="62" height="62" loading="lazy" decoding="async">
          </div>
          <p class="report-caption">${e(section.report.caption)}</p>
          <ol class="report-steps">
            ${section.report.steps.map((step, stepIndex) => `<li>
              <span class="report-step-number" aria-hidden="true">${(stepIndex + 1).toLocaleString('fa-IR')}</span>
              <div><h4>${e(step.title)}</h4><p>${e(step.description)}</p></div>
            </li>`).join('')}
          </ol>
          <p class="report-footnote"><span aria-hidden="true">↖</span>${e(section.report.footer)}</p>
        </article>
      </div>
      ${sectionFooter(section, index, total)}
    </div>
  </section>`;
}
