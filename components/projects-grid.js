'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight, ArrowLeft, ArrowRight, Check,
  X,
} from 'lucide-react';
import { PROJECTS } from '@/lib/projects';
import { getProjectSteps, getProjectImage } from '@/lib/project-stories';

const CATEGORIES = ['Tutti', 'Vetrofanie', 'Allestimenti', 'Gadget', 'Stampa', 'Wrapping'];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState('Tutti');
  const [spotlightId, setSpotlightId] = useState('gucci');
  const reelRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  const visible = useMemo(
    () => filter === 'Tutti' ? PROJECTS : PROJECTS.filter((project) => project.category === filter),
    [filter],
  );
  const featured = visible.find((project) => project.id === spotlightId) || visible[0] || null;
  const featuredPosition = Math.max(0, visible.findIndex((project) => project.id === featured?.id));
  const featuredSteps = getProjectSteps(featured);
  const featuredAvailableCount = featuredSteps.length;

  function chooseFilter(category) {
    setFilter(category);
    const next = category === 'Tutti'
      ? PROJECTS[0]
      : PROJECTS.find((project) => project.category === category);
    setSpotlightId(next?.id ?? null);
  }

  function stepSpotlight(delta) {
    if (!visible.length) return;
    const nextIndex = (featuredPosition + delta + visible.length) % visible.length;
    setSpotlightId(visible[nextIndex].id);
  }

  useEffect(() => {
    const reel = reelRef.current;
    const selectedButton = reel?.querySelector('[data-selected="true"]');
    if (!reel || !selectedButton) return;
    const left = reel.scrollLeft + selectedButton.getBoundingClientRect().left - reel.getBoundingClientRect().left - 12;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reel.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  }, [spotlightId, filter]);

  const selected = PROJECTS.find((project) => project.id === selectedId) || null;
  const selectedSteps = getProjectSteps(selected);
  const step = selectedSteps[stepIndex] || selectedSteps[0];
  const currentImage = step?.image || null;
  const availableCount = selectedSteps.length;

  function openProject(id, element) {
    triggerRef.current = element;
    const project = PROJECTS.find(item => item.id === id);
    setStepIndex(Math.max(0, getProjectSteps(project).findIndex(photo => photo.image === project.image)));
    setSelectedId(id);
  }

  function closeProject() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedId && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => closeRef.current?.focus());
    } else if (!selectedId && dialog.open) {
      dialog.close();
    }
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setStepIndex((prev) => Math.max(0, prev - 1));
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setStepIndex((prev) => Math.min(availableCount - 1, prev + 1));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedId, availableCount]);

  return (
    <section className="shell case-showcase" aria-label="Lavori e percorsi RAIA">
      <div className="case-showcase__top">
        <div className="case-showcase__top-text">
          <span className="case-showcase__eyebrow">ARCHIVIO</span>
          <p>Scegli un lavoro. Poi entra nel suo percorso, dalla prima idea al risultato.</p>
        </div>
        <div className="case-showcase__filters" role="group" aria-label="Filtra i progetti">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => chooseFilter(category)}
              className={category === filter ? 'is-active' : ''}
              aria-pressed={category === filter}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {featured ? (
        <>
          <div className="case-showcase__feature" aria-live="off">
            <button
              type="button"
              className="case-showcase__cover"
              onClick={(event) => openProject(featured.id, event.currentTarget)}
              aria-label={`SCOPRI IL PERCORSO — ${featured.title}`}
            >
              <Image
                key={featured.id}
                src={featured.image}
                alt={featured.alt}
                fill
                priority={featuredPosition === 0}
                fetchPriority={featuredPosition===0?"high":undefined}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 65vw, 65vw"
              />
              <span className="case-showcase__cover-top">LAVORO / {String(featuredPosition + 1).padStart(2, '0')}</span>
              <span className="case-showcase__cover-bottom">
                <span>SCOPRI IL PERCORSO</span>
                <ArrowUpRight size={20} strokeWidth={1.65} aria-hidden="true" />
              </span>
            </button>

            <div className="case-showcase__detail" key={featured.id}>
              <div className="case-showcase__identity">
                <span className="case-showcase__eyebrow">{featured.category} <span aria-hidden="true">/</span> {featured.client}</span>
                <h2>{featured.title}</h2>
                <p>Un progetto RAIA, raccontato attraverso le fotografie della sua realizzazione.</p>
              </div>

              <div className="case-showcase__path">
                <div className="case-showcase__path-top">
                  <strong>Dentro il progetto</strong>
                  <span>{featuredAvailableCount} {featuredAvailableCount === 1 ? 'foto disponibile' : 'foto disponibili'}</span>
                </div>
                <ol className="case-showcase__phases" aria-label="Le foto del progetto" style={{ '--photo-count': featuredSteps.length }}>
                  {featuredSteps.map((item) => (
                    <li
                      key={item.id}
                      className={getProjectImage(featured, item.id) ? 'has-image' : ''}
                    >
                      <span className="case-showcase__phase-dot" aria-hidden="true" />
                      <span>{item.short}</span>
                    </li>
                  ))}
                </ol>
                <p>Fotografie originali del lavoro e delle lavorazioni disponibili.</p>
              </div>

              <button
                type="button"
                className="case-showcase__primary"
                onClick={(event) => openProject(featured.id, event.currentTarget)}
              >
                <span>Apri il diario del lavoro</span>
                <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
              </button>

              <div className="case-showcase__stepper">
                <span><strong>{String(featuredPosition + 1).padStart(2, '0')}</strong> / {String(visible.length).padStart(2, '0')} PROGETTI</span>
                <div className="case-showcase__nav">
                  <button type="button" aria-label="Progetto precedente" onClick={() => stepSpotlight(-1)} disabled={visible.length <= 1}>
                    <ArrowLeft size={19} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Progetto successivo" onClick={() => stepSpotlight(1)} disabled={visible.length <= 1}>
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="case-showcase__reel-head">
            <strong>Scegli un altro lavoro</strong>
            <span>Scorri la selezione <ArrowRight size={15} aria-hidden="true" /></span>
          </div>
          <div ref={reelRef} className="case-showcase__reel" aria-label="Seleziona un progetto da esplorare">
            {visible.map((project, index) => (
              <button
                key={project.id}
                type="button"
                data-selected={featured.id === project.id ? 'true' : 'false'}
                className={`case-showcase__tile ${featured.id === project.id ? 'is-active' : ''}`}
                onClick={() => setSpotlightId(project.id)}
                aria-pressed={featured.id === project.id}
                aria-label={`${String(index + 1).padStart(2, '0')} / ${project.client} ${project.title} — seleziona il progetto`}
              >
                <span className="case-showcase__tile-photo">
                  <Image src={project.image} fill alt="" sizes="220px" />
                </span>
                <span className="case-showcase__tile-meta">
                  <span>{String(index + 1).padStart(2, '0')} / {project.client}</span>
                  <strong>{project.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="case-showcase__empty">Non ci sono lavori in questa categoria.</p>
      )}

      <dialog
        ref={dialogRef}
        className="raia-story"
        aria-label={selected ? `Storia del progetto ${selected.title}` : 'Storia del progetto'}
        onClose={() => {
          setSelectedId(null);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeProject();
        }}
      >
        {selected && (
          <div className="raia-story__content">
            <header className="raia-story__header">
              <div className="raia-story__identity">
                <span className="raia-story__eyebrow">RAIA / DIARIO DI PROGETTO</span>
                <h2>{selected.title}</h2>
                <p>{selected.client} <span aria-hidden="true">/</span> {selected.category}</p>
              </div>
              <button ref={closeRef} className="raia-story__close" type="button" aria-label="Chiudi il progetto" onClick={closeProject}>
                <X size={20} />
              </button>
            </header>

            <div className="raia-story__body">
              <section className="raia-story__viewer" aria-label="Fotografia selezionata">
                <div className="raia-story__photo">
                  <Image
                    key={selected.id + '-' + step.id}
                    src={currentImage}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 75vw"
                  />
                  <span className="raia-story__photo-index">{step.number} / {String(availableCount).padStart(2, '0')} — {step.short.toUpperCase()}</span>
                </div>
              </section>

              <aside className="raia-story__rail" aria-label="Fotografie del progetto">
                <div className="raia-story__rail-top">
                  <span>IL PERCORSO</span>
                  <small>{availableCount} {availableCount === 1 ? 'foto' : 'foto disponibili'}</small>
                </div>
                <ol className="raia-story__steps" style={{ '--photo-count': availableCount }}>
                  {selectedSteps.map((item, index) => {
                    const source = getProjectImage(selected, item.id);
                    const isActive = stepIndex === index;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`raia-story__step ${isActive ? 'is-active' : ''}`}
                          aria-current={isActive ? 'step' : undefined}
                          onClick={() => setStepIndex(index)}
                        >
                          <span className="raia-story__thumb">
                            <Image src={source} alt="" fill sizes="100px" />
                          </span>
                          <span className="raia-story__step-info">
                            <small>{item.number} — {item.short}</small>
                            <strong>{item.title}</strong>
                            <span>Foto originale</span>
                          </span>
                          {source && <Check className="raia-story__step-check" size={15} aria-hidden="true" />}
                        </button>
                      </li>
                    );
                  })}
                </ol>

              </aside>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
