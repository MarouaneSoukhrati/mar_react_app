import "../../ComponentStyle/HexStyle/Hex.css";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HexGame() {
  const [hexBoardSize, setHexBoardSize] = useState(10);
  const [hexBoard, setHexBoard] = useState(initialiseHexBoard());
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerName, setPlayerName] = useState("Player");
  const [playerColor, setPlayerColor] = useState("Red");
  let gameHasStarted = playerName !== "Player";

  function submitButton(e) {
    e.preventDefault();
    setHexBoardSize(10);
    setHexBoard(initialiseHexBoard(hexBoardSize));
  }

  function handleNameChange() {
    if (playerNameInput === "" || playerNameInput === "Choose another name") {
      setPlayerNameInput("Choose another name");
      return;
    }
    setPlayerName(playerNameInput);
  }

  function initialiseHexBoard(size = hexBoardSize) {
    let board = [];
    for (let i = 0; i < size; i++) {
      let line = [];
      for (let j = i * size; j < (i + 1) * size; j++) {
        line.push(".");
      }
      board.push(line);
    }
    return board;
  }

  function onHexCellClick(index, index2) {
    if (!gameHasStarted || (index === -666 && index2 === 666)) {
      return;
    }
    let newHexBoard = [...hexBoard];
    if (newHexBoard[index][index2] !== ".") {
      return;
    }
    newHexBoard[index][index2] = playerColor;
    setHexBoard(newHexBoard);
  }

  return (
    <div className="hex-wrapper">
      <h1 style={{ color: "yellow" }}>Hex Game</h1>
      {!gameHasStarted && (
        <form className="FormStyle" onSubmit={submitButton}>
          <input
            className="inputSpace"
            type="text"
            placeholder="Choose a name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <div>
            <input
              id="playerColor1"
              type="radio"
              value="Red"
              name="playerColor"
              onClick={(e) => setPlayerColor(e.target.value)}
            />
            <label for="playerColor1">Red</label>
            <input
              id="playerColor2"
              type="radio"
              value="Blue"
              name="playerColor"
              onClick={(e) => setPlayerColor(e.target.value)}
            />
            <label for="playerColor2">Blue</label>
          </div>
          <motion.div className="play-game" onClick={handleNameChange}>
            Start
          </motion.div>
        </form>
      )}
      {gameHasStarted && (
        <div className="WelcomeMsg">
          Welcome <span style={{ color: "yellow" }}>{playerName}</span> you are{" "}
          <span style={{ color: playerColor }}>{playerColor}</span> !
        </div>
      )}
      <HexBoard hexBoard={hexBoard} onHexCellClick={onHexCellClick} />
    </div>
  );
}

function HexBoard({ hexBoard, onHexCellClick }) {
  let HexBoardFigure = hexBoard.map((e, index) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: index * 5 + "vh",
        }}
      >
        <HexCell
          cellKey={[-666, 666]}
          value={"Blue"}
          onCellClick={() => onHexCellClick(-666, 666)}
        />
        {e.map((el, index2) => (
          <HexCell
            cellKey={[index, index2]}
            value={el}
            onCellClick={() => onHexCellClick(index, index2)}
          />
        ))}
        <HexCell
          cellKey={[-666, 666]}
          value={"Blue"}
          onCellClick={() => onHexCellClick(-666, 666)}
        />
      </div>
    );
  });
  return (
    <div className="HexAWrapper">
      <div className="HexBoard">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "-5vh",
          }}
        >
          {hexBoard[0].map((e) => (
            <HexCell
              cellKey={[-666, 666]}
              value={"Red"}
              onCellClick={() => onHexCellClick(-666, 666)}
            />
          ))}
        </div>
        {HexBoardFigure}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: hexBoard.length * 5 + "vh",
          }}
        >
          {hexBoard[0].map((e) => (
            <HexCell
              cellKey={[-666, 666]}
              value={"Red"}
              onCellClick={() => onHexCellClick(-666, 666)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HexCell({ cellKey, value, onCellClick }) {
  return (
    <motion.div
      key={cellKey}
      className={
        value === "." ? "EmptyHex" : value === "Red" ? "RedHex" : "BlueHex"
      }
      whileHover={{ scale: 1.1, opacity: 0.3 }}
      onClick={onCellClick}
    />
  );
}