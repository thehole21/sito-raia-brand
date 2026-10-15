import Link from 'next/link';
import LegalShell from '@/components/legal-shell';
import { COMPANY } from '@/lib/content';
import '../legal.css';

export const metadata = {
  title: 'Cookie Policy',
  description: 'Informativa su cookie, risorse esterne e strumenti di tracciamento utilizzati sul sito RAIA srl.',
};

const sections = [
  {
    id: 'cosa-sono', title: 'Cookie e tecnologie simili',
    content: <>
      <p>I cookie sono piccoli file che un sito può memorizzare sul dispositivo dell'utente. Esistono anche tecnologie analoghe, come la memorizzazione locale o altri identificatori. Alcuni strumenti sono necessari al funzionamento tecnico; altri possono servire per statistiche, personalizzazione o pubblicità.</p>
      <p>Le regole applicabili dipendono dalla finalità concreta: per cookie e strumenti strettamente tecnici è necessaria l'informativa, ma di norma non il consenso preventivo; per quelli non tecnici, salvo specifiche eccezioni, è richiesto il consenso prima dell'attivazione.</p>
    </>
  },
  {
    id: 'configurazione', title: 'Configurazione attuale del sito',
    content: <>
      <p>Nel codice realizzato per RAIA non sono stati integrati intenzionalmente Google Analytics, Google Tag Manager, Meta Pixel o sistemi pubblicitari di profilazione. Non è presente al momento un pannello di marketing o un sistema di raccolta del consenso destinato a tali strumenti.</p>
      <p>Il sito può impiegare funzionalità tecniche necessarie alla sicurezza, alla navigazione e alla distribuzione dei contenuti attraverso l'hosting. La presenza, i nomi, le scadenze e le finalità degli eventuali identificatori devono essere verificati sulla versione effettivamente pubblicata, in particolare dopo l'attivazione di nuovi servizi.</p>
      <div className="legal-page__note"><strong>Nota sulla configurazione</strong><span>Questa pagina descrive il progetto nella sua configurazione attualmente conosciuta. Non costituisce un elenco certificato di tutti i cookie installati dal browser: la verifica tecnica andrà eseguita sul dominio definitivo.</span></div>
    </>
  },
  {
    id: 'mappe', title: 'Google Maps e contenuti esterni',
    content: <>
      <p>La pagina <Link href="/contatti">Contatti</Link> include una mappa incorporata di Google Maps. Quando viene caricata, il browser può comunicare con i server Google e il servizio può utilizzare cookie o altre tecnologie secondo le proprie regole. Consulta le <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener noreferrer">informazioni sulla privacy di Google</a>.</p>
      <p>La mappa è attualmente incorporata nella pagina: il caricamento differito non equivale da solo a un consenso. Prima della pubblicazione ufficiale occorre verificare il comportamento effettivo e, se necessario, attivare Google Maps soltanto dopo una scelta esplicita del visitatore.</p>
      <p>Alcune fotografie sono recuperate dal sito <strong>raiaweb.it</strong>. I collegamenti ai profili social aprono invece piattaforme esterne soltanto quando vengono selezionati.</p>
    </>
  },
  {
    id: 'consenso', title: 'Consenso e preferenze',
    content: <>
      <p>Al momento non è configurato un sistema RAIA di profilazione pubblicitaria per cui raccogliere una scelta di marketing. Se verranno introdotti cookie o strumenti non tecnici, sarà necessario presentarne prima le finalità e, nei casi previsti dalla normativa, ottenere il consenso con la possibilità di rifiutare e modificare la scelta.</p>
      <p>La pubblicazione di questa pagina non abilita né sostituisce un sistema di gestione del consenso. Prima del lancio occorre valutare in particolare il caricamento della mappa incorporata.</p>
    </>
  },
  {
    id: 'gestione-browser', title: 'Gestire i cookie nel browser',
    content: <>
      <p>È possibile controllare, cancellare o bloccare i cookie dalle impostazioni del proprio browser. La disabilitazione di cookie tecnici può compromettere alcune funzionalità. Le impostazioni del browser non sostituiscono le scelte di consenso che il sito deve eventualmente offrire per i tracciamenti non tecnici.</p>
      <p>Per maggiori informazioni consulta le <a href="https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876" target="_blank" rel="noopener noreferrer">linee guida sui cookie del Garante Privacy</a>.</p>
    </>
  },
  {
    id: 'aggiornamenti', title: 'Aggiornamenti e contatti',
    content: <>
      <p>La presente informativa sarà aggiornata quando saranno attivati nuovi strumenti, anche di analytics o marketing, o quando cambieranno servizi esterni, scadenze e categorie di cookie. La versione effettivamente pubblicata sarà verificata prima del lancio.</p>
      <p>Per informazioni contatta <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> oppure consulta la <Link href="/privacy">Privacy Policy</Link>.</p>
    </>
  },
];

export default function CookiePolicyPage() {
  return <LegalShell
    kind="COOKIE"
    title="Trasparenza,"
    accent="anche online."
    description="Quali strumenti tecnici utilizza il sito e cosa cambia quando carichi una mappa o visiti un servizio esterno."
    sections={sections}
    updated="10 ottobre 2026"
    sibling={{ href: '/privacy', label: 'Leggi la Privacy Policy' }}
  />;
}
