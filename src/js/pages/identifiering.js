export default {
  intro: 'För att förstå ett besök över tid behöver samma webbläsare eller samma inloggade användare kunna kännas igen. Det görs med identifierare, till exempel ett slumpat id i en cookie eller ett user-id efter inloggning.',
  abilities: [
    'Skilja på ett anonymt id, ett sessions-id och ett user-id.',
    'Se hur ett id följer med över flera besök.',
    'Förklara vad inloggning ändrar för identifieringen.',
  ],
  blocks: [
    {
      type: 'glossary',
      terms: [
        { term: 'Identifierare', en: 'identifier', text: 'Ett värde som gör att samma webbläsare eller användare kan kännas igen.' },
        { term: 'Session', en: 'session', text: 'Ett sammanhängande besök.' },
        { term: 'User-id', en: 'user ID', text: 'Ett id kopplat till ett konto, tillgängligt först efter inloggning.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'Identifierare över flera besök', text: 'ett id skapas, sparas och känns igen nästa gång.' },
        { kind: 'devtools', title: 'Application-fliken', text: 'hitta identifieraren du just skapade.' },
      ],
    },
  ],
  related: ['cookies-och-webblasarlagring', 'samtycke', 'tracking-och-datalayer'],
};
