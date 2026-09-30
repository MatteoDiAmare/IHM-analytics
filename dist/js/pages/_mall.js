// ============================================================================
// MALL FÖR EN NY SIDA (kopiera till js/pages/<id>.js, filnamnet = id i config/menu.js)
// Ta bara med de delar som är relevanta för sidan.
// ============================================================================
export default {
  // title: false,                       // dölj standardrubriken om sidan har egen (som startsidan)
  intro: 'Kort introduktion, en till tre meningar.',
  abilities: ['Det här kommer du att kunna göra (2 till 4 punkter).'],
  blocks: [
    // { type: 'flow', flow: { id: 'x', title: 'Rubrik', legend: 'auto', steps: [/* se components/flow.js */] } },
    // { type: 'demo', title: 'Rubrik', load: () => import('../demos/min-demo.js') },
    // { type: 'tryit', paragraphs: ['Instruktion.'], steps: ['Gör så här.'] },
    // { type: 'whathappens', paragraphs: ['Förklaring av vad som hände.'] },
    // { type: 'devtools', tab: 'Console', open: 'Öppna DevTools med F12.',
    //   steps: [{ do: 'Skriv `document.title`', expect: 'Sidans titel visas.' }] },
    // { type: 'code', title: 'Exempel', lang: 'JavaScript', code: 'console.log("hej");' },
    // { type: 'glossary', terms: [{ term: 'Begrepp', en: 'concept', text: 'Kort förklaring.' }] },
    {
      type: 'slots',
      items: [{ kind: 'flow', title: 'Rubrik', text: 'Vad som ska in här senare.' }],
    },
  ],
  related: [], // id:n från config/menu.js
};
