import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('/');
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import HomeVideo from '@/components/home-video';
import ClientsMarquee from '@/components/clients-marquee';
import ValuesStrip from '@/components/values-strip';

export default function HomePage() {
  return (
    <>
      <section className="film-hero film-hero--v9" aria-labelledby="film-hero-title">
        <HomeVideo />
        <div className="film-hero__shade" aria-hidden="true" />
        <div className="shell film-hero__content">
          <p className="film-hero__overline">SERVIZI DI STAMPA E COMUNICAZIONE</p>
          <h1 id="film-hero-title" className="film-hero__headline">
            Stampa di Qualità{' '}<span>e Soluzioni Creative</span>
          </h1>
          <div className="film-hero__bottom">
            <Link href="/progetti" className="film-hero__cta">
              <span>Esplora i progetti</span>
              <span className="film-hero__cta-icon" aria-hidden="true">
                <ArrowUpRight size={21} strokeWidth={1.7} />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="home-services-summary shell" aria-labelledby="home-services-title"><h2 id="home-services-title">Stampa e comunicazione a Guidonia Montecelio</h2><p>Libri e cataloghi, stampa in grande formato, insegne, allestimenti, wrapping e gadget personalizzati. Dalla progettazione alla realizzazione, nella nostra sede a Guidonia Montecelio, in provincia di Roma.</p><Link href="/servizi">Scopri tutti i servizi RAIA <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
      <ClientsMarquee />
      <ValuesStrip />

    </>
  );
}