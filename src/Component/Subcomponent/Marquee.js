import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Marquee({ imgList }) {
  return (
    <div className="Marquee">
      <motion.div
        className="MarqueeCards"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
          {imgList.map(img => <div>Test</div>)}
      </motion.div>
      <motion.div
        className="MarqueeCards"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
          {imgList.map(img => <div>Test</div>)}
      </motion.div>
    </div>
  );
}