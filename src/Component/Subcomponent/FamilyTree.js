import "../../ComponentStyle/SubcomponentStyle/FamilyTree.css";
import ImageCarousel from "./ImageCarousel";
import { motion } from "framer-motion";

import familyTree from "../../Logos/familyTree.svg";

import Tariq from "../../Logos/Tariq.svg";
import Abdel from "../../Logos/Abdel.svg";
import Abbas from "../../Logos/Abbas.svg";
import Arthephius from "../../Logos/Arthephius.svg";
import Ibnbattuta from "../../Logos/Ibnbattuta.svg";
import Averroes from "../../Logos/Averroes.svg";

let imgList = [Tariq, Abdel, Abbas, Arthephius, Ibnbattuta, Averroes];

let imgTitleList = [
  "Tariq Ibn Ziyad",
  "Abd Al Rahman I",
  "Abbas Ibn Firnas",
  "Arthephius",
  "Ibn Battuta",
  "Averroes",
];

let imgStyleList = [
  "imgCar-wrapper",
  "imgCar-titles",
  "imgCar-images",
  "switchButtons",
  1,
];

let Desctext = "The term Moor is an exonym first used by Christian Europeans to designate the Muslim populations of the Maghreb";
Desctext += ", al-Andalus (Iberian Peninsula), Sicily and Malta during the Middle Ages.";

export default function FamilyTree() {
  return (
    <div className="fam-wrapper">
      <div className="img-wrapper">
        <img className="fam-tree" src={familyTree} alt="Family-tree" />
        <ImageCarousel
          imgList={imgList}
          imgTitleList={imgTitleList}
          imgStyleList={imgStyleList}
        />
      </div>
      <div className="fam-txt">
        <p className="moorparag">{Desctext}</p>
        <motion.a
          whileHover={{ opacity: 0.4 }}
          className="moorbutton"
          href="https://en.wikipedia.org/wiki/Moors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </motion.a>
      </div>
    </div>
  );
}
