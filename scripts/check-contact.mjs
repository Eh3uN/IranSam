import assert from 'node:assert/strict';
import { getContactLinks, validateContactData } from '../src/utils/contact.js';
import { renderContact } from '../src/components/contact.js';

const contact = {
  triggerLabel: 'ارتباط با ما',
  eyebrow: 'ایران سام',
  title: 'کنار شما هستیم',
  description: 'راه‌های ارتباط با مجموعه',
  faqEyebrow: 'پیش از شروع مسیر',
  faqTitle: 'سوالات متداول',
  faqDescription: 'پاسخ پرسش‌های شما درباره تمرین و رشد در ایران سام',
  faqs: [{ question: 'روند رشد چگونه ارزیابی می‌شود؟', answer: ' با کارنامه و ارزیابی پیشرفت دقیق بازیکنان.' }],
};

assert.equal(validateContactData(contact), contact);
assert.deepEqual(getContactLinks(), { phone: '', whatsapp: '', map: '' });
assert.deepEqual(getContactLinks({ phone: ' ', whatsapp: '', mapUrl: '  ' }), getContactLinks());

for (const phone of ['0912 345 6789', '۰۹۱۲-۳۴۵-۶۷۸۹', '٠٩١٢٣٤٥٦٧٨٩', '+98 (912) 345-6789', '00989123456789', '989123456789', '9123456789']) {
  assert.equal(getContactLinks({ phone }).phone, 'tel:+989123456789');
  assert.equal(getContactLinks({ whatsapp: phone }).whatsapp, 'https://wa.me/989123456789');
}
assert.equal(getContactLinks({ phone: '۰۲۱ ۲۳۴۵ ۶۷۸۹' }).phone, 'tel:+982123456789');
assert.equal(getContactLinks({ phone: '+44 20 7946 0958' }).phone, 'tel:+442079460958');

assert.equal(getContactLinks({ mapUrl: 'https://maps.google.com/?q=Tehran' }).map, 'https://maps.google.com/?q=Tehran');

for (const phone of ['123', '+9809123456789', '0912345678', 'tel:+989123456789', 'javascript:alert(1)', '+98<9123456789', '+98\nabc', 9123456789, null]) {
  assert.throws(() => validateContactData({ ...contact, phone }));
  assert.throws(() => validateContactData({ ...contact, whatsapp: phone }));
}
for (const mapUrl of ['javascript:alert(1)', 'data:text/html,test', 'http://maps.google.com', 'https:maps.google.com', 'https://user:pass@maps.google.com', 'https://', 'https://maps.google.com\\@example.com', 'https://maps.google.com/\nplace', null]) {
  assert.throws(() => validateContactData({ ...contact, mapUrl }));
}
for (const invalid of [undefined, {}, { ...contact, title: ' ' }, { ...contact, faqEyebrow: undefined }, { ...contact, faqDescription: ' ' }, { ...contact, address: 10 }, { ...contact, hours: null }, { ...contact, faqs: [] }, { ...contact, faqs: [null] }, { ...contact, faqs: [{ question: 'سوال', answer: ' ' }] }]) {
  assert.throws(() => validateContactData(invalid));
}

const brand = { name: 'ایران سام', logo: 'images/iran-sam-logo.webp' };
const pendingHtml = renderContact({ brand, contact: { ...contact, phone: '  ', address: '  ', hours: '  ' } });
assert.equal((pendingHtml.match(/class="contact-channel-status"/g) ?? []).length, 2);
assert.ok(pendingHtml.includes('نشانی و مسیر دسترسی به‌زودی اعلام می‌شود.'));
assert.ok(!pendingHtml.includes('class="contact-hours"'));
assert.ok(!/href="(?:|#)"/.test(pendingHtml), 'Pending channels must not create dead links');
const realNumbers = { phone: '09022005603', whatsapp: '09021005603' };
assert.deepEqual(getContactLinks(realNumbers), { phone: 'tel:+989022005603', whatsapp: 'https://wa.me/989021005603', map: '' });
const linkedHtml = renderContact({ brand, contact: {
  ...contact,
  ...realNumbers,
  address: '<script>alert(1)</script>',
  mapUrl: 'https://maps.google.com/?q=Tehran',
} });
for (const href of ['tel:+989022005603', 'https://wa.me/989021005603', 'https://maps.google.com/?q=Tehran']) {
  assert.ok(linkedHtml.includes(`href="${href}"`), `Missing configured contact destination: ${href}`);
}
assert.ok(!linkedHtml.includes('<script>'), 'Address must render as text');
assert.ok(!linkedHtml.includes('contact-channel-pending'));

for (const html of [pendingHtml, linkedHtml]) {
  assert.equal((html.match(/<dialog\b/g) ?? []).length, 2, 'Contact and FAQs need distinct dialogs');
  const contactPanel = html.match(/<dialog\b[^>]*\bid="contact-panel"[^>]*>([\s\S]*?)<\/dialog>/)?.[1];
  const faqPanel = html.match(/<dialog\b[^>]*\bid="faq-panel"[^>]*>([\s\S]*?)<\/dialog>/)?.[1];
  assert.ok(contactPanel, 'Missing contact dialog');
  assert.ok(faqPanel, 'Missing FAQ dialog');
  assert.ok(!/<details\b/.test(contactPanel), 'FAQ disclosures belong only in the FAQ dialog');
  assert.equal((faqPanel.match(/<details\b/g) ?? []).length, contact.faqs.length);
  assert.ok(faqPanel.includes(contact.faqs[0].question));
  assert.ok(faqPanel.includes(contact.faqs[0].answer));
  assert.ok(!faqPanel.includes('contact-channel-'), 'Contact channels belong only in the contact dialog');
  assert.ok(!/instagram|اینستاگرام/i.test(html), 'Instagram must not be rendered');
  for (const href of ['tel:+989022005603', 'https://wa.me/989021005603']) {
    assert.ok(!faqPanel.includes(`href="${href}"`), 'FAQ dialog must not contain contact links');
    if (html === linkedHtml) assert.ok(contactPanel.includes(`href="${href}"`));
  }
}

console.log('Contact validation, separate dialogs and safe destination checks passed.');
