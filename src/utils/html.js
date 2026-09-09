/** JSON values stay text when inserted into an HTML template. */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export const lines = values => values.map(escapeHtml).join('<br>');
export const counter = index => String(index + 1).padStart(2, '0');
export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 7 7 17M7 7v10h10"/></svg>';
