// Etikett som visar VAR något sker. Betydelsen finns alltid i text och i en symbol, aldrig bara i färg.
import { h } from '../core/dom.js';

const GLYPHS = {
  browser: '●',
  server: '■',
  sim: '◇',
  'tool-a': '▲',
  'tool-b': '◆',
  neutral: '○',
};

export function tag({ label, variant = 'neutral' }) {
  return h('span', { class: `tag tag--${variant}` },
    h('span', { class: 'tag__glyph', 'aria-hidden': 'true' }, GLYPHS[variant] ?? GLYPHS.neutral),
    h('span', { class: 'tag__label' }, label),
  );
}
