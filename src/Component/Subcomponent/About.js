import "../../ComponentStyle/SubcomponentStyle/About.css";
import "../../ComponentStyle/SubcomponentStyle/Path.css";
import FamilyTree from "./FamilyTree";

import { motion } from "framer-motion";

import MoorLogo from "../../Logos/MoorLogo.svg";
import Capsule from "../../Logos/Capsule.svg";
import pathLogo from "../../Logos/PathLogo.svg";

let mobtxt =
  "Mobility is one of the hottest sectors, with start-ups and traditional OEMs constantly developing new technologies and transportation options.";
mobtxt +=
  "The influx of innovative solutions has yet to solve the problem of congested roads, however, and almost every country is feeling the effects.";
mobtxt +=
  " Drivers in Munich waste an average of 87 hours in traffic every year; in Los Angeles, wasted time in traffic hit 119 hours before the pandemic, when roads were more crowded.";

export default function About() {
  return (
    <div className="App-about">
      <h2 className="Yellow-title">
        My origins - Learn about the Moorish Culture :
      </h2>
      <img className="Moor-logo" src={MoorLogo} alt="logo" />
      <FamilyTree />
      <h2 className="Yellow-title">My various center of interests :</h2>
      <div className="App-blog-mobility">
        <h1 className="Yellow-subtitle">
          Learn about the future of mobility :
        </h1>
        <div className="App-blog-history">
          <img className="moor-style" src={pathLogo} alt="path-logo" />
          <img className="Capsule" src={Capsule} alt="Capsule" />
        </div>
        <p className="mobpara">{mobtxt}</p>
        <motion.button
            className="mobility"
            whileHover={{ opacity: 0.4 }}
          >
            Learn more
          </motion.button>
      </div>
    </div>
  );
}
