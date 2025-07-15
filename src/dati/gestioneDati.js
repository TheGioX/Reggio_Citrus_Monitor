// Importa la funzione per generare dati simulati
import { configurazioneDefault } from "./configurazioneFinanziaria";
import { generaDatiAnnuali } from "./simulatore";
//import { diagnosticaProduzione } from "./simulatore";

// Funzione che genera i dati simulati
export function generaDatiDashboard() {
  // Se i dati sono già stati generati, chiede conferma

  // const conferma = window.confirm("Vuoi generare nuovi dati per la dashboard?");
  //if (!conferma) return null; // Se l'utente annulla, esce dalla funzione

  // Genera i dati simulati per gli anni dal 2000 al 2024

  const { statoProduzione: statoPreProduzione } = generaDatiAnnuali(1995, 1999); // solo per accumulare maturazione
  const { dati } = generaDatiAnnuali(2000, 2024, statoPreProduzione); // vera simulazione

  //diagnosticaProduzione(dati, statoProduzione);
  //  per usare aggiungere const { dati, statoProduzione } = generaDatiAnnuali(

  return dati; // solo i dati 2000–2024 saranno usati nel grafico
}

// Salva dati su localStorage
export function salvaDatiInLocalStorage(dati) {
  localStorage.setItem("datiDashboard", JSON.stringify(dati));
}

// Salva configurazione su localStorage
export function salvaDatiDaLocalStorageConf() {
  localStorage.setItem("datiDashboard", JSON.stringify(configurazioneDefault));
}

// Carica dati da localStorage
export function caricaDatiDaLocalStorage() {
  const datiSalvati = localStorage.getItem("datiDashboard");
  return datiSalvati ? JSON.parse(datiSalvati) : null;
}

// Inizializza la configurazione se non esiste
export function inizializzaConfigurazione() {
  const esiste = localStorage.getItem("configurazioneSimulata");
  if (!esiste) {
    localStorage.setItem(
      "configurazioneSimulata",
      JSON.stringify(configurazioneDefault)
    );
  }
}

// Cancella dati da localStorage
export function cancellaDatiDaLocalStorage() {
  localStorage.removeItem("datiDashboard");
}

// Cancella configurazione da localStorage
export function cancellaDatiDaLocalStorageConf() {
  localStorage.removeItem("configurazioneSimulata");
}

// Funzione di conferma per il reset dei dati
export function confermaReset() {
  return window.confirm("Sei sicuro di voler resettare tutti i dati?");
}
