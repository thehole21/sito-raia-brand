import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import LegalShell from '@/components/legal-shell';
import { CookieSettingsButton } from '@/components/cookie-consent';
import '../legal.css';
export const metadata = pageMetadata('/cookie-policy');
const sections=[
 {id:'strumenti',title:'Strumenti tecnici e preferenze',content:<>
   <p>Il sito utilizza le risorse tecniche necessarie alla navigazione e alla sicurezza. La scelta effettuata nel pannello è salvata nella memoria locale del browser con la chiave <code>raia-consent-v1</code>: contiene versione, scelta e data, senza identificatori pubblicitari. Vale per 180 giorni, poi viene richiesta nuovamente. Non è inviata a servizi pubblicitari.</p>
   <p>Il funzionamento del sito e l’invio di un preventivo non dipendono dall’accettazione delle statistiche.</p>
 </>},
 {id:'statistiche',title:'Statistiche Umami',content:<>
   <p>Le statistiche sono facoltative e disattivate fino alla scelta “Accetta statistiche”. Utilizziamo Umami sul nostro VPS Aruba per analizzare pagine, visite, provenienza e tipologia di dispositivo. Non installa cookie di tracciamento e non condivide i dati con Google Analytics o reti pubblicitarie.</p>
   <p>Gli identificativi statistici pseudonimi ruotano ogni giorno. Non raccogliamo i dati compilati nei moduli, parametri degli indirizzi, registrazioni delle visite o profili nominativi. I dati dettagliati vengono eliminati dopo tredici mesi. Rispettiamo Do Not Track e Global Privacy Control quando attivi nel browser.</p>
 </>},
 {id:'scelte',title:'Accettare, rifiutare o cambiare scelta',content:<>
   <p>“Rifiuta” mantiene disattivate le statistiche; “Accetta statistiche” le abilita. I due pulsanti hanno la stessa evidenza. Navigare o scorrere la pagina non equivale ad accettare.</p>
   <p>Puoi riaprire il pannello e revocare il consenso in qualsiasi momento: <CookieSettingsButton />. La revoca interrompe le successive rilevazioni; non rende illecito il trattamento già svolto. La cancellazione della memoria locale del browser elimina anche la preferenza salvata.</p>
 </>},
 {id:'esterni',title:'Google Maps e modulo preventivo',content:<>
   <p>La mappa nella pagina Contatti è bloccata fino al clic su “Carica Google Maps (servizio esterno)”. L’attivazione contatta Google, che può usare propri cookie e strumenti: consulta le <a href="https://policies.google.com/technologies/cookies?hl=it" target="_blank" rel="noopener noreferrer">informazioni Google sui cookie</a>. La scelta sulle statistiche Umami non attiva la mappa.</p>
   <p>Il modulo contatta Web3Forms soltanto quando invii la richiesta. Non incorporiamo widget pubblicitari, Google Tag Manager o strumenti di profilazione. I dettagli dei fornitori sono nella <Link href="/privacy">Privacy Policy</Link>.</p>
 </>},
 {id:'browser',title:'Controlli del browser',content:<>
   <p>Puoi cancellare cookie e memoria locale o bloccarli dalle impostazioni del browser. Alcuni strumenti tecnici possono essere necessari al funzionamento dei servizi. Per informazioni generali consulta le <a href="https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876" target="_blank" rel="noopener noreferrer">linee guida del Garante</a>.</p>
 </>},
];
export default function CookiePolicyPage(){return <LegalShell kind="COOKIE" title="Trasparenza," accent="anche online." description="Strumenti tecnici, statistiche facoltative e preferenze: scegli tu come navigare." sections={sections} updated="10 novembre 2026" sibling={{href:'/privacy',label:'Leggi la Privacy Policy'}}/>;}
