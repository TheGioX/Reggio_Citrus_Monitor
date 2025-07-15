//  Componente per visualizzare i dettagli di un giorno specifico
function TabellaDettagliGiorno({ giorno }) {
  if (!giorno) return null;

  return (
    <div className="contenitore-tabella">
      <h4>Dettagli del giorno {giorno.giorno}</h4>
      <table className="tabella-dettagli">
        <thead>
          <tr>
            <th>Temperatura</th>
            <th>Umidità</th>
            <th>Pioggia</th>
            <th>Arance</th>
            <th>Mandarini</th>
            <th>Limoni</th>
            <th>Bergamotti</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{giorno.temperatura?.toFixed(2)} °C</td>
            <td>{giorno.umidità?.toFixed(2)} %</td>
            <td>{giorno.pioggia?.toFixed(2)} mm</td>
            <td>{giorno.arance} kg</td>
            <td>{giorno.mandarini} kg</td>
            <td>{giorno.limoni} kg</td>
            <td>{giorno.bergamotti} kg</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TabellaDettagliGiorno;
