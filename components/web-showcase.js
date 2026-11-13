 'use client';
import { useRef, useState } from 'react';
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

const directions = {
  Hotel: { label: 'Luce della suite', options: ['Alba', 'Tramonto', 'Notte'], colors: ['#dfcfb2', '#d89672', '#58627c'] },
  Ristorazione: { label: 'Atmosfera in sala', options: ['Pranzo', 'Aperitivo', 'Cena'], colors: ['#c9c49b', '#cc895b', '#74645b'] },
  Aziende: { label: 'Finitura del progetto', options: ['Calce', 'Argilla', 'Grafite'], colors: ['#d8d3be', '#bd876b', '#69737a'] },
};

export default function WebShowcase() {
  const [selected, setSelected] = useState('Hotel');
  const [exploring, setExploring] = useState(false);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(null);
  const [finish, setFinish] = useState(0);
  const [angle, setAngle] = useState(0);
  const ticket = useRef(null);
  const destination = useRef(null);
  const gesture = useRef(null);
  const direction = directions[selected];
  const item = concepts[selected];
  const entries = collections[selected];
  const [title, detail] = entries[index];

  function chooseSector(name) {
    setAngle(0);
    setFinish(0);
    setSelected(name);
    setExploring(false);
    setIndex(0);
    setSaved(null);
  }

  function saveToPhone(event) {
    setSaved(index);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stamp = ticket.current;
    const stage = stamp.parentElement.getBoundingClientRect();
    const start = event.currentTarget.getBoundingClientRect();
    const end = destination.current.getBoundingClientRect();
    const x = box => box.left + box.width / 2 - stage.left - 14;
    const y = box => box.top + box.height / 2 - stage.top - 14;
    stamp.getAnimations().forEach(animation => animation.cancel());
    stamp.animate([
      { transform: `translate(${x(start)}px,${y(start)}px) scale(.4)`, opacity: 0 },
      { transform: `translate(${(x(start)+x(end))/2}px,${(y(start)+y(end))/2-32}px) rotate(-15deg)`, opacity: 1, offset: .48 },
      { transform: `translate(${x(end)}px,${y(end)}px) scale(.6)`, opacity: 0 },
    ], { duration: 620, easing: 'ease-in-out' });
    destination.current.animate([{opacity: .65}, {opacity: 1}], {duration: 350, delay: 400});
  }

  function finishSwipe(event) {
    if (!gesture.current) return;
    const dx = event.clientX - gesture.current.x;
    const dy = event.clientY - gesture.current.y;
    gesture.current = null;
    if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy)) return;
    setExploring(true);
    setIndex(current => (current + (dx < 0 ? 1 : -1) + entries.length) % entries.length);
  }

  return <section className="web-showcase" aria-labelledby="web-showcase-title">
    <div className="web-showcase__head">
      <div><span className="web-services__label">SITI WEB E APP SU MISURA</span><h2 id="web-showcase-title">Il digitale, con carattere<span>.</span></h2></div>
      <div className="web-showcase__tabs" role="group" aria-label="Scegli un concept">
        {Object.keys(concepts).map(name => <button key={name} aria-pressed={selected === name} onClick={() => chooseSector(name)}>{name}</button>)}
      </div>
    </div>
    <div className={'web-showcase__stage ' + item.color} data-finish={finish} key={selected} style={{ '--surface': direction.colors[finish], '--view': angle }}>
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
              {exploring ? <button className="web-showcase__fake-cta" onClick={saveToPhone} disabled={saved === index}>{saved === index ? 'Salvato in app' : 'Conserva in app'}<Smartphone size={13}/></button>
                : <button className="web-showcase__fake-cta" onClick={() => setExploring(true)}>{item.action}<ArrowUpRight size={13}/></button>}
            </div>
            <div className={'web-showcase__architecture' + (exploring && index ? ' studio-alternate' : '')} aria-hidden="true"
              onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
              onPointerUp={finishSwipe} onPointerCancel={() => { gesture.current = null; }}>
              <div/><i/><span/><b className="studio-orb"/>
            </div>
          </div>
          <div className="web-showcase__site-bottom"><span aria-live="polite">{direction.label} · {direction.options[finish]}</span>
            {exploring && <button onClick={() => setIndex((index + 1) % entries.length)}>Sfoglia {index + 1} / {entries.length} →</button>}
          </div>
        </div>
      </div>
      <div className="web-showcase__phone"><div>
        <span className="web-showcase__notch"/>
        <div className="web-showcase__app-top"><strong>{item.name.toLowerCase()}<span>app personale</span></strong><span className="web-showcase__avatar">{item.name[0]}</span></div>
        <fieldset className="studio-palette">
          <legend>{direction.label}</legend>
          <div>{direction.options.map((option, i) => <button key={option} aria-label={option} aria-pressed={finish === i} style={{ "--sample": direction.colors[i] }} onClick={() => setFinish(i)}><i aria-hidden="true"/>{option}</button>)}</div>
        </fieldset>
        <label className="studio-view">Inquadratura
          <input type="range" min="-1" max="1" step=".01" value={angle} onChange={event => setAngle(Number(event.target.value))}/>
        </label>
        <div ref={destination} className="web-showcase__app-card" aria-live="polite"><span><Layers size={16}/> Preferiti</span>
          <strong key={selected + saved} className="studio-reveal">{saved === null ? 'La tua selezione' : entries[saved][0]}</strong>
          <small>{saved === null ? 'Esplora il sito e conserva qui ciò che ti piace.' : entries[saved][1]}</small>
        </div>
        {saved !== null && <button className="studio-remove" onClick={() => setSaved(null)}>Rimuovi dai preferiti</button>}
        <div className="web-showcase__app-dots" aria-hidden="true"><i/><i/><i/></div>
      </div></div>
      <span ref={ticket} className="studio-transfer" aria-hidden="true"><Layers size={15}/></span>
    </div>
    <div className="web-showcase__caption"><span>Prototipi dimostrativi. Le selezioni durano solo per questa prova.</span><a href="#soluzioni">Scopri le possibilità <ArrowUpRight size={14}/></a></div>
  </section>;
}