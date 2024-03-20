import '../../ComponentStyle/SubcomponentStyle/ImageCarousel.css';
import { useState } from "react";
import { motion } from 'framer-motion';

import carouselLogo from "../../Logos/ImageCarousel.svg";

let imgList = [
  require('../../Logos/PathLogo.svg'),
  require('../../Logos/PathLogo.svg'),
  require('../../Logos/PathLogo.svg'),
];

export default function ImageCarousel() {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div className="imgCar-wrapper">
      <div className="imgCar">
        <img className="imgCar-images" src={imgList[imgIndex]} alt="Images" />
        <img className="imgCar-broadcastspace" src={carouselLogo} alt="Broadcast-space" />
        <div className="switchButtons">
        <motion.button
          className="swleft" whileTap={{rotate:90, scale:1.3}}
          onClick={() =>
            setImgIndex(
              imgIndex - 1 < 0
                ? imgList.length - 1
                : imgIndex - 1,
            )
          }
        >
          {"<"}
        </motion.button>
        <motion.button
          className="swright" whileTap={{rotate:-90, scale:1.3}}
          onClick={() => setImgIndex((imgIndex + 1) % imgList.length)}
        >
          {">"}
        </motion.button>
      </div>
      </div>
    </div>
  );
}
