import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState } from "react";
import { motion } from "framer-motion";

function InfiniteScrollFramer() {
  return (
    <div style={{ overflowX: "auto", width: "100%", display: "flex" }}>
      <motion.div
        style={{ display: "flex" }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
        {[1, 2, 3].map((card, index) => (
        <CryptoCard key={index}/>
        ))}
      </motion.div>
      
       <motion.div
        style={{ display: "flex" }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
        {[1, 2, 3].map((card, index) => (
        <CryptoCard key={index}/>
        ))}
      </motion.div>
    </div>
  );
}


export default function Marquee({ imgList }) {
  return (
    <div className="Marquee">
      {[...imgList].map(img => <div>Test</div>)}
    </div>
  );
}