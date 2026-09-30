export default {
  intro: 'Samtycke bestämmer vad som får samlas in. Om besökaren tackar nej ska mätningen som kräver samtycke inte starta, och sidan ska fungera som vanligt. Här ser du hur ett val i en samtyckesruta styr vad koden gör.',
  abilities: [
    'Förklara hur samtycke styr insamling.',
    'Se skillnaden i kod och nätverkstrafik mellan tillåten och stoppad insamling.',
    'Koppla samtycke till cookies och taggar.',
  ],
  blocks: [
    {
      type: 'text',
      variant: 'note',
      paragraphs: ['Vilka regler som gäller i ett verkligt fall avgörs av lag och organisation. Här fokuserar vi på hur tekniken följer ett val.'],
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Samtycke', en: 'consent', text: 'Besökarens val om vad som får samlas in.' },
        { term: 'Samtyckesruta', en: 'consent banner', text: 'Rutan där besökaren gör sitt val.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'Samtycke tillåter eller stoppar insamling', text: 'växla valet och se vad som händer med mätningen.' },
        { kind: 'devtools', title: 'Network och Application', text: 'kontrollera att insamlingen verkligen stoppas.' },
      ],
    },
  ],
  related: ['cookies-och-webblasarlagring', 'taghantering', 'analytics'],
};
