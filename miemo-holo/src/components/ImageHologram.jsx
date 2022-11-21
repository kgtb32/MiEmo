import React from "react";
import PropTypes from "prop-types";

export default function ImageHologram({
  image,
  poligonPoints,
  positions,
  size,
}) {
  return (
    <svg
      height={size.height}
      width={size.width}
      style={`position: absolute; left: ${positions.left}px; top: ${positions.top}px`}
    >
      <defs>
        <clipPath id="img">
          <polygon points={poligonPoints} />
        </clipPath>
      </defs>
      <image
        clip-path="url(#img)"
        width={size.width}
        height={size.height}
        preserveAspectRatio="xMidYMid meet"
        x={positions.x}
        y={positions.y}
        xlink:href={image}
      />
    </svg>
  );
}

ImageHologram.propTypes = {
  image: PropTypes.string.isRequired,
  poligonPoints: PropTypes.string.isRequired,
  positions: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  },
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};
