// Simulatore di eventi climatici per il settore primario
const probabilitàEventi = {
  grandine: [
    // Alta in inverno
    0.05, // Gennaio
    0.04, // Febbraio
    0.03, // Marzo
    0.015, // Aprile
    0.005, // Maggio
    0, // Giugno
    0, // Luglio
    0, // Agosto
    0.01, // Settembre
    0.025, // Ottobre
    0.04, // Novembre
    0.05, // Dicembre
  ],
  siccità: [
    // Alta in estate
    0.005, // Gennaio
    0.005, // Febbraio
    0.01, // Marzo
    0.015, // Aprile
    0.025, // Maggio
    0.04, // Giugno
    0.05, // Luglio
    0.05, // Agosto
    0.035, // Settembre
    0.015, // Ottobre
    0.005, // Novembre
    0, // Dicembre
  ],
  ondataCaldo: [
    // Solo in estate
    0, // Gennaio
    0, // Febbraio
    0.005, // Marzo
    0.015, // Aprile
    0.035, // Maggio
    0.07, // Giugno
    0.1, // Luglio
    0.1, // Agosto
    0.05, // Settembre
    0.015, // Ottobre
    0.005, // Novembre
    0, // Dicembre
  ],
  ondataFreddo: [
    // Inverno e tardo autunno
    0.05, // Gennaio
    0.05, // Febbraio
    0.025, // Marzo
    0.005, // Aprile
    0, // Maggio
    0, // Giugno
    0, // Luglio
    0, // Agosto
    0.005, // Settembre
    0.015, // Ottobre
    0.035, // Novembre
    0.05, // Dicembre
  ],
  ventoForte: [
    // Più probabile in estate e autunno
    0.015, // Gennaio
    0.015, // Febbraio
    0.02, // Marzo
    0.025, // Aprile
    0.025, // Maggio
    0.035, // Giugno
    0.04, // Luglio
    0.04, // Agosto
    0.03, // Settembre
    0.025, // Ottobre
    0.02, // Novembre
    0.015, // Dicembre
  ],
  nebbia: [
    // Tipica di inverno e tardo autunno
    0.1, // Gennaio
    0.1, // Febbraio
    0.075, // Marzo
    0.05, // Aprile
    0.025, // Maggio
    0.005, // Giugno
    0, // Luglio
    0, // Agosto
    0.01, // Settembre
    0.04, // Ottobre
    0.075, // Novembre
    0.1, // Dicembre
  ],

  temporale: [
    0.02, // Gennaio
    0.015, // Febbraio
    0.012, // Marzo
    0.01, // Aprile
    0.007, // Maggio
    0.003, // Giugno
    0.002, // Luglio
    0.002, // Agosto
    0.006, // Settembre
    0.01, // Ottobre
    0.015, // Novembre
    0.02, // Dicembre
  ],
};

