// ============================================================================
// FLÖDESKOMPONENTEN (återanvänds av alla visuella moment)
//
//   const flow = createFlow({
//     id: 'mitt-flode',                 // unikt på sidan
//     title: 'Rubrik',
//     intro: 'Valfri text ovanför flödet',
//     headingLevel: 2,                  // rubriknivå för titeln (panelrubriken blir en nivå under)
//     legend: 'auto' | [{ variant, label }],   // förklaring av etiketterna
//     lanes: [{ id, label, note }],     // valfritt: flera spår (standard: ett)
//     emptyDataText: 'Text när ett steg ännu saknar data',
//     steps: [{
//       id, label, short,               // short = en rad, används i textversionen
//       tag: { variant, label },        // var det sker: browser | server | sim | tool-a | tool-b | neutral
//       explanation: 'text' | ['stycke', 'stycke'],
//       lane,                           // valfritt spårid
//       data, dataLabel,                // valfritt: data eleven kan inspektera
//     }],
//   });
//   flow.element         DOM-noden att lägga in på sidan
//   flow.goTo(i) / flow.next() / flow.reset()
//   flow.setData(stepId, data, dataLabel?)   uppdatera data i efterhand (för demonstrationer)
//   flow.on('change' | 'reset', fn)          lyssna på stegbyte och återställning
// ============================================================================
import { h, inline, paragraphs } from '../core/dom.js';
import { tag } from './tag.js';

let counter = 0;

const stringify = (data) => (typeof data === 'string' ? data : JSON.stringify(data, null, 2));

