import "../../ComponentStyle/SubcomponentStyle/Navbar.css";

import UkFlagLogo from "../../Logos/UkFlag.svg";
import FrFlagLogo from "../../Logos/FrFlag.svg";
import EsFlagLogo from "../../Logos/EsFlag.svg";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [indexList, setIndexList] = useState([1, 0, 0, 0, 1, 0, 0]);
  let activeNav = function (index) {
    if (index < 4) {
      return indexList[index] ? "nav-element-active" : "nav-element";
    }
    return indexList[index] ? "lang-active" : "lang";
  };

  return (
    <div className="big-navbar">
      <div className="navbar">
        <Link className={activeNav(0)} to="/">
          <div
            onClick={() => setIndexList([1, 0, 0, 0, ...indexList.slice(4)])}
          >
            Home
          </div>
        </Link>
        <Link className={activeNav(1)} to="/portfolio">
          <div
            onClick={() => setIndexList([0, 1, 0, 0, ...indexList.slice(4)])}
          >
            Portfolio
          </div>
        </Link>
        <Link className={activeNav(2)} to="/about">
          <div
            onClick={() => setIndexList([0, 0, 1, 0, ...indexList.slice(4)])}
          >
            About
          </div>
        </Link>
        <Link className={activeNav(3)} to="/contact">
          <div
            onClick={() => setIndexList([0, 0, 0, 1, ...indexList.slice(4)])}
          >
            Contact
          </div>
        </Link>
      </div>
      <div className="langbar">
        <img
          src={UkFlagLogo}
          className={activeNav(4)}
          alt="UkFlag"
          onClick={() => setIndexList([...indexList.slice(0, 4), 1, 0, 0])}
        />{" "}
        EN
        <img
          src={FrFlagLogo}
          className={activeNav(5)}
          alt="FrFlag"
          onClick={() => setIndexList([...indexList.slice(0, 4), 0, 1, 0])}
        />{" "}
        FR
        <img
          src={EsFlagLogo}
          className={activeNav(6)}
          alt="EsFlag"
          onClick={() => setIndexList([...indexList.slice(0, 4), 0, 0, 1])}
        />{" "}
        ES
      </div>
    </div>
  );
}
