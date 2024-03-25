import "../../ComponentStyle/SubcomponentStyle/Navbar.css";

import UkFlagLogo from "../../Logos/UkFlag.svg";
import FrFlagLogo from "../../Logos/FrFlag.svg";
import EsFlagLogo from "../../Logos/EsFlag.svg";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="big-navbar">
      <div className="navbar">
        <Link className="nav-element" to="/">
          <div>Home</div>
        </Link>
        <Link className="nav-element" to="/portfolio">
          <div>Portfolio</div>
        </Link>
        <Link className="nav-element" to="/about">
          <div>About</div>
        </Link>
        <Link className="nav-element" to="/contact">
          <div>Contact</div>
        </Link>
      </div>
      <div className="langbar">
        <img src={UkFlagLogo} className="lang-en" alt="UkFlag" /> EN
        <img src={FrFlagLogo} className="lang-fr" alt="FrFlag" /> FR
        <img src={EsFlagLogo} className="lang-es" alt="EsFlag" /> ES
      </div>
    </div>
  );
}
