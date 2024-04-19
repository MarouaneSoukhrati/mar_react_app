import "../../ComponentStyle/SubcomponentStyle/ImageCarousel.css";
import { useState } from "react";
import { motion } from "framer-motion";

import leftArrow from "../../Logos/leftArrow.svg";
import rightArrow from "../../Logos/rightArrow.svg";

export default function ImageCarousel({ imgList, imgTitleList, imgStyleList }) {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div className={imgStyleList[0]}>
      {imgStyleList[4] && (
        <h1 className={imgStyleList[1]}>{imgTitleList[imgIndex]}</h1>
      )}
      <div className={imgStyleList[5]}>
        <motion.img
          className="leftArrow"
          src={leftArrow}
          alt="left-arrow"
          whileHover={{ scale: 2.2 }}
          onClick={() =>
            setImgIndex(imgIndex === 0 ? imgList.length - 1 : imgIndex - 1)
          }
        />
        <img className={imgStyleList[2]} src={imgList[imgIndex]} alt="Images" />
        <motion.img
          className="rightArrow"
          src={rightArrow}
          alt="right-arrow"
          whileHover={{ scale: 2.2 }}
          onClick={() => setImgIndex((imgIndex + 1) % imgList.length)}
        />
      </div>
      <div className={imgStyleList[3]}>
        {imgList.map((e, index) => (
          <motion.div
            whileHover={{ scale: 1.5 }}
            className={index === imgIndex ? "activeswitchDot" : "switchDot"}
            onClick={() => setImgIndex(index)}
          ></motion.div>
        ))}
      </div>
    </div>
  );
}
