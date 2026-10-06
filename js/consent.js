// Samtycke till statistik och förberedelse för Google Analytics 4.
//
// SÅ KOPPLAR DU IN GOOGLE ANALYTICS
//   1. Skapa en webbdataström i Google Analytics och kopiera mätvärdes-ID:t (G-XXXXXXXXXX).
//   2. Skriv in det på raden GA_ID nedan. Det är det enda stället ID:t behöver stå.
//   3. Publicera och kontrollera: se "Kontrollera" längst ned i den här filen.
//
// Så fungerar det:
//   - Besökaren får en ruta med två lika tydliga val: ja eller nej.
//   - Valet sparas i en egen cookie (SAMTYCKE_COOKIE) i 180 dagar.
//   - Google-skriptet laddas BARA efter ja. Säger besökaren nej, eller inte har valt än,
//     skickas ingenting till Google och inga Analytics-cookies sätts.
//   - "Cookieinställningar" i sidfoten öppnar rutan igen så att valet kan ändras.
//   - Siten fungerar likadant oavsett val.
// Använder du Google Tag Manager i stället för gtag.js: byt innehållet i laddaStatistik().

const GA_ID = '';                       // t.ex. 'G-ABC123XYZ9'. Tomt = ingen mätning.
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
function taBortAnalyticsCookies() {
  // Google sätter cookies som börjar på _ga. Ta bort dem när besökaren säger nej.
  const doman = location.hostname;
  for (const c of document.cookie.split('; ')) {
    const namn = c.split('=')[0];
    if (!namn.startsWith('_ga')) continue;
    for (const d of [doman, '.' + doman, '']) {
      document.cookie = `${namn}=; max-age=0; path=/${d ? '; domain=' + d : ''}`;
    }
  }
}

// ---------- Google Analytics ----------
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

// Consent Mode: allt nekat tills besökaren har sagt ja. Måste sättas före Google-taggen laddas.
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

let statistikLaddad = false;
function laddaStatistik() {
  if (!GA_ID) { console.info('Google Analytics: inget mätvärdes-ID är ifyllt i js/consent.js.'); return; }
  if (statistikLaddad) { gtag('consent', 'update', { analytics_storage: 'granted' }); return; }
  statistikLaddad = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.append(s);
  gtag('js', new Date());
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('config', GA_ID);   // skickar sidvisningen (page_view)
}
function stoppaStatistik() {
  if (statistikLaddad) gtag('consent', 'update', { analytics_storage: 'denied' });
  taBortAnalyticsCookies();
}

// ---------- Rutan ----------
let ruta = null;
function stangRuta() { ruta?.remove(); ruta = null; document.body.style.paddingBottom = ''; }

function valj(svar) {
  sattCookie(SAMTYCKE_COOKIE, svar, GILTIG_DAGAR);
  if (svar === 'ja') laddaStatistik(); else stoppaStatistik();
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
if (sparat === 'ja') laddaStatistik();
else if (sparat === 'nej') taBortAnalyticsCookies();
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

// KONTROLLERA
//   - Öppna siten i ett privat fönster. Rutan ska visas och DevTools → Network ska inte visa några anrop till google.
//   - Tryck "Nej tack": inga anrop, inga _ga-cookies (Application → Cookies).
//   - Tryck "Ja": nu syns ett anrop till googletagmanager.com och collect-anrop till google-analytics.com,
//     och cookies som _ga och _ga_<ID> finns.
//   - Realtid i Google Analytics ska visa ditt besök efter någon minut.
