/**
 * Публікації на Друкарні. Один масив на весь сайт: головна показує перші три,
 * розділ «Нотатки» — усі.
 */
export interface Publication {
  title: string;
  description: string;
  href: string;
  topic: string;
}

export const publications: Publication[] = [
  {
    title: 'РАВЛИК 3.0: яскравіше та доступніше',
    description: 'Що змінилося у великому оновленні: інтерактивні уроки, посібник і налаштування для дітей, яким важко читати дрібний текст.',
    href: 'https://drukarnia.com.ua/articles/ravlik-3-0-yaskravishe-ta-dostupnishe-86V2x',
    topic: 'РАВЛИК'
  },
  {
    title: 'Навіщо я створив ще одну мову програмування',
    description: 'П’ять причин, чому між Scratch і Python дитині потрібен окремий місток — і чому я не знайшов готового.',
    href: 'https://drukarnia.com.ua/articles/navisho-ya-stvoriv-she-odnu-movu-programuvannya-C95rA',
    topic: 'РАВЛИК'
  },
  {
    title: 'Як працює Інтернет: інтерактивний урок',
    description: 'Учень сам набирає адресу, бачить, як DNS шукає сервер, і отримує відповідь. Клієнти, сервери та IP — без жодного слайда.',
    href: 'https://drukarnia.com.ua/articles/yak-pracyuye-internet-interaktivnii-urok-XqbCU',
    topic: 'Урок'
  },
  {
    title: 'Формула ідеального запиту до ШІ',
    description: 'Структура запиту, яку я даю учням і колегам, і чотири помилки, через які відповідь виходить нікудишньою.',
    href: 'https://drukarnia.com.ua/articles/formula-idealnogo-zapitu-do-shi-9PMp6',
    topic: 'ШІ'
  }
];
