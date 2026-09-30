// ============================================================================
// INTEGRATIONSPUNKTER FÖR ANALYTICS (förberedda, inaktiva i etapp 1)
//
// Ingen Google-tagg, inget skript och inget externt anrop finns i etapp 1.
// Filen visar var installationen ska in senare. Aktuell officiell Google-dokumentation
// ska kontrolleras innan något av detta skrivs.
// ============================================================================

/** Anropas en gång när siten startar. */
export function initIntegrations() {
  // GOOGLE ANALYTICS 4 (senare etapp)
  //   - Läs samtycket först. Ladda inte mätskriptet innan samtycke finns för det ändamålet.
  //   - Lägg mätskriptet här (eller via tagghantering) och konfigurera webbströmmen.
  //   - Ta ID:t från en konfigurationsfil, inte hårdkodat i flera filer.
  //
  // GOOGLE SEARCH CONSOLE (senare etapp)
  //   - Kräver ingen kod här. Verifiering sker separat, se kommentaren i index.html.
  //   - Sitemap och indexering hanteras i Search Console och på webbplatsen, inte i tracking.
}

/**
 * Anropas vid varje sidbyte. Siten är en ensidesapplikation, så webbläsaren laddar inte om sidan
 * när eleven byter moment. En mätning av sidvisningar måste därför skickas härifrån.
 * @param {{ id: string, path: string, title: string }} page
 */
export function onPageView(page) { // eslint-disable-line no-unused-vars
  // Senare: skicka en sidvisning (endast om samtycke finns) med sidans path och title.
}
