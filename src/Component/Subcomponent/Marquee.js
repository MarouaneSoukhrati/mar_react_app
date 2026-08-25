import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Marquee({ itemsList, speed = 50 }) {
  
  const [distance, setDistance] = useState(0);
  const firstCopyRef = useRef(null);
  const secondCopyRef = useRef(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!firstCopyRef.current || !secondCopyRef.current) return;
      const firstLeft = firstCopyRef.current.getBoundingClientRect().left;
      const secondLeft = secondCopyRef.current.getBoundingClientRect().left;
      
      setDistance(secondLeft - firstLeft);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (firstCopyRef.current) observer.observe(firstCopyRef.current);
    return () => observer.disconnect();
  }, [itemsList]);

  const duration = distance > 0 ? distance / speed : 0;

  return (
    <div className="Marquee">
      <motion.div
        className="MarqueeTrack"
        animate={distance > 0 ? { x: [0, -distance] } : {}}
        transition={{
          ease: "linear",
          duration,
          repeat: Infinity,
        }}
      >
        <div ref={firstCopyRef} className="MarqueeCards">
          {itemsList}
        </div>
        <div ref={secondCopyRef} className="MarqueeCards">
          {itemsList}
        </div>
      </motion.div>
    </div>
  );
}