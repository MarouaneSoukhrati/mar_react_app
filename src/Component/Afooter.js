import "../ComponentStyle/Afooter.css";

import marouaneLogo from "../Logos/marouane-logo.svg";
import linkedinLogo from "../Logos/linkedin-logo.svg";
import xLogo from "../Logos/x-logo.svg";
import instagramLogo from "../Logos/instagram-logo.svg";
import facebookLogo from "../Logos/facebook-logo.svg";
import youtubeLogo from "../Logos/youtube-logo.svg";

let socialMediaNamesList = [linkedinLogo, xLogo, youtubeLogo, instagramLogo, facebookLogo];
let socialMediaList = socialMediaNamesList.map((name) => (
  <img className="social-media-logo" src={name} alt={name} />
));

let listerNames = {
  About: ["Career", "Portfolio", "Academics", "Freelance"],
  Services: ["Design", "Web Development", "Software Development", "Data Science and Machine Learning"],
  Contact: ["Email: soukhratimarouane@gmail.com", "(+33)667569678", "9 rue des Frères Lumière"],
};

let Lister = Object.keys(listerNames).map((keyElem, index) => (
  <div className="lister-item">
    <div className="lister-item-title">{keyElem}</div>
    <div className="lister-item-list">{listerNames[keyElem].map(item=><div className="footer-item">{item}</div>)}</div>
  </div>
));

export default function Afooter() {
  return (
    <div className="App-footer">
      <div className="footer-wrapper">
        <div className="logo-section">
          <img className="marouane-logo" src={marouaneLogo} alt="marouane-logo"/>
          <p className="copyright">Mar One - All rights reserved © 2024</p>
          <div className="social-media-wrapper">{socialMediaList}</div>
        </div>
        <div className="lister-section">{Lister}</div>
      </div>
    </div>
  );
}
