import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, lines, counter, arrow } from '../utils/html.js';
import { renderDevelopment, renderProgress } from './development.js';

function renderButton(cta, outline = false) {
  return `<a class="button ${outline ? 'button-outline' : 'button-primary'}" href="#${e(cta.target)}">${e(cta.label)} ${arrow}</a>`;
}

function renderDetails(section, brand) {
  switch (section.type) {
    case 'hero':
      return `${renderButton(section.cta)}
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
      return `<div class="drill-list" aria-label="سرفصل‌های آموزش و تمرین">
        ${section.drills.map((drill, index) => `
          <details ${index === 0 ? 'open' : ''}>
            <summary><span class="drill-number" dir="ltr">${counter(index)}</span><span>${e(drill.title)}</span><span class="details-sign" aria-hidden="true"></span></summary>
            ${drill.description.split('\n\n').map(paragraph => `<p>${e(paragraph)}</p>`).join('')}
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
    const isLocker = section.type === 'locker';
    const isTraining = section.type === 'training';
    const headingTitle = isTraining
      ? e(section.title).replace('توپ', '<em>توپ</em>')
      : e(section.title);
    const headingAccent = isLocker
      ? e(section.accent).replace('تیم', '<em>تیم</em>')
      : isTraining
        ? e(section.accent).replace('مسیر', '<em>مسیر</em>')
        : `<em>${e(section.accent)}</em>`;
    const headingContent = isHero
      ? `${e(section.title)} <em>${e(section.titleSecond)}</em><br>${e(section.accent)}`
      : `${headingTitle}<br>${e(section.titleSecond)}${headingAccent}`;
    const headingContinuation = isLocker
      ? e(section.headingContinuation).replace('قهرمانان', '<em>قهرمانان</em>')
      : e(section.headingContinuation);
    const description = isLocker
      ? lines(section.description).replace('نارنجی', '<em>نارنجی</em>')
      : isTraining
        ? lines(section.description).replace('سام', '<em>سام</em>')
        : lines(section.description);
    const copyClass = isHero ? 'hero-copy' : isTraining ? 'training-copy' : '';
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
            <${headingTag} id="${e(section.id)}-heading">${headingContent}${section.headingContinuation ? `<span class="heading-continuation">${headingContinuation}</span>` : ''}</${headingTag}>
            <p class="scene-description">${description}</p>
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
