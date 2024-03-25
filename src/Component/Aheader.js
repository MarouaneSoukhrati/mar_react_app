import "../ComponentStyle/Aheader.css";
import "../ComponentStyle/SubcomponentStyle/Navbar.css";
import Navbar from "./Subcomponent/Navbar";

export default function Aheader() {
  return (
    <header className="App-header">
      <Navbar />
    </header>
  );
}
