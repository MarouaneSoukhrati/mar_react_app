import "../../ComponentStyle/SubcomponentStyle/About.css";
import "../../ComponentStyle/SubcomponentStyle/Path.css";
import FamilyTree from "./FamilyTree";
import Path from "./Path";
import AudioPlayer from "./AudioPlayer";

import { motion } from "framer-motion";

import MoorLogo from "../../Logos/MoorLogo.svg";
import Capsule from "../../Logos/Capsule.svg";
import pathLogo from "../../Logos/PathLogo.svg";

let musicList1 = [
  {
    name: "Nice piano and ukulele",
    author: "Royalty",
    img: "https://www.bensound.com/bensound-img/buddy.jpg",
    audio: "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
    duration: "2:02",
  },
  {
    name: "Gentle acoustic",
    author: "Acoustic",
    img: "https://www.bensound.com/bensound-img/sunny.jpg",
    audio: "https://www.bensound.com//bensound-music/bensound-sunny.mp3",
    duration: "2:20",
  },
  {
    name: "Corporate motivational",
    author: "Corporate",
    img: "https://www.bensound.com/bensound-img/energy.jpg",
    audio: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
    duration: "2:59",
  },
  {
    name: "Slow cinematic",
    author: "Royalty",
    img: "https://www.bensound.com/bensound-img/slowmotion.jpg",
    audio: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
    duration: "3:26",
  },
];

let mobtxt =
  "Mobility is one of the hottest sectors, with start-ups and traditional OEMs constantly developing new technologies and transportation options.";
mobtxt +=
  "The influx of innovative solutions has yet to solve the problem of congested roads, however, and almost every country is feeling the effects.";
mobtxt +=
  " Drivers in Munich waste an average of 87 hours in traffic every year; in Los Angeles, wasted time in traffic hit 119 hours before the pandemic, when roads were more crowded.";

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
};
let stopList = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
  <motion.div className={"stop" + e}>
    <div className="stopBulletSpace">
      <div>{Object.keys(texts)[e]}</div>
      <div className="stopBullet"></div>
    </div>
    <div>{texts["Titre" + (e + 1)]}</div>
  </motion.div>
));

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
          <Path
            stopList={stopList}
            pathLogo={pathLogo}
            pathLogoStyle="moor-style"
          />
          <img className="Capsule" src={Capsule} alt="Capsule" />
          <motion.button
            className="mobility"
            initial={{ x: -900 }}
            whileHover={{ opacity: 0.4 }}
            animate={{ x: -215, y: 170, transition: { duration: 5 } }}
          >
            Learn more
          </motion.button>
        </div>
        <p className="mobpara">{mobtxt}</p>
        <AudioPlayer
          musicList={musicList1}
          playlistName="Favorite Playlist :"
        />
      </div>
    </div>
  );
}
