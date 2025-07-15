// Componente che mostra il titolo e i pulsanti "Rigenera" e "Resetta" o solo "Genera dati" con messaggio
function HeaderDashboard({ onRigenera, onResetta, datiPresenti }) {
  return (
    <div className="intestazione">
      <h2 className="testo-settore">
        Dashboard - settore primario (2000–2024)
      </h2>

      {datiPresenti ? (
        <>
          <button onClick={onRigenera} className="bottone-rigeneradati">
            📥 Rigenera Dati
          </button>
          <button onClick={onResetta} className="bottone-resettadati">
            🗑️ Resetta dati
          </button>
        </>
      ) : (
        <>
          <button onClick={onRigenera} className="bottone-generadati">
            📥 Genera dati
          </button>
          <button
            className="bottone-resettadati finto"
            aria-hidden="true"
            tabIndex={-1}
          >
            🗑️
          </button>
          <p className="sotto-bottone">
            Nessun dato ancora disponibile. Clicca su "Genera dati" per
            iniziare.
          </p>
        </>
      )}
    </div>
  );
}

export default HeaderDashboard;
