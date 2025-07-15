// Funzione che calcola i dati annuali medi o totali partendo dai dati giornalieri
export function calcolaMedieAnnuali(datiAnnuali) {
  // Se i dati non esistono, ritorna subito un array vuoto
  if (!datiAnnuali) return [];

  // Per ogni anno presente nei dati...
  return (
    Object.entries(datiAnnuali)
      .map(([anno, mesi]) => {
        // Unisce tutti i giorni di tutti i mesi in un unico array
        const giorni = Object.values(mesi)
          .map((mese) => (Array.isArray(mese) ? mese : mese.giorni || []))
          .flat();

        // Conta il numero totale di giorni
        const totaleGiorni = giorni.length;

        // Somma tutti i dati giornalieri
        const somma = giorni.reduce(
          (acc, g) => ({
            temperatura: acc.temperatura + g.temperatura,
            umidità: acc.umidità + g.umidità,
            pioggia: acc.pioggia + g.pioggia,
            arance: acc.arance + g.arance,
            mandarini: acc.mandarini + g.mandarini,
            limoni: acc.limoni + g.limoni,
            bergamotti: acc.bergamotti + g.bergamotti,
            limoniPrimoFiore:
              acc.limoniPrimoFiore + (g.limoniDettaglio?.primoFiore || 0),
            limoniBianchetto:
              acc.limoniBianchetto + (g.limoniDettaglio?.bianchetto || 0),
            limoniVerdello:
              acc.limoniVerdello + (g.limoniDettaglio?.verdello || 0),
          }),
          {
            temperatura: 0,
            umidità: 0,
            pioggia: 0,
            arance: 0,
            mandarini: 0,
            limoni: 0,
            bergamotti: 0,
            limoniPrimoFiore: 0,
            limoniBianchetto: 0,
            limoniVerdello: 0,
          }
        );

        // Calcola la media o il totale e restituisce un oggetto con i risultati annuali
        return {
          anno, // Anno corrente
          temperatura: +(somma.temperatura / totaleGiorni).toFixed(2), // Media temperatura
          umidità: +(somma.umidità / totaleGiorni).toFixed(2), // Media umidità
          pioggia: +somma.pioggia.toFixed(2), // Totale pioggia
          arance: +somma.arance.toFixed(2), // Totale raccolto arance
          mandarini: +somma.mandarini.toFixed(2), // Totale raccolto mandarini
          limoni: +somma.limoni.toFixed(2), // Totale raccolto limoni
          bergamotti: +somma.bergamotti.toFixed(2), // Totale raccolto bergamotti
          limoniPrimoFiore: +somma.limoniPrimoFiore.toFixed(2),
          limoniBianchetto: +somma.limoniBianchetto.toFixed(2),
          limoniVerdello: +somma.limoniVerdello.toFixed(2),
        };
      })
      // Ordina i risultati finali in base all'anno in modo crescente
      .sort((a, b) => a.anno - b.anno)
  );
}
