import { site } from './config/site.js';
import { startRouter } from './core/router.js';
import { mountNav } from './core/nav.js';
import { renderPage, renderNotFound } from './components/page.js';
import { initIntegrations, onPageView } from './integrations/index.js';

const main = document.getElementById('main');
const announcer = document.getElementById('route-announcer');
const nav = mountNav();
let firstRender = true;
let renderToken = 0;

document.querySelector('[data-skip-link]').addEventListener('click', (e) => {
  e.preventDefault(); // href="#main" skulle annars ändra adressen och förstöra routern
  main.focus();
});

initIntegrations();

startRouter(async (page, path) => {
  const token = ++renderToken;
  nav.close();
  let article;
  let title;
  try {
    if (page) {
      article = await renderPage(page);
      title = page.id === 'oversikt' ? site.fullTitle : `${page.title} · ${site.fullTitle}`;
    } else {
      article = renderNotFound(path);
      title = `Sidan hittades inte · ${site.fullTitle}`;
    }
  } catch (error) {
    console.error(error);
    article = renderNotFound(path, 'Innehållet kunde inte laddas. Försök igen om en stund.');
    title = `Fel · ${site.fullTitle}`;
  }
  if (token !== renderToken) return; // ett nyare sidbyte har hunnit före
  main.replaceChildren(article);
  document.title = title;
  nav.setActive(page?.id ?? null);
  window.scrollTo(0, 0);
  if (!firstRender) {
    (article.querySelector('h1') ?? main).focus({ preventScroll: true });
    announcer.textContent = `Öppnade sidan ${page?.title ?? 'Sidan hittades inte'}`;
  }
  firstRender = false;
  if (page) onPageView(page);
});
