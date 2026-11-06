'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { SERVICES } from '@/lib/content';

function serviceForHash(hash) {
  return SERVICES.find(({ id }, index) => {
    const number = index + 1;
    return [id, `service_${number}`, `elementor-tab-title-568${number}`,
      `elementor-tab-content-568${number}`].includes(hash.slice(1));
  });
}

export default function Servizi() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    function followHash() {
      const item = serviceForHash(window.location.hash);
      if (item) {
        opener.current = document.getElementById(`servizio-${item.id}`);
        setSelected(item);
      } else {
        dialog.current?.close();
      }
    }
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const panel = dialog.current;
    if (!panel.open) panel.showModal();
    panel.scrollTop = 0;
    closeButton.current.focus({ preventScroll: true });
  }, [selected]);

  function openService(item, button) {
    opener.current = button;
    history.replaceState(history.state, '', `#${item.id}`);
    setSelected(item);
  }

  function finishClosing() {
    if (serviceForHash(window.location.hash)) {
      history.replaceState(history.state, '', window.location.pathname + window.location.search);
    }
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }

  return (
    <section className="raia-services" aria-label="Le cinque aree di servizio RAIA">
      <ul className="raia-services__grid">
        {SERVICES.map((item, index) => (
          <li className="raia-services__item" key={item.id}>
            <article className="raia-service">
              <div className="raia-service__image">
                <Image src={item.image} alt={item.alt} fill
                  priority={index === 0}
                  sizes={index < 2 ? '(max-width: 599px) 100vw, 50vw' : '(max-width: 599px) 100vw, (max-width: 959px) 50vw, 33vw'} />
                <span className="raia-service__number" aria-hidden="true">{item.number} / 05</span>
              </div>
              <div className="raia-service__body">
                <h2><button id={`servizio-${item.id}`} type="button" aria-haspopup="dialog"
                  onClick={event => openService(item, event.currentTarget)}>
                  {item.title}
                  <span className="raia-service__arrow" aria-hidden="true"><ArrowUpRight size={21} strokeWidth={1.6} /></span>
                </button></h2>
                <p>{item.short}</p>
                <ul className="raia-service__tags" aria-label="Esempi di lavorazioni">
                  {item.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog className="raia-service-dialog" ref={dialog} aria-labelledby="raia-service-title" onClose={finishClosing}>
        {selected && <>
          <div className="raia-service-dialog__top">
            <span>RAIA / SERVIZI / {selected.number}</span>
            <button ref={closeButton} type="button" aria-label="Chiudi dettaglio"
              onClick={() => dialog.current.close()}><X size={22} strokeWidth={1.6} /></button>
          </div>
          <div className="raia-service-dialog__layout">
            <div className="raia-service-dialog__content">
              <h2 id="raia-service-title">{selected.title}</h2>
              <p className="raia-service-dialog__description">{selected.description}</p>
              <dl className="raia-service-dialog__facts">
                {selected.facts.map(fact => <div key={fact.title}><dt>{fact.title}</dt><dd>{fact.text}</dd></div>)}
              </dl>
              {selected.note && <p className="raia-service-dialog__note">{selected.note}</p>}
              <Link className="raia-service-dialog__quote" href={`/preventivo?servizio=${selected.id}`}>
                Richiedi un preventivo <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <figure className="raia-service-dialog__image">
              <Image src={selected.image} alt={selected.alt} fill sizes="320px" />
              <figcaption>{selected.detail}</figcaption>
            </figure>
          </div>
        </>}
      </dialog>
    </section>
  );
}
