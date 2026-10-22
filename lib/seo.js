export const SITE_URL='https://www.raiaweb.it';
// Enable only on the final public deployment; preview deployments stay excluded.
export const INDEXABLE=process.env.SEO_INDEXABLE==='true' && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV==='production');
export const PAGES={
 '/':['Tipografia e stampa a Guidonia Montecelio | RAIA','RAIA: stampa libri e cataloghi, grande formato, insegne, allestimenti, wrapping e gadget personalizzati a Guidonia Montecelio, Roma. Scopri i nostri lavori.'],
 '/servizi':['Stampa, insegne, wrapping e gadget a Guidonia | RAIA','Scopri i servizi RAIA: tipografia, stampa in grande formato, allestimenti, car wrapping e gadget personalizzati. Sede a Guidonia Montecelio, Roma.'],
 '/progetti':['Progetti di stampa, insegne e personalizzazione | RAIA','Esplora i lavori realizzati da RAIA: vetrofanie, insegne, kit stampati, gadget e car wrapping. Fotografie e dettagli dei progetti.'],
 '/chi-siamo':['Tre generazioni nella stampa e comunicazione | RAIA','Conosci RAIA a Guidonia Montecelio: tre generazioni di esperienza nella stampa e nella comunicazione, dalle produzioni editoriali agli allestimenti.'],
 '/contatti':['Contatti e indirizzo a Guidonia Montecelio | RAIA','Contatta RAIA: Via Bruno Pontecorvo 46, Guidonia Montecelio (Roma). Telefono 06 66182286, email info@raiaweb.it. Recapiti e indicazioni stradali.'],
 '/preventivo':['Prepara il tuo progetto di stampa | RAIA','Prepara il brief del tuo progetto di stampa o comunicazione. Per inviare una richiesta e ricevere un preventivo contatta RAIA via email o telefono.'],
 '/privacy':['Informativa privacy | RAIA','Informazioni sul trattamento dei dati personali degli utenti del sito RAIA e sui diritti previsti dal Regolamento UE 2016/679.'],
 '/cookie-policy':['Informativa cookie | RAIA','Informazioni sui cookie e sulle tecnologie utilizzate dal sito RAIA, sulle preferenze del browser e sui servizi di terze parti.']
};
export function pageMetadata(route){const [title,description]=PAGES[route];return {
 title:{absolute:title},description,alternates:{canonical:SITE_URL+route},
 robots:{index:INDEXABLE,follow:true},
 openGraph:{type:'website',locale:'it_IT',siteName:'RAIA',title,description,url:SITE_URL+route,images:[{url:SITE_URL+'/images/social-card.jpg',width:1200,height:630,alt:'RAIA — Stampa e comunicazione'}]},
 twitter:{card:'summary_large_image',title,description,images:[SITE_URL+'/images/social-card.jpg']}
};}
