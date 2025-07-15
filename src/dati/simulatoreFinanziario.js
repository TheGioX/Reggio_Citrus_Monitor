// dati/simulatoreFinanziario.js
import { calcolaMedieMensili } from "./calcolaMedieMensili";
import { configurazioneDefault } from "./configurazioneFinanziaria";

// Funzione per calcolare gli ammortamenti annuali
function calcolaAmmortamenti(config) {
  return {
    macchinari: config.ammortamento.macchinari / config.ammortamento.anni,
    impianti: config.ammortamento.impianti / config.ammortamento.anni,
    piantine: config.ammortamento.piantine / config.ammortamento.anni,
  };
}

// Funzione per calcolare le spese annuali
function calcolaSpeseAnnuali(config) {
  return {
    manodopera:
      config.lavoratoriAnnuali * config.stipendioMensile * config.mesiLavoro +
      (config.lavoratoriSemestrali *
        config.stipendioMensile *
        config.mesiLavoro) /
        2 +
      (config.lavoratoriMensili * config.stipendioMensile * config.mesiLavoro) /
        12,
    concime: config.concimePerHa * config.ettari,
    fitofarmaci: config.fitofarmaciPerHa * config.ettari,
    irrigazione: config.bollettaIrrigazione + config.manutenzioneImpianto,
    trasporto: config.TrasportoMerce * config.costoTrasportoMerce,
    cassette: (config.numeroCassette * config.costoCassetta) / 25,
    ammortamentoMacchinari: calcolaAmmortamenti(config).macchinari,
    ammortamentoImpianti: calcolaAmmortamenti(config).impianti,
    ammortamentoPiantine: calcolaAmmortamenti(config).piantine,
  };
}

// Funzione per calcolare i ricavi annuali
function calcolaRicavi(dati, config) {
  const frutti = ["arance", "limoni", "mandarini", "bergamotti"];
  return frutti.reduce((totale, frutto) => {
    const kg = dati[frutto] || 0;
    const prezzoMedio =
      config.quotaPrivati * config.prezziPrivati[frutto] +
      (1 - config.quotaPrivati) * config.prezziConsorzio[frutto];
    return totale + kg * prezzoMedio;
  }, 0);
}

// Funzione principale per calcolare il bilancio finanziario annuale
export function calcolaBilancioFinanziario(
  datiAnnuali,
  config = configurazioneDefault
) {
  const speseAnnuali = calcolaSpeseAnnuali(config);
  //console.log("speseAnnuali:", speseAnnuali);
  const totaleAnnuale = Object.values(speseAnnuali).reduce((a, b) => a + b, 0);
  const primoAnno = Math.min(...Object.keys(datiAnnuali).map(Number));

  return Object.entries(datiAnnuali).map(([annoStr, dati]) => {
    const anno = String(annoStr);
    const medieMensili = calcolaMedieMensili(dati);
    const ricavi = medieMensili.reduce(
      (tot, mese) => tot + calcolaRicavi(mese, config),
      0
    );
    const includeAmmortamenti = anno - primoAnno < config.ammortamento.anni;
    const spese = includeAmmortamenti
      ? totaleAnnuale
      : totaleAnnuale -
        speseAnnuali.ammortamentoMacchinari -
        speseAnnuali.ammortamentoImpianti -
        speseAnnuali.ammortamentoPiantine;
    return {
      anno,
      ricavi: +ricavi.toFixed(2),
      spese: +spese.toFixed(2),
      utile: +(ricavi - spese).toFixed(2),
    };
  });
}

const nomiMesi = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

// Funzione per calcolare il bilancio mensile
export function calcolaBilancioMensile(
  datiAnno,
  anno,
  primoAnno,
  config = configurazioneDefault
) {
  const speseAnnuali = calcolaSpeseAnnuali(config);
  const speseMensili = Object.fromEntries(
    Object.entries(speseAnnuali).map(([k, v]) => [k, +(v / 12).toFixed(2)])
  );

  if (anno - primoAnno >= 10) {
    delete speseMensili.ammortamentoMacchinari;
    delete speseMensili.ammortamentoImpianti;
    delete speseMensili.ammortamentoPiantine;
  }

  return Object.entries(datiAnno)
    .filter(([key]) => key !== "anno")
    .map(([mese, frutti]) => {
      const ricavi = calcolaRicavi(frutti, config);
      const spese = Object.values(speseMensili).reduce((a, b) => a + b, 0);
      return {
        mese: nomiMesi[+mese],
        ricavi: +ricavi.toFixed(2),
        spese: +spese.toFixed(2),
        utile: +(ricavi - spese).toFixed(2),
      };
    });
}

// Funzione per calcolare il bilancio giornaliero
export function calcolaBilancioGiornaliero(
  datiGiorni,
  anno,
  primoAnno,
  config = configurazioneDefault
) {
  const speseAnnuali = calcolaSpeseAnnuali(config);
  const speseGiornaliere = Object.fromEntries(
    Object.entries(speseAnnuali).map(([k, v]) => [k, +(v / 365).toFixed(2)])
  );

  if (anno - primoAnno >= 10) {
    delete speseGiornaliere.ammortamentoMacchinari;
    delete speseGiornaliere.ammortamentoImpianti;
    delete speseGiornaliere.ammortamentoPiantine;
  }

  const spesaGiorno = Object.values(speseGiornaliere).reduce(
    (a, b) => a + b,
    0
  );

  return datiGiorni.map((g) => {
    const ricavi = calcolaRicavi(g, config);
    const spese = spesaGiorno;
    return {
      giorno: g.giorno,
      ricavi: +ricavi.toFixed(2),
      spese: +spese.toFixed(2),
      utile: +(ricavi - spese).toFixed(2),
    };
  });
}
