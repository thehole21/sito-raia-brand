import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Servizi from '@/components/servizi';
import './servizi.css';

export const metadata = pageMetadata('/servizi');

export default function ServiziPage() {
  return (
    <>
      <section className="page-opening shell">
        <div className="page-opening__eyebrow"><span className="little-dot" /> COSA FACCIAMO</div>
        <div className="page-opening__grid"><h1>Ogni idea ha<br /><em>la sua forma.</em></h1><p>Dai libri alle insegne, dalle vetrine ai gadget. Esplora le cinque aree e apri una scheda per vedere tutte le lavorazioni.</p></div>
      </section>
      <div className="shell"><Servizi /></div>
      <section className="page-endline shell"><p>Hai un progetto da realizzare?</p><Link href="/preventivo">Raccontacelo <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    </>
  );
}
