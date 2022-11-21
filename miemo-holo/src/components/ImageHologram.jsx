import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

export default function ImageHologram({ image, positions, size }) {
  console.log(positions);
  return (
    <JoliSvg
      src={image}
      left={positions.left}
      top={positions.top}
      rotation={size.rotation}
      maxWidth={size.width}
      maxHeight={size.height}
    />
  );
}

const JoliSvg = Styled.img.attrs((props) => ({
  top: props.top || "0",
  left: props.left || "0",
  rotation: props.rotation || "0",
  maxWidth: props.maxWidth || "0",
  maxHeight: props.maxHeight || "0",
}))`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: rotate(${(props) => props.rotation}deg);
  max-height: ${(props) => props.maxHeight}px;
  max-width: ${(props) => props.maxWidth}px;
`;

ImageHologram.propTypes = {
  image: PropTypes.string.isRequired,
  positions: PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }),
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rotation: PropTypes.number,
  }),
};
