import { IMAGES } from '@/lib/content';
import { PROJECTS } from '@/lib/projects';
import { PAGES, SITE_URL, INDEXABLE } from '@/lib/seo';

const SERVICE_IMAGES = [
  '/images/servizi/stampa-sede-v4.webp',
  '/images/servizi/grande-formato-sede-v4.webp',
  '/images/servizi/allestimenti-sede-v4.webp',
  '/images/servizi/wrapping-sede-v4.webp',
  '/images/servizi/gadget-sede-v4.webp',
].map(src => SITE_URL + src);

const PROJECT_IMAGES = [
  ...new Set(
    PROJECTS.flatMap(project => [
      project.image,
      ...(project.photos || []).map(photo => photo.image),
    ]).filter(Boolean)
  ),
].map(src => SITE_URL + src);

const ROUTE_CONFIG = {
  '/': {
    priority: 1.0,
    changeFrequency: 'weekly',
    images: [
      SITE_URL + '/images/home-poster-v2.webp',
      SITE_URL + '/images/social-card.jpg',
    ],
  },
  '/servizi': {
    priority: 0.9,
    changeFrequency: 'weekly',
    images: SERVICE_IMAGES,
  },
  '/progetti': {
    priority: 0.9,
    changeFrequency: 'weekly',
    images: PROJECT_IMAGES,
  },
  '/chi-siamo': {
    priority: 0.8,
    changeFrequency: 'monthly',
    images: [SITE_URL + IMAGES.installation],
  },
  '/contatti': {
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  '/privacy': {
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  '/cookie-policy': {
    priority: 0.3,
    changeFrequency: 'yearly',
  },
};

const LAST_MODIFIED = '2026-11-10';

export default function sitemap() {
  if (!INDEXABLE) return [];

  return Object.keys(PAGES)
    .filter(route => route !== '/preventivo')
    .map(route => {
      const config = ROUTE_CONFIG[route] || { priority: 0.5, changeFrequency: 'monthly' };
      return {
        url: SITE_URL + route,
        lastModified: LAST_MODIFIED,
        changeFrequency: config.changeFrequency,
        priority: config.priority,
        ...(config.images ? { images: config.images } : {}),
      };
    });
}
