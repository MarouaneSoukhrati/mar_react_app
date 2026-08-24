import "../../ComponentStyle/SubcomponentStyle/Marquee.css";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Marquee({ imgList }) {
  return (
    <div className="Marquee">
      {[...imgList].map(img => <div>Test</div>)}
    </div>
  );
}
