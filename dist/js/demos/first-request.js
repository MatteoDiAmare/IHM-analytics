// ============================================================================
// DEMONSTRATION 1: Spela → event → request → simulerad server → svar
//
// Vad som körs på riktigt i webbläsaren: klicket, eventet, payloaden, Request-objektet,
// Response-objektet (skapat lokalt) och uppdateringen av sidan.
// Vad som är simulerat: servern, lagringen och svaret. Inget nätverksanrop görs alls.
// ============================================================================
import { h } from '../core/dom.js';
import { createFlow } from '../components/flow.js';
import { codeBlock } from '../components/code-block.js';

const TRACK = { id: 'demo-track-01', title: 'Sommarlåt (demo)' };
const ENDPOINT = '/api/events';

// Koden som visas för eleven. Håll den i takt med handlePlay() nedan.
const SNIPPET = `const knapp = document.querySelector('#play');

knapp.addEventListener('click', (event) => {
  // 1. Beskriv vad som hände (payload)
  const payload = {
    event: 'play_track',
    track_id: 'demo-track-01',
    occurred_at: new Date().toISOString(),
  };

  // 2. Bygg en request till en endpoint
  const request = new Request('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // 3. Med en riktig server skulle du skicka den:
  //    const response = await fetch(request);
  console.log('[demo] event skapat', payload);
});`;

const newId = () => (globalThis.crypto?.randomUUID?.() ?? `ev-${Math.random().toString(36).slice(2, 10)}`);

