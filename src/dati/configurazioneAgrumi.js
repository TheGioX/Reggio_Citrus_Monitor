export const nomiAgrumi = [
  "arance",
  "mandarini",
  "bergamotti",
  "limoniPrimoFiore",
  "limoniBianchetto",
  "limoniVerdello",
];

//  Configurazione per ogni tipo di agrume
export const configurazioneAgrumi = {
  // Configurazione per le arance
  arance: {
    mesiFioritura: [3, 4], // Marzo–Aprile
    mesiMaturazione: [5, 6, 7, 8, 9, 10, 11, 12, 1], // Maggio–Ottobre
    mesiRaccolta: [11, 12, 1, 2], // Novembre–Febbraio
    sogliaQualità: 120,
    ottimali: {
      temperatura: { min: 13, max: 21 },
      umidità: { min: 60, max: 78 },
      pioggia: { min: 35, max: 90 },
    },
    sensibilità: {
      temperatura: 1.3,
      umidità: 0.9,
      pioggia: 1.0,
    },
  },

  // Configurazione per i mandarini
  mandarini: {
    mesiFioritura: [4, 5], // Aprile-Maggio
    mesiMaturazione: [6, 7, 8, 9, 10, 11, 12], // Maggio–Ottobre
    mesiRaccolta: [11, 12, 1],
    sogliaQualità: 95,
    ottimali: {
      temperatura: { min: 12, max: 20 },
      umidità: { min: 63, max: 82 },
      pioggia: { min: 40, max: 95 },
    },
    sensibilità: {
      temperatura: 1.3,
      umidità: 0.9,
      pioggia: 1.0,
    },
  },

  // Configurazione per i limoni primofiore
  limoniPrimoFiore: {
    mesiFioritura: [3, 4], // Marzo–Aprile
    mesiMaturazione: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2], // Maggio–Ottobre
    mesiRaccolta: [11, 12, 1, 2], // Novembre–Maggio
    sogliaQualità: 120,
    ottimali: {
      temperatura: { min: 15, max: 26 },
      umidità: { min: 50, max: 72 },
      pioggia: { min: 25, max: 65 },
    },
    sensibilità: {
      temperatura: 0.8,
      umidità: 0.6,
      pioggia: 0.7,
    },
  },

  // Configurazione per i limoni bianchetto
  limoniBianchetto: {
    mesiFioritura: [6, 7], // Giugno–Luglio
    mesiMaturazione: [8, 9, 10, 11, 12, 1, 2, 3, 4, 5], // Ago–Marzo
    mesiRaccolta: [4, 5, 6], // Aprile–Giugno
    sogliaQualità: 130,
    ottimali: {
      temperatura: { min: 15, max: 26 },
      umidità: { min: 50, max: 72 },
      pioggia: { min: 25, max: 65 },
    },
    sensibilità: {
      temperatura: 0.8,
      umidità: 0.6,
      pioggia: 0.7,
    },
  },

  // Configurazione per i limoni verdello
  limoniVerdello: {
    mesiFioritura: [5, 6], // Maggio–Giugno
    mesiMaturazione: [7, 8, 9, 10, 11, 12, 1, 2], // Lug–Giu
    mesiRaccolta: [10, 11, 12, 1, 2, 3], // Luglio–Novembre
    sogliaQualità: 100,
    ottimali: {
      temperatura: { min: 15, max: 26 },
      umidità: { min: 50, max: 72 },
      pioggia: { min: 25, max: 65 },
    },
    sensibilità: {
      temperatura: 0.8,
      umidità: 0.6,
      pioggia: 0.7,
    },
  },
  // Configurazione per i bergamotti
  bergamotti: {
    mesiFioritura: [3, 4],
    mesiMaturazione: [5, 6, 7, 8, 9, 10, 11, 12, 1],
    mesiRaccolta: [11, 12, 1, 2],
    sogliaQualità: 160,
    ottimali: {
      temperatura: { min: 14, max: 23 },
      umidità: { min: 58, max: 78 },
      pioggia: { min: 50, max: 100 },
    },
    sensibilità: {
      temperatura: 1.2,
      umidità: 1.0,
      pioggia: 1.3,
    },
  },
};

function cicloLimone(nome) {
  if (nome.includes("PrimoFiore")) return "primoFiore";
  if (nome.includes("Bianchetto")) return "bianchetto";
  if (nome.includes("Verdello")) return "verdello";
}

// Stato iniziale per ogni agrume
export function inizializzaStatoAgrume() {
  return {
    arance: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
    mandarini: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
    bergamotti: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
    limoniPrimoFiore: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
    limoniBianchetto: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
    limoniVerdello: {
      qualitàAccum: 0,
      inMaturazione: false,
      raccoltoFatto: false,
      prontoPerRaccolta: false,
    },
  };
}

