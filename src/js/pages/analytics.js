// Sidan Analytics. Inga verkliga taggar eller externa anrop i etapp 1.
// När guiderna skrivs ska aktuell officiell Google-dokumentation kontrolleras.
const section = (id, title, intro, items) => ({
  type: 'section',
  id,
  title,
  intro,
  blocks: [{ type: 'slots', title: 'Planerat innehåll', items }],
});

export default {
  intro: 'Analytics är en praktisk fördjupning om att förstå hur en webbplats används och hur den hittas. Två verktyg står i fokus och de kompletterar varandra.',
  blocks: [
    {
      type: 'entrances',
      title: 'Välj ingång',
      items: [
        { label: 'Google Analytics 4', text: 'Vad besökarna gör på webbplatsen.', target: 'analytics-ga4' },
        { label: 'Google Search Console', text: 'Hur webbplatsen syns och presterar i Google Sök.', target: 'analytics-search-console' },
      ],
    },
    {
      type: 'flow',
      flow: {
        id: 'verktygen-tillsammans',
        title: 'Två verktyg, en kedja',
        intro: 'Search Console visar vägen fram till din sida. Google Analytics 4 visar vad som händer efter att besökaren kommit dit.',
        legend: 'auto',
        steps: [
          { id: 'search', label: 'Någon söker', short: 'En person söker på Google.', tag: { variant: 'tool-b', label: 'Search Console' },
            explanation: 'Kedjan börjar i Google Sök. Search Console visar vilka sökningar som leder till din webbplats.' },
          { id: 'result', label: 'Sökresultat visas', short: 'Din sida kan visas bland resultaten.', tag: { variant: 'tool-b', label: 'Search Console' },
            explanation: 'När sidan visas i resultaten räknas det som en visning. Här handlar det om synlighet.' },
          { id: 'click', label: 'Klick till din sida', short: 'Personen väljer ditt resultat.', tag: { variant: 'tool-b', label: 'Search Console' },
            explanation: 'Ett klick tar personen från sökresultatet till din webbplats.' },
          { id: 'visit', label: 'Besök på sidan', short: 'Personen läser och tittar sig omkring.', tag: { variant: 'tool-a', label: 'Google Analytics 4' },
            explanation: 'Nu tar Google Analytics 4 över och beskriver besöket: vilka sidor som visades och hur personen tog sig fram.' },
          { id: 'event', label: 'Handling på sidan', short: 'Personen spelar, lägger i varukorg eller skickar formulär.', tag: { variant: 'tool-a', label: 'Google Analytics 4' },
            explanation: 'Handlingarna mäts som events, till exempel att spela en låt, lägga en vara i varukorgen eller skicka ett formulär.' },
          { id: 'key', label: 'Nyckelhändelse', short: 'En handling som betyder något för verksamheten.', tag: { variant: 'tool-a', label: 'Google Analytics 4' },
            explanation: 'Vissa händelser är extra viktiga för målet, till exempel ett köp. De kan markeras som nyckelhändelser.' },
        ],
      },
    },
    {
      type: 'section',
      id: 'analytics-ga4',
      title: 'Google Analytics 4',
      intro: ['Beteende på webbplatsen: vad besökarna gör och hur det hänger ihop med dina mål.'],
      blocks: [
        {
          type: 'slots',
          title: 'Planerat innehåll',
          items: [
            { kind: 'text', title: 'Webbström', text: 'skapa och förstå den.' },
            { kind: 'text', title: 'Installation', text: 'stegvis uppsättning för den egna webbplatsen.' },
            { kind: 'text', title: 'Events', text: 'vad som mäts av sig självt och vad du lägger till.' },
            { kind: 'text', title: 'Nyckelhändelser', text: 'välj de händelser som motsvarar dina mål.' },
            { kind: 'text', title: 'Realtime och DebugView', text: 'kontrollera att uppsättningen fungerar.' },
            { kind: 'text', title: 'Samtycke', text: 'hur valet styr mätningen. Se även momentet Samtycke.' },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'analytics-search-console',
      title: 'Google Search Console',
      intro: ['Webbplatsens synlighet och resultat i Google Sök. Verifiering av webbplatsen sköts separat från besökartracking.'],
      blocks: [
        {
          type: 'slots',
          title: 'Planerat innehåll',
          items: [
            { kind: 'text', title: 'Val av egendom', text: 'domän eller URL-prefix.' },
            { kind: 'text', title: 'Verifiering', text: 'bekräfta att webbplatsen är din.' },
            { kind: 'text', title: 'Sitemap', text: 'berätta vilka sidor som finns.' },
            { kind: 'text', title: 'Indexering', text: 'vilka sidor som finns i Googles index.' },
            { kind: 'text', title: 'URL-inspektion', text: 'kontrollera en enskild sida.' },
            { kind: 'text', title: 'Sökresultat', text: 'visningar, klick och sökfrågor.' },
          ],
        },
      ],
    },
    section('analytics-arbetssatt', 'Arbeta med Analytics', ['Så här kommer avsnitten att byggas upp för båda verktygen.'], [
      { kind: 'text', title: 'Syfte och frågor', text: 'vilka frågor respektive verktyg hjälper till att besvara.' },
      { kind: 'text', title: 'Stegvis uppsättning', text: 'för den egna webbplatsen.' },
      { kind: 'text', title: 'Kontroll', text: 'att uppsättningen fungerar.' },
      { kind: 'text', title: 'Praktiska arbetssätt', text: 'tips och vanliga fel.' },
      { kind: 'text', title: 'Från mål till mätetal', text: 'välj relevanta mätetal utifrån ett mål.' },
      { kind: 'text', title: 'Använda resultaten', text: 'förbättra innehåll, användarflöden och synlighet.' },
    ]),
  ],
  related: ['tracking-och-datalayer', 'samtycke', 'taghantering'],
};
