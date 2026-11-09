# RAIA su VPS Aruba

Predisposizione locale, non installata sul VPS. Piano previsto O2A4: 2 vCPU, 4 GB RAM, 40 GB disco. Adeguato come punto di partenza al sito attuale; verificare sul server CPU, memoria, disco e tempi reali. Linux, preferibilmente datacenter italiano. Nessun pannello hosting necessario.

## Architettura

Nginx con HTTPS -> Next.js su 127.0.0.1:3000 -> cache persistente su disco. Nessuna dipendenza da Vercel. Usare un utente di servizio `raia`, directory `/srv/raia/app`, Node.js LTS supportato dal progetto e dipendenze Linux installate sul server. Non copiare node_modules o build Windows. I template assumono Node in `/usr/bin/node`: verificarlo con `command -v node`.

## Preparazione

1. Conservare backup WordPress completo, zona DNS, mailbox e verifica Search Console.
2. Installare Node, Nginx e un client per certificati ACME. Predisporre aggiornamenti, firewall, backup esterno e rotazione log. Esporre web 80/443; limitare SSH; non esporre 3000.
3. Copiare il sorgente e public in `/srv/raia/app`, assegnati all'utente raia. Eseguire `npm ci`, `npm run lint`, `npm run check:seo`, quindi `npm run build` come utente non root. La build può usare più memoria del normale servizio; monitorarla e predisporre swap se necessario.
4. In fase di build impostare NODE_ENV=production e SEO_INDEXABLE=true; NON trasferire VERCEL_ENV, VERCEL_URL o RAIA_AUDIT dal computer locale. Le variabili SEO sono incorporate durante la build: cambiarle e poi riavviare non basta, occorre ricompilare. Token GOOGLE_SITE_VERIFICATION solo se serve alla proprietà esistente.
5. Adattare raia.service e installarlo in systemd. Il template Nginx è SOLO HTTP iniziale: predisporre certificato valido per www.raiaweb.it e raiaweb.it e redirect HTTP -> HTTPS prima del lancio. Validare Nginx prima del reload. Il proxy deve conservare Host: serve ai redirect e alla canonicalizzazione.
6. Verificare il VPS prima del cambio DNS con un override hosts locale o curl --resolve e certificato valido; conservare URL e query. Non inviare utenti al solo indirizzo IP.

## Passaggio senza cambiare la posta

Modificare esclusivamente i record web necessari (A/AAAA e/o CNAME per dominio e www), dopo aver verificato la zona esistente. Non cambiare nameserver, MX, SPF, DKIM, DMARC, autodiscover o record di verifica. Se mail o MX puntano allo stesso dominio principale, verificare e separare la destinazione mail prima di cambiarne A/AAAA. Non pubblicare AAAA se il nuovo server non gestisce correttamente IPv6. Il vecchio hosting resta disponibile durante propagazione e rollback. Conservare una copia dei valori precedenti.

## Verifiche finali

Eseguire `node scripts/check-launch.mjs https://www.raiaweb.it` e Lighthouse sul dominio definitivo, verificando assenza di noindex sulle pagine pubbliche, canonical, sitemap, vecchi indirizzi, immagini storiche, HTTPS e 404 reali. Il preventivo è intenzionalmente escluso dall'indice finché dimostrativo. Inviare sitemap in Search Console e monitorare errori e query. Nessun cambio indirizzo Search Console se resta lo stesso dominio. Dopo il passaggio il dominio Vercel può essere disattivato o reindirizzato permanentemente al definitivo.

## Documentazione

- https://nextjs.org/docs/15/app/guides/self-hosting
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://www.arubacloud.com/vps/
