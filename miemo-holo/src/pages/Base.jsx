import { useEffect, useState } from "react";

import Hologram from "../components/Hologram";

import api from "../api/";
import settings from "../settings/settings";

export default function Base() {
  const [hologramUrl, setHologramUrl] = useState("");

  const fetchHologram = () => {
    const fetchHologramSetting = () => api.hologram.settings();
    const fetchHologram = (holo_uuid) => api.hologram.get(holo_uuid);

    fetchHologramSetting()
      .then((holo_settings) => {
        fetchHologram(holo_settings.selectedHologram)
          .then((hologram) => {
            setHologramUrl(`${settings.gameEndpoint}${hologram.holo_url}`);
          })
          .catch();
      })
      .catch();
  };

  useEffect(() => {
    fetchHologram();
  }, []);

  return <Hologram url={hologramUrl} />;
}
