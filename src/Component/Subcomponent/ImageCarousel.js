import "../../ComponentStyle/SubcomponentStyle/ImageCarousel.css";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageCarousel({ imgList, imgTitleList, imgStyleList }) {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div className={imgStyleList[0]}>
      {imgStyleList[4] && (
        <h1 className={imgStyleList[1]}>{imgTitleList[imgIndex]}</h1>
      )}
      <img className={imgStyleList[2]} src={imgList[imgIndex]} alt="Images" />
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
