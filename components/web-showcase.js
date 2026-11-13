'use client';

import { useState } from 'react';
import { Bookmark, Check, RotateCcw } from 'lucide-react';

const editions = {
  Hotel: { brand: 'Aura', subtitle: 'Residenze sul lago', title: 'Scegli la tua camera', choices: ['La terrazza', 'Il giardino', 'La mansarda'], action: 'Salva la camera', receipt: 'Il tuo soggiorno', ink: '#254c46' },
  Ristorazione: { brand: 'Terra', subtitle: 'Cucina di stagione', title: 'Componi il tuo percorso', choices: ['Orto', 'Mare', 'Bosco'], action: 'Salva il percorso', receipt: 'Il tuo menu', ink: '#833b27' },
  Aziende: { brand: 'Forma', subtitle: 'Studio di materiali', title: 'Scegli una finitura', choices: ['Travertino', 'Rovere', 'Ottone'], action: 'Salva il campione', receipt: 'Il tuo campionario', ink: '#354465' },
};

function Prototype({ edition }) {
  const [choice, setChoice] = useState(0);
  const [saved, setSaved] = useState(null);
  return <div className="proof-stage" style={{ '--ink': edition.ink }}>
    <div className="proof-site">
      <small>Sito web</small>
      <div className="proof-mast"><strong>{edition.brand}</strong><span>{edition.subtitle}</span></div>
      <div className="proof-art" aria-hidden="true" style={{ '--angle': (choice * 22 - 24) + 'deg' }}><i/><i/><i/></div>
      <h3>{edition.title}</h3>
      <div className="proof-options" role="group" aria-label={edition.title}>{edition.choices.map((label, index) =>
        <button key={label} aria-pressed={index === choice} onClick={() => setChoice(index)}>{label}</button>
      )}</div>
      <button className="proof-save" onClick={() => setSaved(choice)} disabled={saved === choice}>
        {saved === choice ? <Check size={16}/> : <Bookmark size={16}/>}
        {saved === choice ? 'Salvato nell’app' : edition.action}
      </button>
    </div>
    <div className="proof-app">
      <small>App personale</small>
      <h3>{edition.receipt}</h3>
      <div className="proof-ticket" key={saved ?? 'empty'} aria-live="polite">
        <span>{edition.brand}</span>
        <strong>{saved === null ? 'Nessuna selezione' : edition.choices[saved]}</strong>
        <p>{saved === null ? 'Salva una scelta dal sito per ritrovarla qui.' : 'Aggiunto alla tua raccolta.'}</p>
      </div>
      {saved !== null && <button className="proof-reset" onClick={() => setSaved(null)}><RotateCcw size={14}/> Svuota raccolta</button>}
    </div>
  </div>;
}

export default function WebShowcase() {
  const [sector, setSector] = useState('Hotel');
  return <section className="web-proof" aria-labelledby="proof-title">
    <header><div><span className="web-services__label">PROTOTIPO INTERATTIVO</span><h2 id="proof-title">Dal sito alla tua app<span>.</span></h2></div>
      <div className="proof-options" role="group" aria-label="Scegli il settore">{Object.keys(editions).map(name =>
        <button key={name} aria-pressed={sector === name} onClick={() => setSector(name)}>{name}</button>
      )}</div>
    </header>
    <Prototype key={sector} edition={editions[sector]}/>
    <p className="proof-caption">Simulazione dimostrativa. Le scelte durano solo per questa prova.</p>
  </section>;
}
