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
  const [playerRoute, setPlayerRoute] = useState([]);
  const [opponentRoute, setOpponentRoute] = useState([]);
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
    if (!gameHasStarted) {
      return;
    }
    let newHexBoard = [...hexBoard];
    let newPlayerRoute = [...playerRoute];
    if (
      newHexBoard[index][index2] !== "." ||
      newPlayerRoute.includes([index, index2])
    ) {
      return;
    }
    newHexBoard[index][index2] = playerColor;
    newPlayerRoute.push([index, index2]);
    setHexBoard(newHexBoard);
    setPlayerRoute(newPlayerRoute);
  }

  function checkWin(playerRoute, opponentRoute) {
    if (playerColor === "Red") {
      return;
    } else {
      return;
    }
  }

  function checkDraw(hexBoard) {
    return;
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
  let topBorder = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "-5vh",
        marginBottom: "-0.4vh",
      }}
    >
      <HexCell cellKey={[-Infinity, -Infinity]} value={"Corner"} />
      {[...Array(hexBoard.length).keys()].map((e) => (
        <HexCell cellKey={[-Infinity, e]} value={"Red"} />
      ))}
      <HexCell cellKey={[-Infinity, +Infinity]} value={"Corner"} />
    </div>
  );

  let lowBorder = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: hexBoard.length * 5 + "vh",
        marginTop: "-0.4vh",
      }}
    >
      <HexCell cellKey={[+Infinity, -Infinity]} value={"Corner"} />
      {[...Array(hexBoard.length).keys()].map((e) => (
        <HexCell cellKey={[+Infinity, e]} value={"Red"} />
      ))}
      <HexCell cellKey={[+Infinity, +Infinity]} value={"Corner"} />
    </div>
  );

  let HexBoardFigure = hexBoard.map((e, index) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: index * 5 + "vh",
          marginTop: "-0.5vh",
          marginBottom: "-0.5vh",
        }}
      >
        <HexCell cellKey={[index, -Infinity]} value={"Blue"} />
        {e.map((el, index2) => (
          <HexCell
            cellKey={[index, index2]}
            value={el}
            onCellClick={() => onHexCellClick(index, index2)}
          />
        ))}
        <HexCell cellKey={[index, +Infinity]} value={"Blue"} />
      </div>
    );
  });
  HexBoardFigure.unshift(topBorder);
  HexBoardFigure.push(lowBorder);
  return <div className="HexBoard">{HexBoardFigure}</div>;
}

function HexCell({ cellKey, value, onCellClick }) {
  return (
    <motion.div
      key={cellKey}
      className={
        value === "."
          ? "EmptyHex"
          : value === "Red"
          ? "RedHex"
          : value === "Blue"
          ? "BlueHex"
          : "CornerHex"
      }
      whileHover={{ scale: 1.1, opacity: 0.3 }}
      onClick={onCellClick}
    />
  );
}
