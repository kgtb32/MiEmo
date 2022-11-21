import ImageHologram from "./components/ImageHologram";
import Styled from "styled-components";

function App() {
  const image =
    "https://cran.r-project.org/web/packages/ggpacman/readme/man/figures/README-pacman-1.gif";
  const [width, height] = [1000, 1000];

  const poligonPoints =
    [
      `${width / 2 - width / 10} ${height / 10}`,
      `${width / 2 + width / 10} ${height / 10}`,
      `${width} ${height / 2}`,
      `0 ${height / 2}`,
    ] + "";

  const faces = [
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: "0px",
        top: "0px",
      },
      size: {
        width,
        height: height / 2,
        imHeight: height,
        rotation: 180,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: `-${width / 4}px`,
        top: `${height / 4}px`,
      },
      size: {
        rotation: 90,
        width: width,
        height: height / 2,
        imHeight: height,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: `${width / 4}px`,
        top: `${height / 4}px`,
      },
      size: {
        rotation: -90,
        width: width,
        height: height / 2,
        imHeight: height,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: "0px",
        top: `${height / 2}px`,
      },
      size: {
        width: width,
        height: height / 2,
        imHeight: height,
        rotation: 0,
      },
    },
  ];

  return (
    <div className="App">
      {faces.map((face, index) => {
        return (
          <ImageHologram
            key={`img_holo_${index}`}
            image={image}
            poligonPoints={face.poligonPoints}
            positions={face.positions}
            size={face.size}
          />
        );
      })}
      <JoliMiddleSquare
        top={height / 2 - 30}
        left={width / 2 - 30}
        style={{
          height: `${0}px`,
          width: `${0}px`,
        }}
      />
    </div>
  );
}

export default App;

const JoliMiddleSquare = Styled.svg.attrs((props) => ({
  top: props.top || "0",
  left: props.left || "0",
}))`
  position: absolute;
  background-color:black;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;
