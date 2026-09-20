# artem.itnauka.org

Персональний сайт Артема Кислякова на Astro 7 і Tailwind CSS 4.

## Локальний запуск

```bash
npm ci
npm run dev
```

## Перевірка і збірка

```bash
npm run check
npm run build
```

## Редагування вмісту

```bash
npm run edit
```

Відкриває сайт разом із редактором Keystatic на http://localhost:4321/keystatic — усі тексти там у звичайних полях. Редактор локальний і в зібраний сайт не потрапляє. Докладніше — у `CONTENT_GUIDE.md`.

**Теку `dist/` не редагують** — це результат збірки, вона в `.gitignore` і затирається кожним `npm run build`.

## Структура

- `src/site.config.ts` — пошта, соцмережі, посилання на проєкти, токен аналітики. Єдине місце, де це змінюють.
- `src/content/pages/*.json` — тексти всіх сторінок (редагуються в Keystatic).
- `src/data/publications.ts` — типізований доступ до `src/content/pages/publications.json`.
- `src/content/` — дописи (`posts/`) та розробки (`projects/`) у MDX. Схеми — у `src/content.config.ts`.
- `src/lib/inline.ts` — проста розмітка посилань у текстах сторінок.
- `keystatic.config.ts` — опис полів редактора.
- `src/styles/global.css` — уся типографіка й теми, зокрема оформлення статей (`.prose`).
- `scripts/build-og-image.mjs` — генератор `public/og-default.png` для прев’ю в соцмережах.

Нову чернетку створюють командою `npm run content:new -- post "Назва"`. Покроковий опис — у `CONTENT_GUIDE.md`.

## Публікація

Сайт публікується за адресою [artem.itnauka.org](https://artem.itnauka.org) через GitHub Pages. Репозиторій має спеціальне ім’я `artemkysliakov.github.io`, тому `base` у `astro.config.mjs` не потрібен.

У Cloudflare піддомен `artem` налаштований як DNS-only `CNAME` на `artemkysliakov.github.io`, а в **Settings → Pages** цього репозиторію вказано custom domain `artem.itnauka.org`. Після випуску сертифіката для домену в GitHub Pages потрібно залишити ввімкненим **Enforce HTTPS**.

Workflow (`.github/workflows/deploy.yml`) запускає `npm ci`, перевірку типів, збірку й публікує каталог `dist`.
