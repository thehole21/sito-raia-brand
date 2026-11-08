'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, FileText, RotateCcw } from 'lucide-react';
import { COMPANY, SERVICES } from '@/lib/content';

const makeInitial = (selectedService) => ({
  name: '', email: '', phone: '', company: '', service: SERVICES.some(s => s.id === selectedService) ? selectedService : '', details: '', timing: '', fileName: ''
});

export default function QuoteForm({ defaultService = '' }) {
  const [values, setValues] = useState(() => makeInitial(defaultService));
  const [summary, setSummary] = useState(false);
  const update = (field, val) => { setValues(v => ({ ...v, [field]: val })); setSummary(false); };
  const required = [values.name.trim(), values.email.trim(), values.service, values.details.trim()];
  const progress = Math.round(required.filter(Boolean).length / required.length * 100);
  function showSummary(event) {
    event.preventDefault();
    setSummary(true);
  }
  return (
    <section className="shell quote-layout">
      <div className="quote-form-shell">
        <div className="quote-form-shell__head"><span><i aria-hidden="true" className="quote-head-dot" /> BRIEF DI PROGETTO</span><span>DEMO · NESSUN INVIO</span></div>
        <form onSubmit={showSummary} className="quote-form">
          <fieldset className="quote-fieldset"><legend><span>01</span> Parliamo di te</legend>
            <div className="form-row"><label>Nome e cognome <sup>*</sup><input name="name" type="text" required autoComplete="name" placeholder="Come ti chiami?" value={values.name} onChange={e => update('name', e.target.value)}/></label><label>Email <sup>*</sup><input name="email" type="email" required autoComplete="email" placeholder="nome@azienda.it" value={values.email} onChange={e => update('email', e.target.value)}/></label></div>
            <div className="form-row"><label>Telefono<input name="phone" type="tel" autoComplete="tel" placeholder="Numero di telefono" value={values.phone} onChange={e => update('phone', e.target.value)}/></label><label>Azienda / brand<input name="company" type="text" autoComplete="organization" placeholder="Facoltativo" value={values.company} onChange={e => update('company', e.target.value)}/></label></div>
          </fieldset>
          <fieldset className="quote-fieldset"><legend><span>02</span> Che cosa vuoi realizzare?</legend>
            <div className="quote-service-options" role="group" aria-label="Seleziona un servizio">
              {SERVICES.map(item => <label key={item.id} className={`quote-service-option ${values.service === item.id ? 'is-selected' : ''}`}><input type="radio" name="service" value={item.id} required checked={values.service === item.id} onChange={() => update('service', item.id)} /><span>{item.title}</span><span className="quote-service-option__check"><Check size={15} strokeWidth={2}/></span></label>)}
            </div>
            <label className="quote-details-label">Raccontaci il progetto <sup>*</sup><textarea required name="details" rows={5} value={values.details} onChange={e => update('details', e.target.value)} placeholder="Che cosa dobbiamo realizzare? Quantità, misure, materiali, destinazione d'uso..."/></label>
            <div className="form-row quote-extra"><label>Tempistiche indicative<select value={values.timing} onChange={e => update('timing', e.target.value)} name="timing"><option value="">Da definire</option><option value="Il prima possibile">Il prima possibile</option><option value="Entro 2 settimane">Entro 2 settimane</option><option value="Entro un mese">Entro un mese</option><option value="Nessuna scadenza precisa">Nessuna scadenza precisa</option></select></label><label>File di riferimento <small>(solo anteprima)</small><input type="file" name="reference" accept=".pdf,.jpg,.jpeg,.png,.webp,.svg,.zip" onChange={e => update('fileName', e.target.files?.[0]?.name || '')}/></label></div>
          </fieldset>
          <div className="quote-form__submit"><div><p>Questo modulo è un prototipo grafico.</p><small>Nessun dato viene trasmesso, memorizzato o inviato a RAIA.</small></div><button type="submit" className="quote-submit"><span>Visualizza il riepilogo</span><span className="quote-submit__arrow"><ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" /></span></button></div>
        </form>
      </div>
      <aside className="quote-side"><div className="quote-side__top"><span className="eyebrow"><span className="little-dot" /> IL TUO BRIEF</span><span>{progress}%</span></div><div className="quote-progress" role="progressbar" aria-label="Completamento del brief" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
        {summary ? <div className="quote-summary" aria-live="polite"><FileText size={26} strokeWidth={1.2}/><h2>Il riepilogo<br /><em>del tuo progetto.</em></h2><dl><dt>Nome</dt><dd>{values.name}</dd><dt>Email</dt><dd>{values.email}</dd>{values.company && <><dt>Azienda</dt><dd>{values.company}</dd></>}{values.phone && <><dt>Telefono</dt><dd>{values.phone}</dd></>}<dt>Servizio</dt><dd>{SERVICES.find(s => s.id === values.service)?.title}</dd><dt>Descrizione</dt><dd className="quote-summary__details">{values.details}</dd>{values.timing && <><dt>Tempistiche</dt><dd>{values.timing}</dd></>}{values.fileName && <><dt>File selezionato</dt><dd>{values.fileName} (non caricato)</dd></>}</dl><button type="button" className="text-reset" onClick={() => setSummary(false)}><RotateCcw size={15}/> Modifica richiesta</button><p className="quote-summary__notice">Solo visualizzazione locale: nessun invio effettuato.</p></div> : <div className="quote-side__content"><span className="quote-side__line"/><h2>Ogni dettaglio<br />conta<span>.</span></h2><p>Descrivi il progetto: quale supporto, quali misure, quante copie o dove avverrà l’installazione. Più dettagli inserisci, più chiaro sarà il tuo brief.</p><div className="quote-side__hint">Materiali, misure, quantità e utilizzo</div></div>}
        <div className="quote-side__footer"><span>PREFERISCI PARLARNE?</span><a href={`mailto:${COMPANY.email}`}>{COMPANY.email} <ArrowUpRight size={17}/></a><a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone} <ArrowUpRight size={17}/></a></div>
      </aside>
    </section>
  );
}
