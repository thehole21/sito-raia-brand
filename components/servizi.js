'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Expand, X } from 'lucide-react';
import { SERVICES } from '@/lib/content';

const PHOTOS = [
  ['stampa', 'Libri, cataloghi, pieghevoli e packaging su un banco di stampa'],
  ['grande-formato', 'Stampa di banner, pannelli, carta da parati e tessuti'],
  ['allestimenti', 'Insegne luminose, lettere tridimensionali e stand espositivo'],
  ['wrapping', 'Applicazione di pellicola su un veicolo e vetrofanie per interni'],
  ['gadget', 'Abbigliamento, cappellini, borraccia, tazza e oggetti personalizzabili'],
];

function indexFromHash() {
  const hash = window.location.hash.slice(1);
  return SERVICES.findIndex(({ id }, index) => {
    const number = index + 1;
    return [id, `service_${number}`, `elementor-tab-title-568${number}`,
      `elementor-tab-content-568${number}`].includes(hash);
  });
}

export default function Servizi() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const lightbox = useRef(null);
  const enlargeButton = useRef(null);
  const tabButtons = useRef([]);

  useEffect(() => {
    function followHash() {
      const index = indexFromHash();
      if (index >= 0) setCurrent(index);
    }
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, []);

  useEffect(() => {
    if (expanded) lightbox.current.showModal();
  }, [expanded]);

  function chooseService(index) {
    setCurrent(index);
    history.replaceState(history.state, '', `#${SERVICES[index].id}`);
  }

  function onTabKeyDown(event, index) {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % SERVICES.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + SERVICES.length - 1) % SERVICES.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = SERVICES.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    chooseService(next);
    tabButtons.current[next].focus({ preventScroll: true });
  }

  return (
    <section className="service-desk" aria-label="Esplora le cinque aree di servizio RAIA">
      <nav className="service-desk__tabs" role="tablist" aria-label="Scegli un servizio">
        {SERVICES.map((item, index) => (
          <button key={item.id} ref={element => { tabButtons.current[index] = element; }}
            type="button" role="tab" id={`service-tab-${item.id}`}
            aria-selected={current === index} aria-controls={`service-panel-${item.id}`}
            tabIndex={current === index ? 0 : -1}
            onClick={() => chooseService(index)} onKeyDown={event => onTabKeyDown(event, index)}>
            <span>{item.number}</span><strong>{item.title}</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ))}
      </nav>

      {SERVICES.map((item, index) => (
        <div key={item.id} role="tabpanel" hidden={index !== current}
          id={`service-panel-${item.id}`} aria-labelledby={`service-tab-${item.id}`}
          className="service-desk__panel" tabIndex={0}>
          <figure className="service-desk__visual">
            <button type="button" className="service-desk__enlarge"
              ref={index === current ? enlargeButton : undefined}
              onClick={() => setExpanded(true)} aria-label={`Ingrandisci immagine: ${item.title}`}>
              <Image src={`/images/servizi/${PHOTOS[index][0]}.webp`} alt={PHOTOS[index][1]}
                width={1280} height={720} priority={index === 0}
                sizes="(max-width: 699px) 100vw, 48vw" />
              <span><Expand size={15} aria-hidden="true" /> Ingrandisci</span>
            </button>
            <figcaption><span>{item.number} / 05</span>{item.detail}</figcaption>
          </figure>
          <div className="service-desk__information">
            <div className="service-desk__heading">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <dl className="service-desk__facts">
              {item.facts.map(fact => <div key={fact.title}><dt>{fact.title}</dt><dd>{fact.text}</dd></div>)}
            </dl>
            <div className="service-desk__bottom">
              {item.note && <p>{item.note}</p>}
              <Link href={`/preventivo?servizio=${item.id}`}>Parliamo del tuo progetto <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      ))}

      <dialog className="service-photo" ref={lightbox} aria-label={`Immagine ${SERVICES[current].title}`}
        onClose={() => { setExpanded(false); enlargeButton.current?.focus({ preventScroll: true }); }}>
        {expanded && <>
          <div className="service-photo__top"><span>{SERVICES[current].title}</span>
            <button type="button" onClick={() => lightbox.current.close()} aria-label="Chiudi immagine"><X size={22} /></button>
          </div>
          <Image src={`/images/servizi/${PHOTOS[current][0]}.webp`} alt={PHOTOS[current][1]}
            width={1280} height={720} sizes="90vw" />
        </>}
      </dialog>
    </section>
  );
}
