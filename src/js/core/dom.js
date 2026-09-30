// Små hjälpfunktioner för att bygga DOM utan ramverk.

/** h('div', { class: 'x', onClick: fn }, ...barn) */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === false || value == null) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value);
    else el.setAttribute(key, value === true ? '' : value);
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return el;
}

/** Text med enkel inline-markering: `kod` och **fetstil**. Allt annat är vanlig text. */
export function inline(text) {
  const frag = document.createDocumentFragment();
  for (const part of String(text).split(/(`[^`]+`|\*\*[^*]+\*\*)/)) {
    if (!part) continue;
    if (part.startsWith('`')) frag.append(h('code', {}, part.slice(1, -1)));
    else if (part.startsWith('**')) frag.append(h('strong', {}, part.slice(2, -2)));
    else frag.append(document.createTextNode(part));
  }
  return frag;
}

/** En sträng eller lista av strängar blir stycken. */
export function paragraphs(text, className = '') {
  return [].concat(text ?? []).map((t) => h('p', { class: className }, inline(t)));
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
