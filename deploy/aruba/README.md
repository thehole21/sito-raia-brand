# RAIA su Aruba: pubblicazione e gestione

Il sito ufficiale è https://www.raiaweb.it sul VPS 80.211.79.35. Nginx gestisce HTTPS e inoltra le richieste a un container Next.js non root. La posta resta sull'hosting Aruba precedente: non cambiare MX, SPF, DKIM, DMARC, nameserver o record mail.

## Modificare il sito

```powershell
cd C:\Users\manij\sito-raia-brand
npm run dev
# Dopo aver verificato le modifiche:
git add .
git commit -m "Descrizione della modifica"
git push origin main
```

Ogni push su `main` avvia `.github/workflows/deploy-aruba.yml`. GitHub Actions costruisce l'immagine Linux, esegue lint, controlli SEO, migrazione e allegati, poi la trasferisce al VPS. Il nuovo container parte su una porta interna alternativa; solo dopo i controlli Nginx passa alla nuova versione. In caso di errore durante la commutazione lo script conserva/ripristina il precedente backend. Il risultato è visibile nella scheda Actions di GitHub. Un push non equivale a un deploy riuscito: controllare il segno verde.

Vercel resta un'anteprima indipendente, esclusa dall'indice con metadati e header noindex. Il dominio ufficiale e i canonical rimangono www.raiaweb.it. L'hosting Aruba precedente va conservato per posta e rollback della migrazione.

## Configurazione automatica

- Secret GitHub `ARUBA_DEPLOY_KEY`: chiave dedicata all'utente `raia-deploy`, limitata a un comando di deploy. Mai mettere chiavi private nel repository.
- Variabili GitHub `WEB3FORMS_ACCESS_KEY` e `UMAMI_WEBSITE_ID`: identificativi pubblici incorporati nella build. Nessuna password di casella email necessaria.
- Script VPS `/usr/local/sbin/raia-deploy`, root-owned. Aggiornarlo esplicitamente se cambia il file `deploy.sh`: il normale deploy dell'app non modifica gli strumenti amministrativi.
- Stato corrente: `/srv/raia/active-container`, `active-port`, `active-commit`, `previous-image`.
- Backend Nginx: `/etc/nginx/raia-backend.conf`. Container applicativi sulle sole porte locali 3000/3001. JS/CSS con hash delle versioni precedenti conservati in `/srv/raia/static` per le schede già aperte.
- `compose.yml` documenta il bootstrap; non usarlo per riavviare alla cieca il vecchio container dopo l'attivazione del deploy automatico.

## Preventivi e allegati

Web3Forms gratuito gestisce fino a 250 invii/mese. Gli allegati email richiederebbero il piano Pro: qui il file viene invece salvato nel volume privato `raia_quote-uploads` e nella richiesta arriva un link riservato valido 7 giorni. Massimo 8 MB, PDF/JPG/PNG/WebP/ZIP, fino a 512 MB di spazio complessivo. Download sempre come allegato, mai inline; nessun elenco pubblico dei file. La cancellazione giornaliera elimina gli scaduti. Il campo link esterno resta disponibile. Il popup di conferma dipende da `success:true` di Web3Forms e torna alla home dopo 2 secondi.

## Statistiche

Umami gratuito sul medesimo VPS, dashboard https://stats.raiaweb.it con accesso privato. PostgreSQL non esposto a Internet. Risorse limitate, nessuna pubblicità o registrazione delle sessioni; identificativi pseudonimi giornalieri. Nel sito le statistiche sono facoltative: nessuno script viene caricato prima dell'accettazione. Rifiuto e revoca dal footer; preferenza locale per 180 giorni. Do Not Track e Global Privacy Control rispettati. Query string, frammenti e campi dei moduli non inviati. Conservazione dettagli 13 mesi, backup locale giornaliero con rotazione: un backup sullo stesso VPS non sostituisce un backup esterno.

## HTTPS e verifiche

Certificati Let's Encrypt per dominio principale e stats con rinnovo webroot `/var/www/letsencrypt`, timer Certbot e hook di reload Nginx. Per verificare: `certbot renew --dry-run`.

Conservare HTTPS e redirect permanenti dei vecchi URL. I percorsi inesistenti devono restituire 404 reali. La suite `npm run check:launch -- https://www.raiaweb.it` controlla pagine, canonical, robots, sitemap, migrazione e immagini storiche. `node scripts/check-uploads.mjs` va eseguito sul container di test, non per generare file inutili in produzione.

Per Google: usare la proprietà Search Console esistente del dominio e inviare https://www.raiaweb.it/sitemap.xml. Non serve un cambio indirizzo perché il dominio resta identico. Verificare che l'eventuale file/tag di proprietà storico sia conservato o adottare una verifica DNS. Monitorare indicizzazione e vecchi URL nelle settimane successive; nessuna configurazione tecnica garantisce la prima posizione.
