'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { CLIENTS } from '@/lib/clients';
import logoLayout from '@/lib/client-logo-layout.json';
import './clients-marquee-fix.css';

function ClientTile({ client, onClick, duplicate = false }) {
  const layout = logoLayout[client.name];
  return (
    <button
      type="button"
      className="clients-marquee__tile"
      aria-label={`Visualizza le collaborazioni, a partire da ${client.name}`}
      tabIndex={0}
      onClick={onClick}
    >
      {/* Immagini ufficiali di RAIA; non sono loghi generati o stock. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <span className="clients-marquee__artwork" style={{ '--logo-width': layout.width + 'px', '--logo-height': layout.height + 'px' }}>
        <img src={client.src} alt={duplicate ? '' : client.name} width="180" height="120" loading="lazy" decoding="async" style={{ width: layout.imageWidth + '%', height: layout.imageHeight + '%', left: layout.left + '%', top: layout.top + '%' }} />
      </span>
    </button>
  );
}

export default function ClientsMarquee() {
  const dialogRef = useRef(null);
  const allButtonRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Blocca realmente lo scroll della pagina sotto il popup.
  // Il position:fixed sul body copre anche Safari/iOS; alla chiusura
  // ripristina posizione ed eventuali stili preesistenti.
  useEffect(() => {
    if (!isOpen) return undefined;
    const body = document.body;
    const root = document.documentElement;
    const y = window.scrollY;
    const original = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      rootOverflow: root.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';

    return () => {
      body.style.position = original.position;
      body.style.top = original.top;
      body.style.left = original.left;
      body.style.right = original.right;
      body.style.width = original.width;
      body.style.overflow = original.overflow;
      root.style.overflow = original.rootOverflow;
      window.scrollTo(0, y);
    };
  }, [isOpen]);

  function openClients(clientName = null) {
    setSelected(clientName);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  }

  function closeClients() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setSelected(null);
    setIsOpen(false);
    // La selezione non deve lasciare un logo del carosello focalizzato:
    // la vecchia regola :focus-within avrebbe fermato l'animazione.
    requestAnimationFrame(() => {
      allButtonRef.current?.focus({ preventScroll: true });
    });
  }

  return (
    <section className="clients-section" aria-labelledby="clients-heading">
      <div className="shell clients-section__heading">
        <div>
          <span className="section-overline">COLLABORAZIONI</span>
          <h2 id="clients-heading">La fiducia, <em>nei fatti.</em></h2>
        </div>
        <button ref={allButtonRef} className="clients-section__all" type="button" onClick={() => openClients()}>
          Tutte le collaborazioni <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
      <div className="clients-marquee" aria-label="Loghi delle realtà con cui RAIA ha lavorato">
        <div className="clients-marquee__rail">
          <div className="clients-marquee__group">
            {CLIENTS.map(client => <ClientTile client={client} key={client.name} onClick={() => openClients(client.name)} />)}
          </div>
          <div className="clients-marquee__group">
            {CLIENTS.map(client => <ClientTile duplicate client={client} key={`${client.name}-copy`} onClick={() => openClients(client.name)} />)}
          </div>
        </div>
      </div>
      <div className="shell clients-section__hint">Passa sui loghi per fermare lo scorrimento. Selezionane uno per vedere tutte le collaborazioni.</div>

      <dialog
        ref={dialogRef}
        className="clients-dialog"
        aria-labelledby="clients-dialog-title"
        onClose={handleDialogClose}
        onClick={event => { if (event.target === event.currentTarget) closeClients(); }}
      >
        <div className="clients-dialog__panel">
          <header className="clients-dialog__header">
            <div><span className="section-overline">RAIA / COLLABORAZIONI</span><h2 id="clients-dialog-title">Le realtà con cui <em>abbiamo lavorato.</em></h2></div>
            <button className="clients-dialog__close" type="button" onClick={closeClients} aria-label="Chiudi elenco collaborazioni"><X size={23} strokeWidth={1.5} aria-hidden="true" /></button>
          </header>
          <div className="clients-dialog__grid" role="group" aria-label="Seleziona un logo per evidenziarlo">
            {CLIENTS.map(client => (
              <button
                className={`clients-dialog__logo${selected === client.name ? ' is-selected' : ''}`}
                key={client.name}
                type="button"
                aria-label={`Evidenzia ${client.name}`}
                aria-pressed={selected === client.name}
                onClick={() => setSelected(old => old === client.name ? null : client.name)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={client.src} alt={client.name} width="180" height="120" loading="lazy" decoding="async" />
                <span className="clients-dialog__name">{client.name}</span>
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </section>
  );
}
