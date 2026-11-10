'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Check, FileText, RotateCcw } from 'lucide-react';
import { COMPANY, SERVICES } from '@/lib/content';

const makeInitial = (selectedService) => ({
  name: '', email: '', phone: '', company: '', service: SERVICES.some(s => s.id === selectedService) ? selectedService : '', details: '', timing: '', referenceLink: ''
});

export default function QuoteForm({ defaultService = '' }) {
  const [values, setValues] = useState(() => makeInitial(defaultService));
  const [summary, setSummary] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const uploadedFile = useRef(null);
  const router = useRouter();
  const successButton = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
  useEffect(() => {
    if (status !== 'sent') return;
    successButton.current?.focus();
    const timer = window.setTimeout(() => router.push('/'), 2000);
    return () => window.clearTimeout(timer);
  }, [status, router]);
  const update = (field, val) => { setValues(v => ({ ...v, [field]: val })); setSummary(false); setStatus('idle'); };
  const required = [values.name.trim(), values.email.trim(), values.service, values.details.trim()];
  const progress = Math.round(required.filter(Boolean).length / required.length * 100);
  async function sendRequest(event) {
    event.preventDefault();
    if (status === 'sending' || status === 'sent') return;
    if (!accessKey) { setError('Per inviare la richiesta contattaci via email: '+COMPANY.email); setStatus('error'); return; }
    if (new FormData(event.currentTarget).get('botcheck')) return;
    setStatus('sending'); setError('');
    const service = SERVICES.find(item => item.id === values.service)?.title || values.service;
    try {
      let attachmentUrl = uploadedFile.current?.url || '';
      if (attachment && !attachmentUrl) {
        const form = new FormData(); form.append('attachment', attachment);
        const upload = await fetch('/api/preventivo/allegati', {method:'POST',body:form,signal:AbortSignal.timeout(60000)});
        const result = await upload.json();
        if (!upload.ok || !result.url) throw new Error(result.error || 'Caricamento allegato non riuscito.');
        uploadedFile.current = result; attachmentUrl = result.url;
      }
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ access_key: accessKey, subject: 'RAIA â€” Richiesta preventivo: '+service,
          from_name: 'Sito RAIA', name: values.name.trim(), email: values.email.trim(),
          Telefono: values.phone.trim(), Azienda: values.company.trim(), Servizio: service,
          Progetto: values.details.trim(), Tempistiche: values.timing || 'Da definire',
          'Link ai file': values.referenceLink.trim() || 'Non indicato',
          'Allegato (link riservato, valido 7 giorni)': attachmentUrl || 'Nessun allegato',
          'Nome allegato': attachment?.name || '', botcheck: '',
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Invio non confermato');
      setStatus('sent'); setSummary(true);
    } catch {
      setStatus('error'); setError('Non siamo riusciti a confermare lâ€™invio. I dati sono ancora qui: riprova oppure scrivici a '+COMPANY.email+'.');
    }
  }
  return (
    <section className="shell quote-layout">
      <div className="quote-form-shell">
        <div className="quote-form-shell__head"><span><i aria-hidden="true" className="quote-head-dot" /> BRIEF DI PROGETTO</span><span>RICHIESTA DI PREVENTIVO</span></div>
        <form onSubmit={sendRequest} className="quote-form">
          <fieldset className="quote-fieldset" disabled={status === 'sending' || status === 'sent'}><legend><span>01</span> Parliamo di te</legend>
            <div className="form-row"><label>Nome e cognome <sup>*</sup><input name="name" type="text" maxLength={120} required autoComplete="name" placeholder="Come ti chiami?" value={values.name} onChange={e => update('name', e.target.value)}/></label><label>Email <sup>*</sup><input name="email" type="email" maxLength={254} required autoComplete="email" placeholder="nome@azienda.it" value={values.email} onChange={e => update('email', e.target.value)}/></label></div>
            <div className="form-row"><label>Telefono<input name="phone" type="tel" autoComplete="tel" placeholder="Numero di telefono" value={values.phone} onChange={e => update('phone', e.target.value)}/></label><label>Azienda / brand<input name="company" type="text" autoComplete="organization" placeholder="Facoltativo" value={values.company} onChange={e => update('company', e.target.value)}/></label></div>
          </fieldset>
          <fieldset className="quote-fieldset" disabled={status === 'sending' || status === 'sent'}><legend><span>02</span> Che cosa vuoi realizzare?</legend>
            <div className="quote-service-options" role="group" aria-label="Seleziona un servizio">
              {SERVICES.map(item => <label key={item.id} className={`quote-service-option ${values.service === item.id ? 'is-selected' : ''}`}><input type="radio" name="service" value={item.id} required checked={values.service === item.id} onChange={() => update('service', item.id)} /><span>{item.title}</span><span className="quote-service-option__check"><Check size={15} strokeWidth={2}/></span></label>)}
            </div>
            <label className="quote-details-label">Raccontaci il progetto <sup>*</sup><textarea required maxLength={8000} name="details" rows={5} value={values.details} onChange={e => update('details', e.target.value)} placeholder="Che cosa dobbiamo realizzare? QuantitÃ , misure, materiali, destinazione d'uso..."/></label>
            <div className="form-row quote-extra"><label>Tempistiche indicative<select value={values.timing} onChange={e => update('timing', e.target.value)} name="timing"><option value="">Da definire</option><option value="Il prima possibile">Il prima possibile</option><option value="Entro 2 settimane">Entro 2 settimane</option><option value="Entro un mese">Entro un mese</option><option value="Nessuna scadenza precisa">Nessuna scadenza precisa</option></select></label><label>Link ai file <small>(facoltativo)</small><input type="url" name="referenceLink" maxLength={2048} placeholder="https://â€¦ (Drive, Dropbox, WeTransfer)" value={values.referenceLink} onChange={e => update('referenceLink', e.target.value)}/></label></div>
            <label className="quote-attachment">Allega un file <small>(facoltativo · massimo 8 MB)</small><input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.webp,.zip" onChange={event => {
              const file=event.target.files?.[0] || null; uploadedFile.current=null;
              if(file && (file.size>8*1024*1024 || !/\.(pdf|jpe?g|png|webp|zip)$/i.test(file.name))){setAttachment(null);event.target.value='';setError('Scegli un PDF, JPG, PNG, WebP o ZIP fino a 8 MB, oppure inserisci un link.');setStatus('error');return;}
              setAttachment(file);setStatus('idle');setError('');
            }}/><small>Il file sarà accessibile a RAIA tramite un link riservato valido 7 giorni. Per file più grandi puoi usare il campo link.</small></label>
          </fieldset>
          <label className="quote-privacy"><input type="checkbox" required disabled={status === 'sending' || status === 'sent'}/> <span>Ho letto lâ€™<Link href="/privacy" target="_blank">informativa privacy</Link> sul trattamento dei dati per rispondere alla richiesta.</span></label>
          <div className="quote-antispam" aria-hidden="true"><label>Non compilare questo campo<input type="text" name="botcheck" tabIndex={-1} autoComplete="off"/></label></div>
          <div className="quote-form__submit"><div><p>La tua richiesta arriva direttamente a RAIA.</p><small>Puoi allegare un file e aggiungere un link ai materiali.</small></div><button type="submit" disabled={status === 'sending' || status === 'sent'} className="quote-submit"><span>{status === 'sending' ? 'Invio in corsoâ€¦' : status === 'sent' ? 'Richiesta inviata' : 'Invia la richiesta'}</span><span className="quote-submit__arrow"><ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" /></span></button></div>
          {status === 'error' && <p className="quote-status quote-status--error" role="alert">{error}</p>}
          {status === 'sent' && <p className="quote-status" role="status">Richiesta inviata correttamente. Ti ricontatteremo ai recapiti indicati.</p>}

        </form>
      </div>
      <aside className="quote-side"><div className="quote-side__top"><span className="eyebrow"><span className="little-dot" /> IL TUO BRIEF</span><span>{progress}%</span></div><div className="quote-progress" role="progressbar" aria-label="Completamento del brief" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
        {summary ? <div className="quote-summary" aria-live="polite"><FileText size={26} strokeWidth={1.2}/><h2>Il riepilogo<br /><em>del tuo progetto.</em></h2><dl><dt>Nome</dt><dd>{values.name}</dd><dt>Email</dt><dd>{values.email}</dd>{values.company && <><dt>Azienda</dt><dd>{values.company}</dd></>}{values.phone && <><dt>Telefono</dt><dd>{values.phone}</dd></>}<dt>Servizio</dt><dd>{SERVICES.find(s => s.id === values.service)?.title}</dd><dt>Descrizione</dt><dd className="quote-summary__details">{values.details}</dd>{values.timing && <><dt>Tempistiche</dt><dd>{values.timing}</dd></>}{values.referenceLink && <><dt>Link ai file</dt><dd>{values.referenceLink}</dd></>}</dl><button type="button" className="text-reset" onClick={() => { setSummary(false); setStatus('idle'); }}><RotateCcw size={15}/> Prepara unâ€™altra richiesta</button><p className="quote-summary__notice">Invio confermato. Conserva una copia dei dettagli se ti serve.</p></div> : <div className="quote-side__content"><span className="quote-side__line"/><h2>Ogni dettaglio<br />conta<span>.</span></h2><p>Descrivi il progetto: quale supporto, quali misure, quante copie o dove avverrÃ  lâ€™installazione. PiÃ¹ dettagli inserisci, piÃ¹ chiaro sarÃ  il tuo brief.</p><div className="quote-side__hint">Materiali, misure, quantitÃ  e utilizzo</div></div>}
        <div className="quote-side__footer"><span>PREFERISCI PARLARNE?</span><a href={`mailto:${COMPANY.email}`}>{COMPANY.email} <ArrowUpRight size={17}/></a><a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone} <ArrowUpRight size={17}/></a></div>
      </aside>
      {status === 'sent' && <div className="quote-success-backdrop"><div className="quote-success" role="dialog" aria-modal="true" aria-labelledby="quote-success-title" aria-describedby="quote-success-description"><span className="quote-success__icon"><Check size={30} strokeWidth={1.6} aria-hidden="true"/></span><h2 id="quote-success-title">Richiesta inviata<span>.</span></h2><p id="quote-success-description">Grazie per averci raccontato la tua idea.<br/>Ti ricontatteremo presto.</p><button ref={successButton} type="button" onClick={() => router.push('/')}>Ritorno alla home tra un momento <ArrowUpRight size={16} aria-hidden="true"/></button></div></div>}
    </section>
  );
}
