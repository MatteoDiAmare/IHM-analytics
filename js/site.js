// Menyn och navigeringen. Ändra bara listan MENU nedan när du lägger till en sida:
//   1. skapa <namn>.html (kopiera en befintlig sida och ändra innehållet, och data-page i <body>)
//   2. lägg en rad i MENU
//   3. lägg ett kort på index.html och en rad i sitemap.xml
// Utan JavaScript hittar man alla sidor via korten på index.html.

const MENU = [
  {
    "group": "Start",
    "pages": [
      {
        "page": "index",
        "title": "Översikt"
      }
    ]
  },
  {
    "group": "Bygg och förstå",
    "pages": [
      {
        "page": "digitala-plattformar",
        "title": "Digitala plattformar"
      },
      {
        "page": "html-css-dom",
        "title": "HTML, CSS och DOM"
      },
      {
        "page": "javascript-och-handelser",
        "title": "JavaScript och händelser"
      },
      {
        "page": "http-api-network",
        "title": "HTTP, API och Network"
      }
    ]
  },
  {
    "group": "Samla in och förstå data",
    "pages": [
      {
        "page": "cookies-och-webblasarlagring",
        "title": "Cookies och webbläsarlagring"
      },
      {
        "page": "identifiering",
        "title": "Identifiering"
      },
      {
        "page": "tracking-och-datalayer",
        "title": "Tracking och dataLayer"
      },
      {
        "page": "taghantering",
        "title": "Tagghantering"
      },
      {
        "page": "samtycke",
        "title": "Samtycke"
      },
      {
        "page": "datainsamling-klient-server",
        "title": "Datainsamling på klient och server"
      }
    ]
  },
  {
    "group": "Analytics och sökbarhet",
    "pages": [
      {
        "page": "google-analytics",
        "title": "Så arbetar du med Google Analytics 4"
      },
      {
        "page": "search-console",
        "title": "Search Console och indexering"
      },
      {
        "page": "tillganglighet",
        "title": "Tillgänglighet på webben"
      }
    ]
  },
  {
    "group": "Arbeta praktiskt",
    "pages": [
      {
        "page": "verktyg-och-arbetsflode",
        "title": "Verktyg och arbetsflöde"
      },
      {
        "page": "felsokning",
        "title": "Felsökning"
      }
    ]
  }
];

const FLAT = MENU.flatMap((g) => g.pages.map((p) => ({ ...p, group: g.group })));
const current = document.body.dataset.page;
const href = (slug) => `${slug}.html`;

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  node.append(...children);
  return node;
}

// ---- Sidomenyn ----
const nav = document.getElementById('site-nav');
nav.replaceChildren();
MENU.forEach((g, i) => {
  const titleId = `nav-group-${i}`;
  const list = el('ul', { class: 'nav__list', 'aria-labelledby': titleId });
  for (const p of g.pages) {
    const a = el('a', { class: 'nav__link', href: href(p.page) }, p.title);
    if (p.page === current) a.setAttribute('aria-current', 'page');
    list.append(el('li', {}, a));
  }
  nav.append(el('div', { class: 'nav__group' }, el('p', { class: 'nav__group-title', id: titleId }, g.group), list));
});

// ---- Föregående och nästa ----
const pageNav = document.getElementById('page-nav');
const idx = FLAT.findIndex((p) => p.page === current);
const link = (p, cls, dir, rel) => {
  const a = el('a', { class: `page-nav__link ${cls}`, href: href(p.page), rel }, el('span', { class: 'page-nav__dir' }, dir), el('span', { class: 'page-nav__title' }, p.title));
  return a;
};
if (idx >= 0) {
  pageNav.append(
    idx > 0 ? link(FLAT[idx - 1], 'page-nav__link--prev', '← Föregående', 'prev') : el('span', { class: 'page-nav__spacer' }),
    current !== 'index' ? el('a', { class: 'page-nav__home', href: 'index.html' }, 'Till översikten') : el('span', { class: 'page-nav__spacer' }),
    idx < FLAT.length - 1 ? link(FLAT[idx + 1], 'page-nav__link--next', 'Nästa →', 'next') : el('span', { class: 'page-nav__spacer' }),
  );
} else {
  pageNav.remove();
}

// ---- Mobilmenyn ----
const button = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');
const content = document.getElementById('content-wrap');
const desktop = window.matchMedia('(min-width: 60rem)'); // samma brytpunkt som i css/base.css

function setOpen(open, restoreFocus = true) {
  sidebar.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  content.toggleAttribute('inert', open);
  document.body.classList.toggle('nav-open', open);
  if (open) sidebar.querySelector('.nav__link[aria-current], .nav__link')?.focus();
  else if (restoreFocus) button.focus();
}

button.addEventListener('click', () => setOpen(!sidebar.classList.contains('is-open')));
backdrop.addEventListener('click', () => setOpen(false));
nav.addEventListener('click', (e) => { if (e.target.closest('a') && sidebar.classList.contains('is-open')) setOpen(false, false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('is-open')) setOpen(false); });
desktop.addEventListener('change', () => { if (sidebar.classList.contains('is-open')) setOpen(false, false); });
