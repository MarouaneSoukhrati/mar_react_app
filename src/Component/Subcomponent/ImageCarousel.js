import '../../ComponentStyle/SubcomponentStyle/ImageCarousel.css';
import { useState } from "react";
import { motion } from 'framer-motion';

import Tariq from '../../Logos/Tariq.svg'
import Abdel from '../../Logos/Abdel.svg'
import Abbas from '../../Logos/Abbas.svg'
import Arthephius from '../../Logos/Arthephius.svg'
import Ibnbattuta from '../../Logos/Ibnbattuta.svg'
import Averroes from '../../Logos/Averroes.svg'

let imgList = [
  Tariq,
  Abdel,
  Abbas,
  Arthephius,
  Ibnbattuta,
  Averroes,
];

let titleList = [
  "Tariq Ibn Ziyad",
  "Abd Al Rahman I",
  "Abbas Ibn Firnas",
  "Arthephius",
  "Ibn Battuta",
  "Averroes",
];

export default function ImageCarousel() {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div className="imgCar-wrapper">
        <h1 className='imgCar-titles'>{titleList[imgIndex]}</h1>
        <img className="imgCar-images" src={imgList[imgIndex]} alt="Images" />
        <div className="switchButtons">
          {imgList.map((e,index) => <motion.div whileHover={{scale:1.50}} className={index===imgIndex? "activeswitchDot": "switchDot"} onClick={() => setImgIndex(index)}></motion.div>)}
         </div>
    </div>
  );
}
