import "../../ComponentStyle/SubcomponentStyle/Portfolio.css";
import { useState } from "react";
import { motion } from "framer-motion";

import aiSend from "../../Logos/aiSend.svg";
import aiAudio from "../../Logos/aiAudio.svg";
import aiImage from "../../Logos/aiImage.svg";
import leftArrow from "../../Logos/leftArrow.svg";
import rightArrow from "../../Logos/rightArrow.svg";
import marouaneLogo from "../../Logos/marouane-logo.svg";

import PokerGame from "../Poker/Poker";
import GomukoGame from "../Gomuko/Gomuko";
import HexGame from "../Hex/Hex";

export default function Portfolio() {
  return (
    <header className="App-portfolio">
      <h1 className="port-title">Portfolio</h1>
      <div className="Ai-part">
        <SideBar />
        <AiBot />
      </div>
      <div className="Poker-part">
        <PokerGame playersCount={4} />
      </div>
      <div className="Gomuko-part">
        <GomukoGame />
      </div>
      <div className="Hex-part">
        <HexGame />
      </div>
    </header>
  );
}

function SideBar() {
  const [isExtended, setIsExtended] = useState(false);
  function handleExt() {
    setIsExtended(!isExtended);
  }
  return (
    <>
      {!isExtended && (
        <div className="sidebar-section">
          <div className="history-wrapper1">
            <motion.img
              className="ext-img"
              src={leftArrow}
              alt="left-arrow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleExt}
            />
            <div className="history-title">Consult History :</div>
          </div>
        </div>
      )}
      {isExtended && (
        <div className="sidebar-section-ext">
          <div className="history-wrapper2">
            <motion.img
              className="ext-img"
              src={rightArrow}
              alt="right-arrow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleExt}
            />
            <div className="history-title2">History :</div>
          </div>
        </div>
      )}
    </>
  );
}

function AiBot() {
  const [aiQuest, setAiQuest] = useState("");
  const aiReadySubmit = aiQuest !== "";

  function handleInputChange(e) {
    setAiQuest(e.target.value);
  }

  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleMsg() {
    setAiQuest("Sorry the chat bot is not working currently !");
  }

  return (
    <div className="ai-section">
      <div className="aiBot-title">
        <img src={marouaneLogo} alt="marouaneLogo" className="myimglogo" />
        <h2>AI powered Chat Bot :</h2>
      </div>
      <div className="ai-prompt-section">
        <form name="userForm">
          <textarea
            className={aiReadySubmit ? "aiInput-ready" : "aiInput"}
            name="userInput"
            placeholder="Enter a prompt here ..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={aiQuest}
          />
        </form>
        <div className={aiReadySubmit ? "ai-buttons-ready" : "ai-buttons"}>
          <motion.img
            className="ai-image"
            src={aiImage}
            alt="ai-img"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.img
            className="ai-audio"
            src={aiAudio}
            alt="ai-audio"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          {aiReadySubmit && (
            <motion.img
              className="ai-answer"
              src={aiSend}
              alt="ai-answer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMsg}
            />
          )}
        </div>
      </div>
    </div>
  );
}
