import "../../ComponentStyle/SubcomponentStyle/Portfolio.css";
import { useState } from "react";

import rightArrow from "../../Logos/rightArrow.svg";

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
          <input
            className="aiInput"
            type="text"
            name="userInput"
            placeholder="Enter a prompt here"
            onChange={handleInputChange}
          />
        </form>
        <div className={aiReadySubmit ? "ai-buttons-ready" : "ai-buttons"}>
          <img className="ai-image" src={rightArrow} alt="right-arrow" />
          <img className="ai-audio" src={rightArrow} alt="right-arrow" />
          {aiReadySubmit && (
            <img className="ai-answer" src={rightArrow} alt="right-arrow" />
          )}
        </div>
      </div>
    </div>
  );
}
