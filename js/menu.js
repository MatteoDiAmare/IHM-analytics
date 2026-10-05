// Mobilmenyn. Utan JavaScript fungerar siten ändå: varje sida har länkar till föregående och nästa sida längst ned.
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
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sidebar.classList.contains('is-open')) setOpen(false); });
desktop.addEventListener('change', () => { if (sidebar.classList.contains('is-open')) setOpen(false, false); });
