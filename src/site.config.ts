/**
 * Єдине джерело правди для контактів, посилань і зовнішніх сервісів.
 * Сторінки й компоненти беруть дані звідси, щоб не тримати їх у двох місцях.
 */

export const site = {
  url: 'https://artem.itnauka.org',
  name: 'Артем Кисляков',
  shortName: 'Пан Артем',
  role: 'Вчитель інформатики та розробник українських освітніх рішень',
  email: 'educatorartem@gmail.com'
};

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/panaptem' },
  { label: 'Instagram', href: 'https://www.instagram.com/pan_aptem' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@pan_aptem' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/artemkysliakov/' }
];

export const externalLinks = [
  { label: 'РАВЛИК', href: 'https://ravlyk.org/' },
  { label: 'itnauka.org', href: 'https://itnauka.org/' },
  { label: 'Друкарня', href: 'https://drukarnia.com.ua/artem' }
];

export const support = {
  href: 'https://base.monobank.ua/9nyWYjQ3C6K2Aw#subscriptions',
  label: 'Підтримати на Базі'
};

/**
 * Cloudflare Web Analytics.
 * Токен беруть у Cloudflare → Web Analytics → Add a site → JS snippet.
 * Поки рядок порожній, скрипт не додається до сторінок.
 */
export const cloudflareBeaconToken = '';
