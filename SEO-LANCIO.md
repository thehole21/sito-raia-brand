# Pubblicazione su raiaweb.it

- Impostare SEO_INDEXABLE=true solo nell'ambiente pubblico finale e ricompilare. Fino ad allora le pagine hanno noindex e la sitemap è vuota. Le distribuzioni Vercel di preview restano escluse; gli host *.vercel.app hanno anche X-Robots-Tag: noindex.
- Collegare www.raiaweb.it, HTTPS e redirect 301/308 da raiaweb.it a www.raiaweb.it presso il provider. Non modificare MX, SPF, DKIM e DMARC della posta Aruba.
- Il redirect permanente /galleria → /progetti è incluso. Next normalizza gli slash finali. Prima del cambio completare l'inventario URL da Search Console e dalla sitemap WordPress per individuare eventuali altre pagine indicizzate.
- Verificare HTML pubblico: canonical corretto, robots index,follow, risposta 200, sitemap.xml popolata, robots.txt accessibile, /anteprima 404, /galleria redirect.
- Inviare https://www.raiaweb.it/sitemap.xml alla proprietà esistente di Google Search Console e controllare indicizzazione e 404 dopo il lancio.
- Verificare Rich Results Test e PageSpeed Insights su mobile e desktop sul dominio definitivo. I punteggi di laboratorio non garantiscono posizioni su Google né i Core Web Vitals reali.
- Il modulo preventivo è ancora dimostrativo: non promette invii effettivi. Confermare recapiti e informazioni legali prima del lancio.

## Mappa verificata il 22 ottobre 2026

Fonte: https://www.raiaweb.it/page-sitemap.xml (6 pagine).

| Vecchio indirizzo | Nuova destinazione | Comportamento |
| --- | --- | --- |
| / | / | Mantiene la home |
| /chi-siamo/ | /chi-siamo | Stessa sezione |
| /servizi/ | /servizi | Stessa sezione, nuovi contenuti |
| /contatti/ | /contatti | Stessa sezione |
| /galleria/ | /progetti | Redirect permanente |
| /privacy-policy/ | /privacy | Redirect permanente |

I link #service_1…5 e #elementor-tab-title-5681…5685 aprono la scheda corrispondente. I nuovi link usano l'id leggibile del servizio. Le vecchie sitemap rimandano a /sitemap.xml.

### Foto vecchie e nuove
Le immagini dichiarate nella sitemap storica sono conservate in public/wp-content/uploads, agli stessi URL. Sono un archivio di compatibilità, non un obbligo di mostrarle nel nuovo sito. Le nuove foto vanno in public/projects/<progetto>/ oppure nello storage futuro: aggiornarne i riferimenti in lib/content.js e lib/project-stories.js senza sovrascrivere l'archivio. Non reindirizzare indiscriminatamente immagini vecchie verso foto di un lavoro diverso o verso la home.

Questa mappa copre la sitemap pubblica, non URL orfani, query WordPress o varianti delle immagini assenti dalla sitemap. Incrociare l'esportazione di Search Console prima del cambio DNS. Dominio, hosting e posta non sono stati modificati.

Controllo dei collegamenti pubblici: gestiti anche i vecchi shortlink WordPress ?p=415,427,430,438,989,1286 e le corrispondenti varianti page_id. La verifica degli URL privati di Search Console resta in attesa di accesso.
