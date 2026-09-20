import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * `cover` приймає шлях до файлу поряд із Markdown (наприклад `./ravlyk-editor.png`).
 * Astro оптимізує його як звичайний імпорт зображення.
 */
const common = ({ image }: SchemaContext) => ({
  title: z.string(),
  description: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  cover: image().optional(),
  coverAlt: z.string().optional(),
  tags: z.array(z.string()).default([])
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: (context) => z.object({ ...common(context), kind: z.enum(['article', 'note']).default('article') })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: (context) =>
    z.object({
      ...common(context),
      area: z.enum(['education', 'edtech']),
      role: z.string(),
      year: z.string().optional(),
      status: z.enum(['active', 'archive', 'case-study']).default('case-study'),
      featured: z.boolean().default(false),
      externalUrl: z.url().optional(),
      client: z.string().optional()
    })
});

export const collections = { posts, projects };
