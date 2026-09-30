// ============================================================================
// BLOCKTYPER: de byggstenar en sida kan bestå av.
// En sida (src/js/pages/<id>.js) listar block i ordning. Varje block har `type`.
//
//   hero          Startsidans öppning med två ingångar
//   examples      Återkommande exempel (musikspelare, webbshop, formulär)
//   text          Rubrik och stycken (variant: 'note' ger en markerad ruta)
//   list          Rubrik och lista (ordered: true ger numrering)
//   abilities     "Det här kommer du att kunna göra" (läggs till automatiskt av page.abilities)
//   flow          Klickbart flöde, se components/flow.js
//   demo          Interaktiv demonstration som laddas från js/demos/
//   tryit         "Prova själv"
//   whathappens   "Vad händer när du gör det?"
//   devtools      "Titta i DevTools" med flik, steg och förväntat resultat
//   code          Kodexempel med kopieringsknapp
//   glossary      Begreppsförklaring
//   cards         Momentkort från menyn
//   entrances     Ingångar som hoppar till en sektion på samma sida
//   section       Sektion med eget id som kan innehålla fler block
//   slots         Diskret markering av kommande innehåll
// ============================================================================
import { h, inline, paragraphs, prefersReducedMotion } from '../core/dom.js';
import { groups, hrefFor, pageById } from '../core/pages.js';
import { site } from '../config/site.js';
import { createFlow } from './flow.js';
import { codeBlock } from './code-block.js';

const heading = (ctx, text, className = 'block__title', extra = {}) => h(`h${ctx.level}`, { class: className, ...extra }, text);

const KIND_LABELS = {
  flow: 'Visuellt flöde',
  demo: 'Demonstration',
  tryit: 'Prova själv',
  whathappens: 'Vad händer när du gör det?',
  devtools: 'Titta i DevTools',
  code: 'Kodexempel',
  concepts: 'Begrepp',
  text: 'Text',
};

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  const focusTarget = target.querySelector('h2, h3') ?? target;
  focusTarget.setAttribute('tabindex', '-1');
  focusTarget.focus({ preventScroll: true });
}

