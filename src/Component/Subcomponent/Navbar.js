import "../../ComponentStyle/SubcomponentStyle/Navbar.css";

import UkFlagLogo from "../../Logos/UkFlag.svg";
import FrFlagLogo from "../../Logos/FrFlag.svg";
import CaFlagLogo from "../../Logos/CaFlag.svg";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [indexList, setIndexList] = useState([1, 0, 0]);
  let activeNav = function (index) {
    return indexList[index] ? "lang-active" : "lang";
  };

  return (
    <div className="big-navbar">
      <div className="navbar">
        <NavLink className="nav-element" to="/"><div>Home</div></NavLink>
        <NavLink className="nav-element" to="/about"><div>About</div></NavLink>
        <NavLink className="nav-element" to="/academics"><div>Academics</div></NavLink>
        <NavLink className="nav-element" to="/portfolio"><div>Portfolio</div></NavLink>
        <NavLink className="nav-element" to="/contact"><div>Contact</div></NavLink>
      </div>
      <div className="langbar">
        <img
          src={UkFlagLogo}
          className={activeNav(0)}
          alt="UkFlag"
          onClick={() => setIndexList([1, 0, 0])}
        />{" "}
        EN
        <img
          src={FrFlagLogo}
          className={activeNav(1)}
          alt="FrFlag"
          onClick={() => setIndexList([0, 1, 0])}
        />{" "}
        FR
        <img
          src={CaFlagLogo}
          className={activeNav(2)}
          alt="CaFlag"
          onClick={() => setIndexList([0, 0, 1])}
        />{" "}
        CA
      </div>
    </div>
  );
}
