import ImageHologram from "./components/ImageHologram";

function App() {
  const image =
    "https://img1.picmix.com/output/stamp/normal/1/0/0/2/1492001_d1b2b.gif";

  const poligonPoints = "240 10, 260 10, 500 250, 0 250";

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
        width: 500,
        height: 250,
        rotation: 180,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: "-125px",
        top: "125px",
      },
      size: {
        rotation: 90,
        width: 500,
        height: 250,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: "125px",
        top: "125px",
      },
      size: {
        rotation: -90,
        width: 500,
        height: 250,
      },
    },
    {
      poligonPoints,
      positions: {
        x: 0,
        y: 0,
        left: "0px",
        top: "250px",
      },
      size: {
        width: 500,
        height: 250,
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
    </div>
  );
}

export default App;
