import ImageHologram from "./components/ImageHologram";
import Styled from "styled-components";

function App() {
  const image =
    "https://64.media.tumblr.com/tumblr_medob5jbYi1rrftcdo1_250.gif";
  const [width, height] = [1000, 1000];

  const XitemSize = width / 3;
  const YitemSize = height / 3;

  const faces = [
    {
      size: {
        width: XitemSize,
        height: YitemSize,
        rotation: -180,
      },
      positions: {
        left: XitemSize,
        top: 0,
      },
    },
    {
      size: {
        width: XitemSize,
        height: YitemSize,
        rotation: 90,
      },
      positions: {
        left: 0,
        top: YitemSize,
      },
    },
    {
      size: {
        width: XitemSize,
        height: YitemSize,
        rotation: -90,
      },
      positions: {
        left: XitemSize * 2,
        top: YitemSize,
      },
    },
    {
      size: {
        width: XitemSize,
        height: YitemSize,
        rotation: 0,
      },
      positions: {
        left: XitemSize,
        top: YitemSize * 2,
      },
    },
  ];

  return (
    <div className="App">
      {faces.map((face) => {
        return (
          <ImageHologram
            image={image}
            positions={face.positions}
            size={face.size}
          />
        );
      })}
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
