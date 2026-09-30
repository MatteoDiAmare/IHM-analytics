// Kodexempel med kopieringsknapp.
import { h, inline } from '../core/dom.js';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = h('textarea', { class: 'visually-hidden', 'aria-hidden': 'true', tabindex: '-1' });
    area.value = text;
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    area.remove();
    return ok;
  }
}

/** codeBlock({ title, lang, code, note }) */
export function codeBlock({ title, lang, code, note }) {
  const status = h('span', { class: 'visually-hidden', role: 'status' });
  const button = h('button', { class: 'btn btn--small', type: 'button' }, 'Kopiera');
  let timer;
  button.addEventListener('click', async () => {
    const ok = await copyText(code);
    button.textContent = ok ? 'Kopierat' : 'Kopiera';
    status.textContent = ok ? 'Koden är kopierad' : 'Det gick inte att kopiera. Markera texten och kopiera själv.';
    clearTimeout(timer);
    timer = setTimeout(() => { button.textContent = 'Kopiera'; status.textContent = ''; }, 2500);
  });
  return h('figure', { class: 'code' },
    h('figcaption', { class: 'code__bar' },
      h('span', { class: 'code__title' }, title ?? lang ?? 'Kod'),
      lang && title && h('span', { class: 'code__lang' }, lang),
      button,
      status,
    ),
    h('pre', { class: 'code__pre', tabindex: '0' }, h('code', {}, code)),
    note && h('p', { class: 'code__note' }, inline(note)),
  );
}
