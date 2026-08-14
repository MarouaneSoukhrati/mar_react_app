import "../../ComponentStyle/SubcomponentStyle/Navbar.css";

import UkFlagLogo from "../../Logos/UkFlag.svg";
import FrFlagLogo from "../../Logos/FrFlag.svg";
import CaFlagLogo from "../../Logos/CaFlag.svg";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [indexList, setIndexList] = useState([1, 0, 0]);
  const [isAcSelected, setIsAcSelected] = useState(false);
  let activeNav = function (index) {
    return indexList[index] ? "lang-active" : "lang";
  };

  function handleAc() {
    setIsAcSelected(!isAcSelected);
  }

  return (
    <div className="big-navbar">
      <div className="navbar">
        <NavLink className="nav-element" to="/">
          <span className="sub-nav-element">Home</span>
        </NavLink>
        <NavLink className="nav-element" to="/about">
          <span className="sub-nav-element">About</span>
        </NavLink>
        <NavLink className="nav-element" to="/portfolio">
          <span className="sub-nav-element">Portfolio</span>
        </NavLink>
        <NavLink className="nav-element" to="/contact">
          <span className="sub-nav-element">Contact</span>
        </NavLink>
        <NavLink className="nav-element" to="/crypto">
          <span className="sub-nav-element">Crypto</span>
        </NavLink>
        <div className={isAcSelected ? "academicsNavAc" : "academicsNav"}>
          <div className="nav-element" onClick={handleAc}>
            Academics
          </div>
          {isAcSelected && (
            <div className="academicsNavList" onMouseLeave={handleAc}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "edudivSelected" : "edudiv"
                }
                to="/academics"
              >
                <div>Education</div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "mldivSelected" : "mldiv"
                }
                to="/machinelearning"
              >
                <div>Machine Learning</div>
              </NavLink>
            </div>
          )}
        </div>
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
