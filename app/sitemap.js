import { SERVICE_ROUTES } from '@/lib/service-routes';
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
    images: [
      SITE_URL + '/images/home-poster-v2.webp',
      SITE_URL + '/images/social-card.jpg',
    ],
  },
  '/servizi': {
    images: SERVICE_IMAGES,
  },
  '/progetti': {
    images: PROJECT_IMAGES,
  },
  '/chi-siamo': {
    images: [SITE_URL + IMAGES.installation],
  },
  '/contatti': {
  },
  '/privacy': {
  },
  '/cookie-policy': {
  },
};

SERVICE_ROUTES.forEach((service,index) => { ROUTE_CONFIG['/servizi/'+service.slug] = { images: [SERVICE_IMAGES[index]] }; });

const LAST_MODIFIED = '2026-11-10';

export default function sitemap() {
  if (!INDEXABLE) return [];

  return Object.keys(PAGES)
    .map(route => {
      const config = ROUTE_CONFIG[route] || {};
      return {
        url: SITE_URL + route,
        lastModified: LAST_MODIFIED,
        ...(config.images ? { images: config.images } : {}),
      };
    });
}
