//  📦 Configurazione finanziaria predefinita
export const configurazioneDefault = {
  lavoratoriAnnuali: 1,
  lavoratoriSemestrali: 1,
  lavoratoriMensili: 1,
  stipendioMensile: 1100,
  mesiLavoro: 12,
  concimePerHa: 90,
  fitofarmaciPerHa: 50,
  ettari: 4,
  bollettaIrrigazione: 1600,
  manutenzioneImpianto: 300,
  TrasportoMerce: 5,
  costoTrasportoMerce: 30,
  costoCassetta: 0.06,
  numeroCassette: 150000,
  ammortamento: {
    macchinari: 25000 + 1500 + 2 * 2000 + 40000, //Trattore, motozappa, motosega, camion
    impianti: 4 * 12500,
    piantine: 4 * 4000,
    anni: 10,
  },
  prezziPrivati: {
    arance: 0.5,
    limoni: 0.5,
    mandarini: 0.5,
    bergamotti: 0.5,
  },
  prezziConsorzio: {
    arance: 0.3,
    limoni: 0.3,
    mandarini: 0.3,
    bergamotti: 0.3,
  },
  quotaPrivati: 0.4,
};
