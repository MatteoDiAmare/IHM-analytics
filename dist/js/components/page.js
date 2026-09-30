// Sidmallen: rubrik, introduktion, förmågor, block, relaterade moment och föregående/nästa.
import { h, inline } from '../core/dom.js';
import { hrefFor, homePage, nextOf, pageById, previousOf } from '../core/pages.js';
import { renderBlock } from './blocks.js';

function relatedBlock(ids) {
  const items = ids.map(pageById).filter(Boolean);
  if (!items.length) return null;
  return h('section', { class: 'block block--related' },
    h('h2', { class: 'block__title' }, 'Relaterade moment'),
    h('ul', { class: 'related' }, items.map((p) => h('li', {}, h('a', { class: 'related__link', href: hrefFor(p) }, p.title)))),
  );
}

function pageNav(page) {
  const prev = previousOf(page);
  const next = nextOf(page);
  return h('nav', { class: 'page-nav', 'aria-label': 'Föregående och nästa moment' },
    prev
      ? h('a', { class: 'page-nav__link page-nav__link--prev', href: hrefFor(prev), rel: 'prev' },
          h('span', { class: 'page-nav__dir' }, '← Föregående'), h('span', { class: 'page-nav__title' }, prev.title))
      : h('span', { class: 'page-nav__spacer' }),
    page.id !== homePage.id
      ? h('a', { class: 'page-nav__home', href: hrefFor(homePage) }, 'Till översikten')
      : h('span', { class: 'page-nav__spacer' }),
    next
      ? h('a', { class: 'page-nav__link page-nav__link--next', href: hrefFor(next), rel: 'next' },
          h('span', { class: 'page-nav__dir' }, 'Nästa →'), h('span', { class: 'page-nav__title' }, next.title))
      : h('span', { class: 'page-nav__spacer' }),
  );
}

export async function renderPage(page) {
  const mod = (await import(`../pages/${page.id}.js`)).default;
  const ctx = { page, level: 2 };
  const article = h('article', { class: 'page', dataset: { page: page.id } });

  if (mod.title !== false) {
    article.append(h('header', { class: 'page-header' },
      h('p', { class: 'page-header__group' }, page.groupTitle),
      h('h1', { class: 'page-header__title', tabindex: '-1' }, page.title),
      mod.intro && h('p', { class: 'page-header__intro' }, inline(mod.intro)),
    ));
  }
  if (mod.abilities?.length) article.append(renderBlock({ type: 'abilities', items: mod.abilities }, ctx));
  for (const block of mod.blocks ?? []) article.append(renderBlock(block, ctx));
  const related = relatedBlock(mod.related ?? []);
  if (related) article.append(related);
  article.append(pageNav(page));
  return article;
}

export function renderNotFound(path, message) {
  return h('article', { class: 'page' },
    h('header', { class: 'page-header' },
      h('h1', { class: 'page-header__title', tabindex: '-1' }, 'Sidan hittades inte'),
      h('p', { class: 'page-header__intro' }, message ?? `Adressen ”${path}” finns inte i kursen. Gå tillbaka till översikten och välj ett moment därifrån.`),
    ),
    h('a', { class: 'btn btn--primary', href: hrefFor(homePage) }, 'Till översikten'),
  );
}
