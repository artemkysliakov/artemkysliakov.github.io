import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(),
  description: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  tags: z.array(z.string()).default([])
};

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({ ...common, kind: z.enum(['article','note']).default('article') })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...common,
    area: z.enum(['education','edtech','360']),
    role: z.string(),
    year: z.string().optional(),
    status: z.enum(['active','archive','case-study']).default('case-study'),
    featured: z.boolean().default(false),
    externalUrl: z.url().optional(),
    client: z.string().optional()
  })
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    ...common,
    audience: z.array(z.enum(['teachers','students','parents'])).default(['teachers']),
    resourceType: z.enum(['lesson','tool','guide','video','download']).default('guide'),
    externalUrl: z.url().optional()
  })
});

export const collections = { posts, projects, resources };
