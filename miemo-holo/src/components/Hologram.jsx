import React from "react";
import PropTypes from "prop-types";

import ImageHologram from "./ImageHologram";

import settings from "../settings/settings";

export default function Hologram({ url }) {
  return (
    <div
      style={{
        width: settings.width,
        height: settings.height,
        display: "block",
        left: settings.x,
        top: settings.y,
        position: "absolute",
      }}
    >
      {settings.faces.map((face) => {
        return (
          <ImageHologram
            image={url}
            key={`${face.positions.left}${face.positions.top}`}
            positions={face.positions}
            size={face.size}
          />
        );
      })}
    </div>
  );
}

Hologram.propTypes = {
  url: PropTypes.string,
};

Hologram.defaultProps = {
  url: "",
};
