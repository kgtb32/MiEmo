import Hologram from "../components/Hologram";
import settings from "../settings/settings";

export default function Record() {
  const url = `${settings.recordEndpoint}/video_feed`;

  return <Hologram url={url} />;
}
