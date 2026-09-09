import { escapeHtml as e, lines } from '../utils/html.js';

export function renderFooter({ closing, brand }) {
  return `
    <div class="closing-note">
      <p class="eyebrow">${e(closing.eyebrow)}</p>
      <p class="closing-title">${e(closing.title)}<br class="mobile-break"> <em>${e(closing.accent)}</em></p>
      <p>${lines(closing.description)}</p>
      <button class="button button-primary contact-footer-button" type="button" data-open-panel="contact-panel" aria-haspopup="dialog" aria-controls="contact-panel" aria-expanded="false">گفت‌وگو با ایران سام <span aria-hidden="true">↖</span></button>
      <div class="closing-bottom">
        <span>${e(brand.subtitle)} ${e(brand.name)} <span class="footer-divider">/</span> ${e(brand.ageRange)} ${e(brand.ageUnit)}</span>
        <a href="#intro">${e(closing.backLabel)} <span aria-hidden="true">↑</span></a>
      </div>
    </div>`;
}