// 🔁 Funzione per gestire il ciclo produttivo di un agrume
export function gestisciProduzioneAgrume(
  agrume,
  giorno,
  clima,
  stato,
  config,
  rangeDelMese
) {
  const mese = giorno.mese;
  //const anno = giorno.anno;

  // 1. Se pronto per raccolta e mese valido, RACCOGLI
  if (
    stato.inMaturazione &&
    stato.prontoPerRaccolta &&
    !stato.raccoltoFatto &&
    config.mesiRaccolta.includes(mese)
  ) {
    //console.log(`🍋 RACCOLTA DI ${agrume} EFFETTUATA nel mese ${mese}`);
    stato.raccoltoFatto = true;
    stato.inMaturazione = false;
    stato.prontoPerRaccolta = false;

    const chiaviRange = {
      arance: ["ArMin", "ArMax"],
      mandarini: ["MaMin", "MaMax"],
      bergamotti: ["BeMin", "BeMax"],
      limoniPrimoFiore: ["LiMin", "LiMax"],
      limoniBianchetto: ["LiMin", "LiMax"],
      limoniVerdello: ["LiMin", "LiMax"],
    };

    const [chiaveMin, chiaveMax] = chiaviRange[agrume];
    const min = rangeDelMese[chiaveMin];
    const max = rangeDelMese[chiaveMax];
    let produzioneKg = Math.floor(min + Math.random() * (max - min));

    if (giorno.ventoForte) {
      const fattoreRiduzione = 0.5 + Math.random() * 0.2;
      produzioneKg = Math.floor(produzioneKg * fattoreRiduzione);
    }

    // Assegna produzione al giorno
    if (agrume.startsWith("limoni")) {
      giorno.limoniDettaglio = giorno.limoniDettaglio || {};
      giorno.limoniDettaglio[cicloLimone(agrume)] = produzioneKg;
    } else {
      giorno[agrume] = produzioneKg;
    }

    return produzioneKg;
  }

  // 2. Fioritura → resetto e abilito maturazione
  if (config.mesiFioritura.includes(mese)) {
    //console.log(`🌸 ${agrume} - Fioritura nel mese ${mese}, reset qualità`);
    stato.qualitàAccum = 0;
    stato.inMaturazione = true;
    stato.raccoltoFatto = false;
    return 0;
  }

  // 3. Maturazione → accumulo qualità
  if (stato.inMaturazione && config.mesiMaturazione.includes(mese)) {
    let qualitàGiorno = 0;

    if (
      clima.temperatura >= config.ottimali.temperatura.min &&
      clima.temperatura <= config.ottimali.temperatura.max
    ) {
      qualitàGiorno += config.sensibilità.temperatura;
    }
    if (
      clima.umidità >= config.ottimali.umidità.min &&
      clima.umidità <= config.ottimali.umidità.max
    ) {
      qualitàGiorno += config.sensibilità.umidità;
    }
    if (
      clima.pioggia >= config.ottimali.pioggia.min &&
      clima.pioggia <= config.ottimali.pioggia.max
    ) {
      qualitàGiorno += config.sensibilità.pioggia;
    }

    stato.qualitàAccum += qualitàGiorno;
    /*
    console.log(
      `🌱 ${agrume} - Giorno ${giorno.giorno} Mese ${mese} Anno ${
        giorno.anno
      }: +${qualitàGiorno.toFixed(2)} (Totale: ${stato.qualitàAccum.toFixed(
        2
      )})`
    );*/

    // Se ha raggiunto la soglia ma non ancora raccolto, segna come pronto
    if (
      stato.qualitàAccum >= config.sogliaQualità &&
      !stato.prontoPerRaccolta &&
      !stato.raccoltoFatto
    ) {
      stato.prontoPerRaccolta = true;
      /*
      console.log(
        `📈 ${agrume} - Soglia raggiunta (${stato.qualitàAccum.toFixed(2)} ≥ ${
          config.sogliaQualità
        }) nel mese ${mese} dell'${anno} | Raccolta prevista nei mesi: ${
          config.mesiRaccolta
        }`
      );
      */
    }

    return 0;
  }

  // 🔎 DEBUG – Soglia superata ma mese non valido per raccolta
  if (
    stato.inMaturazione &&
    !stato.raccoltoFatto &&
    stato.qualitàAccum >= config.sogliaQualità &&
    !config.mesiRaccolta.includes(giorno.mese)
  ) {
    /*
    console.warn(
      `⚠️ ${agrume} ha superato la soglia (${stato.qualitàAccum.toFixed(2)} ≥ ${
        config.sogliaQualità
      }) ma il mese ${giorno.mese} NON è tra quelli di raccolta (${
        config.mesiRaccolta
      }).`
    );
    */
  }

  return 0; // altrimenti non produco nulla
}

// 🔁 Funzione per gestire la produzione totale di un agrume in un mese
export function gestisciProduzionePerAgrume(
  agrume,
  giorni,
  stato,
  config,
  rangeDelMese,
  mese,
  anno
) {
  let totaleProduzione = 0;

  giorni.forEach((giorno) => {
    const clima = {
      temperatura: giorno.temperatura,
      umidità: giorno.umidità,
      pioggia: giorno.pioggia,
    };

    totaleProduzione += gestisciProduzioneAgrume(
      agrume,
      { ...giorno, mese, anno },
      clima,
      stato,
      config,
      rangeDelMese
    );
  });

  return totaleProduzione;
}
