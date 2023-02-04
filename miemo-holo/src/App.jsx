import Base from "./pages/Base";
import Record from "./pages/Record";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/record" element={<Record />} />
          <Route path="/base" element={<Base />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
