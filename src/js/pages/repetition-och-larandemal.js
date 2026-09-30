export default {
  intro: 'Kursplanen styr vad du ska kunna och hur det examineras. Den här siten ger exempel och en väg genom innehållet. Här samlas repetitionen.',
  blocks: [
    {
      type: 'list',
      title: 'Kursens fem lärandemål',
      intro: 'Efter kursen ska du kunna:',
      ordered: true,
      items: [
        'Redogöra för plattformars uppbyggnad på server och klient ur ett datainsamlingsperspektiv.',
        'Redogöra för datainsamling genom identifiering och spårning.',
        'Redogöra för grundläggande JavaScript och dess användningsområden.',
        'Använda grundläggande HTML.',
        'Analysera, implementera och modifiera kod för identifiering och spårning.',
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'text', title: 'Var övar jag varje lärandemål?', text: 'en översikt med länkar till momenten.' },
        { kind: 'tryit', title: 'Repetitionsövningar', text: 'korta frågor och uppgifter.' },
      ],
    },
  ],
  related: ['fran-tom-mapp-till-tracking', 'labbar-och-projekt'],
};
