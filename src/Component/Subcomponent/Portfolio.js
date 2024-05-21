import "../../ComponentStyle/SubcomponentStyle/Portfolio.css";
import { useState } from "react";
import { motion } from "framer-motion";

import aiSend from "../../Logos/aiSend.svg";
import aiAudio from "../../Logos/aiAudio.svg";
import aiImage from "../../Logos/aiImage.svg";

export default function Portfolio() {
  return (
    <header className="App-portfolio">
      <h1>Portfolio</h1>
      <AiBot />
    </header>
  );
}

function AiBot() {
  const [aiQuest, setAiQuest] = useState("");
  const aiReadySubmit = aiQuest !== "";
  function handleInputChange(e) {
    setAiQuest(e.target.value);
  }
  return (
    <div className="ai-section">
      <h2>AI powered Chat Bot</h2>
      <div className="ai-prompt-section">
        <form name="userForm">
          <textarea
            className="aiInput"
            name="userInput"
            placeholder="Enter a prompt here"
            onChange={handleInputChange}
          />
        </form>
        <div className={aiReadySubmit ? "ai-buttons-ready" : "ai-buttons"}>
          <motion.img
            className="ai-image"
            src={aiImage}
            alt="ai-img"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.7 }}
          />
          <motion.img
            className="ai-audio"
            src={aiAudio}
            alt="ai-audio"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.7 }}
          />
          {aiReadySubmit && (
            <motion.img
              className="ai-answer"
              src={aiSend}
              alt="ai-answer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.7 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
