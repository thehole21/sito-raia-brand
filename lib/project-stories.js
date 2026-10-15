/**
 * RAIA / Project stories
 * Foto disponibili: l'immagine del lavoro finale già pubblicata su raiaweb.it.
 * Per aggiungere foto reali di ciascuna fase, completa l'oggetto GALLERIES.
 * Lascia null se una fase non è disponibile: NON vengono usate foto inventate.
 *
 * Copia le immagini in public/projects/<id>/ (JPG, PNG o WEBP), es.:
 * gucci: { before: '/projects/gucci/01-prima.webp', ... }
 */
export const PROJECT_STEPS = [
  { id: 'before', number: '01', short: 'Prima', title: 'Il punto di partenza', hint: 'Fotografia iniziale o del luogo prima dell’intervento.' },
  { id: 'concept', number: '02', short: 'Idea', title: 'Il progetto prende forma', hint: 'Bozza grafica, proposta visiva o studio preliminare, quando disponibile.' },
  { id: 'render', number: '03', short: 'Render', title: 'La visualizzazione', hint: 'Render o simulazione approvata, quando realizzata.' },
  { id: 'production', number: '04', short: 'Lavorazione', title: 'Dentro la produzione', hint: 'Fasi di stampa, taglio, preparazione o assemblaggio.' },
  { id: 'detail', number: '05', short: 'Dettagli', title: 'Finiture e applicazione', hint: 'Dettaglio ravvicinato, controllo qualità oppure posa.' },
  { id: 'final', number: '06', short: 'Finale', title: 'Il risultato', hint: 'Il progetto realizzato.' },
];

// Qui inserire SOLO foto reali disponibili e autorizzate.
// La foto della fase Finale è già recuperata dal contenuto originale del sito.
export const PROJECT_GALLERIES = {
  gucci: {},
  ntt: {},
  caps: {},
  kit: {},
  interior: {},
  wrapping: {},
};

export function getProjectImage(project, stepId) {
  if (stepId === 'final') {
    return PROJECT_GALLERIES[project.id]?.final || project.image;
  }
  return PROJECT_GALLERIES[project.id]?.[stepId] || null;
}
