import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Monitor, Smartphone, Workflow, Check } from 'lucide-react';
import { makitoDemoEnabled } from '@/lib/makito-demo';
import WebShowcase from '@/components/web-showcase';
import './servizi-web.css';
export const dynamic='force-dynamic';
export const metadata={title:'Siti web e app su misura | RAIA — Anteprima',robots:{index:false,follow:false}};
const solutions=[
 {icon:Monitor,title:'Siti che ti rappresentano.',text:'Dalla prima impressione al primo contatto: siti aziendali, pagine dedicate e cataloghi digitali, progettati intorno alla tua identità.',items:['Design coordinato al tuo brand','Navigazione chiara su ogni schermo','Contenuti e richieste di contatto']},
 {icon:Smartphone,title:'App che semplificano.',text:'La tua idea diventa uno strumento da usare ogni giorno. App e web app per clienti, collaboratori e attività aziendali.',items:['Esperienze pensate per il mobile','Aree riservate e flussi su misura','Interfacce semplici, funzioni utili']},
 {icon:Workflow,title:'Tutto, più connesso.',text:'Cataloghi, moduli e strumenti gestionali: progettiamo collegamenti e automazioni in base alle esigenze della tua attività.',items:['Integrazioni con servizi e API','Percorsi di richiesta e acquisto','Soluzioni definite sul tuo progetto']},
];
export default function WebServicesPage(){
 if(!makitoDemoEnabled()) notFound();
 return <div className="web-services">
  <section className="page-opening shell"><div className="page-opening__eyebrow"><span className="little-dot"/> SERVIZI WEB / SITI & APP</div><div className="page-opening__grid"><h1>La tua idea.<br/><em>Anche online<span>.</span></em></h1><p>Ora RAIA S.R.L. dà forma anche al tuo sito web e alla tua app. La stessa attenzione all’identità, una nuova dimensione per il tuo progetto.</p></div></section>
  <section className="shell web-services__intro" aria-label="Dal brand al digitale"><div><span className="web-services__tag"><i/> NUOVA DIMENSIONE, STESSA IDENTITÀ</span><p>Dal segno alla pagina. Dalla pagina allo schermo.<br/>Un unico filo, il tuo brand.</p></div><Link className="service-action" href="/contatti">Parliamo della tua idea <ArrowUpRight size={17} aria-hidden="true"/></Link></section>
  <div className="shell"><WebShowcase/></div>
  <section id="soluzioni" className="shell web-services__solutions" aria-labelledby="web-solutions-title"><div className="web-services__section-head"><span className="web-services__label">COSA POSSIAMO CREARE</span><h2 id="web-solutions-title">Bello da vedere.<br/><em>Semplice da usare.</em></h2><p>Ogni progetto parte dalle persone che lo useranno. Scegliamo insieme funzioni, contenuti e linguaggio visivo.</p></div><div className="web-services__cards">{solutions.map(({icon:Icon,title,text,items})=><article key={title}><Icon size={25} strokeWidth={1.3} aria-hidden="true"/><h3>{title}</h3><p>{text}</p><ul>{items.map(item=><li key={item}><Check size={13} aria-hidden="true"/>{item}</li>)}</ul></article>)}</div></section>
  <section className="shell web-services__method" aria-labelledby="web-method-title"><div><span className="web-services__label">COME LAVORIAMO</span><h2 id="web-method-title">Dall’idea al primo clic<span>.</span></h2></div><div className="web-services__steps"><article><h3>Ti ascoltiamo</h3><p>Obiettivi, pubblico e funzioni: mettiamo a fuoco ciò che serve davvero.</p></article><article><h3>Gli diamo forma</h3><p>Struttura, stile e prototipo: il progetto prende una direzione concreta.</p></article><article><h3>Lo realizziamo</h3><p>Sviluppo e verifiche sui dispositivi, fino alla preparazione del lancio.</p></article></div></section>
  <section className="shell web-services__closing"><div><span className="web-services__label">IL PROSSIMO PROGETTO È IL TUO</span><h2>Hai un’idea in mente?<br/><em>Portiamola online.</em></h2><p>Un sito per presentarti, un’app per lavorare meglio.<br/>Raccontaci da dove vuoi partire.</p></div><Link className="service-action" href="/contatti">Parliamone, insieme <ArrowUpRight size={17} aria-hidden="true"/></Link></section>
 </div>;
}
