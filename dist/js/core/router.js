// Hash-baserad router: adresser ser ut som #/digitala-plattformar.
// Fungerar på all statisk hosting, med direktlänkar, omladdning och bakåt/framåt.
// Vill man senare byta till riktiga sökvägar behöver bara den här filen ändras.
import { homePage, pageByPath, hrefFor } from './pages.js';

export function currentPath() {
  const raw = location.hash.replace(/^#\/?/, '').split('?')[0].replace(/\/$/, '');
  try { return decodeURIComponent(raw); } catch { return raw; }
}

export function startRouter(onRoute) {
  const handle = () => {
    const path = currentPath();
    if (!path) {
      location.replace(hrefFor(homePage)); // ger hashchange, som anropar handle igen
      return;
    }
    onRoute(pageByPath(path), path);
  };
  window.addEventListener('hashchange', handle);
  handle();
}
