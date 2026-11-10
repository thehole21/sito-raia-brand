import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import LegalShell from '@/components/legal-shell';
import { COMPANY } from '@/lib/content';
import '../legal.css';
export const metadata = pageMetadata('/privacy');
const sections = [
  {id:'titolare',title:'Titolare e contatti',content:<>
    <p>Il titolare del trattamento è <strong>{COMPANY.name}</strong>, P. IVA {COMPANY.vat}, con sede in {COMPANY.address}. Per richieste sulla privacy: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
    <p>Questa informativa riguarda il sito www.raiaweb.it. Le piattaforme esterne raggiunte tramite collegamenti hanno proprie informative.</p>
  </>},
  {id:'navigazione',title:'Navigazione e sicurezza',content:<>
    <p>Il server tratta indirizzo IP, data e ora, risorse richieste, esito delle richieste e informazioni tecniche del browser per erogare il sito, prevenire abusi e diagnosticare errori. La base giuridica è il legittimo interesse alla gestione e sicurezza del servizio (art. 6, par. 1, lett. f, GDPR), oltre agli eventuali obblighi di legge.</p>
    <p>Il sito è ospitato su un VPS Aruba. I log tecnici sono accessibili solo agli incaricati della gestione e conservati per un periodo limitato alle esigenze operative e di sicurezza; in caso di incidenti possono essere conservati per gli accertamenti necessari.</p>
  </>},
  {id:'richieste',title:'Contatti e preventivi',content:<>
    <p>Quando invii il modulo preventivo, trattiamo nome, email, telefono e azienda se indicati, servizio richiesto, descrizione del progetto, tempistiche ed eventuale link ai file. Servono a rispondere alla richiesta e preparare un preventivo: la base giuridica è l’esecuzione di misure precontrattuali richieste da te (art. 6, par. 1, lett. b, GDPR). Lo stesso vale per richieste spontanee via email o telefono.</p>
    <p>I campi obbligatori sono indicati nel modulo; senza tali informazioni non possiamo gestire la richiesta. Non inviare dati particolari o documenti non necessari. Puoi allegare un file fino a 8 MB e/o condividere un link ai materiali. Il file è conservato sul VPS RAIA e reso disponibile attraverso un indirizzo riservato, non indicizzabile, che scade dopo 7 giorni. I file scaduti vengono rimossi con una procedura giornaliera. Non inviare materiali di cui non hai diritto a disporre.</p>
    <p>Per inoltrare il modulo via email utilizziamo <strong>Web3Forms, servizio di Web3Creative</strong>, che tratta i dati per nostro conto e utilizza servizi infrastrutturali e antispam. Il servizio opera dall’India e può trattare dati fuori dallo Spazio Economico Europeo; le garanzie, incluse le clausole contrattuali standard, sono descritte nel relativo <a href="https://web3forms.com/dpa" target="_blank" rel="noopener noreferrer">accordo sul trattamento</a> e nella <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
    <p>Le richieste sono conservate per il tempo necessario alla risposta e agli eventuali rapporti contrattuali, tenendo conto degli obblighi di legge e della tutela dei diritti. Web3Forms dichiara una conservazione massima delle submission di tre anni, salvo cancellazione anticipata o un termine inferiore configurato nel servizio. L’invio del modulo non iscrive a newsletter o comunicazioni promozionali.</p>
  </>},
  {id:'statistiche',title:'Statistiche facoltative',content:<>
    <p>Solo dopo una scelta positiva nel pannello privacy attiviamo <strong>Umami</strong>, ospitato sul nostro VPS Aruba, per misurare visite, pagine consultate, siti di provenienza, dispositivo e area geografica approssimativa. La base giuridica è il consenso (art. 6, par. 1, lett. a, GDPR), revocabile dal collegamento “Preferenze cookie” nel footer.</p>
    <p>Non usiamo Google Analytics, pubblicità personalizzata, registrazioni delle sessioni o identificativi nominativi dei visitatori. Umami non installa cookie di tracciamento; utilizza identificativi pseudonimi con rotazione giornaliera. Non inviamo contenuti dei moduli, parametri o frammenti degli URL. Le richieste di non tracciamento del browser sono rispettate.</p>
    <p>I dati statistici dettagliati sono conservati per un massimo di tredici mesi e poi eliminati automaticamente. Le preferenze del pannello sono memorizzate localmente per 180 giorni, senza essere usate per profilazione.</p>
  </>},
  {id:'esterni',title:'Mappe e servizi esterni',content:<>
    <p>Google Maps viene caricato soltanto premendo il pulsante dedicato nella pagina Contatti. Prima di quel clic non viene caricata la mappa. Attivandola, il browser comunica dati tecnici a Google, che può impiegare cookie e trattare dati anche fuori dallo SEE secondo la propria <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener noreferrer">informativa privacy</a>.</p>
    <p>I collegamenti ai social e alle mappe esterne aprono i relativi servizi solo quando li selezioni. Consulta la <Link href="/cookie-policy">Cookie Policy</Link> per i dettagli sulle preferenze.</p>
  </>},
  {id:'destinatari',title:'Accesso ai dati e diritti',content:<>
    <p>I dati possono essere trattati dal personale autorizzato RAIA e dai fornitori tecnici necessari al servizio, secondo i rispettivi ruoli e accordi. Non sono venduti. Non vengono adottate decisioni esclusivamente automatizzate con effetti giuridici o analogamente significativi.</p>
    <p>Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opporti al trattamento. Puoi revocare il consenso senza pregiudicare la liceità del trattamento precedente alla revoca. Scrivi a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Puoi inoltre presentare reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p>
  </>},
];
export default function PrivacyPage(){return <LegalShell kind="PRIVACY" title="I tuoi dati." accent="La nostra responsabilità." description="Come trattiamo le informazioni durante la navigazione e quando ci invii una richiesta." sections={sections} updated="10 novembre 2026" sibling={{href:'/cookie-policy',label:'Leggi la Cookie Policy'}}/>;}
