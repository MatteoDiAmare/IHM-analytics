export default {
  intro: 'En digital plattform består av det som körs hos användaren (klienten), det som körs hos oss (servern) och data som rör sig mellan dem. Data kan samlas in på båda sidor, så uppbyggnaden är värd att förstå först.',
  abilities: [
    'Beskriva vad klient, server och lagring gör i en webbplats eller app.',
    'Peka ut var data kan samlas in.',
    'Koppla musikspelaren, webbshopen och formuläret till plattformens delar.',
  ],
  blocks: [
    {
      type: 'glossary',
      terms: [
        { term: 'Klient', en: 'client', text: 'Det som körs hos användaren, oftast webbläsaren eller en app.' },
        { term: 'Server', en: 'server', text: 'Datorn som tar emot requests, sparar data och svarar.' },
        { term: 'Webbapp', en: 'web app', text: 'En app som körs i webbläsaren och öppnas via en adress.' },
        { term: 'Nativeapp', en: 'native app', text: 'En app som installeras på telefonen eller datorn.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'flow', title: 'Klient, server och lagring', text: 'en genomgång med musikspelaren som exempel.' },
        { kind: 'tryit', title: 'Peka ut var datan finns', text: 'en övning med webbshopen.' },
        { kind: 'devtools', title: 'Se vad en sida hämtar', text: 'första blicken på Network-fliken.' },
      ],
    },
  ],
  related: ['http-api-network', 'datainsamling-klient-server'],
};
