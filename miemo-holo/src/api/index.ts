import { Hologram } from "../models/Hologram";
import { hologramSettings } from "../models/HologramSettings";

import settings from "../settings/settings";

const fetchAPI = (
  url: string,
  method: "POST" | "GET",
  data?: any,
  contentType?: string
) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": contentType ?? "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

export default {
  hologram: {
    settings: (): Promise<hologramSettings> =>
      fetchAPI(`${settings.gameEndpoint}/api/holosettings/`, "GET"),
    get: (holo_uuid: string): Promise<Hologram> =>
      fetchAPI(`${settings.gameEndpoint}/api/holo/${holo_uuid}/`, "GET"),
  },
};
