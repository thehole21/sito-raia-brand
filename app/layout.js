import './globals.css';
import './brand.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollReveal from '@/components/scroll-reveal';

export const metadata = {
  metadataBase: new URL('https://www.raiaweb.it'),
  title: { default: 'RAIA — Design, Stampa, Comunicazione', template: '%s | RAIA' },
  description: 'RAIA srl — servizi tipografici, grande formato, insegne, allestimenti, car wrapping e gadget personalizzati a Guidonia Montecelio.',
  robots: { index: false, follow: false }, // Sito dimostrativo: rimuovere dopo il lancio.
  openGraph: { title: 'RAIA — Pensa. Crea. Stampa.', type: 'website', locale: 'it_IT' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <a href="#main-content" className="skip-link">Vai al contenuto</a>
        <Header />
        <ScrollReveal />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
