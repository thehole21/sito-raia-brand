import { Lightbulb, ShieldCheck, Handshake } from 'lucide-react';
import './values-strip-brand-fix.css';

const VALUES = [
  {
    title: 'Creatività',
    text: 'Dall’apporto grafico alla progettazione, accompagniamo ogni idea nella comunicazione visiva.',
    Icon: Lightbulb,
  },
  {
    title: 'Professionalità',
    text: 'Revisioni, controlli e consegne: ogni lavorazione punta alla massima qualità.',
    Icon: ShieldCheck,
  },
  {
    title: 'Serietà',
    text: 'Responsabilità, dedizione e attenzione ai dettagli. La vostra fiducia è la priorità.',
    Icon: Handshake,
  },
];

export default function ValuesStrip() {
  return (
    <section className="values-strip" aria-label="I valori di RAIA">
      <div className="shell values-strip__intro">
        <span className="section-overline">IL NOSTRO APPROCCIO</span>
        <h2>Come lavoriamo<span>.</span></h2>
      </div>
      <div className="shell values-strip__grid">
        {VALUES.map(({ title, text, Icon }) => (
          <article className="values-strip__item" key={title}>
            <span className="values-strip__symbol">
              <Icon size={57} strokeWidth={1.15} aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
