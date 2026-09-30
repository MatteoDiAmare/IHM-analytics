// Sidomenyn: byggs från config/menu.js. Hanterar aktiv sida och mobilmeny.
import { h } from './dom.js';
import { groups, hrefFor } from './pages.js';

export function mountNav() {
  const nav = document.getElementById('site-nav');
  const sidebar = document.getElementById('sidebar');
  const button = document.getElementById('menu-button');
  const backdrop = document.getElementById('backdrop');
  const content = document.getElementById('content-wrap');
  const desktop = window.matchMedia('(min-width: 60rem)');

  const links = new Map();
  for (const group of groups) {
    const list = h('ul', { class: 'nav__list' });
    for (const page of group.pages) {
      const link = h('a', { class: 'nav__link', href: hrefFor({ path: page.path ?? page.id }) }, page.title);
      links.set(page.id, link);
      list.append(h('li', {}, link));
    }
    const showTitle = group.showTitleInMenu !== false;
    const titleId = `nav-group-${group.id}`;
    nav.append(
      h('div', { class: `nav__group${showTitle ? '' : ' nav__group--single'}` },
        showTitle && h('p', { class: 'nav__group-title', id: titleId }, group.title),
        !showTitle && h('span', { class: 'visually-hidden', id: titleId }, group.title),
        (list.setAttribute('aria-labelledby', titleId), list),
      ),
    );
  }

  const isOpen = () => sidebar.classList.contains('is-open');
  function setOpen(open, { restoreFocus = true } = {}) {
    sidebar.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    backdrop.hidden = !open;
    content.toggleAttribute('inert', open);
    document.body.classList.toggle('nav-open', open);
    if (open) sidebar.querySelector('.nav__link[aria-current], .nav__link')?.focus();
    else if (restoreFocus) button.focus();
  }

  button.addEventListener('click', () => setOpen(!isOpen()));
  backdrop.addEventListener('click', () => setOpen(false));
  nav.addEventListener('click', (e) => { if (e.target.closest('a') && isOpen()) setOpen(false, { restoreFocus: false }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) setOpen(false); });
  desktop.addEventListener('change', () => { if (isOpen()) setOpen(false, { restoreFocus: false }); });

  return {
    setActive(id) {
      for (const [pageId, link] of links) {
        if (pageId === id) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
    },
    close() { if (isOpen()) setOpen(false, { restoreFocus: false }); },
  };
}
