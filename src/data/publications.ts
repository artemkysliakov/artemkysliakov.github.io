/**
 * Публікації на Друкарні. Тексти лежать у src/content/pages/publications.json,
 * щоб їх можна було редагувати в Keystatic. Головна показує перші три,
 * розділ «Нотатки» — усі.
 */
import data from '../content/pages/publications.json';

export interface Publication {
  title: string;
  description: string;
  href: string;
  topic: string;
}

export const publications: Publication[] = data.items;
