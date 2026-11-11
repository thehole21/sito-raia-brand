import { makitoDemoEnabled } from '@/lib/makito-demo';
import './globals.css';
import { INDEXABLE, SITE_URL } from '@/lib/seo';
import { businessStructuredData } from '@/lib/structured-data';
import './brand.css';
import './internal-pages.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollReveal from '@/components/scroll-reveal';
import BrandIntro from '@/components/brand-intro';
import CookieConsent from '@/components/cookie-consent';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'RAIA — Design, Stampa, Comunicazione', template: '%s | RAIA' },
  description: 'RAIA srl — servizi tipografici, grande formato, insegne, allestimenti, car wrapping e gadget personalizzati a Guidonia Montecelio.',
  robots: { index: INDEXABLE, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: { icon: '/images/raia-icon.png', apple: '/images/raia-apple-icon.png' },
  openGraph: { title: 'RAIA — Pensa. Crea. Stampa.', type: 'website', locale: 'it_IT' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <a href="#main-content" className="skip-link">Vai al contenuto</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData).replace(/</g, '\\u003c') }} />
        <Header showCatalog={makitoDemoEnabled()} />
        <BrandIntro />
        <ScrollReveal />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
