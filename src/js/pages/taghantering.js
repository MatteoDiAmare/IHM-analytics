export default {
  intro: 'Med tagghantering styr du vilka mätskript som körs, och när, utan att ändra sidans kod varje gång. Det bygger på tre begrepp: taggar som gör något, triggers som avgör när och variabler som ger data.',
  abilities: [
    'Beskriva tagg, trigger och variabel med egna ord.',
    'Läsa av vad som utlöste en tagg.',
    'Koppla en trigger till en händelse i dataLayer.',
  ],
  blocks: [
    {
      type: 'glossary',
      terms: [
        { term: 'Tagg', en: 'tag', text: 'Något som körs, till exempel att skicka en mätning.' },
        { term: 'Trigger', en: 'trigger', text: 'Regeln som avgör när en tagg ska köras.' },
        { term: 'Variabel', en: 'variable', text: 'Ett värde som taggen kan använda, till exempel `track_id`.' },
        { term: 'Container', en: 'container', text: 'Samlingen av taggar, triggers och variabler för en webbplats.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'dataLayer, trigger och tagg', text: 'se hur de tre samverkar.' },
        { kind: 'tryit', title: 'Skapa en första tagg', text: 'stegvis övning.' },
      ],
    },
  ],
  related: ['tracking-och-datalayer', 'samtycke'],
};
