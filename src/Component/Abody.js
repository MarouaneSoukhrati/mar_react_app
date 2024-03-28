import "../ComponentStyle/Abody.css";
import "../ComponentStyle/SubcomponentStyle/Path.css";
import FamilyTree from "./Subcomponent/FamilyTree";
import Path from "./Subcomponent/Path";

import { motion } from "framer-motion";

import MoorLogo from "../Logos/MoorLogo.svg";
import Capsule from "../Logos/Capsule.svg";
import pathLogo from "../Logos/PathLogo.svg";

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
        <motion.div className={"stop"+e}>
            <div className="stopBulletSpace">
              <div>{Object.keys(texts)[e]}</div>
              <div className="stopBullet"></div>
            </div>
            <div>{texts["Titre"+(e+1)]}</div>
        </motion.div>);

export default function Abody() {
  return (
    <div className="App-body">
      <img className="Moor-logo" src={MoorLogo} alt="logo" />
      <h2 className="moor-title">
        My origins : Learn about the Moorish Culture
      </h2>
      <FamilyTree />
      <div className="App-body-history">
        <Path stopList={stopList} pathLogo={pathLogo} pathLogoStyle="moor-style"/>
        <img className="Capsule" src={Capsule} alt="Capsule"/>
      </div>
      <motion.button
        className="mobility"
        initial={{ x: -900 }}
        whileHover={{ opacity: 0.4 }}
        animate={{ x: 344, y: -110, transition: { duration: 5 } }}
      >
        Learn more
      </motion.button>
    </div>
  );
}
