export default {
  intro: 'Vi börjar med en tom mapp och följer en enda handling hela vägen: ett klick i en musikspelare blir ett JavaScript-event, en request, ett svar och något som går att mäta.',
  abilities: [
    'Förklara vad som händer i webbläsaren och vad som händer på en server när någon klickar.',
    'Se ett event och dess data på riktigt i webbläsaren.',
    'Placera VS Code, terminalen, Node, npm, localhost, DevTools och GitHub i arbetet.',
  ],
  blocks: [
    {
      type: 'flow',
      flow: {
        id: 'berattelsen',
        title: 'Berättelsen i fyra delar',
        intro: 'Projektet → scriptet → servern → tracking. Klicka dig igenom.',
        legend: 'auto',
        steps: [
          { id: 'project', label: 'Projektet', short: 'En mapp med filer på din dator.', tag: { variant: 'neutral', label: 'Din dator' },
            explanation: 'Allt börjar i en mapp. Du öppnar den i VS Code och lägger in de första filerna. Med en lokal server på `localhost` kan du öppna sidan i webbläsaren innan den publicerats.',
            data: 'min-spelare/\n  index.html\n  script.js', dataLabel: 'Exempel på en första mappstruktur' },
          { id: 'script', label: 'Scriptet', short: 'JavaScript som körs i webbläsaren och reagerar på klick.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'I `script.js` skriver du kod som lyssnar efter klick. Den körs hos besökaren, i webbläsaren, och du kan följa den i DevTools.' },
          { id: 'server', label: 'Servern', short: 'Tar emot requests och sparar eller svarar.', tag: { variant: 'server', label: 'Servern' },
            explanation: 'När något ska sparas skickar scriptet en request. Servern tar emot den, gör sitt jobb och svarar.' },
          { id: 'tracking', label: 'Tracking', short: 'Samma händelse kan även mätas.', tag: { variant: 'tool-b', label: 'Mätverktyget' },
            explanation: 'När handlingen fungerar kan du beskriva samma händelse som en mätpunkt. Då blir det möjligt att följa användningen över tid.' },
        ],
      },
    },
    {
      type: 'tryit',
      title: 'Prova själv: tryck på Spela',
      paragraphs: [
        'Musikspelaren nedan är riktig i din webbläsare. Klicket, eventet och koden körs på riktigt. Servern, lagringen och svaret är simulerade och märkta så.',
      ],
    },
    { type: 'demo', load: () => import('../demos/first-request.js') },
    {
      type: 'whathappens',
      paragraphs: ['När du tryckte på Spela hände fyra saker som du kan sätta namn på:'],
      items: [
        'Webbläsaren skapade ett **event** och koden reagerade på det med en **event listener**.',
        'Koden samlade ihop en **payload** och byggde en **request** till en **endpoint**.',
        'En simulerad server svarade med en **statuskod** och en **response**.',
        'Sidan uppdaterades med svaret. Låten spelades utan att vänta på mätning eller lagring.',
      ],
    },
    {
      type: 'devtools',
      tab: 'Console',
      open: 'Öppna DevTools med F12, Ctrl+Shift+I (Windows/Linux) eller Cmd+Option+I (Mac).',
      steps: [
        { do: 'Välj fliken **Console**.', expect: 'Loggen är öppen och tom eller innehåller meddelanden från andra sidor.' },
        { do: 'Tryck på **Spela** i musikspelaren ovan.', expect: 'Raden `[demo] event skapat i webbläsaren` visas med ett objekt. Fäll ut objektet för att se payloaden.' },
        { do: 'Välj fliken **Network** och tryck på Spela igen.', expect: 'Ingen ny rad med förfrågan till `/api/events` visas, eftersom demot inte skickar något. Med en riktig server hade raden dykt upp här.' },
      ],
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Event', en: 'event', text: 'Något som händer på sidan, till exempel ett klick.' },
        { term: 'Event listener', en: 'event listener', text: 'Kod som väntar på ett visst event och körs när det inträffar.' },
        { term: 'Payload', en: 'payload', text: 'Den data som beskriver det som hände och följer med i en request.' },
        { term: 'Request och response', en: 'request, response', text: 'Webbläsarens förfrågan och serverns svar.' },
        { term: 'Endpoint', en: 'endpoint', text: 'Adressen på servern som tar emot en request.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'tryit', title: 'Projektet', text: 'skapa mappen, öppna den i VS Code och starta en lokal server.' },
        { kind: 'devtools', title: 'Scriptet', text: 'skriv och testa den första koden i Console.' },
        { kind: 'demo', title: 'Servern', text: 'skicka en riktig request mot en riktig server.' },
        { kind: 'flow', title: 'Tracking', text: 'gör samma händelse till en mätpunkt.' },
      ],
    },
  ],
  related: ['javascript-och-handelser', 'http-api-network', 'verktyg-och-arbetsflode'],
};
