// Componente per visualizzare i grafici annuali

import GraficoAnnualeTotaleTemperature from "./GraficoAnnualeTotaleTemperature";
import GraficoAnnualeTotaleUmidità from "./GraficoAnnualeTotaleUmidità";
import GraficoAnnualeTotalePioggia from "./GraficoAnnualeTotalePioggia";
import GraficoAnnualeTotaleRaccolto from "./GraficoAnnualeTotaleRaccolto";
import GraficoAnnualeCicliLimoni from "./GraficoAnnualeCicliLimoni";
import GraficoFinanziario from "./GraficoFinanziario";
import { useState } from "react";

import KPI from "./KPI";
import PannelloSimulazione from "./PannelloSimulazione";

// Componente principale che gestisce la visualizzazione dei grafici annuali
function SezioneGrafici({ datiAnnuali, graficoAttivo, sottoGraficoAttivo }) {
  const [versioneGrafico, setVersioneGrafico] = useState(0);
  if (!graficoAttivo) {
    return (
      <p className="testo-pre-grafico">Seleziona un grafico per iniziare</p>
    );
  }

  return (
    <div className="blocco-grafico">
      {graficoAttivo === "temperature" && (
        <GraficoAnnualeTotaleTemperature datiAnnuali={datiAnnuali} />
      )}
      {graficoAttivo === "umidita" && (
        <GraficoAnnualeTotaleUmidità datiAnnuali={datiAnnuali} />
      )}
      {graficoAttivo === "pioggia" && (
        <GraficoAnnualeTotalePioggia datiAnnuali={datiAnnuali} />
      )}
      {graficoAttivo === "raccolto" && !sottoGraficoAttivo && (
        <GraficoAnnualeTotaleRaccolto datiAnnuali={datiAnnuali} />
      )}

      {graficoAttivo === "raccolto" && sottoGraficoAttivo === "cicliLimoni" && (
        <GraficoAnnualeCicliLimoni datiAnnuali={datiAnnuali} />
      )}
      {graficoAttivo === "finanza" && (
        <>
          <KPI dati={datiAnnuali} versione={versioneGrafico} />
          {sottoGraficoAttivo === "simulazione" && (
            <div>
              <PannelloSimulazione
                onConfigApplica={() => setVersioneGrafico((prev) => prev + 1)}
              />
            </div>
          )}
          <GraficoFinanziario
            datiAnnuali={datiAnnuali}
            versione={versioneGrafico}
          />
        </>
      )}
    </div>
  );
}

export default SezioneGrafici;
