import { COMPANY, SERVICES, SOCIALS } from './content';
import { SERVICE_ROUTES } from './service-routes';
import { SITE_URL } from './seo';

export const businessStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': SITE_URL + '/#azienda',
      name: COMPANY.name,
      url: SITE_URL + '/',
      description: COMPANY.description,
      image: SITE_URL + '/images/social-card.jpg',
      logo: SITE_URL + '/images/raia-logo-transparent.png',
      telephone: COMPANY.phoneLink,
      email: COMPANY.email,
      vatID: 'IT'+COMPANY.vat,
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' }],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Bruno Pontecorvo 46',
        addressLocality: 'Guidonia Montecelio',
        addressRegion: 'RM',
        postalCode: '00012',
        addressCountry: 'IT',
      },
      hasMap: COMPANY.map,
      sameAs: SOCIALS.map(social => social.href),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servizi di stampa e comunicazione RAIA',
        itemListElement: SERVICES.map(service => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            url: SITE_URL + '/servizi/' + SERVICE_ROUTES.find(route => route.id === service.id).slug,
            provider: { '@id': SITE_URL + '/#azienda' },
            areaServed: ['tipografia', 'grande-formato'].includes(service.id) ? [{ '@type': 'Country', name: 'Italia' }] : [
              { '@type': 'City', name: 'Guidonia Montecelio' },
              { '@type': 'City', name: 'Roma' },
            ],
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#sito',
      url: SITE_URL + '/',
      name: 'RAIA — Stampa e comunicazione',
      inLanguage: 'it-IT',
      publisher: { '@id': SITE_URL + '/#azienda' },
    },
  ],
};
