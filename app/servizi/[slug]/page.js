import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/content';
import { SERVICE_ROUTES } from '@/lib/service-routes';
import { PROJECTS } from '@/lib/projects';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import '../service-detail.css';
export const dynamicParams = false;
export function generateStaticParams(){return SERVICE_ROUTES.map(({slug})=>({slug}));}
export async function generateMetadata({params}){const {slug}=await params;if(!SERVICE_ROUTES.some(s=>s.slug===slug))return {};return pageMetadata('/servizi/'+slug);}
export default async function ServicePage({params}){
 const {slug}=await params;const route=SERVICE_ROUTES.find(s=>s.slug===slug);if(!route)notFound();
 const index=SERVICE_ROUTES.indexOf(route);const service=SERVICES.find(s=>s.id===route.id);
 const photos=['stampa','grande-formato','allestimenti','wrapping','gadget'];
 const categories=['Stampa','Allestimenti','Allestimenti','Vetrofanie','Gadget'];
 const related=PROJECTS.filter(p=>p.category===categories[index]).slice(0,3);
 const breadcrumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:SITE_URL+'/'},{name:'Servizi',item:SITE_URL+'/servizi'},{name:route.title,item:SITE_URL+'/servizi/'+slug}].map((p,i)=>({'@type':'ListItem',position:i+1,...p}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs).replace(/</g,'\u003c')}}/>
 <section className="page-opening shell"><div className="page-opening__eyebrow"><Link href="/servizi">SERVIZI</Link></div><div className="page-opening__grid"><h1>{route.title}</h1><p>{service.description}</p></div></section>
 <article className="shell service-detail"><div className="service-detail__grid"><Image src={'/images/servizi/'+photos[index]+'-sede-v4.webp'} alt={service.title+' nel laboratorio RAIA'} width={1280} height={720} sizes="(max-width: 760px) 100vw, 50vw"/><div><h2>{service.detail}</h2><p>{service.short}</p>{service.facts.map(f=><section key={f.title}><h3>{f.title}</h3><p>{f.text}</p></section>)}</div></div>
 <section><h2>Prepariamo il tuo progetto</h2><p>Per valutare supporti, lavorazioni e preventivo, indicaci quantità, dimensioni, destinazione d’uso e scadenza desiderata. Puoi allegare un file o condividere un link ai materiali. La fattibilità e i tempi vengono definiti dopo la verifica della richiesta.</p><Link className="service-detail__cta" href={'/preventivo?servizio='+service.id}>Richiedi un preventivo →</Link></section>
 <section><h2>Domande utili</h2><details><summary>Quali informazioni servono per un preventivo?</summary><p>Descrivi il risultato che cerchi, le dimensioni, la quantità e dove sarà utilizzato. Se hai già una grafica o fotografie del supporto, condividile nella richiesta.</p></details><details><summary>Posso inviare file di riferimento?</summary><p>Sì. Il modulo accetta un allegato fino a 8 MB o un link esterno ai materiali. I file caricati sul sito sono disponibili a RAIA tramite un link riservato per 7 giorni.</p></details><details><summary>Come vengono stabiliti materiali e tempi?</summary><p>Dipendono dal supporto, dalle lavorazioni e dalle quantità. Indica la scadenza desiderata: RAIA valuterà la richiesta prima di confermare la proposta.</p></details></section>
 <section><h2>Alcuni lavori realizzati</h2><div className="service-detail__related">{related.map(p=><Link href="/progetti" key={p.id}><Image src={p.image} alt={p.alt} width={480} height={320} sizes="(max-width:760px) 90vw, 30vw"/><strong>{p.title}</strong><span>{p.client}</span></Link>)}</div></section>
 <nav aria-label="Altri servizi">{SERVICE_ROUTES.filter(s=>s.id!==service.id).map(s=><Link key={s.slug} href={'/servizi/'+s.slug}>{s.title}</Link>)}</nav>
 </article></>;
}
