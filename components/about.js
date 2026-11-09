import Image from 'next/image';
import { IMAGES } from '@/lib/content';

export default function About() {
  return (
    <>
      <section className="about-feature shell">
        <div className="about-feature__visual"><Image priority fetchPriority="high" src={IMAGES.installation} alt="Operatore RAIA al lavoro durante un'installazione su una vetrina" fill sizes="(max-width: 800px) 100vw, 49vw" className="cover-image"/><span>IL LAVORO, PRIMA DI TUTTO.</span></div>
        <div className="about-feature__story"><span className="eyebrow"><span className="little-dot"/> UNA STORIA CHE CONTINUA</span><h2>Tre generazioni.<br /><em>Lo stesso istinto:<br />fare.</em></h2><p>RAIA nasce dall’esperienza di tre generazioni nel settore della comunicazione e della stampa. Dall’editoria classica — tiratura, brossura, copertine — ha ampliato nel tempo la propria attività fino alle pellicole, agli allestimenti, alla pubblicità indoor e outdoor e alla riqualificazione degli ambienti.</p><p>Oggi unisce competenze consolidate e tecnologie come Mimaki UCJV, taglio laser e presse a caldo.</p></div>
      </section>
      <section className="about-facts shell"><div><span>ORIGINI</span><h3>Editoria</h3><p>Libri, copertine, tirature e lavorazioni tipografiche tradizionali.</p></div><div><span>EVOLUZIONE</span><h3>Comunicazione</h3><p>Pellicole, automezzi, insegne, grande formato e stand fieristici.</p></div><div><span>OGGI</span><h3>Tecnologia</h3><p>Stampa digitale, Mimaki UCJV, taglio laser e presse a caldo.</p></div></section>
      <section className="about-mission"><div className="shell about-mission__inner"><span>LA NOSTRA MISSIONE</span><h2>Innovazione e dedizione. Qualità che si vede, attenzione che si sente.</h2><p>RAIA si impegna a realizzare soluzioni creative di qualità e a creare valore duraturo per le persone e le organizzazioni che la scelgono.</p></div></section>
    </>
  );
}