// Funzione per ottenere una durata casuale tra min e max
function getDurataCasuale(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per verificare se due eventi climatici sono incoerenti
function eventiIncoerenti(evento1, evento2) {
  const incoerenze = [
    ["ondataCaldo", "ondataFreddo"],
    ["siccità", "temporale"],
    ["siccità", "grandine"],
    ["grandine", "nebbia"],
    ["nebbia", "ventoForte"],
  ];
  return incoerenze.some(
    ([a, b]) =>
      (a === evento1 && b === evento2) || (a === evento2 && b === evento1)
  );
}

// Funzione per generare eventi climatici per un mese specifico
function generaEventiClimatici(mese, anno) {
  const giorniNelMese = new Date(anno, mese, 0).getDate();
  const eventiProlungati = {
    siccità: 0,
    ondataCaldo: 0,
    ondataFreddo: 0,
  };

  const eventi = [];

  for (let giorno = 1; giorno <= giorniNelMese; giorno++) {
    const giornoEventi = [];

    // Eventi prolungati in corso
    for (const tipo of Object.keys(eventiProlungati)) {
      if (eventiProlungati[tipo] > 0) {
        giornoEventi.push({ tipo });
        eventiProlungati[tipo]--;
      }
    }

    // Nuovi eventi prolungati
    if (
      eventiProlungati.siccità === 0 &&
      Math.random() < probabilitàEventi.siccità[mese - 1] &&
      giornoEventi.every((e) => !eventiIncoerenti(e.tipo, "siccità"))
    ) {
      eventiProlungati.siccità = getDurataCasuale(3, 15) - 1;
      giornoEventi.push({ tipo: "siccità" });
    }

    if (
      eventiProlungati.ondataCaldo === 0 &&
      Math.random() < probabilitàEventi.ondataCaldo[mese - 1] &&
      giornoEventi.every((e) => !eventiIncoerenti(e.tipo, "ondataCaldo"))
    ) {
      eventiProlungati.ondataCaldo = getDurataCasuale(2, 7) - 1;
      giornoEventi.push({ tipo: "ondataCaldo" });
    }

    if (
      eventiProlungati.ondataFreddo === 0 &&
      Math.random() < probabilitàEventi.ondataFreddo[mese - 1] &&
      giornoEventi.every((e) => !eventiIncoerenti(e.tipo, "ondataFreddo"))
    ) {
      eventiProlungati.ondataFreddo = getDurataCasuale(2, 7) - 1;
      giornoEventi.push({ tipo: "ondataFreddo" });
    }

    // Eventi istantanei con controllo di coerenza
    const eventiIstantanei = ["grandine", "ventoForte", "nebbia", "temporale"];

    for (const tipo of eventiIstantanei) {
      if (Math.random() < probabilitàEventi[tipo][mese - 1]) {
        const coerente = giornoEventi.every(
          (e) => !eventiIncoerenti(e.tipo, tipo)
        );
        if (coerente) {
          giornoEventi.push({ tipo });
        }
      }
    }

    eventi.push(giornoEventi);
  }

  return eventi;
}

// Funzione per applicare gli eventi climatici a un giorno specifico
function applicaEventiClimaticiMultipli(giorno, listaEventi) {
  listaEventi.forEach((evento) => {
    switch (evento.tipo) {
      case "grandine":
        giorno.temperatura = parseFloat((Math.random() * 5).toFixed(2)); // 0 - 5°C
        giorno.pioggia = parseFloat(
          (giorno.pioggia + (20 + Math.random() * 20)).toFixed(2)
        );
        break;
      case "siccità":
        giorno.umidità = parseFloat(
          (giorno.umidità - (15 + Math.random() * 10)).toFixed(2)
        );
        giorno.pioggia = 0;
        break;
      case "ondataCaldo":
        giorno.temperatura = parseFloat(
          (giorno.temperatura + (5 + Math.random() * 3)).toFixed(2)
        );
        giorno.umidità = parseFloat(
          (giorno.umidità - (10 + Math.random() * 5)).toFixed(2)
        );
        break;
      case "ondataFreddo":
        giorno.temperatura = parseFloat(
          (giorno.temperatura - (5 + Math.random() * 3)).toFixed(2)
        );
        giorno.umidità = parseFloat(
          (giorno.umidità + (10 + Math.random() * 5)).toFixed(2)
        );
        break;
      case "ventoForte":
        giorno.ventoForte = true; // da usare per ridurre produzione
        break;

      case "nebbia":
        giorno.temperatura = parseFloat(
          (giorno.temperatura - (1 + Math.random())).toFixed(2)
        );
        giorno.umidità = parseFloat(
          (giorno.umidità + (5 + Math.random() * 5)).toFixed(2)
        );
        break;

      case "temporale":
        giorno.pioggia = parseFloat(
          (giorno.pioggia + 20 + Math.random() * 30).toFixed(2)
        );
        giorno.temperatura = parseFloat(
          (giorno.temperatura - (3 + Math.random() * 2)).toFixed(2)
        );
        break;
    }
  });

  // Aggiungiamo l'elenco eventi al giorno per visualizzazioni future
  giorno.eventi = listaEventi;
}

export { generaEventiClimatici, applicaEventiClimaticiMultipli };
