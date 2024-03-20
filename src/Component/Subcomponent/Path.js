import '../../ComponentStyle/SubcomponentStyle/Navbar.css';

import PathLogo from "../../Logos/PathLogo.svg";

export default function Path() {
  let texts = {
    Titre1: "My first text is text1 text2 text3 text4 ...",
    Titre2: "My first text is text1 text2 text3 text4 ...",
    Titre3: "My first text is text1 text2 text3 text4 ...",
    Titre4: "My first text is text1 text2 text3 text4 ...",
    Titre5: "My first text is text1 text2 text3 text4 ...",
    Titre6: "My first text is text1 text2 text3 text4 ...",
    Titre7: "My first text is text1 text2 text3 text4 ...",
    Titre8: "My first text is text1 text2 text3 text4 ...",
    Titre9: "My first text is text1 text2 text3 text4 ...",
  }
  let stopList = [0,1,2,3,4,5,6,7,8].map(e => 
          <div className={"stop"+e}>
              <div className="stopBulletSpace">
                <div>{Object.keys(texts)[e]}</div>
                <div className="stopBullet"></div>
              </div>
              <div>{texts["Titre"+(e+1)]}</div>
          </div>);       
  return (
    <div className="path-wrapper">
      <div className="path-img">
        <img src={PathLogo} alt="path" />
        {stopList}
      </div>
    </div>
  );
}