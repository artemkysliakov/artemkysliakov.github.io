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

Контент зберігається в `src/content/` як Markdown/MDX. Схеми колекцій визначено у `src/content.config.ts`, а головний портрет оптимізується через `astro:assets`.

Нову чернетку можна створити командою `npm run content:new -- post "Назва"`. Окремий покроковий опис є у `CONTENT_GUIDE.md`.

GitHub Pages публікується через `.github/workflows/deploy.yml`. У Settings → Pages джерело має бути **GitHub Actions**.

## Публікація

Репозиторій має спеціальне ім’я `artemkysliakov.github.io`, тому `base` у `astro.config.mjs` не потрібен. Після першого push відкрийте **Settings → Pages → Source → GitHub Actions**.

Workflow використовує `npm ci`, запускає типову перевірку Astro, збирає статичний сайт і публікує каталог `dist`.
