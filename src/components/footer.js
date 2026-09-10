import { escapeHtml as e, highlightBrand } from '../utils/html.js';

export function renderFooter({ closing, brand }) {
  const closingDescription = closing.description.map((text, index) => `
    <p class="${index === closing.description.length - 1 ? 'closing-cta-copy' : ''}">${highlightBrand(text)}</p>`).join('');
  return `
    <div class="closing-note">
      <p class="closing-title">${e(closing.title)}<br class="mobile-break"> <em>${e(closing.accent)}</em></p>
      <p class="eyebrow"><span>${highlightBrand(closing.eyebrow)}</span></p>
      <div class="closing-copy">${closingDescription}</div>
      <div class="closing-actions">
        <div class="contact-action-cluster">
          <span class="closing-availability" role="note">
            <span class="availability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10M7 21h10M8 3c0 4 4 4 4 9s-4 5-4 9M16 3c0 4-4 4-4 9s4 5 4 9"/><path d="M9 7h6M9 17h6"/></svg></span>
            <span class="availability-copy"><strong>${e(closing.availability.label)}</strong><small>${e(closing.availability.caption)}</small></span>
          </span>
          <button class="button button-primary contact-footer-button" type="button" data-open-panel="contact-panel" aria-haspopup="dialog" aria-controls="contact-panel" aria-expanded="false"><span>گفت‌وگو با ایران <em>سام</em></span><span aria-hidden="true">↖</span></button>
        </div>
        <button class="button button-outline about-footer-button" type="button" data-open-panel="about-panel" aria-haspopup="dialog" aria-controls="about-panel" aria-expanded="false"><span>دربارهٔ ایران <em>سام</em></span><span aria-hidden="true">↗</span></button>
      </div>
      <div class="closing-bottom">
        <span>${e(brand.subtitle)} ${e(brand.name)} <span class="footer-divider">/</span> ${e(brand.ageRange)} ${e(brand.ageUnit)}</span>
        <a href="#intro">${e(closing.backLabel)} <span aria-hidden="true">↑</span></a>
      </div>
    </div>`;
}
