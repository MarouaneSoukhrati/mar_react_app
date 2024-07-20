import "../../ComponentStyle/SubcomponentStyle/Academics.css";
import { motion } from "framer-motion";

import AlAmana from "../../Logos/AlAmana.svg";
import CpgeTanger from "../../Logos/CpgeTanger.svg";
import CpgeStEx from "../../Logos/CpgeStEx.svg";
import Ensem from "../../Logos/Ensem.svg";
import Ensisa from "../../Logos/Ensisa.svg";
import AboutMap from "../../Logos/AboutMap.svg";
import AboutMap2 from "../../Logos/AboutMap2.svg";
import marouaneLogo from "../../Logos/marouane-logo.svg";

let eventList = [AlAmana, CpgeTanger, CpgeStEx, Ensem, Ensisa];

let datesList = [
  "2003-2015",
  "2015-2017",
  "2017-2018",
  "2020-2023",
  "2023-2027",
];

let LinksList = [
  "https://amana.ac.ma/",
  "https://www.cpge.ac.ma/SITECPGE/LMH-TA/Resultat.aspx",
  "http://www.prepamantes.fr/",
  "https://ensem.univ-lorraine.fr/",
  "https://www.ensisa.uha.fr/",
];

let timelineGraphic = [0, 1, 2, 3, 4].map((e, index) => {
  return (
    <>
      <div className="timeline-line" />
      <div className="timeline-event">
        <div className="dateListStyling">{datesList[index]}</div>
        <motion.a
          className="timeline-circle"
          whileHover={{ scale: 1.5, backgroundColor: "blue" }}
          href={LinksList[index]}
          target="_blank"
          rel="noreferrer"
        >
          <div className="timeline-mincircle" />
        </motion.a>
        <img className="imgEventPic" src={eventList[index]} alt="event-pic" />
      </div>
      <div className="timeline-line" />
    </>
  );
});

let aboutPara = [
  "I am interested in understanding and articulating everything via code.",
];
aboutPara.push(
  " Whatever be the problem, if it involves challenges in formally representing it and its associated metrics, count me in.",
);
aboutPara.push(
  " I also like solving the actual problem through programming and elegant design (Trust me its beautiful when done right).",
);
aboutPara.push(
  " In short, I like exploring ways to enhance computers so that they can better serve human creativity and prosperity.",
);
aboutPara.push(
  " I'm also an engineering student at ENSISA who is currently looking for a co-op position",
);
aboutPara.push(
  " I'm from Tangier but I have setteled in Mulhouse for the moment.",
);

export default function Academics() {
  return (
    <header className="App-academics">
      <h1 className="aboutTitleN">About Me :</h1>
      <div className="abouttxtimg">
        <img
          className="marouane-aboutlogo"
          src={marouaneLogo}
          alt="marouane-logo"
        />
        <div>
          {aboutPara.map((e) => (
            <p className="aboutPara">{e}</p>
          ))}
        </div>
      </div>
      <div className="about-section">
        <div className="about-chartside">
          <div className="about-timeline">{timelineGraphic.slice(0, 3)}</div>
          <div className="about-timeline">{timelineGraphic.slice(3)}</div>
        </div>
        <div className="about-imgside">
          <img className="map-style" src={AboutMap} alt="AboutMap" />
          <img className="map-style2" src={AboutMap2} alt="AboutMap" />
        </div>
      </div>
    </header>
  );
}
