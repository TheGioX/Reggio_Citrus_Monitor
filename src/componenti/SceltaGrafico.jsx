// Componente per visualizzare la selezione del grafico
function SceltaGrafico({
  graficoAttivo,
  setGraficoAttivo,
  sottoGraficoAttivo,
  setSottoGraficoAttivo,
}) {
  const opzioni = [
    { id: "temperature", nome: "Temperature", emoji: "🌡️", colore: "#ff8a65" },
    { id: "umidita", nome: "Umidità", emoji: "💧", colore: "#4fc3f7" },
    { id: "pioggia", nome: "Pioggia", emoji: "☔", colore: "#9575cd" },
    { id: "raccolto", nome: "Raccolto", emoji: "🌳", colore: "#81c784" },
    { id: "finanza", nome: "Finanze", emoji: "💶", colore: "#42a5f5" },
  ];

  return (
    <div className="box-grafici-wrapper">
      {opzioni.map((opzione) => (
        <div key={opzione.id} className="box-grafico-wrapper-colonna">
          <div
            className={`box-grafico box-${opzione.id} ${
              graficoAttivo === opzione.id ? "attivo" : ""
            }`}
            onClick={() => {
              setGraficoAttivo((attuale) => {
                const nuovo = attuale === opzione.id ? null : opzione.id;

                // Se sto uscendo da "raccolto", azzero anche il sotto-grafico
                if (
                  (attuale === "raccolto" && nuovo !== "raccolto") ||
                  (attuale === "finanza" && nuovo !== "finanza")
                ) {
                  setSottoGraficoAttivo(null);
                }

                return nuovo;
              });
            }}
          >
            <p>{opzione.nome}</p>
            <span className="emoji">{opzione.emoji}</span>
          </div>

          {opzione.id === "raccolto" && graficoAttivo === "raccolto" && (
            <div
              className={`box-grafico sotto-grafico box-cicliLimoni ${
                sottoGraficoAttivo === "cicliLimoni" ? "attivo" : ""
              }`}
              onClick={() =>
                setSottoGraficoAttivo((attuale) =>
                  attuale === "cicliLimoni" ? null : "cicliLimoni"
                )
              }
            >
              <p className="sotto-testo">Cicli Limoni</p>
              <span className="emoji">🍋</span>
            </div>
          )}
          {opzione.id === "finanza" && graficoAttivo === "finanza" && (
            <>
              <div
                className={`box-grafico sotto-grafico-simulazione box-simulazione ${
                  sottoGraficoAttivo === "simulazione" ? "attivo" : ""
                }`}
                onClick={() =>
                  setSottoGraficoAttivo((attuale) =>
                    attuale === "simulazione" ? null : "simulazione"
                  )
                }
              >
                <p className="sotto-testo">Simulazione</p>
                <span className="emoji-simulazione">🧪</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default SceltaGrafico;
