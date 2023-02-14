import { useEffect, useState } from "react";

import Hologram from "../components/Hologram";

import api from "../api/";
import settings from "../settings/settings";

export default function Base({ hologramUuid }) {
  const [hologramUrl, setHologramUrl] = useState("");

  const fetchHologram = () => {
    const fetchHologram = (holo_uuid) => api.hologram.get(holo_uuid);

    fetchHologram(hologramUuid)
      .then((hologram) => {
        setHologramUrl(`${settings.gameEndpoint}${hologram.holo_url}`);
      })
      .catch();
  };

  useEffect(() => {
    fetchHologram();
  }, [hologramUuid]);

  return <Hologram url={hologramUrl} />;
}
