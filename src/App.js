import "./App.css";
import Aheader from "./Component/Aheader";
import Abody from "./Component/Abody";
import Afooter from "./Component/Afooter";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Aheader />
      <Outlet />
      <Afooter />
    </div>
  );
}
export default App;
