import {
  generaEventiClimatici,
  applicaEventiClimaticiMultipli,
} from "./simulatoreEventiClimatici.js";
import {
  configurazioneAgrumi,
  inizializzaStatoAgrume,
  gestisciProduzionePerAgrume,
  nomiAgrumi,
} from "./configurazioneAgrumi";

// Nomi dei mesi usati per indicizzare i dati
const mesiNomi = [
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

// Giorni standard per ciascun mese (non tiene conto degli anni bisestili qui)
const giorniPerMese = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Configurazione avanzata per pioggia
const configPioggia = {
  probabilitàGiorniPiovosi: {
    inverno: 0.3, // Gen-Feb-Dic
    primavera: 0.2, // Mar-Mag
    estate: 0.1, // Giu-Ago
    autunno: 0.25, // Set-Nov
  },
  intensità: {
    leggera: { min: 1, max: 10 },
    media: { min: 10, max: 30 },
    forte: { min: 30, max: 50 },
  },
};

// Range stagionali per ogni mese, con parametri climatici e produttivi

const rangeStagionali = [
  {
    // Gennaio
    tMin: 6, // Temperatura min
    tMax: 16, // Temperatura max
    uMin: 65, // Umidità min
    uMax: 85, // Umidità max
    pMin: 10, // Pioggia min
    pMax: 40, // Pioggia max
    tipoPioggia: "media",
    ArMin: 20000,
    ArMax: 30000, // Arance
    MaMin: 20000,
    MaMax: 25000, // Mandarini
    LiMin: 10000,
    LiMax: 20000, // Limoni
    BeMin: 18000,
    BeMax: 30000, // Bergamotti
  },
  {
    // Febbraio
    tMin: 7,
    tMax: 16,
    uMin: 15,
    uMax: 85,
    pMin: 10,
    pMax: 40,
    tipoPioggia: "media",
    ArMin: 20000,
    ArMax: 30000,
    MaMin: 2000,
    MaMax: 4300,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 18000,
    BeMax: 30000,
  },
  {
    // Marzo
    tMin: 8,
    tMax: 18,
    uMin: 55,
    uMax: 80,
    pMin: 15,
    pMax: 60,
    tipoPioggia: "leggera",
    ArMin: 0,
    ArMax: 0,
    MaMin: 1000,
    MaMax: 2500,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Aprile
    tMin: 10,
    tMax: 21,
    uMin: 50,
    uMax: 75,
    pMin: 10,
    pMax: 20,
    tipoPioggia: "leggera",
    ArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 10000,
    LiMax: 20000, // Solo limoni
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Maggio
    tMin: 13,
    tMax: 26,
    uMin: 45,
    uMax: 70,
    pMin: 5,
    pMax: 20,
    tipoPioggia: "leggera",
    rArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Giugno
    tMin: 17,
    tMax: 30,
    uMin: 40,
    uMax: 65,
    pMin: 0,
    pMax: 20,
    tipoPioggia: "leggera",
    ArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Luglio
    tMin: 20,
    tMax: 33,
    uMin: 35,
    uMax: 60,
    pMin: 0,
    pMax: 10,
    tipoPioggia: "leggera",
    ArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 200,
    LiMax: 800,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Agosto
    tMin: 21,
    tMax: 33,
    uMin: 35,
    uMax: 60,
    pMin: 0,
    pMax: 5,
    tipoPioggia: "leggera",
    ArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 200,
    LiMax: 900,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Settembre
    tMin: 19,
    tMax: 30,
    uMin: 45,
    uMax: 70,
    pMin: 10,
    pMax: 30,
    tipoPioggia: "media",
    ArMin: 0,
    ArMax: 0,
    MaMin: 0,
    MaMax: 0,
    LiMin: 500,
    LiMax: 1500,
    BeMin: 0,
    BeMax: 0,
  },
  {
    // Ottobre
    tMin: 15,
    tMax: 25,
    uMin: 55,
    uMax: 75,
    pMin: 20,
    pMax: 40,
    tipoPioggia: "media",
    ArMin: 500,
    ArMax: 1500,
    MaMin: 500,
    MaMax: 1500,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 500,
    BeMax: 1500,
  },
  {
    // Novembre
    tMin: 11,
    tMax: 21,
    uMin: 60,
    uMax: 85,
    pMin: 20,
    pMax: 50,
    tipoPioggia: "forte",
    ArMin: 20000,
    ArMax: 30000,
    MaMin: 20000,
    MaMax: 25000,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 18000,
    BeMax: 30000,
  },
  {
    // Dicembre
    tMin: 8,
    tMax: 17,
    uMin: 65,
    uMax: 88,
    pMin: 30,
    pMax: 65,
    tipoPioggia: "forte",
    ArMin: 20000,
    ArMax: 30000,
    MaMin: 20000,
    MaMax: 25000,
    LiMin: 10000,
    LiMax: 20000,
    BeMin: 18000,
    BeMax: 30000,
  },
];

// funzione per determinare la stagione
function getStagione(indiceMese) {
  if ([11, 0, 1].includes(indiceMese)) return "inverno"; // Dic-Gen-Feb
  if (indiceMese >= 2 && indiceMese <= 4) return "primavera"; // Mar-Mag
  if (indiceMese >= 5 && indiceMese <= 7) return "estate"; // Giu-Ago
  return "autunno"; // Set-Nov
}
// Ritorna true se l'anno è bisestile
function èBisestile(anno) {
  return (anno % 4 === 0 && anno % 100 !== 0) || anno % 400 === 0;
}

// Genera un numero casuale tra min e max con due decimali
const casualeTra = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Distribuisce casualmente un totale su n giorni (restituisce float)
function distribuisciValoriCasuali(n, totale, variazionePercento = 0.2) {
  if (totale <= 0 || n <= 0) return Array(n).fill(0); // prevenzione NaN

  const base = totale / n;
  const distribuzione = Array.from({ length: n }, () => {
    const variazione = 1 + (Math.random() * 2 - 1) * variazionePercento;
    return base * variazione;
  });

  const somma = distribuzione.reduce((acc, val) => acc + val, 0);
  const scala = totale / somma;

  return distribuzione.map((val) => Math.round(val * scala));
}

// Funzione per distribuzione pioggia realistica
function distribuisciPioggia(giorni, totale, indiceMese) {
  const stagione = getStagione(indiceMese);
  const tipoPioggia = rangeStagionali[indiceMese].tipoPioggia || "media";
  const probPioggia = configPioggia.probabilitàGiorniPiovosi[stagione];
  const giorniPiovosi = Math.max(1, Math.floor(giorni * probPioggia));

  const pioggiaArray = Array(giorni).fill(0); // Array inizialmente tutto a 0

  // Scelgo a caso quali giorni saranno piovosi
  const giorniSelezionati = [];
  while (giorniSelezionati.length < giorniPiovosi) {
    const giornoRandom = Math.floor(Math.random() * giorni);
    if (!giorniSelezionati.includes(giornoRandom)) {
      giorniSelezionati.push(giornoRandom);
    }
  }

  // Genero i valori di pioggia
  const range = configPioggia.intensità[tipoPioggia];
  const pioggeGiorniSelezionati = Array.from({ length: giorniPiovosi }, () =>
    casualeTra(range.min, range.max)
  );

  // Calcolo il fattore di correzione per mantenere il totale corretto
  const sommaPreliminare = pioggeGiorniSelezionati.reduce((a, b) => a + b, 0);
  const fattoreCorrezione = totale / sommaPreliminare;

  // Assegno i valori corretti
  giorniSelezionati.forEach((indice, i) => {
    pioggiaArray[indice] = Math.round(
      pioggeGiorniSelezionati[i] * fattoreCorrezione
    );
  });

  return pioggiaArray;
}

// Funzione per calcolare il fattore di qualità per un singolo parametro
function calcolaFattoreSingolo(valore, range, sensibilità) {
  if (valore >= range.min && valore <= range.max) return 1;

  const distanza = valore < range.min ? range.min - valore : valore - range.max;
  const intervallo = range.max - range.min;

  // Se sei oltre 3x il range ottimale, la qualità è nulla
  if (distanza >= intervallo * 3) return 0;

  // Penalità
  const penalità = (distanza / intervallo) ** 1.5 * sensibilità;

  return Math.max(0, 1 - penalità);
}

// Funzione per calcolare il fattore di qualità totale per un agrume
function calcolaFattoreQualita(agrume, mediaT, mediaU, mediaP) {
  const conf = configurazioneAgrumi[agrume];
  if (!conf) {
    console.warn(`Configurazione mancante per: ${agrume}`);
    return 0;
  }

  // Calcola i fattori individuali
  const fattoreT = calcolaFattoreSingolo(
    mediaT,
    conf.ottimali.temperatura,
    conf.sensibilità.temperatura
  );

  const fattoreU = calcolaFattoreSingolo(
    mediaU,
    conf.ottimali.umidità,
    conf.sensibilità.umidità
  );

  const fattoreP = calcolaFattoreSingolo(
    mediaP,
    conf.ottimali.pioggia,
    conf.sensibilità.pioggia
  );

  // Se anche solo uno è 0, la qualità totale è 0
  if (fattoreT === 0 || fattoreU === 0 || fattoreP === 0) return 0;

  // Media ponderata
  return fattoreT * 0.5 + fattoreU * 0.3 + fattoreP * 0.2;
}

// Funzione principale per generare tutti i dati simulati
export function generaDatiAnnuali(
  annoInizio = 2000,
  annoFine = 2024,
  crescitaIniziale = null
) {
  const oggi = new Date();
  const dati = {};
  // Stato di maturazione accumulato per ogni agrume
  const crescitaAgrumi = crescitaIniziale ?? {
    arance: 0,
    mandarini: 0,
    bergamotti: 0,
    limoniPrimoFiore: 0,
    limoniBianchetto: 0,
    limoniVerdello: 0,
  };
  const statoProduzione = inizializzaStatoAgrume();

  for (let anno = annoInizio; anno <= annoFine; anno++) {
    dati[anno] = {};

    mesiNomi.forEach((nomeMese, indiceMese) => {
      const isFebbraio = indiceMese === 1;
      const giorniBase = giorniPerMese[indiceMese];
      const giorniTotali = isFebbraio && èBisestile(anno) ? 29 : giorniBase;
      const range = rangeStagionali[indiceMese];

      const giorniDaGenerare =
        anno === oggi.getFullYear() && indiceMese === oggi.getMonth()
          ? oggi.getDate()
          : anno === oggi.getFullYear() && indiceMese > oggi.getMonth()
          ? 0
          : giorniTotali;

      if (giorniDaGenerare === 0) return;

      // Generazione dati climatici giornalieri
      const giorni = [];
      for (let i = 0; i < giorniDaGenerare; i++) {
        giorni.push({
          giorno: i + 1,
          temperatura: casualeTra(range.tMin, range.tMax),
          umidità: casualeTra(range.uMin, range.uMax),
          pioggia: 0,
        });
      }
      const eventi = generaEventiClimatici(indiceMese + 1, anno);
      //console.log(`Eventi generati per ${nomeMese} ${anno}:`, eventi);

      //console.log(`Eventi mese ${nomeMese}:`, eventi);
      // Calcolo delle medie mensili climatiche
      const mediaT =
        giorni.reduce((acc, g) => acc + g.temperatura, 0) / giorni.length;
      const mediaU =
        giorni.reduce((acc, g) => acc + g.umidità, 0) / giorni.length;
      const pioggiaTotale = casualeTra(range.pMin, range.pMax);
      const mediaP = pioggiaTotale;
      const distribuzionePioggia = distribuisciPioggia(
        giorniDaGenerare,
        pioggiaTotale,
        indiceMese
      );
      giorni.forEach((g, i) => {
        g.pioggia = distribuzionePioggia[i] || 0;
      });

      // Applica eventi climatici modificando direttamente temperatura, umidità, pioggia
      eventi.forEach((eventiGiorno, i) => {
        applicaEventiClimaticiMultipli(giorni[i], eventiGiorno);
      });

      // Calcolo dei fattori climatici per i raccolti
      const fattori = {};
      ["arance", "mandarini", "bergamotti"].forEach((agrume) => {
        const f = calcolaFattoreQualita(agrume, mediaT, mediaU, mediaP);
        crescitaAgrumi[agrume] += f; // accumula qualità
        fattori[agrume] = f;
      });

      // Limoni: calcolo separato per i 3 cicli
      const fattoreLimoniPrimoFiore = calcolaFattoreQualita(
        "limoniPrimoFiore",
        mediaT,
        mediaU,
        mediaP
      );
      const fattoreLimoniBianchetto = calcolaFattoreQualita(
        "limoniBianchetto",
        mediaT,
        mediaU,
        mediaP
      );
      const fattoreLimoniVerdello = calcolaFattoreQualita(
        "limoniVerdello",
        mediaT,
        mediaU,
        mediaP
      );

      crescitaAgrumi.limoniPrimoFiore += fattoreLimoniPrimoFiore;
      crescitaAgrumi.limoniBianchetto += fattoreLimoniBianchetto;
      crescitaAgrumi.limoniVerdello += fattoreLimoniVerdello;

      fattori.limoniPrimoFiore = fattoreLimoniPrimoFiore;
      fattori.limoniBianchetto = fattoreLimoniBianchetto;
      fattori.limoniVerdello = fattoreLimoniVerdello;

      const totaliProduzione = {};

      nomiAgrumi.forEach((agrume) => {
        totaliProduzione[agrume] = gestisciProduzionePerAgrume(
          agrume,
          giorni,
          statoProduzione[agrume],
          configurazioneAgrumi[agrume],
          rangeStagionali[indiceMese],
          indiceMese + 1,
          anno
        );
      });

      // ---------------------------
      // Distribuzione giornaliera
      // ---------------------------
      const distProduzione = {};
      Object.entries(totaliProduzione).forEach(([agrume, totale]) => {
        distProduzione[agrume] =
          totale > 0
            ? distribuisciValoriCasuali(giorniDaGenerare, Math.round(totale))
            : Array(giorniDaGenerare).fill(0);
      });

      // ---------------------------
      // Assegnazione ai giorni
      // ---------------------------
      giorni.forEach((g, i) => {
        g.arance = distProduzione.arance[i];
        g.mandarini = distProduzione.mandarini[i];
        g.bergamotti = distProduzione.bergamotti[i];

        g.limoni =
          distProduzione.limoniPrimoFiore[i] +
          distProduzione.limoniBianchetto[i] +
          distProduzione.limoniVerdello[i];

        g.limoniDettaglio = {
          primoFiore: distProduzione.limoniPrimoFiore[i],
          bianchetto: distProduzione.limoniBianchetto[i],
          verdello: distProduzione.limoniVerdello[i],
        };

        g.eventi = eventi[i];
      });

      // Salva il mese
      const nomeMeseMaiuscolo =
        nomeMese.charAt(0).toUpperCase() + nomeMese.slice(1);
      dati[anno][nomeMeseMaiuscolo] = {
        giorni,
        eventi,
      };
    });
  }

  return {
    dati,
    statoProduzione: { ...statoProduzione },
  };
}

/*

// Funzione per mappare i nomi dei cicli dei limoni
function cicloLimone(nome) {
  return {
    limoniPrimoFiore: "primoFiore",
    limoniBianchetto: "bianchetto",
    limoniVerdello: "verdello",
  }[nome];
}


// Funzione per la diagnostica della produzione
export function diagnosticaProduzione(dati, statoProduzione) {
  for (const anno in dati) {
    const datiAnno = dati[anno];

    console.log(`📅 Diagnostica produzione per l'anno ${anno}:`);

    nomiAgrumi.forEach((agrume) => {
      let totale = 0;
      for (const mese of Object.values(datiAnno)) {
        for (const giorno of mese.giorni) {
          if (agrume.startsWith("limoni")) {
            totale += giorno.limoniDettaglio?.[cicloLimone(agrume)] || 0;
          } else {
            totale += giorno[agrume] || 0;
          }
        }
      }

      if (totale === 0) {
        const stato = statoProduzione?.[agrume];
        const qualità = stato?.qualitàAccum?.toFixed(2) ?? "n.d.";
        const soglia = configurazioneAgrumi[agrume]?.sogliaQualità ?? "n.d.";

        console.warn(
          `  ❌ Nessuna produzione di ${agrume}. Qualità accumulata: ${qualità} anno: ${anno} (soglia: ${soglia})`
        );
      } else {
        console.log(`  ✅ ${agrume}: prodotto ${totale.toFixed(2)} kg`);
      }
    });
  }
}
*/
