import { escapeHtml as e } from '../utils/html.js';
import { publicPath } from '../utils/paths.js';
import { getContactLinks } from '../utils/contact.js';

const paths = {
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4"/><circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="m8 6-1 2c-.5 2 1.5 5 3 6.5s4.5 3.5 6.5 3l2-1-3-3-1.5 1c-1.5-.7-3.8-3-4.5-4.5l1-1.5-2.5-2.5Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

function channel({ kind, title, value, href, caption }) {
  const contents = `<span class="contact-channel-icon">${icon(kind)}</span>
    <span class="contact-channel-copy"><strong>${e(title)}</strong><span ${value ? 'dir="ltr"' : ''}>${e(value || caption)}</span></span>
    ${href ? `<span class="contact-channel-arrow">${icon('arrow')}</span>` : '<span class="contact-channel-status">به‌زودی</span>'}`;
  return href
    ? `<a class="contact-channel contact-channel-${kind}" href="${e(href)}" ${kind === 'phone' ? '' : 'target="_blank" rel="noopener noreferrer"'}>${contents}</a>`
    : `<div class="contact-channel contact-channel-${kind} contact-channel-pending">${contents}</div>`;
}

function panelHeader(brand, eyebrow, title, headingId, closeLabel) {
  return `<div class="contact-panel-header">
    <img src="${e(publicPath(brand.logo))}" alt="" width="48" height="48">
    <div><p>${e(eyebrow)}</p><h2 id="${e(headingId)}">${e(title)}</h2></div>
    <button class="contact-close" type="button" aria-label="${e(closeLabel)}" autofocus>${icon('close')}</button>
  </div>`;
}

export function renderContact({ contact, brand }) {
  const links = getContactLinks(contact);
  const phone = contact.phone?.trim() || '';
  const address = contact.address?.trim() || '';
  const hours = contact.hours?.trim() || '';
  return `
    <button class="contact-fab" id="contact-trigger" type="button" data-open-panel="contact-panel" aria-label="${e(contact.triggerLabel)}" aria-haspopup="dialog" aria-controls="contact-panel" aria-expanded="false">
      ${icon('phone')}<span class="contact-fab-label">${e(contact.triggerLabel)}</span>
    </button>
    <button class="contact-fab faq-fab" id="faq-trigger" type="button" data-open-panel="faq-panel" aria-label="${e(contact.faqTitle)}" aria-haspopup="dialog" aria-controls="faq-panel" aria-expanded="false">
      ${icon('help')}<span class="contact-fab-label">${e(contact.faqTitle)}</span>
    </button>
    <dialog class="contact-panel" id="contact-panel" aria-labelledby="contact-heading" aria-describedby="contact-description">
      ${panelHeader(brand, contact.eyebrow, contact.title, 'contact-heading', 'بستن پنل ارتباط')}
      <div class="contact-panel-body">
        <p class="contact-description" id="contact-description">${e(contact.description)}</p>
        <div class="contact-channels">
          ${channel({ kind: 'phone', title: 'تماس با ایران سام', value: phone, href: links.phone, caption: 'آشنایی و پرسش درباره ثبت‌نام' })}
          ${channel({ kind: 'whatsapp', title: 'واتس‌اپ', href: links.whatsapp, caption: 'گفت‌وگو و هماهنگی' })}
        </div>
        <div class="contact-address">
          <span class="contact-address-icon">${icon('pin')}</span>
          <div><h3>نشانی مجموعه</h3>
            <p>${e(address || 'نشانی و مسیر دسترسی به‌زودی اعلام می‌شود.')}</p>
            ${links.map ? `<a class="contact-map-link" href="${e(links.map)}" target="_blank" rel="noopener noreferrer">مشاهده روی نقشه ${icon('arrow')}</a>` : ''}
          </div>
        </div>
        ${hours ? `<p class="contact-hours"><strong>زمان پاسخ‌گویی</strong> ${e(hours)}</p>` : ''}
        <p class="contact-signature">${e(brand.name)} <span aria-hidden="true">/</span> از اولین سؤال تا اولین قدم.</p>
      </div>
    </dialog>
    <dialog class="contact-panel faq-panel" id="faq-panel" aria-labelledby="faq-heading" aria-describedby="faq-description">
      ${panelHeader(brand, contact.faqEyebrow, contact.faqTitle, 'faq-heading', 'بستن پرسش‌های متداول')}
      <div class="contact-panel-body">
        <p class="contact-description" id="faq-description">${e(contact.faqDescription)}</p>
        <div class="contact-faq">
          ${contact.faqs.map(faq => `<details name="contact-faq">
            <summary><span>${e(faq.question)}</span><span class="details-sign" aria-hidden="true"></span></summary>
            <p>${e(faq.answer)}</p>
          </details>`).join('')}
        </div>
        <p class="contact-signature">${e(brand.name)} <span aria-hidden="true">/</span> از اولین سؤال تا اولین قدم.</p>
      </div>
    </dialog>`;
}
