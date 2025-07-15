import { calcolaMedieAnnuali } from "../dati/calcolaMedieAnnuali";
import { calcolaBilancioFinanziario } from "../dati/simulatoreFinanziario";
import { configurazioneDefault } from "../dati/configurazioneFinanziaria";
import { useEffect, useState } from "react";

// Componente che visualizza i KPI finanziari annuali
function KPI({ dati, versione }) {
  const [config, setConfig] = useState(() => {
    const salvata = localStorage.getItem("configurazioneSimulata");
    return salvata ? JSON.parse(salvata) : configurazioneDefault;
  });

  // Al primo render, carica eventualmente i dati salvati su localStorage
  useEffect(() => {
    const nuova = localStorage.getItem("configurazioneSimulata");
    if (nuova) {
      setConfig(JSON.parse(nuova));
    }
  }, [versione]);

  const PREZZI_PRIVATI = config.prezziPrivati;
  const PREZZI_CONSORZIO = config.prezziConsorzio;
  const QUOTA_PRIVATI = config.quotaPrivati;

  const kpi = calcolaMedieAnnuali(dati);

  const totaleRaccoltoKg = kpi.reduce(
    (tot, anno) =>
      tot + anno.arance + anno.mandarini + anno.limoni + anno.bergamotti,
    0
  );
  const totaleRaccoltoTonnellate = (totaleRaccoltoKg / 1000).toFixed(1);
  const efficienzaMedia = (totaleRaccoltoKg / 1000 / kpi.length).toFixed(1);
  const bilancio = calcolaBilancioFinanziario(dati, config);

  const utili = bilancio.map((b) => b.utile);
  const utileMedio = (
    utili.reduce((acc, val) => acc + val, 0) / utili.length
  ).toFixed(2);
  const utileMinimo = Math.min(...utili).toFixed(2);
  const utileMassimo = Math.max(...utili).toFixed(2);
  const annoMin = bilancio.find((b) => b.utile === Math.min(...utili))?.anno;
  const annoMax = bilancio.find((b) => b.utile === Math.max(...utili))?.anno;
  const prezzoMedio =
    Object.keys(PREZZI_PRIVATI).reduce((acc, frutto) => {
      const priv = PREZZI_PRIVATI[frutto];
      const cons = PREZZI_CONSORZIO[frutto];
      return acc + (QUOTA_PRIVATI * priv + (1 - QUOTA_PRIVATI) * cons);
    }, 0) / Object.keys(PREZZI_PRIVATI).length;
  const performanceFinanziaria = (
    (totaleRaccoltoKg / 1000) *
    prezzoMedio
  ).toFixed(0);

  return (
    <>
      {JSON.stringify(config) !== JSON.stringify(configurazioneDefault) && (
        <div className="etichetta-simulazione">
          🧪 <strong>Simulazione attiva KPI</strong>
        </div>
      )}

      <div className="kpi-wrapper">
        <div className="kpi-box">
          <h4>📦 Totale raccolto</h4>
          <p>{totaleRaccoltoTonnellate} tonnellate</p>
        </div>
        <div className="kpi-box">
          <h4>🏭 Efficienza media</h4>
          <p>{efficienzaMedia} t/anno</p>
        </div>
        <div className="kpi-box">
          <h4>💰 Performance finanziaria</h4>
          <p>{performanceFinanziaria} k€</p>
        </div>
        <div className="kpi-box">
          <h4>Margine netto </h4>
          <p>
            📉 {utileMinimo} € ({annoMin})
          </p>
          <p>⚖️ {utileMedio} €</p>
          <p>
            📈 {utileMassimo} € ({annoMax})
          </p>
        </div>
      </div>
    </>
  );
}

export default KPI;