export function mount(host, { level = 2 } = {}) {
  const table = []; // "databasen" i den simulerade servern: en lista i minnet
  let run = null;   // data från senaste klicket

  // ---- Musikspelaren ----
  const status = h('p', { class: 'player__status', role: 'status' }, 'Ingen låt spelas.');
  const playButton = h('button', { class: 'btn btn--primary btn--large', type: 'button', id: 'play' }, 'Spela');
  const historyList = h('ul', { class: 'player__history-list' });
  const historyEmpty = h('p', { class: 'player__history-empty' }, 'Tom. Raderna dyker upp när du når sista steget i flödet.');
  const history = h('div', { class: 'player__history' },
    h(`h${level + 1}`, { class: 'player__history-title' }, 'Spelhistorik (simulerad lagring)'),
    historyEmpty,
    historyList,
  );

  const player = h('div', { class: 'player' },
    h('div', { class: 'player__art', 'aria-hidden': 'true' }),
    h('div', { class: 'player__info' },
      h('p', { class: 'player__title' }, TRACK.title),
      h('p', { class: 'player__meta' }, 'Demospelare utan ljud'),
    ),
    playButton,
    status,
    history,
  );

  // ---- Flödet ----
  const flow = createFlow({
    id: 'first-request',
    title: 'Följ ditt klick',
    intro: 'Tryck **Spela** och gå sedan igenom stegen med **Nästa steg**. Öppna **Inspektera data** för att se vad som skapades.',
    headingLevel: level,
    emptyDataText: 'Ingen data ännu. Tryck Spela ovan så fylls den i.',
    legend: [
      { variant: 'browser', label: 'Körs på riktigt i din webbläsare' },
      { variant: 'sim', label: 'Simulering: ingen server finns i den här siten' },
    ],
    steps: [
      {
        id: 'click', label: 'Klick', short: 'Du trycker på Spela och webbläsaren skapar ett event.',
        tag: { variant: 'browser', label: 'Körs i din webbläsare' },
        explanation: 'Du trycker på knappen. Webbläsaren skapar ett **event** av typen `click` och skickar det till knappen. Datat här är ett verkligt event från din egen webbläsare.',
      },
      {
        id: 'handler', label: 'JavaScript-kod', short: 'En event listener körs och samlar ihop en payload.',
        tag: { variant: 'browser', label: 'Körs i din webbläsare' },
        explanation: 'Koden med `addEventListener` har väntat på eventet. Nu körs den och samlar ihop en **payload**: en liten datamängd som beskriver vad som hände. Identifieraren `event_id` skapas i din webbläsare.',
      },
      {
        id: 'request', label: 'Request', short: 'Koden bygger en request. Den skickas inte iväg.',
        tag: { variant: 'browser', label: 'Byggs i din webbläsare, skickas inte' },
        explanation: [
          'Koden packar payloaden i en **request**: metoden `POST`, en adress (**endpoint**) och en body i JSON. Objektet är ett riktigt `Request` i din webbläsare.',
          'Den skickas inte iväg, eftersom den här siten saknar server. Därför visas inget i Network-fliken för det här steget.',
        ],
      },
      {
        id: 'server', label: 'Server', short: 'En simulerad server tar emot requesten och kontrollerar den.',
        tag: { variant: 'sim', label: 'Simulerad server' },
        explanation: 'Här skulle en server på en annan dator ta emot requesten. I demot är servern en funktion i samma sida. Den kontrollerar att fälten finns och lägger på en mottagningstid, ungefär som en riktig server gör.',
      },
      {
        id: 'storage', label: 'Lagring', short: 'Den simulerade servern sparar en rad i en lista i minnet.',
        tag: { variant: 'sim', label: 'Simulerad lagring' },
        explanation: 'En riktig server sparar raden i en databas. Här är tabellen en lista i webbläsarens minne, och den töms när du laddar om sidan eller trycker **Börja om**.',
      },
      {
        id: 'response', label: 'Response', short: 'Ett simulerat svar med statuskod och body.',
        tag: { variant: 'sim', label: 'Simulerat svar' },
        explanation: 'Servern svarar med en **statuskod**. `201` betyder att något skapades. Svaret är ett `Response`-objekt som byggs lokalt i demot. Det har inte kommit över nätverket.',
      },
      {
        id: 'ui', label: 'Återkoppling', short: 'Sidan uppdateras så att du ser vad som hände.',
        tag: { variant: 'browser', label: 'Körs i din webbläsare' },
        explanation: [
          'Tillbaka i webbläsaren använder koden svaret för att uppdatera sidan. Spelhistoriken ovan fylls på.',
          'Notera att statusen "Spelar" visades direkt vid klicket. Att spara historiken är en egen request. Mätning (tracking) kan senare kopplas till samma händelse och påverkar inte om låten spelas.',
        ],
      },
    ],
  });

  // ---- Simulerad server: en vanlig funktion, ingen nätverkstrafik ----
  async function simulatedServer(request) {
    const body = await request.clone().json();
    const missing = ['event', 'track_id', 'occurred_at', 'event_id'].filter((key) => !(key in body));
    if (missing.length) {
      return new Response(JSON.stringify({ ok: false, missing }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const row = { id: table.length + 1, ...body, received_at: new Date().toISOString() };
    table.push(row);
    return new Response(JSON.stringify({ ok: true, id: row.id }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  }

  async function handlePlay(event) {
    const clickInfo = {
      type: event.type,
      target: 'button#play',
      isTrusted: event.isTrusted,
      timeStamp_ms: Math.round(event.timeStamp * 10) / 10,
    };
    const payload = {
      event: 'play_track',
      track_id: TRACK.id,
      track_title: TRACK.title,
      occurred_at: new Date().toISOString(),
      event_id: newId(),
    };
    const request = new Request(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('[demo] event skapat i webbläsaren', payload);

    const response = await simulatedServer(request);
    const responseBody = await response.clone().json();
    const serverRow = table[table.length - 1];

    status.textContent = `Spelar ${TRACK.title}. Demot spelar inget ljud.`;
    run = { rows: table.length };

    flow.setData('click', clickInfo, 'Event-data (verklig, från din webbläsare)');
    flow.setData('handler', payload, 'Payload (verklig data som koden skapade)');
    flow.setData('request', {
      method: request.method,
      url: request.url,
      headers: { 'content-type': request.headers.get('content-type') },
      body: payload,
      skickad: false,
    }, 'Request-objekt (verkligt objekt, skickas inte)');
    flow.setData('server', {
      mottagen_body: payload,
      kontroll: 'Alla obligatoriska fält finns',
      received_at: serverRow?.received_at,
    }, 'Simulerad server (påhittad mottagning, inget nätverk)');
    flow.setData('storage', { tabell: 'play_events (simulerad)', rader: [...table] }, 'Simulerad lagring (lista i minnet)');
    flow.setData('response', {
      status: response.status,
      ok: response.ok,
      headers: { 'content-type': response.headers.get('content-type') },
      body: responseBody,
    }, 'Simulerat svar (Response-objekt byggt lokalt)');
    flow.setData('ui', { status_text: status.textContent, historikrader_synliga: table.length }, 'Ändringar i sidan (verkliga)');
    flow.goTo(0);
  }

  function renderHistory() {
    historyList.replaceChildren(...table.map((row) =>
      h('li', {}, `#${row.id} ${row.track_title}, mottagen ${new Date(row.received_at).toLocaleTimeString('sv-SE')}`),
    ));
    historyEmpty.hidden = table.length > 0;
  }

  flow.on('change', ({ step }) => {
    if (step.id === 'ui' && run) renderHistory();
  });

  flow.on('reset', () => {
    table.length = 0;
    run = null;
    flow.clearData();
    status.textContent = 'Ingen låt spelas.';
    historyList.replaceChildren();
    historyEmpty.hidden = false;
  });

  playButton.addEventListener('click', handlePlay);
  historyEmpty.hidden = false;

  host.append(
    h('div', { class: 'demo' }, player, flow.element),
    codeBlock({ title: 'Koden bakom knappen', lang: 'JavaScript', code: SNIPPET, note: 'Kopiera koden och prova den i Console. `fetch` är bortkommenterad eftersom den här siten saknar server.' }),
  );
}