export function createFlow(def) {
  const uid = `flow-${def.id ?? ++counter}`;
  const level = def.headingLevel ?? 2;
  const lanes = def.lanes ?? [{ id: 'main' }];
  const steps = def.steps.map((s, index) => ({ lane: lanes[0].id, ...s, index, data: s.data ?? null, initialData: s.data ?? null }));
  const listeners = { change: [], reset: [] };
  let current = 0;

  const emit = (name, payload) => listeners[name].forEach((fn) => fn(payload));

  // ---- Steg ----
  const buttons = steps.map((step) =>
    h('button', {
      class: 'flow__step-btn',
      type: 'button',
      dataset: { index: step.index },
      onClick: () => goTo(step.index),
    },
      h('span', { class: 'flow__step-num', 'aria-hidden': 'true' }, String(step.index + 1)),
      h('span', { class: 'visually-hidden' }, `Steg ${step.index + 1} av ${steps.length}: `),
      h('span', { class: 'flow__step-label' }, step.label),
      step.tag && tag(step.tag),
      h('span', { class: 'visually-hidden flow__step-state' }),
    ),
  );

  const laneEls = lanes.map((lane) => {
    const own = steps.filter((s) => s.lane === lane.id);
    if (!own.length) return null;
    return h('div', { class: 'flow__lane', dataset: { lane: lane.id } },
      lane.label && h('p', { class: 'flow__lane-label' },
        h('strong', {}, lane.label),
        lane.note && [' ', h('span', { class: 'flow__lane-note' }, lane.note)],
      ),
      h('ol', { class: 'flow__steps', start: own[0].index + 1 },
        own.map((s) => h('li', { class: 'flow__step' }, buttons[s.index])),
      ),
    );
  });

  // ---- Legend ----
  let legendItems = [];
  if (def.legend === 'auto') {
    const seen = new Map();
    steps.forEach((s) => s.tag && seen.set(`${s.tag.variant}|${s.tag.label}`, s.tag));
    legendItems = [...seen.values()];
  } else if (Array.isArray(def.legend)) {
    legendItems = def.legend;
  }

  // ---- Panel ----
  const count = h('p', { class: 'flow__panel-count' });
  const title = h(`h${level + 1}`, { class: 'flow__panel-title' });
  const tagSlot = h('div', { class: 'flow__panel-tag' });
  const text = h('div', { class: 'flow__panel-text' });
  const dataLabel = h('p', { class: 'flow__data-label' });
  const dataCode = h('code', {});
  const dataPre = h('pre', { class: 'code__pre flow__data-pre', tabindex: '0' }, dataCode);
  const dataDetails = h('details', { class: 'flow__data' }, h('summary', {}, 'Inspektera data'), dataLabel, dataPre);
  const next = h('button', { class: 'btn btn--primary', type: 'button', onClick: () => goNext() }, 'Nästa steg');
  const reset = h('button', { class: 'btn', type: 'button', onClick: () => doReset() }, 'Börja om');

  const panel = h('div', { class: 'flow__panel' },
    h('div', { class: 'flow__panel-live', 'aria-live': 'polite', 'aria-atomic': 'true' }, count, title, tagSlot, text),
    dataDetails,
    h('div', { class: 'flow__controls' }, next, reset),
  );

  // ---- Textversion (läsbart alternativ) ----
  const textAlt = h('details', { class: 'flow__textalt' },
    h('summary', {}, 'Visa flödet som text'),
    h('ol', {}, steps.map((s) =>
      h('li', {}, h('strong', {}, s.label), s.tag ? ` (${s.tag.label})` : '', ': ', inline(s.short ?? '')),
    )),
  );

  const element = h('section', { class: 'flow', id: uid, 'aria-labelledby': `${uid}-title` },
    h(`h${level}`, { class: 'flow__title', id: `${uid}-title` }, def.title),
    def.intro && h('p', { class: 'flow__intro' }, inline(def.intro)),
    legendItems.length > 0 && h('ul', { class: 'flow__legend', 'aria-label': 'Förklaring av etiketterna' },
      legendItems.map((item) => h('li', {}, tag(item))),
    ),
    h('div', { class: 'flow__lanes' }, laneEls.filter(Boolean)),
    panel,
    textAlt,
  );

  // ---- Rendering ----
  function render() {
    const step = steps[current];
    buttons.forEach((btn, i) => {
      btn.classList.toggle('is-current', i === current);
      btn.classList.toggle('is-done', i < current);
      if (i === current) btn.setAttribute('aria-current', 'step');
      else btn.removeAttribute('aria-current');
      btn.querySelector('.flow__step-state').textContent = i === current ? ', aktuellt steg' : i < current ? ', avklarat' : '';
    });
    count.textContent = `Steg ${current + 1} av ${steps.length}`;
    title.textContent = step.label;
    tagSlot.replaceChildren(step.tag ? tag(step.tag) : '');
    text.replaceChildren(...paragraphs(step.explanation));
    if (step.data != null) {
      dataDetails.hidden = false;
      dataLabel.textContent = step.dataLabel ?? 'Exempeldata';
      dataCode.textContent = stringify(step.data);
    } else if (def.emptyDataText) {
      dataDetails.hidden = false;
      dataLabel.textContent = def.emptyDataText;
      dataCode.textContent = '';
    } else {
      dataDetails.hidden = true;
    }
    next.disabled = current === steps.length - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(steps.length - 1, index));
    render();
    emit('change', { index: current, step: steps[current] });
  }

  function goNext() {
    const hadFocus = document.activeElement === next;
    goTo(current + 1);
    if (hadFocus && next.disabled) reset.focus(); // fokus ska inte försvinna när knappen stängs av
  }

  function doReset() {
    current = 0;
    render();
    emit('reset', {});
    emit('change', { index: 0, step: steps[0] });
  }

  render();

  return {
    element,
    goTo,
    next: goNext,
    reset: doReset,
    get index() { return current; },
    steps,
    setData(stepId, data, label) {
      const step = steps.find((s) => s.id === stepId);
      if (!step) return;
      step.data = data;
      if (label) step.dataLabel = label;
      if (step.index === current) render();
    },
    clearData() {
      steps.forEach((s) => { s.data = s.initialData ?? null; });
      render();
    },
    on(name, fn) { listeners[name].push(fn); },
  };
}
