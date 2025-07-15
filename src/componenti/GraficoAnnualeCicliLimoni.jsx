import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Brush,
} from "recharts";
import { useMemo, useState } from "react";
import { calcolaMedieAnnuali } from "../dati/calcolaMedieAnnuali";
import { calcolaMedieMensili } from "../dati/calcolaMedieMensili";
import TabellaDettagliGiorno from "./TabellaDettagliGiorno";

// Componente che visualizza il grafico annuale dei cicli di raccolta dei limoni
function GraficoAnnualeCicliLimoni({ datiAnnuali }) {
  const [annoSelezionato, setAnnoSelezionato] = useState(null);
  const [meseSelezionato, setMeseSelezionato] = useState(null);
  const [giornoSelezionato, setGiornoSelezionato] = useState(null);
  const [visibilitàCicli, setVisibilitàCicli] = useState({
    primoFiore: true,
    bianchetto: true,
    verdello: true,
  });

  // Funzione per calcolare la visibilità dei cicli di raccolta
  const toggleCiclo = (ciclo) => {
    setVisibilitàCicli((prev) => ({
      ...prev,
      [ciclo]: !prev[ciclo],
    }));
  };

  // Calcola i dati da visualizzare nel grafico in base all'anno e mese selezionati
  const dati = useMemo(() => {
    if (!annoSelezionato) {
      const annuale = calcolaMedieAnnuali(datiAnnuali);

      return annuale.map((anno) => ({
        anno: anno.anno,
        primoFiore: +(anno.limoniPrimoFiore || 0) / 1000,
        bianchetto: +(anno.limoniBianchetto || 0) / 1000,
        verdello: +(anno.limoniVerdello || 0) / 1000,
      }));
    }

    const datiAnno = datiAnnuali[annoSelezionato];

    if (!meseSelezionato) {
      const mensili = calcolaMedieMensili(datiAnno);
      return mensili.map((mese) => ({
        mese: mese.mese,
        primoFiore: +(mese.limoniPrimoFiore || 0),
        bianchetto: +(mese.limoniBianchetto || 0),
        verdello: +(mese.limoniVerdello || 0),
      }));
    }

    return (
      datiAnno[meseSelezionato]?.giorni.map((g) => ({
        giorno: g.giorno,
        primoFiore: g.limoniDettaglio?.primoFiore || 0,
        bianchetto: g.limoniDettaglio?.bianchetto || 0,
        verdello: g.limoniDettaglio?.verdello || 0,
        eventi: g.eventi || [],
      })) || []
    );
  }, [datiAnnuali, annoSelezionato, meseSelezionato]);

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

  const chiaveX = !annoSelezionato
    ? "anno"
    : meseSelezionato
    ? "giorno"
    : "mese";
  const unitaY = !annoSelezionato ? "t" : "kg";

  // Determina il titolo del grafico in base all'anno e mese selezionati
  const titolo = (() => {
    if (!annoSelezionato)
      return "Produzione annuale dei limoni per ciclo (in tonnellate)";
    if (!meseSelezionato) return `Produzione mensile – ${annoSelezionato}`;
    return `Produzione giornaliera – ${meseSelezionato} ${annoSelezionato}`;
  })();

  // Tooltip personalizzato per visualizzare i dettagli del punto selezionato
  function TooltipPersonalizzato({ active, payload }) {
    if (!active || !payload || !payload.length) return null;
    const punto = payload[0]?.payload;
    return (
      <div className="custom-tooltip">
        <p>
          <strong>
            {punto.giorno ? `Giorno ${punto.giorno}` : punto.mese || punto.anno}
          </strong>
        </p>
        {payload.map((p) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: {p.value} {p.unit}
          </p>
        ))}
        {punto.giorno &&
          Array.isArray(punto.eventi) &&
          punto.eventi.length > 0 && (
            <>
              <p>
                <strong>🌩 Eventi climatici:</strong>
              </p>
              <ul className="lista-eventi">
                {punto.eventi.map((ev, i) => (
                  <li key={i}>{ev.tipo}</li>
                ))}
              </ul>
            </>
          )}
      </div>
    );
  }

  return (
    <div className="grafico-container-raccolto">
      <div className="intestazione-grafico">
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
            <button onClick={tornaIndietro} className="bottone-indietro-limoni">
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
            <button onClick={tornaIndietro} className="bottone-indietro-limoni">
              ⬅ Torna indietro
            </button>
          </h3>
        )}
      </div>

      <div className="grafico-wrapper-raccolto">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dati} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chiaveX} />
            <YAxis unit={unitaY} />
            <Tooltip content={<TooltipPersonalizzato />} />

            {visibilitàCicli.primoFiore && (
              <Line
                type="monotone"
                dataKey="primoFiore"
                name="Primofiore"
                stroke="#FFD700"
                strokeWidth={2}
              />
            )}
            {visibilitàCicli.bianchetto && (
              <Line
                type="monotone"
                dataKey="bianchetto"
                name="Bianchetto"
                stroke="#00BFFF"
                strokeWidth={2}
              />
            )}
            {visibilitàCicli.verdello && (
              <Line
                type="monotone"
                dataKey="verdello"
                name="Verdello"
                stroke="#32CD32"
                strokeWidth={2}
              />
            )}
            {meseSelezionato && (
              <Line
                dataKey={() => null}
                stroke="none"
                dot={(props) =>
                  props.payload.eventi?.length > 0 ? (
                    <circle
                      cx={props.cx}
                      cy={props.cy - 10}
                      r={5}
                      fill="red"
                      stroke="black"
                      strokeWidth={1}
                    />
                  ) : null
                }
                isAnimationActive={false}
                legendType="none"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <div className="custom-legend">
          {[
            { nome: "primoFiore", colore: "#FFD700", label: "Primofiore" },
            { nome: "bianchetto", colore: "#00BFFF", label: "Bianchetto" },
            { nome: "verdello", colore: "#32CD32", label: "Verdello" },
          ].map(({ nome, colore, label }) => (
            <span
              key={nome}
              onClick={() => toggleCiclo(nome)}
              className={`ciclo ${
                visibilitàCicli[nome] ? "ciclo-visibile" : "ciclo-nascosto"
              }`}
              style={{
                color: visibilitàCicli[nome] ? colore : undefined, // Colore dinamico
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <TabellaDettagliGiorno giorno={giornoSelezionato} />
      </div>
    </div>
  );
}

export default GraficoAnnualeCicliLimoni;
