export default {
  intro: 'HTML beskriver vad som finns på sidan, CSS hur det ser ut och DOM är webbläsarens levande modell av sidan som JavaScript kan läsa och ändra. Knappar, länkar och formulär finns här, och det är dem som händelser och mätning utgår från.',
  abilities: [
    'Skriva enkel HTML med rubriker, länkar, knappar och formulär.',
    'Läsa sidans DOM i Elements-fliken.',
    'Förstå att `id`, `class` och `data-`attribut används av både script och taggar.',
  ],
  blocks: [
    {
      type: 'code',
      title: 'Ett litet formulär',
      lang: 'HTML',
      code: '<form id="nyhetsbrev">\n  <label for="epost">E-post</label>\n  <input id="epost" name="epost" type="email" required>\n  <button type="submit">Prenumerera</button>\n</form>',
    },
    {
      type: 'glossary',
      terms: [
        { term: 'Element', en: 'element', text: 'En byggsten i HTML, till exempel en knapp eller en rubrik.' },
        { term: 'Attribut', en: 'attribute', text: 'Extra information på ett element, som `id` eller `href`.' },
        { term: 'DOM', text: 'Webbläsarens träd av element som JavaScript kan läsa och ändra.' },
      ],
    },
    {
      type: 'slots',
      items: [
        { kind: 'flow', title: 'Från HTML-text till DOM', text: 'hur webbläsaren gör text till element.' },
        { kind: 'tryit', title: 'Bygg ett formulär', text: 'och undersök det.' },
        { kind: 'devtools', title: 'Elements-fliken', text: 'hitta, markera och ändra ett element.' },
      ],
    },
  ],
  related: ['javascript-och-handelser', 'felsokning'],
};
