const isText = value => typeof value === 'string' && value.trim().length > 0;

function optionalText(contact, key) {
  const value = contact[key];
  if (value === undefined) return '';
  if (typeof value !== 'string') throw new Error(`Invalid contact ${key}`);
  return value.trim();
}

function phoneDigits(value, key) {
  if (!value) return '';
  let number = value
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\s()-]/g, '');

  if (/^0[1-9]\d{9}$/.test(number)) number = `98${number.slice(1)}`;
  else if (/^9\d{9}$/.test(number)) number = `98${number}`;
  else if (number.startsWith('+')) number = number.slice(1);
  else if (number.startsWith('00')) number = number.slice(2);
  else if (!/^98[1-9]\d{9}$/.test(number)) throw new Error(`Invalid contact ${key} number`);

  if (!/^[1-9]\d{7,14}$/.test(number) || (number.startsWith('98') && !/^98[1-9]\d{9}$/.test(number))) {
    throw new Error(`Invalid contact ${key} number`);
  }
  return number;
}

function secureUrl(value, key) {
  try {
    if (!/^https:\/\//i.test(value) || /[\s\\]/.test(value)) throw new Error();
    const url = new URL(value);
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) throw new Error();
    return url;
  } catch {
    throw new Error(`Invalid contact ${key} URL`);
  }
}

/** Build only validated destinations; blank contact channels have no link. */
export function getContactLinks(contact = {}) {
  if (!contact || typeof contact !== 'object' || Array.isArray(contact)) throw new Error('Invalid contact content');
  const phone = phoneDigits(optionalText(contact, 'phone'), 'phone');
  const whatsapp = phoneDigits(optionalText(contact, 'whatsapp'), 'whatsapp');
  const map = optionalText(contact, 'mapUrl');
  return {
    phone: phone ? `tel:+${phone}` : '',
    whatsapp: whatsapp ? `https://wa.me/${whatsapp}` : '',
    map: map ? secureUrl(map, 'map').href : '',
  };
}

/** Validate editable contact content before it reaches the interface. */
export function validateContactData(contact) {
  if (!contact || !['triggerLabel', 'eyebrow', 'title', 'description', 'faqEyebrow', 'faqTitle', 'faqDescription'].every(key => isText(contact[key]))) {
    throw new Error('Invalid contact content');
  }
  for (const key of ['address', 'hours']) optionalText(contact, key);
  if (!Array.isArray(contact.faqs) || !contact.faqs.length || !contact.faqs.every(faq => isText(faq?.question) && isText(faq?.answer))) {
    throw new Error('Invalid contact FAQs');
  }
  getContactLinks(contact);
  return contact;
}
