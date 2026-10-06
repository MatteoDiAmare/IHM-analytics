// Google Analytics 4 för den här siten. Laddas på alla sidor som ska mätas:
//
//   <head>
//     <title>Teknik för digitala plattformar</title>
//     <script src="analytics.js" defer></script>
//   </head>
//
// Samtyckeslösningen (js/consent.js) anropar startAnalytics() när besökaren har sagt ja
// till statistik, och stopAnalytics() när besökaren säger nej. Den här filen bestämmer
// aldrig själv om mätning får ske, den gör bara jobbet när den blir ombedd.
//
// SÅ KOPPLAR DU IN GOOGLE ANALYTICS
//   1. Skapa en webbdataström i Google Analytics och kopiera mätvärdes-ID:t (G-XXXXXXXXXX).
//   2. Skriv in det på raden GA_ID nedan. Det är det enda stället ID:t behöver stå.
//   3. Publicera och kontrollera, se KONTROLLERA längst ned.
//
// Använder du Google Tag Manager i stället för gtag.js: byt innehållet i startAnalytics().

const GA_ID = '';   // t.ex. 'G-ABC123XYZ9'. Tomt = ingen mätning.

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

// Consent Mode: allt nekat tills besökaren har sagt ja.
// Körs på varje sida innan något Google-skript laddas.
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

let laddad = false;

/** Anropas av samtyckeslösningen vid ja till statistik. */
function startAnalytics() {
  if (!GA_ID) { console.info('Google Analytics: inget mätvärdes-ID är ifyllt i analytics.js.'); return; }
  gtag('consent', 'update', { analytics_storage: 'granted' });
  if (laddad) return;
  laddad = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.append(s);
  gtag('js', new Date());
  gtag('config', GA_ID);   // skickar sidvisningen (page_view)
}

/** Anropas av samtyckeslösningen vid nej, och när ett tidigare ja tas tillbaka. */
function stopAnalytics() {
  if (laddad) gtag('consent', 'update', { analytics_storage: 'denied' });
  // Google sätter cookies som börjar på _ga. Ta bort dem.
  const doman = location.hostname;
  for (const c of document.cookie.split('; ')) {
    const namn = c.split('=')[0];
    if (!namn.startsWith('_ga')) continue;
    for (const d of [doman, '.' + doman, '']) {
      document.cookie = `${namn}=; max-age=0; path=/${d ? '; domain=' + d : ''}`;
    }
  }
}

window.startAnalytics = startAnalytics;
window.stopAnalytics = stopAnalytics;

// KONTROLLERA
//   - Öppna siten i ett privat fönster. Rutan ska visas och DevTools → Network ska inte visa några anrop till google.
//   - Tryck "Nej tack": inga anrop, inga _ga-cookies (Application → Cookies).
//   - Tryck "Ja": nu syns ett anrop till googletagmanager.com och collect-anrop till google-analytics.com,
//     och cookies som _ga och _ga_<ID> finns.
//   - Realtid i Google Analytics ska visa ditt besök efter någon minut.
