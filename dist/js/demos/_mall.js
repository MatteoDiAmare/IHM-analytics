// ============================================================================
// MALL FÖR NY DEMONSTRATION (kopiera till js/demos/<namn>.js)
//
// Så kopplas den in på en sida (i src/js/pages/<id>.js):
//   { type: 'demo', title: 'Rubrik', load: () => import('../demos/<namn>.js') }
//
// Regler för alla demonstrationer:
//   1. Märk tydligt vad som körs på riktigt och vad som är simulerat (tag-varianterna browser/sim/server).
//   2. Visa aldrig en påhittad serverkvittens som ett verkligt nätverksanrop.
//   3. Använd createFlow() så att stegen, Nästa steg, Börja om och textversionen följer med.
//   4. Inga färger i JS. Utseendet styrs av CSS-klasser och temat.
//
// Förberedda demonstrationer (implementeras i senare etapper):
//   get-post          GET och POST                    (sidan HTTP, API och Network)
//   storage           localStorage och sessionStorage (sidan Cookies och webbläsarlagring)
//   identifiers       Identifierare över flera besök  (sidan Identifiering)
//   datalayer-tag     dataLayer, trigger och tagg     (sidorna Tracking och dataLayer / Tagghantering)
//   consent           Samtycke tillåter eller stoppar (sidan Samtycke)
//   client-server     Klient- och serverinsamling     (sidan Datainsamling på klient och server)
// ============================================================================
import { h } from '../core/dom.js';
import { createFlow } from '../components/flow.js';

export function mount(host, { level = 2 } = {}) {
  const flow = createFlow({
    id: 'min-demo',
    title: 'Rubrik för demonstrationen',
    headingLevel: level,
    legend: 'auto',
    steps: [
      { id: 'a', label: 'Steg A', short: 'Vad som händer.', tag: { variant: 'browser', label: 'Körs i din webbläsare' }, explanation: 'Förklaring av steget.' },
      { id: 'b', label: 'Steg B', short: 'Vad som händer sedan.', tag: { variant: 'sim', label: 'Simulerad server' }, explanation: 'Förklaring av steget.' },
    ],
  });
  host.append(h('div', { class: 'demo' }, flow.element));
}
