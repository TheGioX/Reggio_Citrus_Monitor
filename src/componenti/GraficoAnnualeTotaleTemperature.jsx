import { useState } from "react";
import "../stili/grafici.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calcolaMedieAnnuali } from "../dati/calcolaMedieAnnuali";
import { calcolaMedieMensili } from "../dati/calcolaMedieMensili";
import TabellaDettagliGiorno from "../componenti/TabellaDettagliGiorno";

// Componente che visualizza il grafico annuale totale delle temperature
function GraficoAnnualeTotaleTemperature({ datiAnnuali }) {
  const [annoSelezionato, setAnnoSelezionato] = useState(null);
  const [meseSelezionato, setMeseSelezionato] = useState(null);
  const [giornoSelezionato, setGiornoSelezionato] = useState(null);
  const [zoomAttivo, setZoomAttivo] = useState(false);

  // Calcola i dati da visualizzare nel grafico in base all'anno e mese selezionati
  const datiGrafico = (() => {
    if (!annoSelezionato) return calcolaMedieAnnuali(datiAnnuali);
    const datiAnno = datiAnnuali[annoSelezionato];
    if (!meseSelezionato) return calcolaMedieMensili(datiAnno);
    return datiAnno[meseSelezionato]?.giorni || [];
  })();

  const chiaveX = !annoSelezionato
    ? "anno"
    : meseSelezionato
    ? "giorno"
    : "mese";

  const titolo = !annoSelezionato
    ? "Temperatura media annuale (2000–2024)"
    : meseSelezionato
    ? `Temperatura giornaliera – ${meseSelezionato} ${annoSelezionato}`
    : `Temperatura mensile – ${annoSelezionato}`;

  // Gestisce il click sui punti del grafico per navigare tra anno, mese e giorno
  const handleClick = (e) => {
    if (!annoSelezionato && e?.activeLabel) {
      setAnnoSelezionato(e.activeLabel);
    } else if (annoSelezionato && !meseSelezionato && e?.activeLabel) {
      setMeseSelezionato(e.activeLabel);
    } else if (annoSelezionato && meseSelezionato && e?.activePayload?.length) {
      const giorno = e.activePayload[0].payload;
      setGiornoSelezionato(giorno);
    }
  };

  // Torna indietro nella navigazione del grafico
  const tornaIndietro = () => {
    if (giornoSelezionato) setGiornoSelezionato(null);
    else if (meseSelezionato) setMeseSelezionato(null);
    else if (annoSelezionato) setAnnoSelezionato(null);
  };

  // Tooltip personalizzato per visualizzare i dettagli del punto selezionato
  function TooltipPersonalizzato({ active, payload }) {
    if (!active || !payload || !payload.length) return null;
    const punto = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p>
          <strong>
            {punto.giorno
              ? `Giorno ${punto.giorno}`
              : punto.mese
              ? punto.mese
              : punto.anno}
          </strong>
        </p>
        <p className="testo-temperatura">
          🌡️ Temperatura: {punto.temperatura} °C
        </p>
      </div>
    );
  }

  return (
    <div className="contenitore-grafico-e-tabella">
      <div className="intestazione-grafico">
        <button
          onClick={() => setZoomAttivo((prev) => !prev)}
          className="bottone-zoom"
        >
          {zoomAttivo ? "🔍➖" : "🔍➕"}
        </button>
        {!annoSelezionato && <h3>{titolo}</h3>}
        {annoSelezionato && !meseSelezionato && (
          <h3>
            <button
              onClick={() => {
                const anni = Object.keys(datiAnnuali).sort();
                const indiceAttuale = anni.indexOf(String(annoSelezionato));
                if (indiceAttuale > 0) {
                  setAnnoSelezionato(anni[indiceAttuale - 1]);
                }
              }}
              className="freccia-navigazione-sx"
            >
              ⬅
            </button>
            {titolo}
            <button
              onClick={() => {
                const anni = Object.keys(datiAnnuali).sort();
                const indiceAttuale = anni.indexOf(String(annoSelezionato));
                if (indiceAttuale < anni.length - 1) {
                  setAnnoSelezionato(anni[indiceAttuale + 1]);
                }
              }}
              className="freccia-navigazione-dx"
            >
              ⮕
            </button>
            <button onClick={tornaIndietro} className="bottone-indietro">
              ⬅ Torna indietro
            </button>
          </h3>
        )}
        {meseSelezionato && (
          <h3>
            <button
              onClick={() => {
                const mesi = Object.keys(datiAnnuali[annoSelezionato]);
                const indiceAttuale = mesi.indexOf(meseSelezionato);
                if (indiceAttuale > 0) {
                  setMeseSelezionato(mesi[indiceAttuale - 1]);
                  setGiornoSelezionato(null);
                }
              }}
              className="freccia-navigazione-sx"
            >
              ⬅
            </button>
            {titolo}
            <button
              onClick={() => {
                const mesi = Object.keys(datiAnnuali[annoSelezionato]);
                const indiceAttuale = mesi.indexOf(meseSelezionato);
                if (indiceAttuale < mesi.length - 1) {
                  setMeseSelezionato(mesi[indiceAttuale + 1]);
                  setGiornoSelezionato(null);
                }
              }}
              className="freccia-navigazione-dx"
            >
              ⮕
            </button>
            <button
              onClick={tornaIndietro}
              className="bottone-indietro-raccolto"
            >
              ⬅ Torna indietro
            </button>
          </h3>
        )}
      </div>

      <div className="grafico-wrapper">
        <ResponsiveContainer>
          <LineChart data={datiGrafico} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chiaveX} />
            <YAxis unit="°C" domain={zoomAttivo ? ["auto", "auto"] : [0, 45]} />
            <Tooltip content={<TooltipPersonalizzato />} />
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#ff5722"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <TabellaDettagliGiorno giorno={giornoSelezionato} />
    </div>
  );
}

export default GraficoAnnualeTotaleTemperature;
