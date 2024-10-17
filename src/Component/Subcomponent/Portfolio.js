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
import ChatBot from "../ChatBot/ChatBot";

export default function Portfolio() {
  return (
    <header className="App-portfolio">
      <h1 className="port-title">Portfolio</h1>
      <div className="Ai-part">
        <AiChatBot />
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

function SideBar({ aiHistory, setAiVQuest }) {
  const [isExtended, setIsExtended] = useState(false);
  function handleExt() {
    setIsExtended(!isExtended);
  }
  let aiHistoryDiv = aiHistory.map((e) => (
    <motion.div
      className="historyTitle"
      whileHover={{ scale: 1.2 }}
      onClick={() => handleHistoryTitleClick(e)}
    >
      {e}
    </motion.div>
  ));
  function handleHistoryTitleClick(e) {
    setAiVQuest(e);
  }
  return (
    <>
      {!isExtended && (
        <div className="sidebar-section">
          <div className="history-wrapper1">
            <motion.img
              className="ext-img"
              src={rightArrow}
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
              src={leftArrow}
              alt="right-arrow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleExt}
            />
            <div className="history-title2">History :</div>
          </div>
          <div className="historyTitleList">{aiHistoryDiv}</div>
        </div>
      )}
    </>
  );
}

function AiBot({ aiHistory, setAiHistory, aiVQuest, setAiVQuest }) {
  const [aiQuest, setAiQuest] = useState("");
  const aiReadySubmit = aiQuest !== "";
  const aiReadyValidate = aiVQuest !== "";

  function handleInputChange(e) {
    setAiQuest(e.target.value);
  }

  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleMsg() {
    setAiVQuest(aiQuest);
    setAiQuest("");
    setAiHistory([...aiHistory, aiQuest]);
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
      {aiReadyValidate && <ChatBot request={aiVQuest} />}
    </div>
  );
}

function AiChatBot() {
  const [aiHistory, setAiHistory] = useState([]);
  const [aiVQuest, setAiVQuest] = useState("");
  return (
    <>
      <SideBar aiHistory={aiHistory} setAiVQuest={setAiVQuest} />
      <AiBot
        aiHistory={aiHistory}
        setAiHistory={setAiHistory}
        aiVQuest={aiVQuest}
        setAiVQuest={setAiVQuest}
      />
    </>
  );
}
