import './globals.css';
import { INDEXABLE } from '@/lib/seo';
import { COMPANY, SOCIALS } from '@/lib/content';
import './brand.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollReveal from '@/components/scroll-reveal';

export const metadata = {
  metadataBase: new URL('https://www.raiaweb.it'),
  title: { default: 'RAIA — Design, Stampa, Comunicazione', template: '%s | RAIA' },
  description: 'RAIA srl — servizi tipografici, grande formato, insegne, allestimenti, car wrapping e gadget personalizzati a Guidonia Montecelio.',
  robots: { index: INDEXABLE, follow: true },
  icons: { icon: '/images/raia-icon.png', apple: '/images/raia-apple-icon.png' },
  openGraph: { title: 'RAIA — Pensa. Crea. Stampa.', type: 'website', locale: 'it_IT' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <a href="#main-content" className="skip-link">Vai al contenuto</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness','@id':'https://www.raiaweb.it/#azienda',name:COMPANY.name,url:'https://www.raiaweb.it',image:'https://www.raiaweb.it/images/social-card.jpg',logo:'https://www.raiaweb.it/images/raia-logo-transparent.png',telephone:COMPANY.phoneLink,email:COMPANY.email,address:{'@type':'PostalAddress',streetAddress:'Via Bruno Pontecorvo 46',addressLocality:'Guidonia Montecelio',addressRegion:'RM',postalCode:'00012',addressCountry:'IT'},sameAs:SOCIALS.map(s=>s.href)}).replace(/</g,'\\u003c')}} />
        <Header />
        <ScrollReveal />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
