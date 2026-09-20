import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Редактор вмісту сайту.
 *
 * Запуск:  npm run edit   →  http://localhost:4321/keystatic
 *
 * Keystatic пише прямо у файли проєкту. Після редагування зміни
 * з'являться в GitHub Desktop як звичайні правки — їх треба закомітити
 * й запушити, після чого сайт перезбереться сам.
 */

const paragraphs = (label: string, description?: string) =>
  fields.array(fields.text({ label: 'Абзац', multiline: true }), {
    label,
    description,
    itemLabel: (props) => props.value.slice(0, 60) || 'Порожній абзац'
  });

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Пан Артем' },
    navigation: {
      Сторінки: ['home', 'about', 'education', 'developmentsPage', 'blogPage', 'contactsPage'],
      Матеріали: ['posts', 'projects'],
      Налаштування: ['publications']
    }
  },

  collections: {
    posts: collection({
      label: 'Нотатки',
      path: 'src/content/posts/*',
      slugField: 'title',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        description: fields.text({
          label: 'Короткий опис',
          description: 'Показується в списку дописів і в пошуку Google.',
          multiline: true
        }),
        published: fields.date({ label: 'Дата публікації' }),
        updated: fields.date({ label: 'Оновлено', description: 'Необов’язково.' }),
        draft: fields.checkbox({
          label: 'Чернетка',
          description: 'Поки позначено, допис не потрапляє на сайт.',
          defaultValue: true
        }),
        cover: fields.image({
          label: 'Обкладинка',
          directory: 'src/content/posts',
          publicPath: './'
        }),
        coverAlt: fields.text({ label: 'Опис обкладинки для незрячих' }),
        tags: fields.array(fields.text({ label: 'Тег' }), {
          label: 'Теги',
          itemLabel: (props) => props.value
        }),
        kind: fields.select({
          label: 'Тип',
          options: [
            { label: 'Стаття', value: 'article' },
            { label: 'Нотатка', value: 'note' }
          ],
          defaultValue: 'article'
        }),
        body: fields.mdx({ label: 'Текст' })
      }
    }),

    projects: collection({
      label: 'Розробки',
      path: 'src/content/projects/*',
      slugField: 'title',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Назва' } }),
        description: fields.text({ label: 'Короткий опис', multiline: true }),
        published: fields.date({ label: 'Дата' }),
        draft: fields.checkbox({ label: 'Чернетка', defaultValue: false }),
        area: fields.select({
          label: 'Напрям',
          options: [
            { label: 'EdTech', value: 'edtech' },
            { label: 'Освіта', value: 'education' }
          ],
          defaultValue: 'edtech'
        }),
        role: fields.text({ label: 'Моя роль' }),
        year: fields.text({ label: 'Період', description: 'Наприклад: активний проєкт' }),
        status: fields.select({
          label: 'Стан',
          options: [
            { label: 'Активний', value: 'active' },
            { label: 'Архів', value: 'archive' },
            { label: 'Кейс', value: 'case-study' }
          ],
          defaultValue: 'active'
        }),
        featured: fields.checkbox({ label: 'Показувати на головній', defaultValue: true }),
        externalUrl: fields.url({ label: 'Посилання на сайт розробки' }),
        client: fields.text({ label: 'Замовник', description: 'Необов’язково.' }),
        cover: fields.image({
          label: 'Знімок екрана',
          directory: 'src/content/projects',
          publicPath: './'
        }),
        coverAlt: fields.text({ label: 'Опис знімка для незрячих' }),
        tags: fields.array(fields.text({ label: 'Тег' }), {
          label: 'Теги',
          itemLabel: (props) => props.value
        }),
        body: fields.mdx({ label: 'Текст' })
      }
    })
  },

  singletons: {
    home: singleton({
      label: 'Головна',
      path: 'src/content/pages/home',
      format: { data: 'json' },
      schema: {
        description: fields.text({
          label: 'Опис сайту для Google і соцмереж',
          multiline: true
        }),
        hero: fields.object(
          {
            badge: fields.text({ label: 'Позначка вгорі' }),
            titleLine1: fields.text({ label: 'Заголовок, перший рядок' }),
            titleLine2: fields.text({ label: 'Заголовок, другий рядок (підкреслений)' }),
            statement: fields.text({ label: 'Головна теза', multiline: true }),
            text: fields.text({ label: 'Абзац під тезою', multiline: true }),
            primaryButton: fields.object(
              { label: fields.text({ label: 'Напис' }), href: fields.text({ label: 'Посилання' }) },
              { label: 'Головна кнопка' }
            ),
            secondaryButton: fields.object(
              { label: fields.text({ label: 'Напис' }), href: fields.text({ label: 'Посилання' }) },
              { label: 'Друга кнопка' }
            ),
            portraitAlt: fields.text({ label: 'Опис фото для незрячих' }),
            portraitCaption: fields.text({ label: 'Підпис під фото' })
          },
          { label: 'Перший екран' }
        ),
        folders: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Назва папки' }),
                text: fields.text({ label: 'Опис', multiline: true }),
                href: fields.text({ label: 'Посилання' }),
                linkLabel: fields.text({ label: 'Напис посилання' })
              }),
              { label: 'Папки', itemLabel: (props) => props.fields.title.value }
            )
          },
          { label: 'Блок «Оберіть папку»' }
        ),
        now: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            items: fields.array(
              fields.object({
                kicker: fields.text({ label: 'Номер' }),
                title: fields.text({ label: 'Заголовок картки' }),
                text: fields.text({ label: 'Текст', multiline: true })
              }),
              { label: 'Картки', itemLabel: (props) => props.fields.title.value }
            )
          },
          { label: 'Блок «Зараз»' }
        ),
        projects: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            allLabel: fields.text({ label: 'Напис «усі розробки»' })
          },
          { label: 'Блок розробок' }
        ),
        notes: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' })
          },
          { label: 'Блок нотаток' }
        )
      }
    }),

    about: singleton({
      label: 'Про мене',
      path: 'src/content/pages/about',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Надзаголовок' }),
        title: fields.text({ label: 'Заголовок сторінки', multiline: true }),
        lead: fields.text({ label: 'Вступний абзац', multiline: true }),
        portraitAlt: fields.text({ label: 'Опис фото для незрячих' }),
        intro: fields.object(
          {
            heading: fields.text({ label: 'Заголовок блоку' }),
            paragraphs: paragraphs('Абзаци')
          },
          { label: 'Блок «Коротко»' }
        ),
        coordinator: fields.object(
          {
            heading: fields.text({ label: 'Заголовок блоку' }),
            paragraphs: paragraphs('Абзаци')
          },
          { label: 'Блок про посаду' }
        ),
        facts: fields.object(
          {
            heading: fields.text({ label: 'Заголовок блоку' }),
            items: fields.array(
              fields.object({
                label: fields.text({ label: 'Підпис' }),
                value: fields.text({ label: 'Значення' })
              }),
              { label: 'Факти', itemLabel: (props) => props.fields.value.value }
            )
          },
          { label: 'Блок «Сухі факти»' }
        ),
        work: fields.object(
          {
            heading: fields.text({ label: 'Заголовок блоку' }),
            paragraphs: paragraphs(
              'Абзаци',
              'Посилання пишуть так: [напис](https://адреса). {email} підставить вашу пошту.'
            ),
            bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' })
          },
          { label: 'Блок «Що розробляю»' }
        )
      }
    }),

    education: singleton({
      label: 'Уроки',
      path: 'src/content/pages/education',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Надзаголовок' }),
        title: fields.text({ label: 'Заголовок сторінки', multiline: true }),
        lead: fields.text({ label: 'Вступний абзац', multiline: true }),
        bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' }),
        goodLesson: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            text: fields.text({ label: 'Текст у рамці', multiline: true })
          },
          { label: 'Блок «Хороший урок»' }
        ),
        stories: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            paragraphs: paragraphs('Історії')
          },
          { label: 'Блок історій' }
        ),
        principles: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Заголовок картки' }),
                text: fields.text({ label: 'Текст', multiline: true })
              }),
              { label: 'Принципи', itemLabel: (props) => props.fields.title.value }
            )
          },
          { label: 'Блок принципів' }
        ),
        tools: fields.object(
          {
            heading: fields.text({ label: 'Заголовок блоку' }),
            statement: fields.text({ label: 'Велика теза', multiline: true }),
            text: fields.text({ label: 'Абзац під тезою', multiline: true }),
            buttonLabel: fields.text({ label: 'Напис кнопки' }),
            buttonHref: fields.text({ label: 'Посилання кнопки' })
          },
          { label: 'Блок «Власні інструменти»' }
        )
      }
    }),

    developmentsPage: singleton({
      label: 'Розробки (сторінка)',
      path: 'src/content/pages/developments',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Надзаголовок' }),
        title: fields.text({ label: 'Заголовок сторінки', multiline: true }),
        lead: fields.text({ label: 'Вступний абзац', multiline: true }),
        bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' }),
        inProgress: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            badge: fields.text({ label: 'Позначка на картці' }),
            items: fields.array(
              fields.object({
                title: fields.text({ label: 'Назва' }),
                text: fields.text({ label: 'Опис', multiline: true })
              }),
              { label: 'Проєкти в роботі', itemLabel: (props) => props.fields.title.value }
            )
          },
          { label: 'Блок «Ще не показував»' }
        )
      }
    }),

    blogPage: singleton({
      label: 'Нотатки (сторінка)',
      path: 'src/content/pages/blog',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Надзаголовок' }),
        title: fields.text({ label: 'Заголовок сторінки', multiline: true }),
        lead: fields.text({ label: 'Вступний абзац', multiline: true }),
        button: fields.object(
          { label: fields.text({ label: 'Напис' }), href: fields.text({ label: 'Посилання' }) },
          { label: 'Кнопка' }
        ),
        bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' }),
        ownPostsEyebrow: fields.text({ label: 'Надзаголовок списку власних дописів' }),
        picks: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            linkLabel: fields.text({ label: 'Напис посилання на картці' })
          },
          { label: 'Блок вибраних публікацій' }
        )
      }
    }),

    contactsPage: singleton({
      label: 'Контакти (сторінка)',
      path: 'src/content/pages/contacts',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Надзаголовок' }),
        title: fields.text({ label: 'Заголовок сторінки', multiline: true }),
        lead: fields.text({ label: 'Вступний абзац', multiline: true }),
        bitmojiAlt: fields.text({ label: 'Опис малюнка для незрячих' }),
        mail: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' }),
            kicker: fields.text({ label: 'Підпис на картці' }),
            hint: fields.text({ label: 'Підказка під адресою' }),
            note: fields.text({ label: 'Примітка про баги', multiline: true })
          },
          { label: 'Блок пошти' }
        ),
        socials: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' })
          },
          { label: 'Блок соцмереж' }
        ),
        projects: fields.object(
          {
            eyebrow: fields.text({ label: 'Надзаголовок' }),
            heading: fields.text({ label: 'Заголовок' })
          },
          { label: 'Блок проєктів' }
        )
      }
    }),

    publications: singleton({
      label: 'Публікації на Друкарні',
      path: 'src/content/pages/publications',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Заголовок' }),
            description: fields.text({ label: 'Опис', multiline: true }),
            href: fields.url({ label: 'Посилання на Друкарню' }),
            topic: fields.text({ label: 'Тема', description: 'Показується як мітка на картці.' })
          }),
          { label: 'Публікації', itemLabel: (props) => props.fields.title.value }
        )
      }
    })
  }
});
