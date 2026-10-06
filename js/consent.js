// Samtyckesrutan: besökaren väljer ja eller nej till statistik.
//
//   - Valet sparas i en egen cookie (SAMTYCKE_COOKIE) i 180 dagar.
//   - Vid ja anropas startAnalytics() i analytics.js. Vid nej anropas stopAnalytics().
//     All Google-kod finns i analytics.js, inte här.
//   - Före valet, och efter nej, skickas ingenting till Google och inga Analytics-cookies sätts.
//   - "Cookieinställningar" i sidfoten öppnar rutan igen så att valet kan ändras.
//   - Siten fungerar likadant oavsett val.
// analytics.js måste ligga före den här filen i <head> (båda med defer).

const SAMTYCKE_COOKIE = 'samtycke_statistik';
const GILTIG_DAGAR = 180;

// ---------- Cookie ----------
function lasCookie(namn) {
  const hit = document.cookie.split('; ').find((c) => c.startsWith(namn + '='));
  return hit ? decodeURIComponent(hit.slice(namn.length + 1)) : null;
}
function sattCookie(namn, varde, dagar) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${namn}=${encodeURIComponent(varde)}; max-age=${dagar * 86400}; path=/; SameSite=Lax${secure}`;
}

// ---------- Anrop till analytics.js ----------
function startaStatistik() {
  if (typeof window.startAnalytics === 'function') window.startAnalytics();
  else console.warn('analytics.js saknas: lägg <script src="analytics.js" defer></script> före consent.js i <head>.');
}
function stoppaStatistik() {
  if (typeof window.stopAnalytics === 'function') window.stopAnalytics();
}

// ---------- Rutan ----------
let ruta = null;
function stangRuta() { ruta?.remove(); ruta = null; document.body.style.paddingBottom = ''; }

function valj(svar) {
  sattCookie(SAMTYCKE_COOKIE, svar, GILTIG_DAGAR);
  if (svar === 'ja') startaStatistik(); else stoppaStatistik();
  stangRuta();
  document.querySelector('.consent-link')?.focus();
}

function visaRuta(flyttaFokus = false) {
  if (ruta) return;
  ruta = document.createElement('section');
  ruta.className = 'consent';
  ruta.setAttribute('role', 'region');
  ruta.setAttribute('aria-labelledby', 'consent-title');
  ruta.innerHTML = `
    <div class="consent__inner">
      <h2 class="consent__title" id="consent-title">Statistik och cookies</h2>
      <p class="consent__text">Vill du hjälpa oss förbättra siten genom att vi mäter hur den används med Google Analytics? Det sätter cookies och skickar uppgifter till Google. Siten fungerar likadant om du säger nej. Du kan ändra dig när som helst via Cookieinställningar längst ned. <a href="samtycke.html">Läs mer om samtycke</a>.</p>
      <div class="consent__actions">
        <button type="button" class="btn" data-val="ja">Ja, godkänn statistik</button>
        <button type="button" class="btn" data-val="nej">Nej tack</button>
      </div>
    </div>`;
  ruta.addEventListener('click', (e) => { const b = e.target.closest('[data-val]'); if (b) valj(b.dataset.val); });
  // Först i dokumentet, så att tangentbordsanvändare når den direkt. Visas längst ned med CSS.
  document.body.prepend(ruta);
  document.body.style.paddingBottom = ruta.offsetHeight + 'px'; // så att rutan inte döljer innehåll
  if (flyttaFokus) ruta.querySelector('button').focus();       // när besökaren själv öppnade den
}

// ---------- Start ----------
const sparat = lasCookie(SAMTYCKE_COOKIE);
if (sparat === 'ja') startaStatistik();
else if (sparat === 'nej') stoppaStatistik();
else visaRuta(false);

// Länk i sidfoten för att ändra valet
const foot = document.querySelector('.site-footer p');
if (foot) {
  const knapp = document.createElement('button');
  knapp.type = 'button';
  knapp.className = 'consent-link';
  knapp.textContent = 'Cookieinställningar';
  knapp.addEventListener('click', () => visaRuta(true));
  foot.append(' ', knapp);
}
