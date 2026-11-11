# Demo Makito — solo anteprima Vercel

Ramo: demo/makito-catalogo. NON unire a main e non pubblicare su Aruba.
Route /catalogo: accessibile solo con VERCEL_ENV=preview, in sviluppo locale o con MAKITO_DEMO_LOCAL=true fuori da Vercel per i test della build. Sul VPS di produzione risponde 404. Non è nella sitemap; metadata noindex/nofollow. Nessun invio ordini, pagamento, email o salvataggio di dati personali. Il carrello è in memoria e si azzera ricaricando la pagina.

Prodotti, SKU DEMO, prezzi e varianti sono fittizi ed etichettati. Illustrazioni SVG, nessuna fotografia dichiarata del fornitore. Stato attuale: API non collegata. Non si dichiara connessione verificata sulla sola presenza di una chiave.

La documentazione ufficiale https://data.makito.es/documentacion.pdf descrive token Bearer lato server ed endpoint per catalogo, immagini, prezzi, stock e varianti, non per inoltrare ordini. Prima del collegamento reale servono autorizzazioni Makito, risposta API di esempio e regole commerciali RAIA (listino, ricarichi, IVA, personalizzazione, trasporto). Un eventuale token andrà in una variabile Vercel server-only, mai NEXT_PUBLIC, codice o repository. Verificare separatamente un canale di invio ordini approvato da Makito.

Aruba: workflow esclusivamente su main. Il ramo demo non lo attiva. Vercel crea una Preview Deployment per il push del ramo, non modifica l'alias di produzione.
