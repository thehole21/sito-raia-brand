import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LegalShell({ kind, title, accent, description, sections, updated, sibling }) {
  return (
    <div className="legal-page">
      <header className="legal-page__opening shell">
        <div className="legal-page__eyebrow"><span className="little-dot" aria-hidden="true" /> INFORMAZIONI LEGALI / {kind}</div>
        <div className="legal-page__opening-grid">
          <div>
            <h1>{title}<br /><em>{accent}</em></h1>
            <div className="legal-page__rule" aria-hidden="true"><span /><span /><span /></div>
          </div>
          <div className="legal-page__intro">
            <p>{description}</p>
            <span>ULTIMO AGGIORNAMENTO <strong>{updated}</strong></span>
          </div>
        </div>
      </header>

      <div className="shell legal-page__layout">
        <aside className="legal-page__aside" aria-label="Indice dell'informativa">
          <span className="legal-page__aside-heading">IN QUESTA PAGINA</span>
          <nav aria-label="Sezioni dell'informativa">
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
          <Link className="legal-page__other" href={sibling.href}>
            {sibling.label} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>

        <div className="legal-page__sections">
          {sections.map((section, index) => (
            <section id={section.id} className="legal-page__section" key={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="legal-page__section-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="legal-page__section-body">
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                <div className="legal-page__copy">{section.content}</div>
              </div>
            </section>
          ))}
          <div className="legal-page__closing">
            <span>RAIA SRL</span>
            <p>Per chiarimenti sulle informative o sul trattamento dei dati puoi contattarci direttamente.</p>
            <a href="mailto:info@raiaweb.it">info@raiaweb.it <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
