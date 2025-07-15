import { useState, useEffect } from "react";
import "../stili/grafici.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { calcolaMedieAnnuali } from "../dati/calcolaMedieAnnuali";
import { calcolaMedieMensili } from "../dati/calcolaMedieMensili";
import TabellaDettagliGiorno from "../componenti/TabellaDettagliGiorno";

const iconeAgrumi = {
  arance: "🍊",
  limoni: "🍋",
  mandarini: "🍊",
  bergamotti: "🍋",
};

const colori = {
  arance: "#FFA500",
  limoni: "#FFFF00",
  mandarini: "#FF4500",
  bergamotti: "#81c784",
};

// Componente che visualizza il grafico annuale totale del raccolto
function GraficoAnnualeTotaleRaccolto({ datiAnnuali }) {
  const [annoSelezionato, setAnnoSelezionato] = useState(null);
  const [meseSelezionato, setMeseSelezionato] = useState(null);
  const [zoomAttivo, setZoomAttivo] = useState(false);
  const [giornoSelezionato, setGiornoSelezionato] = useState(null);
  const [visibilitàAgrumi, setVisibilitàAgrumi] = useState({
    arance: true,
    mandarini: true,
    limoni: true,
    bergamotti: true,
  });

  // Inizializza lo stato visibilitàAgrumi con i valori di default
  const toggleAgrume = (agrume) => {
    setVisibilitàAgrumi((prev) => ({
      ...prev,
      [agrume]: !prev[agrume],
    }));
  };

  // Calcola i dati da visualizzare nel grafico in base all'anno e mese selezionati
  const datiGrafico = (() => {
    if (!annoSelezionato) {
      return calcolaMedieAnnuali(datiAnnuali).map((el) => ({
        ...el,
        arance: parseFloat((el.arance / 1000).toFixed(2)),
        mandarini: parseFloat((el.mandarini / 1000).toFixed(2)),
        limoni: parseFloat((el.limoni / 1000).toFixed(2)),
        bergamotti: parseFloat((el.bergamotti / 1000).toFixed(2)),
      }));
    }

    // Se è stato selezionato un anno, calcola i dati per quell'anno
    const datiAnno = datiAnnuali[annoSelezionato];
    if (!meseSelezionato) {
      return calcolaMedieMensili(datiAnno);
    }

    return datiAnno[meseSelezionato]?.giorni || [];
  })();

  // Inizializza il colore del brush con il colore di sfondo corrente
  const [fillBrush, setFillBrush] = useState(() =>
    getComputedStyle(document.body).getPropertyValue("--bg-color").trim()
  );

  // Aggiorna il colore del brush quando cambia il tema
  useEffect(() => {
    const aggiornaColore = () => {
      const nuovoColore = getComputedStyle(document.body)
        .getPropertyValue("--bg-color")
        .trim();
      setFillBrush(nuovoColore);
    };

    // Inizializza il colore del brush e imposta l'osservatore per i cambiamenti di tema
    aggiornaColore();
    const observer = new MutationObserver(aggiornaColore);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chiaveX = !annoSelezionato
    ? "anno"
    : meseSelezionato
    ? "giorno"
    : "mese";
  const unitaY = !annoSelezionato ? "t" : "kg";

  // Determina il titolo del grafico in base all'anno e mese selezionati
  const titolo = (() => {
    if (!annoSelezionato)
      return "Raccolto totale annuale per tipo (in tonnellate)";
    if (!meseSelezionato) return `Raccolto mensile – ${annoSelezionato}`;
    return `Raccolto giornaliero – ${meseSelezionato} ${annoSelezionato}`;
  })();

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
    const giorno = payload[0]?.payload;

    return (
      <div className="custom-tooltip">
        <p>
          <strong>
            {giorno.giorno
              ? `Giorno ${giorno.giorno}`
              : giorno.mese
              ? `${giorno.mese}`
              : `${giorno.anno}`}
          </strong>
        </p>

        {payload.map((p) =>
          visibilitàAgrumi[p.dataKey] ? (
            <p key={p.dataKey} style={{ color: p.color }}>
              {p.name} : {p.value} {p.unit}
            </p>
          ) : null
        )}

        {giorno.giorno && Array.isArray(giorno.eventi) ? (
          giorno.eventi.length > 0 ? (
            <>
              <p>
                <strong>🌩 Eventi climatici:</strong>
              </p>
              <ul className="lista-eventi">
                {giorno.eventi.map((ev, i) => (
                  <li key={i}>{ev.tipo}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="nessun-evento">Nessun evento climatico</p>
          )
        ) : null}
      </div>
    );
  }

  return (
    <div className="grafico-container-raccolto">
      <div className="intestazione-grafico">
        <button
          onClick={() => setZoomAttivo((prev) => !prev)}
          className="bottone-zoom-raccolto"
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
            <button
              onClick={tornaIndietro}
              className="bottone-indietro-raccolto"
            >
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

      <div className="grafico-wrapper-raccolto">
        <ResponsiveContainer>
          <BarChart data={datiGrafico} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chiaveX} />
            <YAxis
              unit={unitaY}
              domain={
                zoomAttivo
                  ? [0, "dataMax + 1.0"]
                  : !annoSelezionato
                  ? [0, "auto"] // grafico annuale: 0–10 tonnellate
                  : meseSelezionato
                  ? [0, "dataMax + 100"] // grafico giornaliero: 0–500 kg
                  : [0, "dataMax + 1000"] // grafico mensile: 0–5000 kg
              }
            />

            <Tooltip content={<TooltipPersonalizzato />} />
            <Brush
              dataKey={chiaveX}
              height={50}
              stroke="#646cff"
              fill={fillBrush}
            />
            {Object.keys(colori).map(
              (tipo) =>
                visibilitàAgrumi[tipo] && (
                  <Bar
                    key={tipo}
                    dataKey={tipo}
                    fill={colori[tipo]}
                    barSize={zoomAttivo ? 10 : 20}
                  />
                )
            )}
          </BarChart>
        </ResponsiveContainer>
        <div className="custom-legend">
          {Object.keys(colori).map((agrume) => (
            <span
              key={agrume}
              onClick={() => toggleAgrume(agrume)}
              className={`agrume ${
                visibilitàAgrumi[agrume] ? "agrume-visibile" : "agrume-nascosto"
              }`}
              style={{
                color: visibilitàAgrumi[agrume] ? colori[agrume] : undefined,
              }}
            >
              {iconeAgrumi[agrume]}{" "}
              {agrume.charAt(0).toUpperCase() + agrume.slice(1)}
            </span>
          ))}
        </div>
        <TabellaDettagliGiorno giorno={giornoSelezionato} />
      </div>
    </div>
  );
}

export default GraficoAnnualeTotaleRaccolto;
