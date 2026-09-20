import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );

  return rss({
    title: `${site.name} — публікації`,
    description: 'Інформатика, освіта, EdTech, ШІ та власні навчальні розробки.',
    site: context.site,
    customData: '<language>uk-ua</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      categories: post.data.tags,
      link: `/blog/${post.id}/`
    }))
  });
}
