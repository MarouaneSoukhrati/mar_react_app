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
import marouaneLogo from "../../Logos/marouane-logo.svg";

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

let textsFr = {
  Titre1: "My first text is text1 text2 text3 text4 ...",
  Titre2: "My first text is text1 text2 text3 text4 ...",
  Titre3: "My first text is text1 text2 text3 text4 ...",
  Titre4: "My first text is text1 text2 text3 text4 ...",
}

let stopListFr = [0,1,2,3].map(e => 
        <div className={"stopm"+e}>
            <div className="stopBulletSpace">
              <div>{Object.keys(textsFr)[e]}</div>
              <div className="stopBullet"></div>
            </div>
            <div>{textsFr["Titre"+(e+1)]}</div>
        </div>);

let textsMa = {
  Titre1: "My first text is text1 text2 text3 text4 ...",
}

let stopListMa = [0].map(e => 
        <div className={"stopt"+e}>
            <div className="stopBulletSpace">
              <div>{Object.keys(textsMa)[e]}</div>
              <div className="stopBullet"></div>
            </div>
            <div>{textsMa["Titre"+(e+1)]}</div>
        </div>);    
        
let aboutPara = ["I am interested in understanding and articulating everything via code."];
aboutPara.push(" Whatever be the problem, if it involves challenges in formally representing it and its associated metrics, count me in.");
aboutPara.push(" I also like solving the actual problem through programming and elegant design (Trust me its beautiful when done right)."); 
aboutPara.push(" In short, I like exploring ways to enhance computers so that they can better serve human creativity and prosperity.");       
aboutPara.push(" I'm also an engineering student at ENSISA who is currently looking for a co-op position");
aboutPara.push(" I'm from Tangier but I have setteled in Mulhouse for the moment.");

export default function About() {
  return (
    <header className="App-about">
      <h1>About Me</h1>
      <div className="abouttxtimg">
          <img
            className="marouane-aboutlogo"
            src={marouaneLogo}
            alt="marouane-logo"
          />
        <div>{aboutPara.map(e=><p className="aboutPara">{e}</p>)}</div>
      </div>
      <div className="about-section">
        <div className="about-chartside">
          <div className="about-timeline">{timelineGraphic.slice(0,2)}</div>
          <div className="about-timeline">{timelineGraphic.slice(2)}</div>
        </div>
        <div className="about-imgside">
          <Path stopList={stopListFr} pathLogo={AboutMap} pathLogoStyle="map-style"/>
          <Path stopList={stopListMa} pathLogo={AboutMap2} pathLogoStyle="map-style2"/>
        </div>
      </div>
    </header>
  );
}
