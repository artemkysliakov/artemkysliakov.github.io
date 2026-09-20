import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context){const posts=(await getCollection('posts',({data})=>!data.draft)).sort((a,b)=>b.data.published.valueOf()-a.data.published.valueOf());return rss({title:'Артем Кисляков — публікації',description:'Інформатика, освіта, EdTech, ШІ та власні навчальні розробки.',site:context.site,items:posts.map(post=>({title:post.data.title,description:post.data.description,pubDate:post.data.published,link:`/blog/${post.id}/`}))});}
