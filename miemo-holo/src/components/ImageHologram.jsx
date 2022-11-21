import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

export default function ImageHologram({
  image,
  poligonPoints,
  positions,
  size,
}) {
  console.log(size);
  return (
    <JoliSvg
      height={size.height}
      width={size.width}
      rotation={size.rotation}
      top={positions.top}
      left={positions.left}
    >
      <defs>
        <clipPath id="img">
          <polygon points={poligonPoints} />
        </clipPath>
      </defs>
      <image
        clipPath="url(#img)"
        width={size.width}
        height={size.height - size.imHeight / 8.5}
        preserveAspectRatio="xMidYMid meet"
        x={positions.x}
        y={positions.y + size.imHeight / 8.5}
        href={image}
      />
    </JoliSvg>
  );
}

const JoliSvg = Styled.svg.attrs((props) => ({
  top: props.top || "0",
  left: props.left || "0",
  rotation: props.rotation || "0",
}))`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: rotate(${(props) => props.rotation}deg);
`;

ImageHologram.propTypes = {
  image: PropTypes.string.isRequired,
  poligonPoints: PropTypes.string.isRequired,
  positions: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }),
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imHeight: PropTypes.number.isRequired,
    rotation: PropTypes.number,
  }),
};
