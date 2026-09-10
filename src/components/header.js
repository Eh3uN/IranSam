import { publicPath } from '../utils/paths.js';
import { escapeHtml as e, counter } from '../utils/html.js';

export function renderHeader({ brand, navigation }) {
  return `
    <a class="skip-link" href="#intro">رفتن به محتوای صفحه</a>
    <header class="site-header">
      <a class="brand" href="#intro" aria-label="${e(brand.name)}، ابتدای صفحه">
        <img src="${e(publicPath(brand.logo))}" alt="" width="64" height="64">
        <span class="brand-copy"><strong>${e(brand.name)}</strong><span>${e(brand.subtitle)}</span></span>
      </a>
      <nav class="desktop-nav" aria-label="بخش‌های صفحه">
        ${navigation.map((item, index) => `<a href="#${e(item.id)}" data-chapter="${e(item.id)}" ${index === 0 ? 'class="is-active" aria-current="location"' : ''}>${e(item.label)}</a>`).join('')}
        <button class="desktop-nav-about" type="button" data-open-panel="about-panel" aria-haspopup="dialog" aria-controls="about-panel" aria-expanded="false">درباره ما</button>
      </nav>
      <span class="age-label"><span>${e(brand.ageRange)}</span> ${e(brand.ageUnit)}</span>
    </header>`;
}

export function renderMobileNavigation(navigation) {
  return `
    <nav class="mobile-chapters" aria-label="از روز اول تا مسیر رشد">
      <div class="journey-track" aria-hidden="true"><span id="journey-progress"></span></div>
      ${navigation.map((item, index) => `
        <a href="#${e(item.id)}" data-chapter="${e(item.id)}" ${index === 0 ? 'class="is-active" aria-current="location"' : ''}>
          <span dir="ltr">${counter(index)}</span>${e(item.mobileLabel)}
        </a>`).join('')}
    </nav>`;
}

export function renderLoader({ brand, loader }) {
  return `
    <div class="arrival-loader" id="arrival-loader" hidden>
      <div class="loader-inner">
        <img class="loader-logo" src="${e(publicPath(brand.logo))}" width="112" height="112" alt="${e(brand.name)}">
        <p class="loader-kicker" lang="en" dir="ltr">${e(loader.kicker)}</p>
        <p class="loader-title">${e(loader.title)}</p>
        <div class="loader-track" aria-hidden="true"><span id="loader-progress"></span></div>
        <p class="loader-status" role="status" aria-live="polite">${e(loader.status)}</p>
        <button id="skip-loader" class="loader-skip" type="button">${e(loader.skipLabel)} <span aria-hidden="true">↙</span></button>
      </div>
      <span class="loader-signature" lang="en" dir="ltr">${e(loader.signature)}</span>
    </div>`;
}
