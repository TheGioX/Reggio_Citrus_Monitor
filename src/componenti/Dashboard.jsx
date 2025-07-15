import { useState, useEffect } from "react";
import "../stili/dashboard.css";
import {
  generaDatiDashboard,
  inizializzaConfigurazione,
  salvaDatiInLocalStorage,
  caricaDatiDaLocalStorage,
  cancellaDatiDaLocalStorage,
  cancellaDatiDaLocalStorageConf,
  confermaReset,
} from "../dati/gestioneDati";

import HeaderDashboard from "./HeaderDashboard";
import SezioneGrafici from "./SezioneGrafici";
import SceltaGrafico from "./SceltaGrafico";

// Componente principale del dashboard che gestisce la visualizzazione dei dati
function Dashboard({ onLogoRiduci, onLogoEspandi }) {
  const [dati, setDati] = useState(null);
  const [animazioneInEntrata, setAnimazioneInEntrata] = useState(false);
  const [graficoAttivo, setGraficoAttivo] = useState(null);
  const [sottoGraficoAttivo, setSottoGraficoAttivo] = useState(null);

  // Funzione per rigenerare i dati del dashboard
  const rigeneraDati = () => {
    inizializzaConfigurazione();
    const nuoviDati = generaDatiDashboard();
    if (nuoviDati) {
      salvaDatiInLocalStorage(nuoviDati);
      const primaGenerazione = dati === null; // Controlla se è la prima generazione dei dati
      setDati(nuoviDati);

      if (primaGenerazione) {
        setAnimazioneInEntrata(true);
        setTimeout(() => {
          setAnimazioneInEntrata(false);
        }, 800);
        if (onLogoRiduci) onLogoRiduci();
      }
    }
  };

  // Effettua il caricamento iniziale dei dati dal localStorage
  useEffect(() => {
    inizializzaConfigurazione();
    const datiSalvati = caricaDatiDaLocalStorage();

    if (datiSalvati) {
      setDati(datiSalvati);
      setAnimazioneInEntrata(true);
      setTimeout(() => {
        setAnimazioneInEntrata(false);
      }, 800);
    }
  }, []);

  const [distruzioneInCorso, setDistruzioneInCorso] = useState(false);

  // Funzione per resettare i dati del dashboard
  const resettaDati = () => {
    if (!confermaReset()) return;

    setDistruzioneInCorso(true);

    setTimeout(() => {
      cancellaDatiDaLocalStorage();
      cancellaDatiDaLocalStorageConf();
      setDati(null);
      setDistruzioneInCorso(false);
    }, 800);
    if (onLogoEspandi) onLogoEspandi();
  };

  if (!dati) {
    return (
      <div className="pagina-iniziale animazione-sequenza">
        <HeaderDashboard onRigenera={rigeneraDati} datiPresenti={false} />
      </div>
    );
  }

  return (
    <div
      className={`contenitore 
      ${distruzioneInCorso ? "distruzione" : ""}
      ${animazioneInEntrata ? "entrata" : ""}
    `}
    >
      <HeaderDashboard
        onRigenera={rigeneraDati}
        onResetta={resettaDati}
        datiPresenti={true}
      />

      <SceltaGrafico
        graficoAttivo={graficoAttivo}
        setGraficoAttivo={setGraficoAttivo}
        sottoGraficoAttivo={sottoGraficoAttivo}
        setSottoGraficoAttivo={setSottoGraficoAttivo}
      />
      <SezioneGrafici
        datiAnnuali={dati}
        graficoAttivo={graficoAttivo}
        sottoGraficoAttivo={sottoGraficoAttivo}
      />
    </div>
  );
}

export default Dashboard;
