# Piantasia — sito web

Istruzioni per Claude. Chi ti scrive di solito non è uno sviluppatore: chiede cose come
"aggiungi questo articolo", "cambia la descrizione di Blend 02", "migliora la SEO". Tu fai il
lavoro tecnico, spieghi in parole semplici cosa hai cambiato e pubblichi solo dopo il suo OK.

## Il progetto in breve

- E-commerce di Piantasia (miscele di erbe senza tabacco), online su **https://piantasia.eu**.
  Mercato principale: Germania. I testi del sito sono **in inglese** (non c'è multilingua).
- Vite + React 18 + TypeScript + Tailwind v4. È una SPA: niente rendering lato server.
- **Hosting: Vercel**, account di Francesco. Ogni push su `main` va in produzione in circa un
  minuto. Se il build fallisce su Vercel, resta online la versione precedente.
- **Backend: repo `piantapi`** (cartella accanto a questa). Il sito lo chiama su `/api/*`
  (proxy in `vercel.json`): checkout Stripe, ordini salvati su Notion, acquisti inviati a GA4.
- **Non c'è più un CMS.** Il vecchio Strapi (`piantacms`) è spento: prodotti, recensioni e
  articoli sono file JSON in `src/data/`, che modifichi direttamente.

## Comandi

Usa **pnpm** (Vercel installa da `pnpm-lock.yaml`; `package-lock.json` è un residuo, non
aggiornarlo e non usare npm).

| Comando | A cosa serve |
|---|---|
| `pnpm install` | installa le dipendenze |
| `pnpm dev` | sito in locale su http://localhost:5173, si aggiorna mentre modifichi |
| `pnpm build` | build di produzione: **deve passare prima di ogni push** |
| `pnpm preview` | serve la build su http://localhost:4173, per l'ultimo controllo |

- `pnpm type-check` ha 9 errori già esistenti in `src/app/components/ui/` (componenti shadcn
  copiati): ignorali, ma non aggiungerne di nuovi. `pnpm lint` non ha configurazione.
- In locale Google Analytics non parte (si attiva solo su piantasia.eu): è voluto.
- In locale il carrello parla col **backend vero** (Stripe live): puoi aprire il checkout per
  controllarlo, ma non completare mai un pagamento.

## Dove sta cosa

| Cosa | Dove |
|---|---|
| Prodotti | `src/data/products.json` + immagini in `public/` |
| Recensioni | `src/data/reviews.json` |
| Articoli del blog | `src/data/articles.json` (+ copertine in `public/blog/`) |
| FAQ | `src/app/components/FaqSection.tsx` (array `items`) |
| Home: hero, sezione About, ecc. | `src/app/App.tsx`, `src/app/components/Hero.tsx` |
| Pagine legali | `src/app/components/{PrivacyPolicy,TermsAndConditions,...}.tsx` |
| Titolo della scheda per pagina | `useDocumentTitle(...)` dentro ogni pagina |
| Meta description / Open Graph (uguali per tutto il sito) | `index.html` |
| Tariffe di spedizione mostrate | `src/data/shipping.ts` (copia di `piantapi/lib/shipping.ts`) |
| Colori e font | `src/styles/theme.css`, `src/styles/fonts.css` |

## Aggiungere un articolo al blog

Aggiungi un oggetto all'array in `src/data/articles.json`. L'ordine nel file non conta: il
sito li mostra dal più recente secondo `publishedAt`.

```json
{
  "id": "how-to-roll-a-herbal-blend",
  "title": "How to Roll a Herbal Blend",
  "language": "en",
  "excerpt": "One or two sentences: shown on the blog cards and in search results.",
  "content": [],
  "author": "Annalisa",
  "category": "Guides",
  "tags": ["herbal blend", "tobacco-free"],
  "publishedAt": "2026-10-20T09:00:00.000Z",
  "cover": "/blog/how-to-roll-a-herbal-blend.jpg"
}
```

- `id` è lo slug: minuscole e trattini, unico, diventa l'indirizzo `/blog/<id>`. Una volta
  pubblicato non cambiarlo (rompe i link già condivisi e indicizzati).
- `cover` è facoltativa. Immagine in `public/blog/`, JPG o WebP, larga al massimo ~1600 px e
  sotto i 300 KB (ridimensiona/comprimi tu prima di committarla).
- `content` usa il formato *blocks* di Strapi (rimasto da quando c'era il CMS), reso da
  `@strapi/blocks-react-renderer` in `ArticlePage.tsx`. I blocchi con uno stile:

```json
[
  { "type": "paragraph", "children": [
    { "type": "text", "text": "Testo normale, " },
    { "type": "text", "text": "grassetto", "bold": true },
    { "type": "text", "text": " e " },
    { "type": "link", "url": "https://piantasia.eu/product/blend-01", "children": [
      { "type": "text", "text": "un link" } ] }
  ]},
  { "type": "heading", "level": 2, "children": [{ "type": "text", "text": "Sottotitolo" }] },
  { "type": "list", "format": "unordered", "children": [
    { "type": "list-item", "children": [{ "type": "text", "text": "Punto elenco" }] }
  ]},
  { "type": "quote", "children": [{ "type": "text", "text": "Una citazione" }] }
]
```

  Il titolo dell'articolo è già l'`h1`: nel testo usa titoli di livello 2 e 3. Esistono anche
  `italic`, `underline` e `"format": "ordered"`. Le immagini *dentro* il testo non hanno uno
  stile: se servono, chiedi prima e aggiungilo in `ArticlePage.tsx`.
- Se ti danno il testo in un documento o in chat, convertilo tu in blocks, senza riscriverlo
  se non te lo chiedono. Se è in italiano e il sito è in inglese, chiedi se va tradotto.

## Modificare o aggiungere un prodotto

In `src/data/products.json`; l'ordine dell'array è l'ordine in cui compaiono sul sito.

- Testi (`tagline`, `descriptor`, `description`, `tastingNotes`, `ingredients`, ...):
  modificali liberamente. In `description` i paragrafi sono separati da `\n\n`.
- Immagini: file in `public/`, percorsi in `images` (la prima è quella principale). Le foto
  attuali sono 2000 px di larghezza: per le nuove resta su quella misura e sotto ~1 MB.
- **`id` non si cambia mai.** È l'indirizzo della pagina (`/product/<id>`) *e* la chiave con
  cui il backend trova il prezzo su Stripe.
- **`price` qui è solo testo da mostrare.** Il prezzo che il cliente paga lo decide Stripe:
  un Price con *lookup key* uguale all'`id` del prodotto, in modalità **live**. Quindi:
  - cambiare un prezzo = cambiarlo anche su Stripe, altrimenti il sito mostra un prezzo e il
    cliente ne paga un altro;
  - nuovo prodotto = crearlo anche su Stripe (Product + Price con lookup key = `id`, in live
    e in test), altrimenti il checkout di quel prodotto dà errore.
  Questa parte si fa dalla dashboard Stripe e non dal codice: dillo chiaramente, spiega i passi
  e non pubblicare un prezzo nuovo finché Stripe non è allineato.

## Recensioni

In `src/data/reviews.json`, nell'ordine in cui appaiono in home: `id` (una stringa unica
qualsiasi), `authorName`, `rating` (1–5), `body`, e facoltativi `country` e `title`.
Solo recensioni vere di clienti reali: nell'UE pubblicare recensioni inventate è illegale.

## SEO: come stanno le cose oggi

- Ogni pagina ha un titolo suo (`useDocumentTitle`). Meta description e Open Graph invece sono
  le stesse per tutte le pagine (in `index.html`).
- Non esistono `sitemap.xml` né `robots.txt`. Se li aggiungi in `public/`, Vercel li serve
  prima del rewrite verso `index.html`. Una sitemap scritta a mano va aggiornata a ogni nuovo
  articolo o prodotto.
- `vercel.json` rimanda ogni percorso a `index.html`, quindi anche un indirizzo inesistente
  risponde 200.
- Google esegue il JavaScript e legge i contenuti, ma meta per pagina, dati
  strutturati (JSON-LD per Product/Article) e canonical vanno aggiunti nel codice.
Queste sono modifiche al codice, non ai contenuti: proponi cosa fare, spiega l'effetto, falle
una alla volta e verificale con `pnpm build` + `pnpm preview`.

## Pubblicare

Mai pubblicare senza un OK esplicito. Il flusso:

1. `pnpm build` passa.
2. Avvia `pnpm preview`, mostra la pagina cambiata (o dai il link locale) e aspetta l'OK.
   In una sessione cloud (claude.ai/code o app del telefono) l'anteprima locale non è
   raggiungibile: mostra invece il testo prima e dopo, in modo leggibile e non come JSON, e
   aspetta l'OK su quello.
3. Commit con un messaggio chiaro in inglese (stile dei commit esistenti), poi `git push`
   su `main`.
4. Controlla che Vercel l'abbia pubblicato:
   `gh api repos/sisco128/piantasia/commits/<sha>/statuses -q '.[0].state'` deve diventare
   `success` (di solito entro 1–2 minuti). Poi apri https://piantasia.eu e verifica la modifica.
   Se Vercel risulta bloccato o fallito, oppure sul commit compare un commento del Vercel Bot
   sui permessi, non riprovare: avvisa che serve Francesco (il progetto Vercel è suo).
5. Per tornare indietro: `git revert <sha>` e push. Mai `git push --force` su `main`.

Modifiche grandi o rischiose (layout, codice, SEO tecnica): lavora su un branch, e prima di
unirle in `main` riassumi cosa cambia.

## Da non toccare senza un motivo preciso

- **Mai committare segreti** (chiavi Stripe, token, `.env`). Il repo è pubblico.
- Blocco Google Tag Manager / Consent Mode in `index.html`, `src/lib/consent.ts`,
  `src/lib/analytics.ts`: legati al GDPR e alla configurazione di GTM/GA4, che sta fuori dal
  codice. Un cambio qui va fatto anche lì.
- `src/app/cart/` e `vercel.json`: carrello, checkout e proxy verso il backend.
- `src/app/components/ui/`: componenti di libreria, non vanno ritoccati per cambiare un testo.
- Lo stile visivo: riusa i colori e i font che ci sono (verde `#2B5142`, lilla `#8B7BA8`,
  Fraunces per i titoli, Zen Kaku Gothic New per il testo), non introdurne di nuovi.
- Il backend `piantapi`: vedi il suo `CLAUDE.md`. Di norma non serve modificarlo.
