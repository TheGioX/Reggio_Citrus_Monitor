import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { calcolaMedieMensili } from "../dati/calcolaMedieMensili";
import {
  calcolaBilancioFinanziario,
  calcolaBilancioMensile,
  calcolaBilancioGiornaliero,
} from "../dati/simulatoreFinanziario";
import { configurazioneDefault } from "../dati/configurazioneFinanziaria";

// Componente che visualizza il grafico finanziario annuale, mensile o giornaliero
function GraficoFinanziario({ datiAnnuali, versione }) {
  const [annoSelezionato, setAnnoSelezionato] = useState(null);
  const [meseSelezionato, setMeseSelezionato] = useState(null);
  const [giornoSelezionato, setGiornoSelezionato] = useState(null);
  // Stato per la configurazione finanziaria, inizializzato con i dati salvati o quelli di default
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

  // Calcola i dati da visualizzare nel grafico in base all'anno e mese selezionati
  const datiGrafico = (() => {
    if (!annoSelezionato) {
      return calcolaBilancioFinanziario(datiAnnuali, config);
    }

    const datiAnno = datiAnnuali[annoSelezionato];

    if (!meseSelezionato) {
      const mensili = calcolaMedieMensili(datiAnno);
      const primoAnno = Math.min(...Object.keys(datiAnnuali).map(Number));
      return calcolaBilancioMensile(
        mensili,
        +annoSelezionato,
        primoAnno,
        config
      );
    }

    const giorni = datiAnno[meseSelezionato]?.giorni || [];
    const primoAnno = Math.min(...Object.keys(datiAnnuali).map(Number));
    return calcolaBilancioGiornaliero(
      giorni,
      annoSelezionato,
      primoAnno,
      config
    );
  })();

  const chiaveX = !annoSelezionato
    ? "anno"
    : meseSelezionato
    ? "giorno"
    : "mese";

  const titolo = (() => {
    if (!annoSelezionato) return "Bilancio economico annuale";
    if (!meseSelezionato)
      return `Bilancio economico mensile – ${annoSelezionato}`;
    return `Bilancio economico giornaliero – ${meseSelezionato} ${annoSelezionato}`;
  })();

  // Gestisce il click sui punti del grafico per navigare tra anno, mese e giorno
  const handleClick = (e) => {
    if (!annoSelezionato && e?.activeLabel) {
      setAnnoSelezionato(e.activeLabel);
    } else if (annoSelezionato && !meseSelezionato && e?.activeLabel) {
      setMeseSelezionato(e.activeLabel);
    } else if (annoSelezionato && meseSelezionato && e?.activePayload?.length) {
      setGiornoSelezionato(e.activePayload[0].payload);
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
    const punto = payload[0]?.payload;

    const label =
      punto?.giorno !== undefined
        ? `Giorno ${punto.giorno}`
        : punto?.mese
        ? punto.mese
        : punto?.anno;

    return (
      <div className="custom-tooltip">
        <p>
          <strong>{label}</strong>
        </p>
        <p className="testo-ricavi">💰 Ricavi: {punto.ricavi.toFixed(2)} €</p>
        <p className="testo-spese">💸 Spese: {punto.spese.toFixed(2)} €</p>
        <p className="testo-utile">📈 Utile: {punto.utile.toFixed(2)} €</p>
      </div>
    );
  }

  return (
    <div className="contenitore-grafico-e-tabella">
      <div className="intestazione-grafico">
        {!annoSelezionato && <h3>{titolo}</h3>}

        {annoSelezionato && !meseSelezionato && (
          <h3>
            <button
              onClick={() => {
                const anni = Object.keys(datiAnnuali).sort();
                const indice = anni.indexOf(String(annoSelezionato));
                if (indice > 0) {
                  setAnnoSelezionato(anni[indice - 1]);
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
                const indice = anni.indexOf(String(annoSelezionato));
                if (indice < anni.length - 1) {
                  setAnnoSelezionato(anni[indice + 1]);
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

      <div className="grafico-wrapper-finanza">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={datiGrafico} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chiaveX} />
            <YAxis unit="€" />
            <Tooltip content={<TooltipPersonalizzato />} />
            <Legend />
            <Bar dataKey="ricavi" fill="#4caf50" name="Ricavi" />
            <Bar dataKey="spese" fill="#f44336" name="Spese" />
            <Bar dataKey="utile" fill="#2196f3" name="Utile netto" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {giornoSelezionato && (
        <div className="contenitore-tabella">
          <h4>Dettagli del giorno {giornoSelezionato.giorno}</h4>
          <table className="tabella-dettagli">
            <thead>
              <tr>
                <th>Ricavi</th>
                <th>Spese</th>
                <th>Utile</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{giornoSelezionato.ricavi.toFixed(2)} €</td>
                <td>{giornoSelezionato.spese.toFixed(2)} €</td>
                <td
                  className={
                    giornoSelezionato.utile >= 0
                      ? "utile-positivo"
                      : "utile-negativo"
                  }
                >
                  {giornoSelezionato.utile.toFixed(2)} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GraficoFinanziario;
