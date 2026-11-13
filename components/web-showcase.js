 'use client';
import { useState } from 'react';
import { ArrowUpRight, Layers, MousePointer2, Smartphone } from 'lucide-react';
const concepts={
 Hotel:{name:'AURA',label:'HOSPITALITY',headline:<>Il tuo prossimo<br/><em>posto del cuore.</em></>,intro:'Luoghi da vivere, storie da ricordare.',action:'Esplora le camere',color:'hotel'},
 Ristorazione:{name:'TERRA',label:'CUCINA CONTEMPORANEA',headline:<>Il gusto delle<br/><em>cose fatte bene.</em></>,intro:'Una storia di ingredienti, incontri e stagioni.',action:'Scopri il menu',color:'food'},
 Aziende:{name:'FORMA',label:'SPAZI & IDEE',headline:<>Nuove idee.<br/><em>Spazi da vivere.</em></>,intro:'Progettiamo il prossimo passo della tua impresa.',action:'Scopri i progetti',color:'business'},
};
const collections = {
  Hotel: [['Suite Loggia', 'Una terrazza privata, dal primo caffè al tramonto.'], ['Camera Corte', 'Pietra chiara e silenzio, affacciati sul giardino.']],
  Ristorazione: [['Orto di stagione', 'Erbe fresche, verdure arrosto e olio al limone.'], ['Ravioli di casa', 'Sfoglia sottile, ricotta e burro alla salvia.']],
  Aziende: [['Studio Luce', 'Un sistema modulare per gli spazi di lavoro.'], ['Linea Materia', 'Una collezione di superfici per interni.']],
};

export default function WebShowcase() {
  const [selected, setSelected] = useState('Hotel');
  const [exploring, setExploring] = useState(false);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(null);
  const item = concepts[selected];
  const entries = collections[selected];
  const [title, detail] = entries[index];

  function chooseSector(name) {
    setSelected(name);
    setExploring(false);
    setIndex(0);
    setSaved(null);
  }

  return <section className="web-showcase" aria-labelledby="web-showcase-title">
    <div className="web-showcase__head">
      <div><span className="web-services__label">SITI WEB E APP SU MISURA</span><h2 id="web-showcase-title">Il digitale, con carattere<span>.</span></h2></div>
      <div className="web-showcase__tabs" role="group" aria-label="Scegli un concept">
        {Object.keys(concepts).map(name => <button key={name} aria-pressed={selected === name} onClick={() => chooseSector(name)}>{name}</button>)}
      </div>
    </div>
    <div className={'web-showcase__stage ' + item.color}>
      <div className="web-showcase__desktop">
        <div className="web-showcase__chrome" aria-hidden="true"><span><i/><i/><i/></span><small>{item.name.toLowerCase()}.example</small><MousePointer2 size={12}/></div>
        <div className="web-showcase__website">
          <div className="web-showcase__site-nav"><strong>{item.name}<small>{item.label}</small></strong>
            {exploring && <button onClick={() => setExploring(false)}>← Copertina</button>}
          </div>
          <div className="web-showcase__site-hero">
            <div key={selected + exploring + index} className="studio-reveal">
              <small>{exploring ? item.action : item.label}</small>
              <h3>{exploring ? title : item.headline}</h3>
              <p>{exploring ? detail : item.intro}</p>
              {exploring ? <button className="web-showcase__fake-cta" onClick={() => setSaved(index)} disabled={saved === index}>{saved === index ? 'Salvato in app' : 'Conserva in app'}<Smartphone size={13}/></button>
                : <button className="web-showcase__fake-cta" onClick={() => setExploring(true)}>{item.action}<ArrowUpRight size={13}/></button>}
            </div>
            <div className={'web-showcase__architecture' + (exploring && index ? ' studio-alternate' : '')} aria-hidden="true"><div/><i/><span/></div>
          </div>
          <div className="web-showcase__site-bottom"><span>{item.name} · {item.label}</span>
            {exploring && <button onClick={() => setIndex((index + 1) % entries.length)}>Sfoglia {index + 1} / {entries.length} →</button>}
          </div>
        </div>
      </div>
      <div className="web-showcase__phone"><div>
        <span className="web-showcase__notch"/>
        <div className="web-showcase__app-top"><strong>{item.name.toLowerCase()}<span>app personale</span></strong><span className="web-showcase__avatar">{item.name[0]}</span></div>
        <small>LA TUA RACCOLTA</small><h3>Da tenere<br/>con te<span>.</span></h3>
        <div className="web-showcase__app-card" aria-live="polite"><span><Layers size={16}/> Preferiti</span>
          <strong key={selected + saved} className="studio-reveal">{saved === null ? 'La tua selezione' : entries[saved][0]}</strong>
          <small>{saved === null ? 'Esplora il sito e conserva qui ciò che ti piace.' : entries[saved][1]}</small>
        </div>
        {saved !== null && <button className="studio-remove" onClick={() => setSaved(null)}>Rimuovi dai preferiti</button>}
        <div className="web-showcase__app-dots" aria-hidden="true"><i/><i/><i/></div>
      </div></div>
    </div>
    <div className="web-showcase__caption"><span>Prototipi dimostrativi. Le selezioni durano solo per questa prova.</span><a href="#soluzioni">Scopri le possibilità <ArrowUpRight size={14}/></a></div>
  </section>;
}