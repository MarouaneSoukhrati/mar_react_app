import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Marquee({ itemsList }) {
  const [contentWidth, setContentWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setContentWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [itemsList]);

  return (
    <div className="Marquee">
      {contentWidth > 0 && (
        <>
          <motion.div
            ref={containerRef}
            className="MarqueeCards"
            animate={{ x: [0, -contentWidth] }}
            transition={{
              ease: "linear",
              duration: 10,
              repeat: Infinity,
            }}
          >
            {itemsList}
          </motion.div>
          <motion.div
            className="MarqueeCards"
            animate={{ x: [0, -contentWidth] }}
            transition={{
              ease: "linear",
              duration: 10,
              repeat: Infinity,
            }}
          >
            {itemsList}
          </motion.div>
        </>
      )}
    </div>
  );
}