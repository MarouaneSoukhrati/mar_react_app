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
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameHasEnded, setGameHasEnded] = useState(false);

  function handleNameChange() {
    if (playerNameInput === "" || playerNameInput === "Choose another name") {
      setPlayerNameInput("Choose another name");
      return;
    }
    setPlayerName(playerNameInput);
    setGameHasStarted(true);
    setHexBoardSize(10);
    setHexBoard(initialiseHexBoard(hexBoardSize));
    setPlayerRoute([]);
    setOpponentRoute([]);
    setGameHasEnded(false);
  }

  function handleGameReplay() {
    setGameHasEnded(false);
    setGameHasStarted(false);
    setHexBoardSize(10);
    setHexBoard(initialiseHexBoard(hexBoardSize));
    setPlayerRoute([]);
    setOpponentRoute([]);
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
    console.log(getCircuits(newPlayerRoute));
    if (checkWin(newPlayerRoute)) {
      setGameHasEnded(true);
    }
  }

  function isConnected(node1, node2) {
    if (node2[1] === node1[1] + 1 || node2[1] === node1[1] - 1) {
      return true;
    }
    if (
      node2[0] === node1[0] - 1 &&
      (node2[1] === node1[1] || node2[1] === node1[1] + 1)
    ) {
      return true;
    }
    if (
      node2[0] === node1[0] + 1 &&
      (node2[1] === node1[1] || node2[1] === node1[1] - 1)
    ) {
      return true;
    }
    return false;
  }

  function getCircuits(route) {
    let circuits = [];
    for (let node1 of route) {
      let circuit = [node1];
      for (let node2 of route) {
        if (isConnected(node2, circuit[circuit.length - 1])) {
          circuit.push(node2);
        }
      }
      let circuitContains = (bigCircuit, smallCircuit) =>
        smallCircuit.every((e) => bigCircuit.includes(e));
      let i = 0;
      for (let c of circuits) {
        if (circuitContains(c, circuit)) {
          i++;
          break;
        }
      }
      if (i === 0) {
        circuits.push(sortCircuit(circuit));
      }
    }
    return circuits;
  }

  function sortCircuit(circuit) {
    return circuit.sort(function (a, b) {
      if (b[0] === a[0]) {
        return b[1] - a[1];
      }
      return a[0] - b[0];
    });
  }

  function checkWin(checkedRoute) {
    //, opponentRoute) {
    let playerCircuits = getCircuits(checkedRoute);
    //let opponentCircuits = getCircuits(opponentRoute);
    for (let circuit of playerCircuits) {
      if (
        circuit[0][0] === 0 &&
        circuit[circuit.length - 1][0] === hexBoardSize - 1
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="hex-wrapper">
      <h1 style={{ color: "yellow" }}>Hex Game : Connect Borders</h1>
      {!gameHasStarted && (
        <div className="FormStyle">
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
            <label htmlFor="playerColor1">Red</label>
            <input
              id="playerColor2"
              type="radio"
              value="Blue"
              name="playerColor"
              onClick={(e) => setPlayerColor(e.target.value)}
            />
            <label htmlFor="playerColor2">Blue</label>
          </div>
          <motion.div className="play-game" onClick={handleNameChange}>
            Start
          </motion.div>
        </div>
      )}
      {gameHasStarted && (
        <h2 className="WelcomeMsg">
          Welcome <span style={{ color: playerColor }}>{playerName}</span> you
          are <span style={{ color: playerColor }}>{playerColor}</span> !
        </h2>
      )}
      {gameHasEnded && (
        <div className="winSection">
          <h2 className="winMsg">Game Over - The Winner is {playerColor}</h2>
          <motion.div className="play-game" onClick={handleGameReplay}>
            Replay
          </motion.div>
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
