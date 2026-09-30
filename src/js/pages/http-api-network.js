export default {
  intro: 'När webbläsaren behöver något från en server skickar den en request och får en response tillbaka. Det gäller när en sida laddas och när ett formulär skickas. Network-fliken i DevTools visar varje sådan förfrågan.',
  abilities: [
    'Skilja på GET och POST.',
    'Läsa status, headers och body i Network-fliken.',
    'Förklara vad ett API och en endpoint är.',
  ],
  blocks: [
    {
      type: 'glossary',
      terms: [
        { term: 'GET', text: 'Hämtar något, till exempel en sida eller en låtlista.' },
        { term: 'POST', text: 'Skickar data som ska tas emot eller sparas, till exempel ett formulär.' },
        { term: 'API', text: 'Serverns "dörrar": adresser man kan skicka requests till.' },
        { term: 'Statuskod', en: 'status code', text: 'Serverns korta besked, till exempel 200 (gick bra) eller 404 (finns inte).' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'GET och POST', text: 'prova båda och jämför.' },
        { kind: 'devtools', title: 'Network-fliken', text: 'hitta en request och läs dess delar.' },
      ],
    },
  ],
  related: ['fran-tom-mapp-till-tracking', 'datainsamling-klient-server', 'felsokning'],
};
