# artemkysliakov.github.io

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

## Структура

- `src/site.config.ts` — пошта, соцмережі, посилання на проєкти, токен аналітики. Єдине місце, де це змінюють.
- `src/data/publications.ts` — публікації на Друкарні; звідси їх беруть і головна, і розділ «Нотатки».
- `src/content/` — дописи (`posts/`) та розробки (`projects/`) у Markdown. Схеми — у `src/content.config.ts`.
- `src/styles/global.css` — уся типографіка й теми, зокрема оформлення статей (`.prose`).
- `scripts/build-og-image.mjs` — генератор `public/og-default.png` для прев’ю в соцмережах.

Нову чернетку створюють командою `npm run content:new -- post "Назва"`. Покроковий опис — у `CONTENT_GUIDE.md`.

## Публікація

Репозиторій має спеціальне ім’я `artemkysliakov.github.io`, тому `base` у `astro.config.mjs` не потрібен. Після першого push відкрийте **Settings → Pages → Source → GitHub Actions**.

Workflow (`.github/workflows/deploy.yml`) запускає `npm ci`, перевірку типів, збірку й публікує каталог `dist`.
