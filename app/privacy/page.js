import Link from 'next/link';
import LegalShell from '@/components/legal-shell';
import { COMPANY } from '@/lib/content';
import '../legal.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Informazioni sul trattamento dei dati personali degli utenti del sito RAIA srl ai sensi del Regolamento UE 2016/679.',
};

const sections = [
  {
    id: 'titolare', title: 'Titolare del trattamento',
    content: <>
      <p>Il titolare del trattamento dei dati personali è <strong>{COMPANY.name}</strong> (P. IVA {COMPANY.vat}).</p>
      <p><strong>Recapiti:</strong> {COMPANY.address}. Per informazioni o richieste relative alla privacy: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · <a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a>.</p>
      <p>Le informazioni si riferiscono alla navigazione di questo sito, non ai trattamenti effettuati da eventuali siti esterni raggiungibili tramite collegamenti.</p>
    </>
  },
  {
    id: 'dati-finalita', title: 'Dati trattati e finalità',
    content: <>
      <h3>Navigazione e sicurezza</h3>
      <p>Durante la consultazione del sito i sistemi necessari al suo funzionamento possono trattare dati tecnici, quali indirizzo IP, data e ora delle richieste, indirizzi delle risorse richieste, informazioni sul browser o sul dispositivo ed eventuali log diagnostici.</p>
      <p>Queste informazioni sono utilizzate per erogare il sito, garantire sicurezza, prevenire abusi e risolvere problemi tecnici. Le basi giuridiche applicabili sono, secondo il trattamento, il legittimo interesse alla gestione e protezione del sito (art. 6, par. 1, lett. f, GDPR) e gli eventuali obblighi di legge (lett. c).</p>
      <h3>Richieste inviate spontaneamente</h3>
      <p>Quando un visitatore scrive all'indirizzo email pubblicato o contatta RAIA telefonicamente, possono essere trattati nome, recapiti, informazioni aziendali e contenuti della richiesta per rispondere e valutare eventuali progetti o preventivi. La base giuridica è l'esecuzione di misure precontrattuali richieste dall'interessato (art. 6, par. 1, lett. b, GDPR) e, quando pertinente, il legittimo interesse a gestire le comunicazioni.</p>
      <h3>Modulo preventivo e Studio Anteprime</h3>
      <p>Nella configurazione attuale il modulo preventivo è una <strong>dimostrazione grafica</strong>: genera un riepilogo nel browser ma non invia automaticamente a RAIA i dati compilati né gli allegati selezionati.</p>
      <p>Lo Studio Anteprime consente di scegliere un supporto e di inserire un logo e dei testi: il componente attuale gestisce questi contenuti nel browser del visitatore, senza una funzione di caricamento dei file su un server RAIA. Non inviare dati personali non necessari nelle immagini o nei testi utilizzati.</p>
      <p>Prima dell'attivazione di un invio effettivo dei preventivi, dell'archiviazione dei progetti o di altri servizi online, questa informativa sarà integrata con finalità, destinatari e tempi di conservazione pertinenti.</p>
    </>
  },
  {
    id: 'fornitori', title: 'Servizi esterni e destinatari',
    content: <>
      <p>Per la pubblicazione e la gestione tecnica del sito possono essere coinvolti fornitori di hosting, manutenzione e infrastruttura, autorizzati a trattare dati nella misura necessaria all'erogazione dei servizi. La versione dimostrativa è predisposta per l'hosting su <strong>Vercel</strong>; la configurazione del servizio e i ruoli privacy dei fornitori devono essere confermati prima della messa in produzione.</p>
      <p>Alcune immagini dei lavori RAIA sono caricate da <strong>raiaweb.it</strong>, mentre la pagina Contatti incorpora una <strong>mappa di Google Maps</strong>. Quando il browser carica queste risorse può comunicare ai relativi fornitori dati tecnici, come l'indirizzo IP e informazioni di navigazione. Per dettagli sui cookie e sugli strumenti esterni consulta la <Link href="/cookie-policy">Cookie Policy</Link>.</p>
      <p>I collegamenti a Facebook, Instagram e LinkedIn rimandano a siti esterni: la loro consultazione è soggetta alle informative dei rispettivi gestori.</p>
    </>
  },
  {
    id: 'trasferimenti', title: 'Trasferimenti fuori dallo SEE',
    content: <>
      <p>Alcuni fornitori tecnologici possono operare anche al di fuori dello Spazio Economico Europeo. L'eventuale trasferimento di dati personali richiede una base valida ai sensi degli artt. 44 e seguenti del GDPR, come una decisione di adeguatezza applicabile o appropriate garanzie contrattuali.</p>
      <p>Prima della pubblicazione definitiva RAIA dovrà verificare i fornitori effettivamente utilizzati, i paesi coinvolti e le garanzie previste dai relativi accordi.</p>
    </>
  },
  {
    id: 'conservazione', title: 'Conservazione dei dati',
    content: <>
      <p>I dati tecnici vengono conservati secondo le necessità di sicurezza, diagnostica e funzionamento del sito e le impostazioni del servizio di hosting. I dati ricevuti tramite email o telefono vengono conservati per il tempo necessario a gestire la richiesta e, quando applicabili, gli obblighi di legge o la tutela dei diritti delle parti.</p>
      <p>La durata esatta o i criteri dettagliati di conservazione devono essere verificati con RAIA e con i fornitori prima della pubblicazione definitiva. Il modulo dimostrativo e l'editor anteprime attuale non prevedono un archivio server dei dati inseriti nel browser.</p>
    </>
  },
  {
    id: 'conferimento', title: 'Conferimento dei dati',
    content: <>
      <p>I dati tecnici strettamente necessari alla navigazione sono trattati per consentire il funzionamento del servizio. Fornire nome, email e dettagli di un progetto quando si contatta RAIA è facoltativo, ma senza gli elementi necessari potrebbe non essere possibile rispondere o preparare un preventivo.</p>
      <p>Non sono previste, nel codice applicativo attuale, decisioni esclusivamente automatizzate che producano effetti giuridici o analogamente significativi per il visitatore, né sistemi pubblicitari di profilazione configurati da RAIA.</p>
    </>
  },
  {
    id: 'diritti', title: 'I tuoi diritti',
    content: <>
      <p>Nei casi previsti dal GDPR puoi chiedere accesso ai tuoi dati, rettifica, cancellazione, limitazione del trattamento, portabilità, oppure opporti al trattamento. Se un trattamento si fonda sul consenso, puoi revocarlo in qualsiasi momento senza pregiudicare la liceità del trattamento precedente alla revoca.</p>
      <p>Per esercitare i diritti puoi scrivere a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Hai inoltre diritto a presentare un reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p>
    </>
  },
  {
    id: 'aggiornamenti', title: 'Aggiornamenti dell’informativa',
    content: <>
      <p>RAIA può aggiornare questa informativa quando cambiano funzionalità, fornitori o modalità di trattamento. L'ultima revisione è indicata in alto. Eventuali nuovi strumenti di analisi, moduli di invio, sistemi di gestione delle anteprime o servizi di marketing saranno descritti <strong>prima della loro attivazione</strong>, con le misure e i consensi eventualmente necessari.</p>
    </>
  },
];

export default function PrivacyPage() {
  return <LegalShell
    kind="PRIVACY"
    title="I tuoi dati."
    accent="La nostra responsabilità."
    description="Come vengono trattate le informazioni durante la navigazione e quando entri in contatto con RAIA. Un'informativa chiara, senza formule inutilmente complicate."
    sections={sections}
    updated="10 ottobre 2026"
    sibling={{ href: '/cookie-policy', label: 'Leggi la Cookie Policy' }}
  />;
}
