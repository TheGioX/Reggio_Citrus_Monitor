import Dashboard from "./componenti/Dashboard";
import { useEffect, useState } from "react";
import logo from "/logo.png";

function App() {
  const [temaChiaro, setTemaChiaro] = useState(() => {
    return localStorage.getItem("tema") === "chiaro";
  });

  const [logoRidotto, setLogoRidotto] = useState(() => {
    return localStorage.getItem("logoRidotto") === "true";
  });

  useEffect(() => {
    localStorage.setItem("logoRidotto", logoRidotto);
  }, [logoRidotto]);

  useEffect(() => {
    document.body.classList.toggle("tema-chiaro", temaChiaro);
    document.body.classList.toggle("tema-scuro", !temaChiaro);
    localStorage.setItem("tema", temaChiaro ? "chiaro" : "scuro");
  }, [temaChiaro]);

  return (
    <div className="intestazione">
      <img
        src={logo}
        alt="Logo Reggio Citrus Monitor"
        className={`logo ${logoRidotto ? "logo-piccolo" : "logo-grande"}`}
        //onClick={() => setLogoRidotto(true)}
      />
      <h1
        className={`titolo ${logoRidotto ? "titolo-piccolo" : "titolo-grande"}`}
      >
        Reggio Citrus Monitor
      </h1>

      <button
        type="button"
        onClick={() => setTemaChiaro((prev) => !prev)}
        className="toggle-tema"
        title={temaChiaro ? "Tema scuro" : "Tema chiaro"}
      >
        {temaChiaro ? "🌙" : "☀️"}
      </button>

      <Dashboard
        onLogoRiduci={() => setLogoRidotto(true)}
        onLogoEspandi={() => setLogoRidotto(false)}
      />
    </div>
  );
}

export default App;
