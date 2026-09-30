// ============================================================================
// MENYN: en enda plats för titlar, adresser, grupper och ordning.
// Sidomenyn, startsidans momentkort och föregående/nästa-länkar läser härifrån.
//
//   id       Stabilt namn. Sidans innehåll ligger i src/js/pages/<id>.js
//   path     Adressen efter #/  (utelämnas den används id)
//   title    Namn i menyn och som sidrubrik
//   summary  En mening om vad eleven får lära sig (visas på startsidans kort)
//
// Grupp med showTitleInMenu: false visas som en fristående menypost.
// ============================================================================
export const menu = [
  {
    id: 'start',
    title: 'Start',
    pages: [
      { id: 'oversikt', title: 'Översikt', summary: 'Kursens helhet på en sida och vägen vidare till alla moment.' },
      {
        id: 'fran-tom-mapp-till-tracking',
        title: 'Från tom mapp till tracking',
        summary: 'Följ ett klick från projektet till scriptet, servern och mätningen, och prova det själv.',
      },
    ],
  },
  {
    id: 'bygg-och-forsta',
    title: 'Bygg och förstå',
    pages: [
      { id: 'digitala-plattformar', title: 'Digitala plattformar', summary: 'Se hur klient, server och lagring samverar i en webbplats eller app.' },
      { id: 'html-css-dom', title: 'HTML, CSS och DOM', summary: 'Bygg sidans delar och lär dig hur webbläsaren gör dem till något du kan undersöka.' },
      { id: 'javascript-och-handelser', title: 'JavaScript och händelser', summary: 'Låt sidan reagera på klick och formulär och se vilken data som uppstår.' },
      { id: 'http-api-network', title: 'HTTP, API och Network', summary: 'Förstå requests och responses och följ dem i webbläsarens Network-flik.' },
    ],
  },
  {
    id: 'samla-in-och-forsta-data',
    title: 'Samla in och förstå data',
    pages: [
      { id: 'cookies-och-webblasarlagring', title: 'Cookies och webbläsarlagring', summary: 'Jämför cookies, localStorage och sessionStorage och se vad de passar till.' },
      { id: 'identifiering', title: 'Identifiering', summary: 'Se hur samma besökare eller användare kan kännas igen över flera besök.' },
      { id: 'tracking-och-datalayer', title: 'Tracking och dataLayer', summary: 'Beskriv en händelse en gång i dataLayer och låt mätningen läsa den.' },
      { id: 'taghantering', title: 'Tagghantering', summary: 'Styr mätning med taggar, triggers och variabler utan att ändra sidans kod varje gång.' },
      { id: 'samtycke', title: 'Samtycke', summary: 'Se hur ett val av besökaren styr vad som får samlas in.' },
      { id: 'datainsamling-klient-server', title: 'Datainsamling på klient och server', summary: 'Jämför vad som kan samlas in i webbläsaren och på servern.' },
    ],
  },
  {
    id: 'arbeta-praktiskt',
    title: 'Arbeta praktiskt',
    pages: [
      { id: 'verktyg-och-arbetsflode', title: 'Verktyg och arbetsflöde', summary: 'Ta reda på var VS Code, terminalen, Node, npm, localhost, DevTools och GitHub hör hemma.' },
      { id: 'labbar-och-projekt', title: 'Labbar och projekt', summary: 'Här samlas övningar där du bygger och ändrar själv.' },
      { id: 'felsokning', title: 'Felsökning', summary: 'Lär dig ett arbetssätt för att hitta vad som faktiskt händer och rätta det.' },
      { id: 'gruppdemonstrationer', title: 'Gruppdemonstrationer', summary: 'Här får gruppens demonstrationer sin plats.' },
      { id: 'repetition-och-larandemal', title: 'Repetition och lärandemål', summary: 'Samla trådarna och se kursens lärandemål.' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    showTitleInMenu: false,
    pages: [
      { id: 'analytics', title: 'Analytics', summary: 'Praktisk fördjupning i Google Analytics 4 och Google Search Console.' },
    ],
  },
];
