export default {
  intro: 'Här får verktygen sin plats i arbetet: VS Code för att skriva, terminalen för att köra, Node och npm för att starta och installera, localhost för att se sidan lokalt, DevTools för att undersöka och GitHub för att spara och dela.',
  abilities: [
    'Förklara vad varje verktyg används till.',
    'Starta ett projekt lokalt från terminalen.',
    'Följa ett vanligt arbetspass från kod till delad version.',
  ],
  blocks: [
    {
      type: 'flow',
      flow: {
        id: 'arbetspass',
        title: 'Ett vanligt arbetspass',
        legend: 'auto',
        steps: [
          { id: 'vscode', label: 'VS Code', short: 'Skriv och ändra koden.', tag: { variant: 'neutral', label: 'Din dator' }, explanation: 'Du öppnar projektmappen i VS Code och skriver eller ändrar filer.' },
          { id: 'terminal', label: 'Terminal', short: 'Starta projektet med ett kommando.', tag: { variant: 'neutral', label: 'Din dator' }, explanation: 'I terminalen står du i projektmappen och kör kommandon, till exempel `npm start`.' },
          { id: 'localhost', label: 'localhost', short: 'Öppna sidan lokalt i webbläsaren.', tag: { variant: 'browser', label: 'Webbläsaren' }, explanation: 'Den lokala servern gör sidan tillgänglig på en adress som `http://localhost:5173`. Den syns bara på din dator.' },
          { id: 'devtools', label: 'DevTools', short: 'Undersök vad som händer.', tag: { variant: 'browser', label: 'Webbläsaren' }, explanation: 'Med F12 öppnar du DevTools och undersöker Elements, Console, Network och Application.' },
          { id: 'github', label: 'GitHub', short: 'Spara ändringen och dela den.', tag: { variant: 'server', label: 'På nätet' }, explanation: 'När ändringen fungerar sparar du den med Git och skickar den till GitHub, där den finns kvar med historik.' },
        ],
      },
    },
    {
      type: 'code',
      title: 'Starta den här siten lokalt',
      lang: 'Terminal',
      code: 'npm start',
      note: 'Öppna sedan `http://localhost:5173` i webbläsaren.',
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Node.js', text: 'Kör JavaScript utanför webbläsaren, till exempel en lokal server.' },
        { term: 'npm', text: 'Pakethanteraren som följer med Node och kör projektets kommandon.' },
        { term: 'Git och GitHub', text: 'Git håller reda på ändringar. GitHub är tjänsten där koden lagras och delas.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'tryit', title: 'Din första körning', text: 'steg för steg från nedladdning till localhost.' },
        { kind: 'devtools', title: 'DevTools-rundtur', text: 'en fliknavigering med korta övningar.' },
      ],
    },
  ],
  related: ['fran-tom-mapp-till-tracking', 'felsokning'],
};
