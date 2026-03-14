import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const siteUrl = 'https://nutricionista.io/nutricionista-en-alcorcon';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/perdida-de-peso', priority: '0.9', changefreq: 'monthly' },
  { url: '/nutricion-deportiva', priority: '0.9', changefreq: 'monthly' },
  { url: '/salud-digestiva', priority: '0.9', changefreq: 'monthly' },
  { url: '/salud-hormonal', priority: '0.9', changefreq: 'monthly' },
  { url: '/nutricion-clinica', priority: '0.9', changefreq: 'monthly' },
  { url: '/nutricionista-online', priority: '0.9', changefreq: 'monthly' },
  { url: '/nutricionista-alcorcon-centro', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-san-jose-valderas-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-parque-lisboa-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-campodon-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-prado-santo-domingo-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-las-retamas-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/nutricionista-parque-oeste-alcorcon', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/aviso-legal', priority: '0.3', changefreq: 'yearly' },
  { url: '/politica-de-privacidad', priority: '0.3', changefreq: 'yearly' },
  { url: '/politica-de-cookies', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = async () => {
  const blogPosts = await getCollection('blog');

  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.id}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
