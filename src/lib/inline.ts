/**
 * Мінімальний інлайновий Markdown для текстів сторінок.
 *
 * Підтримує рівно три речі, які реально трапляються в копірайті:
 *   [текст](посилання)  — посилання
 *   **текст**           — жирний
 *   *текст*             — курсив
 *
 * Усе інше лишається як звичайний текст. Вхід екранується ПЕРШИМ, тому
 * жодна розмітка з тексту не може потрапити на сторінку — теги додаються
 * тільки цим кодом.
 */

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** Зовнішні посилання відкриваємо в новій вкладці, внутрішні — ні. */
const isExternal = (href: string) => /^https?:\/\//i.test(href);

export function inlineMarkdown(source: string): string {
  let html = escapeHtml(source);

  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text: string, href: string) => {
    // Після екранування лапок href безпечний для атрибута.
    const attrs = isExternal(href) ? ' target="_blank" rel="noreferrer"' : '';
    return `<a class="font-bold text-coral underline decoration-2 underline-offset-4" href="${href}"${attrs}>${text}</a>`;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

  return html;
}
