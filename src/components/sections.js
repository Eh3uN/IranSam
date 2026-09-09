import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, lines, counter, arrow } from '../utils/html.js';
import { renderDevelopment, renderProgress } from './development.js';

function renderButton(cta, outline = false) {
  return `<a class="button ${outline ? 'button-outline' : 'button-primary'}" href="#${e(cta.target)}">${e(cta.label)} ${arrow}</a>`;
}

function renderDetails(section, brand) {
  switch (section.type) {
    case 'hero':
      return `<div class="hero-actions">${renderButton(section.cta)}
          <a class="text-link" href="#${e(section.secondaryCta.target)}">${e(section.secondaryCta.label)} ${arrow}</a>
        </div>
        <div class="hero-note"><span class="outline-number">${e(section.ageHighlight)}</span><span>${e(brand.ageUnit)}<br><strong>${e(section.ageCaption)}</strong></span></div>`;
    case 'entrance':
      return `<div class="entrance-note"><span class="note-index" dir="ltr">${e(section.note.tag)}</span><p>${lines(section.note.lines)}</p></div>
        ${renderButton(section.cta, true)}`;
    case 'locker':
      return `<div class="kit-palette" aria-label="رنگ‌های کیت ایران سام">
          ${section.kits.map(kit => `<span><i class="swatch ${e(kit.color)}" aria-hidden="true"></i>${e(kit.label)}</span>`).join('')}
        </div>
        <p class="locker-invitation">${e(section.invitation)}</p>
        ${renderButton(section.cta)}`;
    case 'training':
      return `<div class="drill-list" aria-label="آشنایی با مهارت‌های فوتبال">
        ${section.drills.map((drill, index) => `
          <details ${index === 0 ? 'open' : ''}>
            <summary><span class="drill-number" dir="ltr">${counter(index)}</span><span>${e(drill.title)}</span><span class="details-sign" aria-hidden="true"></span></summary>
            <p>${e(drill.description)}</p>
          </details>`).join('')}
        </div>
        <a class="text-link training-next" href="#${e(section.cta.target)}">${e(section.cta.label)} ${arrow}</a>`;
    default:
      return '';
  }
}

export function renderSections({ sections, brand }) {
  return sections.map((section, index) => {
    if (section.type === 'development') return renderDevelopment(section, index, sections.length);
    if (section.type === 'progress') return renderProgress(section, index, sections.length, brand);
    const isHero = section.type === 'hero';
    const headingTag = isHero ? 'h1' : 'h2';
    const copyClass = isHero ? 'hero-copy' : section.type === 'training' ? 'training-copy' : '';
    return `
      <section id="${e(section.id)}" class="scene ${e(section.type)}-scene" aria-labelledby="${e(section.id)}-heading" data-scene="${e(section.id)}">
        <picture class="scene-picture">
          <source media="(max-width: 767px)" srcset="${e(publicPath(section.image.mobile))}">
          <img ${isHero ? 'id="hero-image" fetchpriority="high"' : 'loading="lazy"'} src="${e(publicPath(section.image.desktop))}" width="1536" height="1024" alt="${e(section.image.alt)}" decoding="async">
        </picture>
        <div class="scene-shade" aria-hidden="true"></div>
        <div class="scene-body">
          <div class="scene-copy ${copyClass}">
            <p class="eyebrow">${isHero ? '<span class="tiny-line" aria-hidden="true"></span>' : `<span class="chapter-tag" dir="ltr">${counter(index)}</span>`}${e(section.eyebrow)}</p>
            <${headingTag} id="${e(section.id)}-heading">${e(section.title)}<br>${e(section.titleSecond)}<em>${e(section.accent)}</em></${headingTag}>
            <p class="scene-description">${lines(section.description)}</p>
            ${renderDetails(section, brand)}
          </div>
        </div>
        <div class="scene-bottom">
          <span lang="en" dir="ltr">${e(section.footer.english)}</span>
          ${isHero ? `<a class="scroll-cue" href="#entrance">${e(section.footer.caption)} <span class="scroll-stem" aria-hidden="true"></span></a>` : `<span class="scene-place">${e(section.footer.caption)}</span>`}
          <span class="scene-count" dir="ltr"><b>${counter(index)}</b> / ${String(sections.length).padStart(2, '0')}</span>
        </div>
      </section>`;
  }).join('');
}
