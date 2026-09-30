export default {
  intro: 'Data kan samlas in i webbläsaren (klientsidan) eller på servern. Klientsidan ser vad besökaren gör på sidan. Serversidan ser vad som når servern och kan komplettera med data som webbläsaren inte har. Ofta används båda.',
  abilities: [
    'Redogöra för skillnaden mellan klient- och serverinsamling.',
    'Ge exempel på data som finns på klienten respektive servern.',
    'Välja var en mätpunkt lämpar sig att ligga.',
  ],
  blocks: [
    {
      type: 'glossary',
      terms: [
        { term: 'Klientsidan', en: 'client-side', text: 'Insamling som sker i webbläsaren, till exempel klick och sidvisningar.' },
        { term: 'Serversidan', en: 'server-side', text: 'Insamling som sker på servern, till exempel en genomförd order.' },
        { term: 'SDK', en: 'software development kit', text: 'Färdig kod som en app använder för att prata med en tjänst, ofta för mätning i nativeappar.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'Klient- och serverinsamling', text: 'samma köp sett från båda håll.' },
        { kind: 'text', title: 'Orientering om SDK', text: 'kort om webbappar, nativeappar och SDK.' },
      ],
    },
  ],
  related: ['digitala-plattformar', 'http-api-network', 'tracking-och-datalayer'],
};
