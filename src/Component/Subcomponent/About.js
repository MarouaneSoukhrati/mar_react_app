import "../../ComponentStyle/SubcomponentStyle/About.css";
import { motion } from "framer-motion";
import Path from "./Path"

import AlAmana from "../../Logos/AlAmana.svg";
import CpgeTanger from "../../Logos/CpgeTanger.svg";
import CpgeStEx from "../../Logos/CpgeStEx.svg";
import Enseirb from "../../Logos/Enseirb.svg";
import UnivBdx from "../../Logos/UnivBdx.svg";
import Ensem from "../../Logos/Ensem.svg";
import Ensisa from "../../Logos/Ensisa.svg";
import AboutMap from "../../Logos/AboutMap.svg";
import AboutMap2 from "../../Logos/AboutMap2.svg";

let eventList = [
  AlAmana,
  CpgeTanger,
  CpgeStEx,
  Enseirb,
  UnivBdx,
  Ensem,
  Ensisa,
];

let datesList = [
  "2003-2015",
  "2015-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2023",
  "2023-2024",
];

let LinksList = [
  "https://amana.ac.ma/",
  "https://www.cpge.ac.ma/SITECPGE/LMH-TA/Resultat.aspx",
  "http://www.prepamantes.fr/",
  "https://enseirb-matmeca.bordeaux-inp.fr/fr",
  "https://www.u-bordeaux.fr/",
  "https://ensem.univ-lorraine.fr/",
  "https://www.ensisa.uha.fr/",
];

let timelineGraphic = [0, 1, 2, 3, 4, 5, 6].map((e, index) => {
  return (
    <>
      <div className="timeline-line" />
      <div className="timeline-event">
        <div style={{ fontSize: "10px", paddingBottom: "10px" }}>
          {datesList[index]}
        </div>
        <motion.a
          className="timeline-circle"
          whileHover={{ scale: 1.5, backgroundColor: "blue" }}
          href={LinksList[index]}
          target="_blank"
          rel="noreferrer"
          style={{marginBottom: "10px"}}
        >
          <div className="timeline-mincircle" />
        </motion.a>
        <img
          src={eventList[index]}
          style={{ height: "30px", width: "70px" }}
          alt="event-pic"
        />
      </div>
      <div className="timeline-line" />
    </>
  );
});

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
let stopList = [0,1,2,3,4,5,6].map(e => 
        <div className={"stopm"+e}>
            <div className="stopBulletSpace">
              <div>{Object.keys(texts)[e]}</div>
              <div className="stopBullet"></div>
            </div>
            <div>{texts["Titre"+(e+1)]}</div>
        </div>);

export default function About() {
  return (
    <header className="App-about">
      <h1>Academic Trajectory</h1>
      <p>para para para para para para para para para para</p>
      <div className="about-section">
        <div className="about-chartside">
          <div className="about-timeline">{timelineGraphic.slice(0,2)}</div>
          <div className="about-timeline">{timelineGraphic.slice(2)}</div>
        </div>
        <div className="about-imgside">
          <Path stopList={stopList} pathLogo={AboutMap} pathLogoStyle="map-style"/>
          <Path stopList={stopList} pathLogo={AboutMap2} pathLogoStyle="map-style"/>
        </div>
      </div>
    </header>
  );
}
