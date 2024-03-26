import "../../ComponentStyle/SubcomponentStyle/About.css";
import { motion } from "framer-motion";

import AlAmana from "../../Logos/AlAmana.svg";
import CpgeTanger from "../../Logos/CpgeTanger.svg";
import CpgeStEx from "../../Logos/CpgeStEx.svg";
import Enseirb from "../../Logos/Enseirb.svg";
import UnivBdx from "../../Logos/UnivBdx.svg";
import Ensem from "../../Logos/Ensem.svg";
import Ensisa from "../../Logos/Ensisa.svg";
import AboutMap from "../../Logos/AboutMap.svg";

let eventList = [
  AlAmana,
  CpgeTanger,
  CpgeStEx,
  Enseirb,
  UnivBdx,
  Ensem,
  Ensisa,
];

let timelineGraphic = [0, 1, 2, 3, 4, 5, 6].map((e, index) => {
  return (
    <>
      <div className="timeline-line" />
      <div className="timeline-event">
        <motion.div
          className="timeline-circle"
          whileHover={{ scale: 1.5, backgroundColor: "blue" }}
        >
          <div className="timeline-mincircle" />
        </motion.div>
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

export default function About() {
  return (
    <header className="App-about">
      <div className="about-section">
        <div className="about-imgside">
          <h1>About</h1>
          <img src={AboutMap} alt="About-Map" style={{ width: "500px" }} />
        </div>
        <div className="about-txtside">
          <h2>About paragraph</h2>
          <p>para para para para para para para para para</p>
        </div>
      </div>
      <h1>Academic Trajectory</h1>
      <div className="about-timeline">{timelineGraphic}</div>
    </header>
  );
}
