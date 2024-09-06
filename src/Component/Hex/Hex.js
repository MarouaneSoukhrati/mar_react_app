import "../../ComponentStyle/HexStyle/Hex.css";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HexGame() {
  const [hexBoardSize, setHexBoardSize] = useState(6);
  const [hexBoard, setHexBoard] = useState(initialiseHexBoard());
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerName, setPlayerName] = useState("Player");
  const [playerColor, setPlayerColor] = useState("Red");
  let gameHasStarted = playerName !== "Player";

  function submitButton(e) {
    e.preventDefault();
    //handleNameChange();
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
        line.push(j);
      }
      board.push(line);
    }
    return board;
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
              id="red"
              value="Red"
              name="playerColor"
              onClick={(e) => setPlayerColor(e.target.value)}
            />
            <label for="playerColor1">Red</label>
            <input
              id="playerColor2"
              type="radio"
              id="blue"
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
        <div>
          Welcome <span style={{ color: "yellow" }}>{playerName}</span> you are{" "}
          <span style={{ color: playerColor }}>{playerColor}</span> !
        </div>
      )}
      <HexBoard hexBoard={hexBoard} />
    </div>
  );
}

function HexBoard({ hexBoard }) {
  let HexBoardFigure = hexBoard.map((e) => (
    <div className="hexLine">
      {e.map((el) => (
        <HexCell index={el} key={el} onClick={onHexCellClick} />
      ))}
    </div>
  ));
  return <div className="HexBoard">{HexBoardFigure}</div>;
}

function onHexCellClick() {}

function HexCell({ index }) {
  return <div className="hexCell">{index}</div>;
}
