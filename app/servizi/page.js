import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Servizi from '@/components/servizi';

export const metadata = pageMetadata('/servizi');

export default function ServiziPage() {
  return (
    <>
      <section className="page-opening shell">
        <div className="page-opening__eyebrow"><span className="little-dot" /> COSA FACCIAMO</div>
        <div className="page-opening__grid"><h1>Ogni idea ha<br /><em>la sua forma.</em></h1><p>Stampa, allestimenti, wrapping e personalizzazione: cinque aree di lavoro, da esplorare in un solo posto.</p></div>
      </section>
      <div className="shell"><Servizi /></div>
      <section className="page-endline shell"><p>Hai un progetto da realizzare?</p><Link href="/preventivo">Raccontacelo <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    </>
  );
}
