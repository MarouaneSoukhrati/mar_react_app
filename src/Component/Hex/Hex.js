import "../../ComponentStyle/HexStyle/Hex.css";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HexGame() {
  const [hexBoardSize, setHexBoardSize] = useState(11);
  const [hexBoard, setHexBoard] = useState(initialiseHexBoard());
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerName, setPlayerName] = useState("Player");
  const [playerColor, setPlayerColor] = useState("Red");
  const [playerRoute, setPlayerRoute] = useState([]);
  const [opponentRoute, setOpponentRoute] = useState([]);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [opponentTurn, setOpponentTurn] = useState(false);
  const [lastPlayedIndex, setLastPlayedIndex] = useState([0, -1]);
  const [lastHooveredIndex, setLastHooveredIndex] = useState(-1);
  const [playerCircuits, setPlayerCircuits] = useState(
    getCircuits(playerRoute, playerColor)
  );

  useEffect(() => {
    if (gameHasStarted && !gameHasEnded && opponentTurn) {
      let opponentColor = playerColor === "Red" ? "Blue" : "Red";
      let [index, index2] = getOpponentPosition(hexBoard);
      let newHexBoard = [...hexBoard];
      let newOpponentRoute = [...opponentRoute];
      while (
        newHexBoard[index][index2] !== "." ||
        newOpponentRoute.includes([index, index2])
      ) {
        [index, index2] = getOpponentPosition(hexBoard);
      }
      newHexBoard[index][index2] = opponentColor;
      newOpponentRoute.push([index, index2]);
      setHexBoard(newHexBoard);
      setOpponentRoute(newOpponentRoute);
      if (checkWin(newOpponentRoute, opponentColor)) {
        setGameHasEnded(true);
      }
      setOpponentTurn(false);
    }
  }, [lastPlayedIndex]);

  function getOpponentPosition(checkedHexBoard) {
    return [
      Math.floor(Math.random() * checkedHexBoard.length),
      Math.floor(Math.random() * checkedHexBoard.length),
    ];
  }

  function handleNameChange() {
    if (playerNameInput === "" || playerNameInput === "Choose another name") {
      setPlayerNameInput("Choose another name");
      return;
    }
    setPlayerName(playerNameInput);
    setGameHasStarted(true);
    setHexBoardSize(11);
    setHexBoard(initialiseHexBoard(hexBoardSize));
    setPlayerRoute([]);
    setOpponentRoute([]);
    setGameHasEnded(false);
    setLastPlayedIndex([0, -1]);
    setOpponentTurn(false);
  }

  function handleGameReplay() {
    setGameHasEnded(false);
    setGameHasStarted(false);
    setHexBoardSize(11);
    setHexBoard(initialiseHexBoard(hexBoardSize));
    setPlayerRoute([]);
    setOpponentRoute([]);
    setLastPlayedIndex([0, -1]);
    setOpponentTurn(false);
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
    if (!gameHasStarted || gameHasEnded) {
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
    setLastPlayedIndex(() => [lastPlayedIndex[0] + 1, [index, index2]]);
    setPlayerCircuits(getCircuits(newPlayerRoute, playerColor));
    if (checkWin(newPlayerRoute, playerColor)) {
      setGameHasEnded(true);
    }
    setOpponentTurn(true);
  }

  function isConnected(node1, node2) {
    if (
      node2[0] === node1[0] &&
      (node2[1] === node1[1] + 1 || node2[1] === node1[1] - 1)
    ) {
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

  /*function circuitContains(bigCircuit, smallCircuit) {
    return smallCircuit.every((e) => bigCircuit.includes(e));
  }*/

  function areCircuitsConnected(newCircuit, oldCircuit) {
    for (let node1 of newCircuit) {
      for (let node2 of oldCircuit) {
        if (isConnected(node1, node2) || node1 === node2) {
          return true;
        }
      }
      return false;
    }
  }

  function cleanCircuit(arr) {
    let unique = [];
    arr.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }

  function getCircuits(route, color) {
    let circuits = [];
    for (let node1 of route) {
      let circuit = [node1];
      for (let node2 of route) {
        if (isConnected(node2, circuit[circuit.length - 1])) {
          circuit.push(node2);
        }
      }
      circuit = cleanCircuit(circuit);
      if (color === "Red") {
        circuit = sortRedCircuit(circuit);
      } else {
        circuit = sortBlueCircuit(circuit);
      }
      circuits.push(circuit);
    }
    for (let i = 0; i < circuits.length; i++) {
      for (let j = 0; j < circuits.length; j++) {
        if (i !== j && areCircuitsConnected(circuits[i], circuits[j])) {
          circuits[i].push(...circuits[j]);
          circuits[i] = cleanCircuit(circuits[i]);
          if (color === "Red") {
            circuits[i] = sortRedCircuit(circuits[i]);
          } else {
            circuits[i] = sortBlueCircuit(circuits[i]);
          }
        }
      }
    }
    return circuits;
  }

  function sortBlueCircuit(circuit) {
    let newCircuit = [...circuit];
    return newCircuit.sort(function (a, b) {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      }
      return a[1] - b[1];
    });
  }

  function sortRedCircuit(circuit) {
    let newCircuit = [...circuit];
    return newCircuit.sort(function (a, b) {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
  }

  function checkWin(checkedRoute, checkedColor) {
    let checkedCircuits = getCircuits(checkedRoute, checkedColor);
    if (checkedColor === "Red") {
      for (let circuit of checkedCircuits) {
        if (
          circuit[0][0] === 0 &&
          circuit[circuit.length - 1][0] === hexBoardSize - 1
        ) {
          return true;
        }
      }
      return false;
    } else {
      for (let circuit of checkedCircuits) {
        if (
          circuit[0][1] === 0 &&
          circuit[circuit.length - 1][1] === hexBoardSize - 1
        ) {
          return true;
        }
      }
      return false;
    }
  }

  function handleCaseHoover(hexCase) {
    setLastHooveredIndex(hexCase);
  }

  function handleCaseHooverExit() {
    setLastHooveredIndex(-1);
  }

  let mCircuits = playerCircuits.map((e) => (
    <div>{e.map((i) => "(" + i[0] + ", " + i[1] + "), ")} ||</div>
  ));

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
      <HexBoard
        hexBoard={hexBoard}
        onHexCellClick={onHexCellClick}
        handleCaseHoover={handleCaseHoover}
        handleCaseHooverExit={handleCaseHooverExit}
      />
      <div style={{ marginTop: "3vh" }}>
        Last Played Square:{" "}
        {lastPlayedIndex[1] === -1
          ? "None"
          : "(" + lastPlayedIndex[1][0] + ", " + lastPlayedIndex[1][1] + ")"}
      </div>
      <div style={{ marginTop: "1vh" }}>
        Selected Square:{" "}
        {lastHooveredIndex === -1
          ? "None"
          : "(" + lastHooveredIndex[0] + ", " + lastHooveredIndex[1] + ")"}
      </div>
      <div style={{ marginTop: "1vh" }}>Circuits : {mCircuits}</div>
    </div>
  );
}

function HexBoard({
  hexBoard,
  onHexCellClick,
  handleCaseHoover,
  handleCaseHooverExit,
}) {
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
            onMouseEnter={() => handleCaseHoover([index, index2])}
            onMouseLeave={handleCaseHooverExit}
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

function HexCell({ cellKey, value, onCellClick, onMouseEnter, onMouseLeave }) {
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
