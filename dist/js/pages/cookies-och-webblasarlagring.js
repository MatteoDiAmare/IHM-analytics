export default {
  intro: 'Webbläsaren kan spara små mängder data åt en webbplats: cookies, localStorage och sessionStorage. De skiljer sig i vad de kan spara, hur länge och vem som kan läsa dem, och det avgör vad de passar till i en varukorg, en inloggning eller en spelarinställning.',
  abilities: [
    'Beskriva skillnaden mellan cookies, localStorage och sessionStorage.',
    'Hitta och läsa dem i Application-fliken.',
    'Skilja på förstaparts- och tredjepartscookies och förklara hur blockering påverkar dem.',
  ],
  blocks: [
    {
      type: 'code',
      title: 'Spara och läsa en inställning',
      lang: 'JavaScript',
      code: "localStorage.setItem('volym', '0.8');\nconsole.log(localStorage.getItem('volym'));",
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Cookie', text: 'Liten textpost som webbläsaren skickar med i requests till samma webbplats.' },
        { term: 'localStorage', text: 'Sparas kvar i webbläsaren tills den rensas.' },
        { term: 'sessionStorage', text: 'Sparas bara så länge fliken är öppen.' },
        { term: 'Förstaparts- och tredjepartscookie', en: 'first-party, third-party', text: 'Satt av webbplatsen du besöker respektive av en annan domän.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'demo', title: 'localStorage och sessionStorage', text: 'spara, stäng fliken och se vad som finns kvar.' },
        { kind: 'devtools', title: 'Application-fliken', text: 'hitta cookies och lagrad data.' },
        { kind: 'flow', title: 'Förstaparts, tredjepart och blockering', text: 'vad som händer när en cookie blockeras.' },
      ],
    },
  ],
  related: ['identifiering', 'samtycke'],
};