export const renderers = {
  hero(block, ctx) {
    return h('section', { class: 'hero' },
      h('p', { class: 'hero__kicker' }, block.kicker ?? `Kurs ${site.code}`),
      h('h1', { class: 'hero__title', tabindex: '-1' }, block.title ?? site.title),
      h('p', { class: 'hero__text' }, inline(block.text)),
      h('div', { class: 'hero__actions' },
        (block.actions ?? []).map((a) =>
          a.page
            ? h('a', { class: `btn btn--large ${a.primary ? 'btn--primary' : ''}`, href: hrefFor(pageById(a.page) ?? { path: a.page }) }, a.label)
            : h('button', { class: `btn btn--large ${a.primary ? 'btn--primary' : ''}`, type: 'button', onClick: () => scrollToId(a.scrollTo) }, a.label),
        ),
      ),
    );
  },

  examples(block, ctx) {
    return h('section', { class: 'block block--examples' },
      heading(ctx, block.title ?? 'Tre exempel som vi återkommer till'),
      h('ul', { class: 'examples' },
        block.items.map((item) => h('li', { class: 'example' },
          h('h3', { class: 'example__title' }, item.title),
          h('p', {}, inline(item.text)),
        )),
      ),
    );
  },

  text(block, ctx) {
    return h('section', { class: `block block--text ${block.variant === 'note' ? 'block--note' : ''}` },
      block.title && heading(ctx, block.title),
      paragraphs(block.paragraphs),
    );
  },

  list(block, ctx) {
    return h('section', { class: 'block block--list' },
      heading(ctx, block.title),
      block.intro && h('p', {}, inline(block.intro)),
      h(block.ordered ? 'ol' : 'ul', { class: 'block__list' }, block.items.map((i) => h('li', {}, inline(i)))),
    );
  },

  abilities(block, ctx) {
    return renderers.list({ title: 'Det här kommer du att kunna göra', items: block.items }, ctx);
  },

  flow(block, ctx) {
    return h('div', { class: 'block block--flow' }, createFlow({ headingLevel: ctx.level, ...block.flow }).element);
  },

  demo(block, ctx) {
    const host = h('div', { class: 'demo-host' }, h('p', { class: 'demo-host__loading' }, 'Laddar demonstrationen …'));
    block.load()
      .then((mod) => { host.replaceChildren(); mod.mount(host, { level: ctx.level }); })
      .catch((error) => {
        console.error(error);
        host.replaceChildren(h('p', { role: 'alert' }, 'Demonstrationen kunde inte laddas. Ladda om sidan och försök igen.'));
      });
    return h('section', { class: 'block block--demo' },
      block.title && heading(ctx, block.title),
      host,
    );
  },

  tryit(block, ctx) {
    return h('section', { class: 'block block--tryit' },
      heading(ctx, block.title ?? 'Prova själv'),
      paragraphs(block.paragraphs),
      block.steps && h('ol', { class: 'block__list' }, block.steps.map((s) => h('li', {}, inline(s)))),
    );
  },

  whathappens(block, ctx) {
    return h('section', { class: 'block block--whathappens' },
      heading(ctx, block.title ?? 'Vad händer när du gör det?'),
      paragraphs(block.paragraphs),
      block.items && h('ul', { class: 'block__list' }, block.items.map((s) => h('li', {}, inline(s)))),
    );
  },

  // Struktur för DevTools-instruktioner: en flik och steg med "gör" och "förväntat resultat".
  devtools(block, ctx) {
    return h('section', { class: 'block block--devtools' },
      heading(ctx, block.title ?? 'Titta i DevTools'),
      block.open && h('p', {}, inline(block.open)),
      h('p', { class: 'devtools__tab' }, 'Flik: ', h('span', { class: 'devtools__tab-name' }, block.tab)),
      h('ol', { class: 'devtools__steps' },
        block.steps.map((s) => h('li', { class: 'devtools__step' },
          h('p', { class: 'devtools__do' }, h('strong', {}, 'Gör: '), inline(s.do)),
          s.expect && h('p', { class: 'devtools__expect' }, h('strong', {}, 'Förväntat: '), inline(s.expect)),
        )),
      ),
      block.note && h('p', { class: 'block__note' }, inline(block.note)),
    );
  },

  code(block, ctx) {
    return h('div', { class: 'block block--code' }, codeBlock(block));
  },

  glossary(block, ctx) {
    return h('section', { class: 'block block--glossary' },
      heading(ctx, block.title ?? 'Begrepp'),
      h('dl', { class: 'glossary' },
        block.terms.map((t) => h('div', { class: 'glossary__item' },
          h('dt', {}, t.term, t.en && [' ', h('span', { class: 'glossary__en', lang: 'en' }, `(${t.en})`)]),
          h('dd', {}, inline(t.text)),
        )),
      ),
    );
  },

  cards(block, ctx) {
    const exclude = new Set(block.exclude ?? []);
    return h('section', { class: 'block block--cards', id: block.id },
      heading(ctx, block.title ?? 'Alla moment', 'block__title', { tabindex: '-1' }),
      groups.map((group) => {
        const list = group.pages.filter((p) => !exclude.has(p.id));
        if (!list.length) return null;
        return h('div', { class: 'card-group' },
          h(`h${ctx.level + 1}`, { class: 'card-group__title' }, group.title),
          h('ul', { class: 'cards' },
            list.map((p) => h('li', { class: 'card' },
              h(`h${ctx.level + 2}`, { class: 'card__title' }, h('a', { class: 'card__link', href: hrefFor({ path: p.path ?? p.id }) }, p.title)),
              h('p', { class: 'card__summary' }, p.summary),
            )),
          ),
        );
      }),
    );
  },

  entrances(block, ctx) {
    return h('section', { class: 'block block--entrances' },
      block.title && heading(ctx, block.title),
      h('ul', { class: 'entrances' },
        block.items.map((item) => h('li', { class: 'entrance' },
          h('button', { class: 'entrance__btn', type: 'button', onClick: () => scrollToId(item.target) },
            h('span', { class: 'entrance__label' }, item.label),
            h('span', { class: 'entrance__text' }, item.text),
            h('span', { class: 'entrance__go', 'aria-hidden': 'true' }, 'Gå till avsnittet ↓'),
          ),
        )),
      ),
    );
  },

  section(block, ctx) {
    const inner = { ...ctx, level: ctx.level + 1 };
    return h('section', { class: 'block block--section', id: block.id, 'aria-labelledby': `${block.id}-title` },
      heading(ctx, block.title, 'block__title', { id: `${block.id}-title` }),
      block.intro && paragraphs(block.intro),
      (block.blocks ?? []).map((b) => renderBlock(b, inner)),
    );
  },

  // Diskret markering av innehåll som byggs i nästa etapp.
  slots(block, ctx) {
    return h('section', { class: 'upcoming' },
      heading(ctx, block.title ?? 'Kommer härnäst', 'upcoming__title'),
      h('p', { class: 'upcoming__note' }, 'Detta moment byggs vidare i nästa etapp.'),
      h('ul', { class: 'upcoming__list' },
        block.items.map((item) => h('li', { class: 'upcoming__item' },
          h('span', { class: 'upcoming__kind' }, KIND_LABELS[item.kind] ?? item.kind),
          h('span', { class: 'upcoming__text' }, h('strong', {}, item.title), item.text && [': ', inline(item.text)]),
        )),
      ),
    );
  },
};

export function renderBlock(block, ctx) {
  const render = renderers[block.type];
  if (!render) throw new Error(`Okänd blocktyp: ${block.type}`);
  return render(block, ctx);
}
