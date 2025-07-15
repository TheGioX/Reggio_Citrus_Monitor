# <img src="/public/logo.png" alt="Logo" width="75" height="75"> Reggio Citrus Monitor

Reggio Citrus Monitor è una web app sviluppata in React pensata per monitorare, simulare e analizzare dati climatici e agricoli in aziende agrumicole. Il progetto include la simulazione di eventi meteo, la stima dei raccolti (arance, limoni, bergamotti, mandarini) e la valutazione dell'efficienza economica su base annua, mensile e giornaliera.

## 🎯 Obiettivi

- Monitorare e visualizzare le performance agricola con grafici dinamici
- Simulare condizioni climatiche e loro impatto sulla produzione
- Integrare aspetti finanziari per valutare costi, ricavi e utile netto
- Fornire uno strumento di supporto alle decisioni aziendali

## 🧰 Tecnologie utilizzate

- **React** – Libreria principale per l’interfaccia utente
- **JavaScript** – Logica del simulatore, componenti e interazioni
- **Recharts** – Libreria per la visualizzazione interattiva dei dati
- **CSS** – Personalizzazione grafica, incluso tema dinamico (chiaro/scuro)
- **localStorage** – Persistenza dei dati lato client
- **Vite** – Ambiente di sviluppo moderno, veloce e leggero

## 📈 Funzionalità principali

- **Grafici dinamici e navigabili** (anno → mese → giorno)
- **Simulazione raccolti influenzata da eventi climatici**
- **Confronto tra raccolti per tipologia di agrume**
- **Pannello di simulazione per modificare parametri economici**
- **Modalità tema chiaro/scuro**
- **Persistenza dati in `localStorage`**

## 🧪 Installazione e Avvio

### 📦 Prerequisiti

Assicurati di avere installato nel tuo sistema:

- [Node.js](https://nodejs.org/) (versione **18 o superiore**)
- [npm](https://www.npmjs.com/) (versione **9 o superiore**)
- [Git](https://git-scm.com/) (facoltativo, utile per il clone da repository)

Per verificarne la presenza, esegui nel terminale:

```bash
node -v
npm -v
```

### 🚀 Procedura di installazione

1. **Clona il repository** (se hai Git installato):

   ```bash
   git clone https://github.com/tuo-utente/dashboard-settore-primario-JavaScript.git
   cd dashboard-settore-primario-JavaScript/my-dashboard
   ```

   Oppure scarica il progetto come file `.zip` e estrailo.

2. **Installa le dipendenze** ->
   Apri il terminale nella directory del progetto ed esegui:

   ```bash
   npm install
   ```

3. **Avvia l'applicazione** ->
   Dopo aver installato le dipendenze, avvia l'app in modalità sviluppo:

   ```bash
   npm run dev
   ```

4. **Apri l'app nel browser** ->
   Una volta avviata, Vite ti fornirà un link (es. `http://localhost:5173`) per accedere all'applicazione
