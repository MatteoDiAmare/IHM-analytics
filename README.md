# S:CDD26H – Teknik för digitala plattformar

Visuell och interaktiv lärosite, etapp 1. Ren HTML, CSS och JavaScript (ES-moduler). Inga beroenden, inget byggsteg som krävs för att köra. Siten är inte publicerad. Planerad adress: https://scdd26ha.pulsit.online/

## Kommandon

Kräver Node 18 eller senare.

| Kommando | Gör |
|---|---|
| `npm start` | Startar en lokal server på http://localhost:5173 (ändra med `PORT=8080 npm start`) |
| `npm run check` | Kontrollerar att menyn och sidfilerna stämmer överens |
| `npm run build` | Kör kontrollen och kopierar `src/` till `dist/`, som kan publiceras på vilken statisk hosting som helst |
| `npm run preview` | Startar en lokal server för `dist/` |

Adresserna är hash-baserade (`#/samtycke`). Direktlänkar, omladdning och bakåt/framåt fungerar utan serverinställningar.

## Så byter du utseende på hela siten

Ändra **`src/css/theme.css`**. Där finns färger, typsnitt, storlekar, avstånd, radier, skuggor och layoutmått som variabler. `base.css` (grundlayout) och `components.css` (komponenter) innehåller inga färger av eget. JavaScript sätter inga färger.

## Så lägger du till ett nytt moment

1. Lägg en rad i `src/js/config/menu.js` (id, title, summary). Menyn, startsidans kort och föregående/nästa uppdateras av sig själva. Ordningen i filen är ordningen på siten.
2. Kopiera `src/js/pages/_mall.js` till `src/js/pages/<id>.js` och fyll i.
3. Kör `npm run check`. Kontrollen säger till om id, adress eller blocktyp inte stämmer.

Ett moment byggs av block: `text`, `list`, `flow`, `demo`, `tryit`, `whathappens`, `devtools`, `code`, `glossary`, `slots` med flera. Alla typer är beskrivna överst i `src/js/components/blocks.js`. Använd bara de som passar sidan.

## Så bygger du en ny demonstration

Kopiera `src/js/demos/_mall.js`, byt namn och koppla in den med `{ type: 'demo', load: () => import('../demos/<namn>.js') }`. Använd `createFlow()` (`src/js/components/flow.js`, API beskrivet överst i filen). Märk alltid vad som körs på riktigt och vad som är simulerat.

Förberedda demonstrationer för senare etapper: GET och POST, localStorage och sessionStorage, identifierare över flera besök, dataLayer/trigger/tagg, samtycke, klient- och serverinsamling. Bara den första (Spela → event → request → simulerad server → svar) är byggd.

## Struktur

```
src/
  index.html               Skal, laddar CSS och js/main.js
  css/theme.css            Alla designval (ändra här)
  css/base.css             Grundlayout, typografi, sidomeny/mobilmeny
  css/components.css       Knappar, kort, flöde, kod, sektioner
  js/config/menu.js        Menyn: titlar, adresser, grupper, ordning
  js/config/site.js        Kurskod, titel, planerad adress
  js/core/                 Router, meny, DOM-hjälpare
  js/components/           Sidmall, block, flöde, kodblock, etikett
  js/demos/                Interaktiva demonstrationer
  js/pages/                Innehåll, en fil per moment
  js/integrations/         Förberedda integrationspunkter (inaktiva)
scripts/                   serve, build, check
```

## Analytics

Inga Google-taggar och inga externa anrop finns i etapp 1. Integrationspunkterna är kommenterade i `src/js/integrations/index.js` (GA4, sidvisningar vid sidbyte) och i `<head>` i `src/index.html` (Search Console-verifiering, hålls separat från besökartracking). Kontrollera aktuell officiell Google-dokumentation innan guiderna skrivs.

## Tillgänglighet

Riktiga knappar och länkar, synlig fokusmarkering, tangentbordsstyrning, `aria-current` för aktiv sida och aktuellt flödessteg, textversion av varje flöde, etiketter som alltid har text och symbol utöver färg, och `prefers-reduced-motion` respekteras.

## Webbplatsen (rotmappen)

Siten är ren HTML, CSS och JavaScript. Inget byggsteg och ingen Node behövs. Den publiceras med GitHub Pages på **https://scdd26ha.pulsit.online/** (domänen står i `CNAME`).

- `index.html` – översikt, och en sida per kursmoment (`*.html`)
- `css/` – tre CSS-filer. `theme.css` styr färger, typsnitt och avstånd för hela siten
- `js/site.js` – menyn, föregående/nästa och mobilmenyn. **Menyn är listan `MENU` överst i filen**
- `sitemap.xml` och `robots.txt` – för sökmotorer. Adresserna ska använda `https://scdd26ha.pulsit.online/`

### Lägg till en ny sida
1. Kopiera en befintlig sida, byt namn och innehåll. Ändra också `data-page` i `<body>`, `<title>`, `description` och `canonical`.
2. Lägg en rad i `MENU` i `js/site.js`.
3. Lägg ett kort på `index.html` och en rad i `sitemap.xml`.

Visa siten lokalt med tillägget Live Server i VS Code (eller `npx http-server` om du har Node). Den tidigare interaktiva versionen finns kvar i `src/` och `dist/`.
