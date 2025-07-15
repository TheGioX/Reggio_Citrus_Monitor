const emojiFrutti = {
  arance: "🍊",
  limoni: "🍋",
  mandarini: "🍊",
  bergamotti: "🍋",
};

// Componente per visualizzare la configurazione attuale
function VisualizzaConfigurazioneAttuale({
  config,
  editable = false,
  aggiornaCampo,
}) {
  if (!config) return <div>Caricamento configurazione...</div>;

  return (
    <div className="configurazione-box">
      <h4>⚙️ Configurazione attuale</h4>
      <ul className="lista-configurazione">
        <ul className="lista-configurazione-interna">
          <li className="riga-configurazione">
            <strong>👨‍🌾 Lavoratori annuali:</strong>{" "}
            {editable ? (
              <input
                type="number"
                value={config.lavoratoriAnnuali}
                onChange={(e) =>
                  aggiornaCampo("lavoratoriAnnuali", e.target.value)
                }
              />
            ) : (
              config.lavoratoriAnnuali
            )}
          </li>
          <li className="riga-configurazione">
            <strong>👷‍♂️ Lavoratori semestrali:</strong>{" "}
            {editable ? (
              <input
                type="number"
                value={config.lavoratoriSemestrali}
                onChange={(e) =>
                  aggiornaCampo("lavoratoriSemestrali", e.target.value)
                }
              />
            ) : (
              config.lavoratoriSemestrali
            )}
          </li>
          <li className="riga-configurazione">
            <strong>👷‍♂️ Lavoratori mensili:</strong>{" "}
            {editable ? (
              <input
                type="number"
                value={config.lavoratoriMensili}
                onChange={(e) =>
                  aggiornaCampo("lavoratoriMensili", e.target.value)
                }
              />
            ) : (
              config.lavoratoriMensili
            )}
          </li>
          <li className="riga-configurazione">
            <strong>💶 Stipendio mensile:</strong>
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.stipendioMensile}
                  onChange={(e) =>
                    aggiornaCampo("stipendioMensile", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.stipendioMensile + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>📆 Mesi lavorati:</strong>
            {editable ? (
              <input
                type="number"
                value={config.mesiLavoro}
                onChange={(e) => aggiornaCampo("mesiLavoro", e.target.value)}
              />
            ) : (
              config.mesiLavoro
            )}
          </li>
          <li className="riga-configurazione">
            <strong>🌾 Totale ettari:</strong>
            <span>{config.ettari}</span>
          </li>
          <li className="riga-configurazione">
            <strong>🧪 Concime/ha:</strong>
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.concimePerHa}
                  onChange={(e) =>
                    aggiornaCampo("concimePerHa", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.concimePerHa + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>🛡️ Fitofarmaci/ha:</strong>{" "}
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.fitofarmaciPerHa}
                  onChange={(e) =>
                    aggiornaCampo("fitofarmaciPerHa", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.fitofarmaciPerHa + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>💧 Costo irrigazione:</strong>{" "}
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.bollettaIrrigazione}
                  onChange={(e) =>
                    aggiornaCampo("bollettaIrrigazione", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.bollettaIrrigazione + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>🛠️ Manutenzione impianto:</strong>{" "}
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.manutenzioneImpianto}
                  onChange={(e) =>
                    aggiornaCampo("manutenzioneImpianto", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.manutenzioneImpianto + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>🚚 Trasporto merce:</strong>{" "}
            {editable ? (
              <input
                type="number"
                value={config.TrasportoMerce}
                onChange={(e) =>
                  aggiornaCampo("TrasportoMerce", e.target.value)
                }
              />
            ) : (
              config.TrasportoMerce
            )}{" "}
          </li>
          <li className="riga-configurazione">
            <strong>🚚 Costo trasporto merce:</strong>{" "}
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.costoTrasportoMerce}
                  onChange={(e) =>
                    aggiornaCampo("costoTrasportoMerce", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.costoTrasportoMerce + " €"
            )}
          </li>
          <li className="riga-configurazione">
            <strong>📦 Cassette:</strong>{" "}
            {editable ? (
              <input
                type="number"
                value={config.numeroCassette}
                onChange={(e) =>
                  aggiornaCampo("numeroCassette", e.target.value)
                }
              />
            ) : (
              config.numeroCassette
            )}{" "}
          </li>
          <li className="riga-configurazione">
            <strong>📦 Costo cassette:</strong>{" "}
            {editable ? (
              <div className="input-con-euro">
                <input
                  type="number"
                  value={config.costoCassetta}
                  onChange={(e) =>
                    aggiornaCampo("costoCassetta", e.target.value)
                  }
                />
                <span>€</span>
              </div>
            ) : (
              config.costoCassetta + " €"
            )}
          </li>
        </ul>
        <ul className="lista-configurazione-interna">
          <li className="riga-configurazione">
            <strong>🏗️ Ammortamenti:</strong>
            <ul className="lista-prezzi">
              <li>
                <span>🛻 Macchinari</span>
                {editable ? (
                  <span className="input-con-euro">
                    <input
                      type="number"
                      value={config.ammortamento.macchinari}
                      onChange={(e) =>
                        aggiornaCampo("ammortamento.macchinari", e.target.value)
                      }
                    />
                    <span>€</span>
                  </span>
                ) : (
                  <span>{config.ammortamento.macchinari} €</span>
                )}
              </li>

              <li>
                <span>🚿 Impianti</span>
                {editable ? (
                  <span className="input-con-euro">
                    <input
                      type="number"
                      value={config.ammortamento.impianti}
                      onChange={(e) =>
                        aggiornaCampo("ammortamento.impianti", e.target.value)
                      }
                    />
                    <span>€</span>
                  </span>
                ) : (
                  <span>{config.ammortamento.impianti} €</span>
                )}
              </li>

              <li>
                <span>🌱 Piantine</span>
                {editable ? (
                  <span className="input-con-euro">
                    <input
                      type="number"
                      value={config.ammortamento.piantine}
                      onChange={(e) =>
                        aggiornaCampo("ammortamento.piantine", e.target.value)
                      }
                    />
                    <span>€</span>
                  </span>
                ) : (
                  <span>{config.ammortamento.piantine} €</span>
                )}
              </li>

              <li>
                <span>📆 Anni ammortamento</span>
                {editable ? (
                  <input
                    type="number"
                    value={config.ammortamento.anni}
                    onChange={(e) =>
                      aggiornaCampo("ammortamento.anni", e.target.value)
                    }
                  />
                ) : (
                  <span>{config.ammortamento.anni}</span>
                )}
              </li>
            </ul>
          </li>
        </ul>
        <ul className="lista-configurazione-interna">
          <li className="riga-configurazione">
            <strong>📊 Quota vendite a privati:</strong>{" "}
            {editable ? (
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={config.quotaPrivati}
                onChange={(e) => aggiornaCampo("quotaPrivati", e.target.value)}
              />
            ) : (
              (config.quotaPrivati * 100).toFixed(0) + "%"
            )}
          </li>
        </ul>

        <ul className="lista-configurazione-interna">
          <li className="riga-configurazione">
            <strong>🛒 Prezzi medi privati:</strong>

            <ul className="lista-prezzi">
              {Object.entries(config.prezziPrivati).map(([k, v]) => (
                <li key={k}>
                  <span>
                    {emojiFrutti[k] || "🍊"}{" "}
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                  {editable ? (
                    <span className="input-con-euro">
                      <input
                        type="number"
                        step="0.01"
                        value={v}
                        onChange={(e) =>
                          aggiornaCampo(`prezziPrivati.${k}`, e.target.value)
                        }
                      />
                      <span>€</span>
                    </span>
                  ) : (
                    <span>{v} €</span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <ul className="lista-configurazione-interna">
          <li className="riga-configurazione">
            <strong>🏛️ Prezzi medi consorzio:</strong>
            <ul className="lista-prezzi">
              {Object.entries(config.prezziConsorzio).map(([k, v]) => (
                <li key={k}>
                  <span>
                    {emojiFrutti[k] || "🍋"}{" "}
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                  {editable ? (
                    <span className="input-con-euro">
                      <input
                        type="number"
                        step="0.01"
                        value={v}
                        onChange={(e) =>
                          aggiornaCampo(`prezziConsorzio.${k}`, e.target.value)
                        }
                      />
                      <span>€</span>
                    </span>
                  ) : (
                    <span>{v} €</span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default VisualizzaConfigurazioneAttuale;
