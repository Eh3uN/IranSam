import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, counter, arrow } from '../utils/html.js';

const iconPaths = {
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
      <ol class="development-list" role="list" aria-label="محورهای آموزش و رشد بازیکن">
        ${section.services.map((service, serviceIndex) => `<li class="development-item">
          <div class="development-item-heading">
            <span class="development-number" dir="ltr" aria-hidden="true">${counter(serviceIndex)}</span>
            <h3>${e(service.title)}</h3>
          </div>
          <p>${e(service.description)}</p>
        </li>`).join('')}
      </ol>
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
