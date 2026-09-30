export default {
  intro: 'Tracking är att mäta vad som händer. På många webbplatser beskrivs händelsen först i en dataLayer, en lista i sidan som andra verktyg kan läsa. Då beskrivs det som hände en gång och flera taggar kan använda samma beskrivning.',
  abilities: [
    'Förklara tracking som en mätkedja bredvid handlingen.',
    'Skriva en push till dataLayer.',
    'Koppla en mätpunkt till en affärshändelse som ett köp eller ett skickat formulär.',
  ],
  blocks: [
    {
      type: 'code',
      title: 'En mätpunkt i dataLayer',
      lang: 'JavaScript',
      code: "window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({\n  event: 'play_track',\n  track_id: 'demo-track-01'\n});",
    },
    {
      type: 'glossary',
      terms: [
        { term: 'dataLayer', text: 'En lista i sidan där händelser och deras data läggs för andra verktyg att läsa.' },
        { term: 'Parameter', en: 'parameter', text: 'Ett datafält på en händelse, till exempel `track_id`.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'dataLayer, trigger och tagg', text: 'följ en mätpunkt från push till insamling.' },
        { kind: 'devtools', title: 'Se dataLayer i Console', text: 'skriv `dataLayer` och läs innehållet.' },
      ],
    },
  ],
  related: ['taghantering', 'samtycke', 'analytics'],
};
