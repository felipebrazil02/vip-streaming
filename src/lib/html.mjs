import { SITE } from '../data/site.mjs';

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function whatsappUrl(message) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function icon(name, className = 'icon') {
  const paths = {
    play: '<path d="M9 7.2v9.6L17 12 9 7.2Z" fill="currentColor"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    arrow: '<path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="m5 12 4 4L19 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    chat: '<path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 12.5v-6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 8h8M8 11h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    tv: '<rect x="3.5" y="5" width="17" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 21h6M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 5h4M11 18.5h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    cast: '<path d="M4 17a3 3 0 0 1 3 3M4 12a8 8 0 0 1 8 8M4 7a13 13 0 0 1 13 13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="4" cy="20" r="1.5" fill="currentColor"/>',
    shield: '<path d="M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    wifi: '<path d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M9.7 16a4 4 0 0 1 4.6 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  };
  return `<svg class="${escapeHtml(className)}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] ?? paths.play}</svg>`;
}
