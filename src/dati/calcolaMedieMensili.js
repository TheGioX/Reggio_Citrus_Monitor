// Funzione che calcola le medie mensili a partire dai dati giornalieri di un anno
export function calcolaMedieMensili(datiAnno) {
  // Se non ci sono dati, ritorna un array vuoto
  if (!datiAnno) return [];

  // Per ogni mese presente nei dati...
  return Object.entries(datiAnno).map(([mese, datiMese]) => {
    const giorni = Array.isArray(datiMese) ? datiMese : datiMese.giorni || [];
    // Conta il numero totale di giorni nel mese
    const totaleGiorni = giorni.length;

    // Somma tutti i valori giornalieri
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
        limoniVerdello: acc.limoniVerdello + (g.limoniDettaglio?.verdello || 0),
      }),
      {
        // Valori iniziali dell'accumulatore a zero
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

    // Calcola la media dei dati (tranne la pioggia e i raccolti che restano sommati) e la ritorna come oggetto
    return {
      mese, // Mese corrente
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
  });
}
