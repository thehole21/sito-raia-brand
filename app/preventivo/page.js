import { pageMetadata } from '@/lib/seo';
import QuoteForm from '@/components/quote-form';
export const metadata = pageMetadata('/preventivo');
export default async function PreventivoPage({ searchParams }) {
  const params = await searchParams;
  const defaultService = typeof params?.servizio === 'string' ? params.servizio : '';
  return <><section className="page-opening page-opening--quote shell"><div className="page-opening__eyebrow"><span className="little-dot" /> IL TUO PROGETTO</div><div className="page-opening__grid"><h1>Raccontaci<br /><em>la tua idea.</em></h1><p>Descrivi il progetto e inviaci la tua richiesta: ti ricontatteremo per trovare la soluzione più adatta.</p></div></section><QuoteForm defaultService={defaultService}/></>;
}
