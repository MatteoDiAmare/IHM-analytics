export default {
  intro: 'JavaScript gör att sidan kan reagera. En händelse (event) inträffar, till exempel ett klick, och din kod väljer vad som ska hända. Samma händelser används för att få sidan att fungera och för att mäta den.',
  abilities: [
    'Redogöra för vad JavaScript används till på webbplatser.',
    'Lyssna på klick och formulärinskick.',
    'Skriva ut och undersöka data i Console.',
  ],
  blocks: [
    {
      type: 'code',
      title: 'Lyssna på ett klick',
      lang: 'JavaScript',
      code: "const knapp = document.querySelector('#play');\n\nknapp.addEventListener('click', (event) => {\n  console.log('Klick registrerat', event.type);\n});",
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Event', en: 'event', text: 'Något som händer, som ett klick eller ett inskick.' },
        { term: 'Event listener', en: 'event listener', text: 'Kod som körs när ett visst event inträffar.' },
        { term: 'Console', text: 'DevTools-flik där du skriver och läser JavaScript direkt.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'flow', title: 'Från klick till kod', text: 'hur ett event tar sig genom sidan.' },
        { kind: 'tryit', title: 'Reagera på formuläret', text: 'skriv en listener för ett inskick.' },
        { kind: 'devtools', title: 'Console', text: 'logga, inspektera och ändra värden.' },
      ],
    },
  ],
  related: ['fran-tom-mapp-till-tracking', 'html-css-dom', 'tracking-och-datalayer'],
};
