export const SITE_URL='https://www.raiaweb.it';
// Vercel previews stay excluded, even when they inherit production variables.
// Other staging hosts can explicitly opt out with SEO_INDEXABLE=false.
export const INDEXABLE = process.env.SEO_INDEXABLE !== 'false' &&
  !process.env.VERCEL_ENV && process.env.NODE_ENV === 'production';
import { SERVICE_ROUTES } from './service-routes.js';
export const PAGES={
 '/':['Tipografia, stampa e comunicazione | RAIA','RAIA: stampa libri e cataloghi, grande formato, insegne, allestimenti, wrapping e gadget personalizzati. Dalla progettazione alla realizzazione. Scopri i nostri lavori.'],
 '/servizi':['Stampa, insegne, wrapping e gadget a Guidonia | RAIA','Scopri i servizi RAIA: tipografia, stampa in grande formato, allestimenti, car wrapping e gadget personalizzati. Sede a Guidonia Montecelio, Roma.'],
 '/progetti':['Progetti di stampa, insegne e personalizzazione | RAIA','Esplora i lavori realizzati da RAIA: vetrofanie, insegne, kit stampati, gadget e car wrapping. Fotografie e dettagli dei progetti.'],
 '/chi-siamo':['Tre generazioni nella stampa e comunicazione | RAIA','Conosci RAIA a Guidonia Montecelio: tre generazioni di esperienza nella stampa e nella comunicazione, dalle produzioni editoriali agli allestimenti.'],
 '/contatti':['Contatti e indirizzo a Guidonia Montecelio | RAIA','Contatta RAIA: Via Bruno Pontecorvo 46, Guidonia Montecelio (Roma). Telefono 06 66182286, email info@raiaweb.it. Recapiti e indicazioni stradali.'],
 '/preventivo':['Richiedi un preventivo di stampa e comunicazione | RAIA','Richiedi un preventivo a RAIA per stampa, insegne, allestimenti, wrapping e gadget. Descrivi il progetto e condividi file o link dal modulo online.'],
 '/privacy':['Informativa privacy | RAIA','Informazioni sul trattamento dei dati personali degli utenti del sito RAIA e sui diritti previsti dal Regolamento UE 2016/679.'],
 '/cookie-policy':['Informativa cookie | RAIA','Informazioni sui cookie e sulle tecnologie utilizzate dal sito RAIA, sulle preferenze del browser e sui servizi di terze parti.']
};
for (const service of SERVICE_ROUTES) PAGES['/servizi/'+service.slug] = [service.title+' | RAIA', service.title+': scopri lavorazioni, applicazioni e informazioni per richiedere un preventivo a RAIA. Sede a Guidonia Montecelio, Roma.'];
export function pageMetadata(route){const [title,description]=PAGES[route];return {
 title:{absolute:title},description,alternates:{canonical:SITE_URL+route},
 robots:{index:INDEXABLE,follow:true},
 openGraph:{type:'website',locale:'it_IT',siteName:'RAIA',title,description,url:SITE_URL+route,images:[{url:SITE_URL+'/images/social-card.jpg',width:1200,height:630,alt:'RAIA — Stampa e comunicazione'}]},
 twitter:{card:'summary_large_image',title,description,images:[SITE_URL+'/images/social-card.jpg']}
};}
