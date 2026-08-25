import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Marquee({ itemsList }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        // We measure ONE set of items
        setTrackWidth(entry.contentRect.width);
      }
    });

    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [itemsList]);

  return (
    <div className="Marquee">
      <motion.div
        className="MarqueeTrack"
        animate={trackWidth > 0 ? { x: [0, -trackWidth] } : {}}
        transition={{
          ease: "linear",
          duration: 10,
          repeat: Infinity,
        }}
      >
        {/* First copy - we attach the ref here to measure its exact width */}
        <div ref={trackRef} className="MarqueeCards">
          {itemsList}
        </div>
        {/* Second identical copy right next to it */}
        <div className="MarqueeCards">
          {itemsList}
        </div>
      </motion.div>
    </div>
  );
}