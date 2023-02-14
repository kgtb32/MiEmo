import Base from "./pages/Base";
import Record from "./pages/Record";
import { useState, useEffect, useCallback } from "react";
import api from "./api";

import settings from "./settings/settings";

function App() {
  const [mode, setMode] = useState("base");
  const [hologramUuid, setHologramUuid] = useState("");

  const fetchInfos = useCallback(() => {
    const fetchHologramMode = () => api.hologram.mode();
    const fetchHologramSettings = () => api.hologram.settings();

    return Promise.all([fetchHologramMode(), fetchHologramSettings()]).then(
      (res) => {
        setMode(res[0].replace("\n", ""));
        setHologramUuid(res[1]?.selectedHologram ?? "");
      }
    ).catch;
  });

  useEffect(() => {
    const interval = setInterval(fetchInfos, settings.pullupDelay);
    return () => {
      clearInterval(interval);
    };
  }, [fetchInfos]);

  return (
    <div className="App">
      {mode == "base" ? <Base hologramUuid={hologramUuid} /> : <Record />}
    </div>
  );
}

export default App;
