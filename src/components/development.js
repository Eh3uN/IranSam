import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, counter, arrow } from '../utils/html.js';

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
    <svg class="development-pitch" viewBox="0 0 600 420" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false">
      <rect x="12" y="12" width="576" height="396" rx="6"/>
      <path d="M300 12V408M12 110H105V310H12M588 110H495V310H588M12 160H48V260H12M588 160H552V260H588"/>
      <circle cx="300" cy="210" r="68"/><circle cx="300" cy="210" r="3" fill="currentColor"/>
    </svg>
    <div class="editorial-container">
      <div class="development-intro">
        ${chapter(section, index)}
        <h2 id="${e(section.id)}-heading">${e(section.title)}<br><em>${e(section.accent)}</em></h2>
        <div class="development-intro-copy">
          ${section.description.map(text => `<p>${e(text)}</p>`).join('')}
        </div>
      </div>
      <div class="journey-caption">
        <p><span aria-hidden="true"></span>${e(section.routeLabel)}</p>
        <span class="journey-range" dir="ltr" aria-hidden="true">01 — ${String(section.stations.length).padStart(2, '0')}</span>
      </div>
      <ol class="facility-journey" aria-label="${e(section.routeLabel)}" role="list">
        ${section.stations.map((station, stationIndex) => `<li class="journey-station">
          ${stationIndex < section.stations.length - 1 ? `<svg class="journey-connector" viewBox="0 0 1000 320" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path class="journey-curve-desktop" d="M760 0V88Q760 160 688 160H312Q240 160 240 232V320"/>
            <path class="journey-curve-mobile" d="M800 0C1050 110 550 210 800 320"/>
          </svg>` : ''}
          <div class="journey-portrait">
            <img src="${e(publicPath(station.image.src))}" alt="${e(station.image.alt)}" width="640" height="640" loading="lazy" decoding="async">
            <span class="journey-number" dir="ltr" aria-hidden="true">${counter(stationIndex)}</span>
          </div>
          <div class="journey-copy">
            <h3>${e(station.title)}</h3>
            <p>${e(station.description)}</p>
          </div>
        </li>`).join('')}
      </ol>
      <div class="journey-finish">
        <span class="journey-finish-mark" aria-hidden="true"></span>
        <p>${e(section.routeEnd)}</p>
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
