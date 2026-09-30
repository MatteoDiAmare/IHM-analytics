export default {
  title: false, // startsidan har en egen hero med h1
  blocks: [
    {
      type: 'hero',
      text: 'Här ser du hur en webbplats eller app hänger ihop: vad som händer när någon klickar, hur data rör sig och hur det kan mätas. Du provar i webbläsaren, tittar på vad som hände och bygger sedan vidare själv.',
      actions: [
        { label: 'Börja från grunden', page: 'fran-tom-mapp-till-tracking', primary: true },
        { label: 'Välj ett moment', scrollTo: 'moment-oversikt' },
      ],
    },
    {
      type: 'flow',
      flow: {
        id: 'helheten',
        title: 'Kursens helhet: från klick till svar',
        intro: 'Klicka på stegen. Övre raden är handlingen. Nedre raden är mätkedjan som grenar av från samma händelse.',
        legend: 'auto',
        lanes: [
          { id: 'main', label: 'Handlingen' },
          { id: 'measure', label: 'Mätkedjan', note: 'Grenar av från JavaScript/event. Handlingen är klar även om mätningen saknas.' },
        ],
        steps: [
          { id: 'user', label: 'Användare', short: 'Någon vill göra något.', tag: { variant: 'neutral', label: 'Personen' },
            explanation: 'Allt börjar hos en människa. I musikspelaren vill hen spela en låt, i webbshopen lägga en vara i varukorgen och i formuläret skicka in sina uppgifter.' },
          { id: 'action', label: 'Handling', short: 'Personen klickar eller trycker.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'Personen klickar eller skickar formuläret. Webbläsaren registrerar det som en händelse på ett element i sidan (DOM).' },
          { id: 'js', label: 'JavaScript / event', short: 'Din kod lyssnar på händelsen och bestämmer vad som ska hända.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'Din JavaScript lyssnar på händelsen med en **event listener**. Här avgörs vad som ska hända och vilken data som följer med, till exempel vilken låt eller vilken vara det gäller.',
            data: { type: 'click', target: 'button#lagg-i-varukorg' }, dataLabel: 'Exempeldata (illustration)' },
          { id: 'request', label: 'Request', short: 'Koden skickar en förfrågan till servern.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'Om något ska sparas eller hämtas skickar koden en **request** till servern, med metod, adress och data.',
            data: { method: 'POST', url: '/api/cart', body: { product_id: 'p-42', quantity: 1 } }, dataLabel: 'Exempeldata (illustration, ingen riktig förfrågan)' },
          { id: 'server', label: 'Server', short: 'Servern tar emot, kontrollerar och utför jobbet.', tag: { variant: 'server', label: 'Servern' },
            explanation: 'Servern tar emot requesten, kontrollerar att den är rimlig och utför jobbet, till exempel att lägga varan på en order.' },
          { id: 'storage', label: 'Lagring', short: 'Resultatet sparas.', tag: { variant: 'server', label: 'Servern' },
            explanation: 'Resultatet sparas, ofta i en databas: spelhistorik, orderrader eller formulärsvar.' },
          { id: 'response', label: 'Response / återkoppling', short: 'Servern svarar och sidan visar vad som hände.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'Servern svarar med en **statuskod** och data. Sidan uppdateras så att personen ser vad som hände: "Tillagd i varukorgen" eller "Tack, vi har fått ditt meddelande".' },
          { id: 'm-event', lane: 'measure', label: 'Mätpunkt', short: 'Händelsen beskrivs som en mätpunkt i dataLayer.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'Samma händelse kan också beskrivas som en mätpunkt, till exempel `add_to_cart`, och läggas i en lista som kallas **dataLayer**. Mätpunkten kan kopplas till affärshändelsen, i det här fallet att en vara lades i varukorgen.',
            data: { event: 'add_to_cart', item_id: 'p-42' }, dataLabel: 'Exempeldata (illustration)' },
          { id: 'm-tag', lane: 'measure', label: 'Trigger och tagg', short: 'En tagghanterare avgör om och när mätningen körs.', tag: { variant: 'browser', label: 'Webbläsaren' },
            explanation: 'En tagghanterare lyssnar på mätpunkten. En **trigger** avgör när något ska hända och en **tagg** gör jobbet. Samtycke kan avgöra om taggen får köras alls.' },
          { id: 'm-collect', lane: 'measure', label: 'Insamling', short: 'Uppgifterna når ett mätverktyg eller en egen server.', tag: { variant: 'tool-b', label: 'Mätverktyget' },
            explanation: 'Uppgifterna skickas till ett mätverktyg eller en egen server och blir underlag för rapporter. Där kan man till exempel se hur många som lade en vara i varukorgen.' },
        ],
      },
    },
    {
      type: 'text',
      variant: 'note',
      title: 'Tracking är en mätkedja',
      paragraphs: [
        'Tracking sitter bredvid handlingen. Den lyssnar på samma händelse och kan kopplas till det som faktiskt hände i verksamheten, till exempel ett köp eller ett skickat formulär.',
        'Handlingen fungerar också när mätningen saknas eller stoppas, till exempel för att besökaren inte gett samtycke. Därför ritas mätkedjan som en egen gren.',
      ],
    },
    {
      type: 'examples',
      items: [
        { title: 'Musikspelare', text: 'Spela, pausa och spara i en spellista. Bra för att förstå händelser och request.' },
        { title: 'Webbshop', text: 'Lägg i varukorg och gå till kassan. Bra för att förstå data, identifierare och mätning av köp.' },
        { title: 'Formulär', text: 'Fyll i, skicka och få ett svar. Bra för att förstå HTML, validering och samtycke.' },
      ],
    },
    { type: 'cards', id: 'moment-oversikt', title: 'Välj ett moment', exclude: ['oversikt'] },
  ],
};
