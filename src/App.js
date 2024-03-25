import "./App.css";
import Aheader from "./Component/Aheader";
import Abody from "./Component/Abody";
import Afooter from "./Component/Afooter";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FamilyTree from "./Component/Subcomponent/FamilyTree";

function App() {
  return (
    <div className="App">
      <Aheader />
      <Router>
        <Routes>
          <Route exact path="/" element={<Abody />} />
          <Route exact path="/about" element={<FamilyTree />} />
        </Routes>
      </Router>
      <Afooter />
    </div>
  );
}
export default App;
