export default {
  intro: 'Felsökning är ett arbetssätt du använder varje dag: ta reda på vad som faktiskt händer, ändra en sak i taget och kontrollera igen. DevTools är din viktigaste hjälp.',
  abilities: [
    'Läsa felmeddelanden i Console.',
    'Följa en request i Network.',
    'Kontrollera att en händelse når dataLayer.',
  ],
  blocks: [
    {
      type: 'code',
      title: 'Ett första hjälpmedel',
      lang: 'JavaScript',
      code: "console.log('Nu körs koden här', värde);",
      note: 'Byt `värde` mot det du vill se. Loggen visar om koden kördes och vad den innehöll.',
    },
    {
      type: 'slots',
      items: [
        { kind: 'flow', title: 'Felsökningskedjan', text: 'händelse, dataLayer, tagg och request: var tappas det?' },
        { kind: 'devtools', title: 'Console, Network och Application', text: 'var du tittar för vilken sorts fel.' },
        { kind: 'tryit', title: 'Hitta felet', text: 'ett trasigt exempel att rätta.' },
      ],
    },
  ],
  related: ['verktyg-och-arbetsflode', 'http-api-network', 'tracking-och-datalayer'],
};
