import SeoBreadcrumbs from '@/components/seo-breadcrumbs';
import { pageMetadata } from '@/lib/seo';
import About from '@/components/about';
export const metadata = pageMetadata('/chi-siamo');
export default function AboutPage() {
  return (
    <>
      <SeoBreadcrumbs route="/chi-siamo"/><section className="page-opening shell">
        <div className="page-opening__eyebrow"><span className="little-dot" /> CHI SIAMO</div>
        <div className="page-opening__grid"><h1>Esperienza<br /><em>in evoluzione.</em></h1><p>Da tre generazioni lavoriamo nella stampa e nella comunicazione. Dalla sede a Roma seguiamo progetti, spedizioni e installazioni in tutta Italia.</p></div>
      </section>
      <About />
    </>
  );
}
