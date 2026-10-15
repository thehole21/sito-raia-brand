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
      <ClientsMarquee />
      <ValuesStrip />
      
<section
  className="mockup-invite"
  aria-labelledby="mockup-invite-title"
>
  <div className="shell mockup-invite__inner">
    <div className="mockup-invite__content">
      <span className="mockup-invite__eyebrow">
        STUDIO ANTEPRIME
      </span>

      <h2 id="mockup-invite-title">
        Il tuo logo.
        <br />
        <span>Prima ancora della stampa.</span>
      </h2>

      <p>
        Scopri come potrebbe apparire la tua identità
        su alcuni dei nostri supporti personalizzabili.
      </p>
    </div>

    <Link
      href="/anteprima"
      className="mockup-invite__link"
    >
      <span>Apri lo studio anteprime</span>
      <ArrowUpRight size={20} strokeWidth={1.7} />
    </Link>
  </div>
</section>

    </>
  );
}