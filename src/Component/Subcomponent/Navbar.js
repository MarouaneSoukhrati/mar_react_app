import '../../ComponentStyle/SubcomponentStyle/Navbar.css';

import UkFlagLogo from "../../Logos/UkFlag.svg";
import FrFlagLogo from "../../Logos/FrFlag.svg";
import EsFlagLogo from "../../Logos/EsFlag.svg";

export default function Navbar(){
    return(
        <div className="big-navbar">
        <div className="navbar">
          <div className="nav-element">Home</div>            
          <div className="nav-element">Portfolio</div>
          <div className="nav-element">Contact</div>
        </div>
        <div className="langbar">
          <img src={UkFlagLogo} className="lang-en" alt="UkFlag"/> EN
          <img src={FrFlagLogo} className="lang-fr" alt="FrFlag"/> FR
          <img src={EsFlagLogo} className="lang-es" alt="EsFlag"/> ES
        </div>
      </div>
    );
}