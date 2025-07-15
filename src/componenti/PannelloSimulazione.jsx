import { useEffect, useState } from "react";
import { configurazioneDefault } from "../dati/configurazioneFinanziaria";
import VisualizzaConfigurazioneAttuale from "./VisualizzaConfigurazioneAttuale";

function PannelloSimulazione({ onConfigApplica }) {
  const [errore, setErrore] = useState(null);
  const [config, setConfig] = useState(() => {
    const salvata = localStorage.getItem("configurazioneSimulata");
    return salvata ? JSON.parse(salvata) : configurazioneDefault;
  });
  const [modificaAttiva, setModificaAttiva] = useState(false);
  const [configTemporanea, setConfigTemporanea] = useState(
    configurazioneDefault
  );

  // Al primo render, carica eventualmente i dati salvati su localStorage
  useEffect(() => {
    const salvata = localStorage.getItem("configurazioneSimulata");
    if (salvata) {
      const caricata = JSON.parse(salvata);
      setConfig(caricata);
      setConfigTemporanea(caricata);
    }
  }, []);

  // Effetto che valida la configurazione temporanea ogni volta che cambia
  useEffect(() => {
    const e = configTemporanea;

    const èIntero = (n) => Number.isInteger(n);
    const èPositivo = (n) => !isNaN(n) && n >= 0;

    if (!èPositivo(e.lavoratoriAnnuali) || !èIntero(e.lavoratoriAnnuali)) {
      return setErrore(
        "❌ Lavoratori annuali deve essere un numero intero ≥ 0."
      );
    }
    if (
      !èPositivo(e.lavoratoriSemestrali) ||
      !èIntero(e.lavoratoriSemestrali)
    ) {
      return setErrore(
        "❌ Lavoratori semestrali deve essere un numero intero ≥ 0."
      );
    }
    if (!èPositivo(e.lavoratoriMensili) || !èIntero(e.lavoratoriMensili)) {
      return setErrore(
        "❌ Lavoratori mensili deve essere un numero intero ≥ 0."
      );
    }
    if (e.stipendioMensile < 500) {
      return setErrore("❌ Lo stipendio deve essere almeno 500 €.");
    }
    if (!èIntero(e.mesiLavoro) || e.mesiLavoro < 1 || e.mesiLavoro > 14) {
      return setErrore("❌ Mesi lavorati deve essere tra 1 e 14.");
    }
    if (e.ettari < 0.1) {
      return setErrore("❌ Devono esserci almeno 0.1 ettari.");
    }
    if (e.quotaPrivati < 0 || e.quotaPrivati > 1) {
      return setErrore(
        "❌ La quota di vendita ai privati deve essere tra 0 e 1."
      );
    }

    if (!èPositivo(e.concimePerHa) || !èPositivo(e.fitofarmaciPerHa)) {
      return setErrore("❌ Concime e fitofarmaci devono essere ≥ 0.");
    }
    if (
      !èPositivo(e.bollettaIrrigazione) ||
      !èPositivo(e.manutenzioneImpianto)
    ) {
      return setErrore("❌ Bolletta e manutenzione devono essere ≥ 0.");
    }
    if (!èPositivo(e.TrasportoMerce) || !èIntero(e.TrasportoMerce)) {
      return setErrore("❌ I viaggi devono essere un numero intero ≥ 0.");
    }
    if (!èPositivo(e.costoTrasportoMerce)) {
      return setErrore("❌ Il costo viaggio deve essere ≥ 0.");
    }
    if (!èPositivo(e.numeroCassette) || !èIntero(e.numeroCassette)) {
      return setErrore("❌ Numero cassette deve essere un intero ≥ 0.");
    }
    if (!èPositivo(e.costoCassetta)) {
      return setErrore("❌ Costo cassetta deve essere ≥ 0.");
    }
    // Validazione ammortamenti
    const amm = e.ammortamento;
    if (!èPositivo(amm.macchinari)) {
      return setErrore("❌ Ammortamento macchinari deve essere ≥ 0.");
    }
    if (!èPositivo(amm.impianti)) {
      return setErrore("❌ Ammortamento impianti deve essere ≥ 0.");
    }
    if (!èPositivo(amm.piantine)) {
      return setErrore("❌ Ammortamento piantine deve essere ≥ 0.");
    }
    if (!èIntero(amm.anni) || amm.anni < 1 || amm.anni > 20) {
      return setErrore("❌ Anni ammortamento deve essere tra 1 e 20.");
    }

    // Validazione prezzi privati
    for (const [frutto, prezzo] of Object.entries(e.prezziPrivati)) {
      if (!èPositivo(prezzo)) {
        return setErrore(`❌ Prezzo privato per ${frutto} deve essere ≥ 0.`);
      }
    }

    // Validazione prezzi consorzio
    for (const [frutto, prezzo] of Object.entries(e.prezziConsorzio)) {
      if (!èPositivo(prezzo)) {
        return setErrore(`❌ Prezzo consorzio per ${frutto} deve essere ≥ 0.`);
      }
    }

    // Se tutto è valido:
    setErrore(null);
  }, [configTemporanea]);

  // Funzione che aggiorna il campo desiderato della configurazione temporanea
  const aggiornaCampo = (campo, valore) => {
    const parti = campo.split(".");
    if (parti.length === 1) {
      setConfigTemporanea({ ...configTemporanea, [campo]: parseFloat(valore) });
    } else {
      const [obj, key] = parti;
      setConfigTemporanea((prev) => ({
        ...prev,
        [obj]: {
          ...prev[obj],
          [key]: parseFloat(valore),
        },
      }));
    }
  };

  // Applica la configurazione temporanea, salvandola e passando il segnale al parent
  const applicaModifiche = () => {
    setErrore(null);
    setConfig(configTemporanea);
    localStorage.setItem(
      "configurazioneSimulata",
      JSON.stringify(configTemporanea)
    );
    if (onConfigApplica) {
      onConfigApplica(); // Notifica il componente padre
    }
    setModificaAttiva(false);
  };

  // Annulla eventuali modifiche tornando ai dati salvati
  const annullaModifiche = () => {
    setConfigTemporanea(config);
    setModificaAttiva(false);
  };

  // Ripristina la configurazione di default
  const ripristina = () => {
    setConfig(configurazioneDefault);
    setConfigTemporanea(configurazioneDefault);
    localStorage.setItem(
      "configurazioneSimulata",
      JSON.stringify(configurazioneDefault)
    );
    if (onConfigApplica) {
      onConfigApplica();
    }
  };

  return (
    <div className="configurazione-box-simula">
      <VisualizzaConfigurazioneAttuale
        config={modificaAttiva ? configTemporanea : config}
        editable={modificaAttiva}
        aggiornaCampo={aggiornaCampo}
      />

      {errore && <p className="messaggio-errore">{errore}</p>}

      <div className="blocco-pulsanti-simulazione">
        {!modificaAttiva ? (
          <button
            className="bottone-simula"
            onClick={() => setModificaAttiva(true)}
          >
            🧪 Simula
          </button>
        ) : (
          <>
            <button
              className="bottone-applica"
              onClick={applicaModifiche}
              disabled={!!errore}
            >
              ✅ Applica
            </button>
            <button className="bottone-annulla" onClick={annullaModifiche}>
              ❌ Annulla
            </button>
          </>
        )}
      </div>

      <div className="blocco-pulsante-ripristina">
        <button className="bottone-ripristina" onClick={ripristina}>
          🔄 Ripristina valori originali
        </button>
      </div>
    </div>
  );
}

export default PannelloSimulazione;
