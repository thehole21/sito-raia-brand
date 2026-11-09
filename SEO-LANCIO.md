# Lancio di RAIA su www.raiaweb.it

Controllo aggiornato all’8 novembre 2026. Il sito pubblico WordPress è ancora il sito attuale. Le modifiche preparano la sostituzione sullo stesso dominio.

## Indicizzazione

- Il sito è indicizzabile per impostazione predefinita; gli ambienti Vercel di preview (`VERCEL_ENV !== 'production'`) restano esclusi automaticamente.
- Su un altro hosting di staging impostare `SEO_INDEXABLE=false` e ricompilare.
- Sulla pubblicazione definitiva eliminare eventuali `SEO_INDEXABLE=false`, ricompilare e verificare l’HTML effettivamente servito.
- I domini `*.vercel.app` ricevono anche `X-Robots-Tag: noindex, follow`. Il dominio definitivo deve essere `www.raiaweb.it`.
- Tutte le pagine pubbliche (inclusa `/preventivo`) sono indicizzabili e presenti in `/sitemap.xml`.
- Se la proprietà Search Console usa una verifica tramite meta tag, impostare `GOOGLE_SITE_VERIFICATION` con il token già assegnato alla proprietà e ricompilare. Se la verifica usa DNS, conservare il relativo record.

## Indirizzi e archivio

La sitemap pubblica attuale contiene sei pagine, verificate direttamente.

| Indirizzo storico | Destinazione |
| --- | --- |
| / | / |
| /servizi/ | /servizi |
| /chi-siamo/ | /chi-siamo |
| /contatti/ | /contatti |
| /galleria/ | /progetti |
| /privacy-policy/ | /privacy |

I cambi di indirizzo e la normalizzazione degli slash usano redirect permanenti. Le sitemap WordPress passano a `/sitemap.xml`. I vecchi shortlink `?p=` e `?page_id=` sono gestiti per gli ID 415, 427, 430, 438, 989 e 1286, anche da `/index.php`. Le ancore dei servizi `service_1…5` e `elementor-tab-title/content-5681…5685` restano compatibili.

Gli URL delle immagini pubblicate nella sitemap corrente sono registrati in `migration/launch-urls.json` e mantenuti nell’archivio pubblico. Conservare anche gli originali non più mostrati nelle pagine. Gli URL inesistenti devono rispondere 404, senza inoltrare indiscriminatamente tutto alla Home.

Il controllo comprende anche le varianti responsive collegate dagli HTML WordPress. Sono stati conservati 281 URL unici di immagini e risorse storiche. Questo archivio protegge i collegamenti esistenti e non viene scaricato automaticamente dai visitatori delle nuove pagine.

## Verifiche da eseguire sulla pubblicazione

```sh
npm ci
npm run lint
npm run check:seo
npm run build
npm run start
node scripts/check-launch.mjs http://127.0.0.1:3000
```

Dopo il collegamento del dominio eseguire nuovamente il controllo.

```sh
node scripts/check-launch.mjs https://www.raiaweb.it
```

Il controllo verifica status delle pagine, canonical, metadati, JSON-LD, sitemap, robots, redirect storici, una vera risposta 404 e disponibilità delle risorse interne e storiche.

## Passaggio del dominio e servizi esterni

- Collegare `www.raiaweb.it` alla nuova pubblicazione e verificare il certificato HTTPS.
- Il sito gestisce il redirect dall’host `raiaweb.it` a `www.raiaweb.it`. L’hosting deve raggiungere correttamente l’app e inoltrare HTTP verso HTTPS.
- Conservare MX, SPF, DKIM e DMARC della posta. Il cambio del sito non richiede di cambiare la posta.
- Prima di spostare i record DNS, confrontare anche gli URL esportati dalla proprietà esistente di Search Console. La sitemap pubblica non elenca necessariamente tutti gli URL storicamente visitati.
- Inviare la nuova sitemap alla proprietà Search Console esistente. Monitorare indicizzazione e 404 dopo il passaggio.
- Provare Rich Results Test e PageSpeed Insights sul dominio definitivo. Verificare i Core Web Vitals reali quando sono disponibili dati sufficienti.
- Controllare la scheda Google Business Profile già esistente e la corrispondenza di nome, indirizzo, telefono e sito. I dati sul sito sono coerenti e includono schema LocalBusiness e collegamento alla mappa.

## Pubblicazione prevista su VPS Aruba

Il progetto è un’applicazione Next.js con processo Node.js persistente. Verificare questa possibilità nel piano scelto. Per il VPS servono un ambiente Node.js supportato, un reverse proxy come Nginx, HTTPS e un gestore del processo che lo riavvii dopo errori o riavvio del server.

Eseguire il processo applicativo su un’interfaccia locale, ad esempio `npm run start -- --hostname 127.0.0.1 --port 3000`, dietro il reverse proxy. Il proxy deve conservare l’header Host originale, inoltrare il protocollo HTTPS e lasciare a Next.js i redirect applicativi. Attivare la compressione HTTP del proxy senza introdurre una cache delle pagine HTML che ignori gli header della risposta.

Il dominio e la posta possono restare su Aruba. Il solo cambio di server web non richiede un nuovo dominio. Prima del cambio esportare la zona DNS e conservare MX, SPF, DKIM, DMARC ed eventuali record di verifica di Google. La configurazione effettiva e il controllo HTTPS vanno completati sul VPS e sul pannello del dominio.

Riferimenti Aruba — [VPS e sistemi operativi](https://www.arubacloud.com/vps/), [record della posta](https://guide.aruba.it/hosting-e-domini/gestione-dns/gestione-name-server-e-record/gestire-record-posta-mx).

## Aspetti ancora da completare prima del lancio

Il modulo Preventivo è dimostrativo e mostra soltanto un riepilogo locale. Il collegamento a un servizio di invio richiede una configurazione di consegna reale e una prova con la casella destinataria. Finché rimane così, i recapiti email e telefono sono i canali operativi.

Le schede dei progetti includono fasi dichiarate come prive di fotografie. Le foto mancanti devono essere fornite dall’azienda per completare il diario di ogni lavoro.

Il posizionamento dipende anche da concorrenza, contenuti, reputazione, collegamenti esterni e segnali locali. Lighthouse e i dati strutturati aiutano la qualità tecnica, ma non garantiscono il primo posto.

Riferimenti ufficiali — [migrazione degli URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Core Web Vitals](https://web.dev/articles/lcp).
