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
  const [gameWinner, setGameWinner] = useState("None");
  const [playerRoute, setPlayerRoute] = useState([]);
  const [opponentRoute, setOpponentRoute] = useState([]);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [opponentTurn, setOpponentTurn] = useState(false);
  const [lastPlayedIndex, setLastPlayedIndex] = useState([0, -1]);
  const [lastHooveredIndex, setLastHooveredIndex] = useState(-1);
  const [playerCircuits, setPlayerCircuits] = useState(
    getCircuits(playerRoute, playerColor),
  );
  const [opponentCircuits, setOpponentCircuits] = useState(
    getCircuits(opponentRoute, playerColor === "Red" ? "Blue" : "Red"),
  );

  useEffect(() => {
    if (gameHasStarted && !gameHasEnded && opponentTurn) {
      let opponentColor = playerColor === "Red" ? "Blue" : "Red";
      let [index, index2] = getOpponentPosition(hexBoard);
      /*let [index, index2] = miniMax(
        hexBoard,
        hexBoardSize,
        1,
        -Infinity,
        +Infinity,
        true,
        minimaxEvaluation
      )[0];*/
      let newHexBoard = [...hexBoard];
      let newOpponentRoute = [...opponentRoute];
      while (
        newHexBoard[index][index2] !== "." ||
        newOpponentRoute.includes([index, index2])
      ) {
        [index, index2] = getOpponentPosition(hexBoard);
        /*[index, index2] = miniMax(
          hexBoard,
          hexBoardSize,
          1,
          -Infinity,
          +Infinity,
          true,
          minimaxEvaluation
        )[0];*/
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

  function getOpponentPosition2(checkedHexBoard) {
    return [
      Math.floor(Math.random() * checkedHexBoard.length),
      Math.floor(Math.random() * checkedHexBoard.length),
    ];
  }

  function getOpponentPosition(checkedHexBoard) {
    let opponentColor = playerColor === "Red" ? "Blue" : "Red";
    let opponentUpp = playerCircuits.map((e) => e[0]);
    let opponentDown = playerCircuits.map((e) => e[e.length - 1]);
    let opponentIndexes = opponentDown.concat(opponentUpp);
    opponentIndexes = opponentIndexes.flatMap((e) => {
      let indexes = [];
      if (playerColor === "Blue") {
        if (e[1] < hexBoardSize - 1) {
          indexes.push([e[0], e[1] + 1]);
        }
        if (e[1] < hexBoardSize - 1 && e[0] > 1) {
          indexes.push([e[0] - 1, e[1] + 1]);
        }
        if (e[0] < hexBoardSize - 1) {
          indexes.push([e[0] + 1, e[1]]);
        }
      } else {
        if (e[1] > 0 && e[0] < hexBoardSize - 1) {
          indexes.push([e[0] + 1, e[1] - 1]);
        }
        if (e[0] < hexBoardSize - 1) {
          indexes.push([e[0] + 1, e[1]]);
        }
      }
      return indexes;
    });
    opponentIndexes = opponentIndexes.filter(
      (e) => checkedHexBoard[e[0]][e[1]] === ".",
    );
    if (opponentIndexes.length === 0) {
      return [
        Math.floor(Math.random() * hexBoardSize),
        Math.floor(Math.random() * hexBoardSize),
      ];
    }
    let opponentIndexesEval = opponentIndexes.map(
      (e) =>
        neighborsCardinal(checkedHexBoard, playerColor, e) -
        neighborsCardinal(checkedHexBoard, opponentColor, e),
    );
    let opponentIndex = opponentIndexesEval.reduce(
      (maxIndex, elem, i, opponentIndexesEval) =>
        elem > opponentIndexesEval[maxIndex] ? i : maxIndex,
      0,
    );
    return opponentIndexes[opponentIndex];

    /*let newGamingBoard = [...checkedHexBoard].map((e, index) =>
      e.map((el, index2) => (el === "." ? [index, index2] : "xx")),
    );
    newGamingBoard = newGamingBoard.map((e) => e.filter((el) => el !== "xx"));
    let evalTab = newGamingBoard.map((e) => {
      return e.map((el) => {

        let h = playerRoute.includes(el) ? neighborsCardinal(checkedHexBoard,playerColor, el);
        h =
          h > 5
            ? 300 * h
            : h > 4
              ? 90 * h
              : h > 3
                ? 30 * h
                : h > 2
                  ? 10 * h
                  : h > 1
                    ? 5 * h
                    : h;
        return h;
      });
    });

    const getMaxIndex = (Tab) => {
      let maxValue = Tab[0][0];
      let maxIndex = [0, 0];
      for (let i = 0; i < Tab.length; i++) {
        for (let j = 0; j < Tab[i].length; j++) {
          if (Tab[i][j] > maxValue) {
            maxValue = Tab[i][j];
            maxIndex = [i, j];
          }
        }
      }
      return maxIndex;
    };

    let evalValue = getMaxIndex(evalTab);
    return newGamingBoard[evalValue[0]][evalValue[1]];*/
  }

  function neighborsCardinal(theHexBoard, color, node) {
    let S = 0;
    if (
      node[1] !== hexBoardSize - 1 &&
      theHexBoard[node[0]][node[1] + 1] === color
    ) {
      S += 1;
    }
    if (theHexBoard[node[0]][node[1] - 1] === color) {
      S += 1;
    }
    if (node[0] !== 0 && theHexBoard[node[0] - 1][node[1]] === color) {
      S += 1;
    }
    if (
      node[0] !== 0 &&
      node[1] !== hexBoardSize - 1 &&
      theHexBoard[node[0] - 1][node[1] + 1] === color
    ) {
      S += 1;
    }
    if (
      node[0] !== hexBoardSize - 1 &&
      theHexBoard[node[0] + 1][node[1]] === color
    ) {
      S += 1;
    }
    if (
      node[0] !== hexBoardSize - 1 &&
      theHexBoard[node[0] + 1][node[1] - 1] === color
    ) {
      S += 1;
    }
    return S;
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
    setPlayerCircuits([]);
    setOpponentRoute([]);
    setOpponentCircuits([]);
    setGameHasEnded(false);
    setLastPlayedIndex([0, -1]);
    setOpponentTurn(false);
    setGameWinner("None");
  }

  function handleGameReplay() {
    setGameHasEnded(false);
    setGameHasStarted(false);
    setHexBoardSize(11);
    setHexBoard(initialiseHexBoard(hexBoardSize));
    setPlayerRoute([]);
    setPlayerCircuits([]);
    setOpponentRoute([]);
    setOpponentCircuits([]);
    setLastPlayedIndex([0, -1]);
    setOpponentTurn(false);
    setGameWinner("None");
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

  function areCircuitsConnected(newCircuit, oldCircuit) {
    for (let node1 of newCircuit) {
      for (let node2 of oldCircuit) {
        if (
          isConnected(node1, node2) ||
          (node1[0] === node2[0] && node1[1] === node2[1]) ||
          (node2[0] === node1[0] && node2[1] === node1[1])
        ) {
          return true;
        }
      }
      return false;
    }
  }

  function cleanCircuit(circuit) {
    let cleanC = [];
    for (let c of circuit) {
      if (cleanC.every((e) => e[0] !== c[0] || e[1] !== c[1])) {
        cleanC.push(c);
      }
    }
    return cleanC;
  }

  function circuitDoesntContain(bigCircuit, smallCircuit) {
    for (let c of smallCircuit) {
      if (bigCircuit.every((e) => e[0] !== c[0] || e[1] !== c[1])) {
        return true;
      }
    }
    return false;
  }

  function isEqualCircuit(circuit1, circuit2) {
    if (circuit1.length !== circuit2.length) {
      return false;
    }
    for (let i = 0; i < circuit1.length; i++) {
      if (
        circuit1[i][0] !== circuit2[i][0] ||
        circuit1[i][1] !== circuit2[i][1]
      ) {
        return false;
      }
    }
    return true;
  }

  function cleanTheCircuits(circuits) {
    let myCircuits = [];
    for (let circuit of circuits) {
      if (myCircuits.every((e) => !isEqualCircuit(e, circuit))) {
        myCircuits.push(circuit);
      }
    }

    let newCircuits = [];
    for (let c1 of myCircuits) {
      let contains = 0;
      for (let c2 of myCircuits) {
        if (!circuitDoesntContain(c2, c1)) {
          contains++;
        }
      }
      if (contains === 1) {
        newCircuits.push(c1);
      }
    }
    return newCircuits;
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
    return cleanTheCircuits(circuits);
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
          setGameWinner(checkedColor);
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
          setGameWinner(checkedColor);
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

  function hexCellResistance(theHexBoard, position, color) {
    let [index1, index2] = position;
    if (theHexBoard[index1][index2] === ".") {
      return 1;
    }
    if (theHexBoard[index1][index2] === "Red") {
      return color === "Red" ? 0 : +Infinity;
    }
    if (theHexBoard[index1][index2] === "Blue") {
      return color === "Red" ? +Infinity : 0;
    }
  }

  function hexPairResistance(theHexBoard, position1, position2, color) {
    if (!isConnected(position1, position2)) {
      return;
    }
    return (
      hexCellResistance(theHexBoard, position1, color) +
      hexCellResistance(theHexBoard, position2, color)
    );
  }

  function calculateLineResistance(theHexBoard, color, line) {
    let R = 0;
    for (let i = 0; i < line.length - 1; i++) {
      R += hexPairResistance(theHexBoard, line[i], line[i + 1], color);
    }
    return R;
  }

  function minimaxEvaluation(theHexBoard) {
    let blueResistanceLines = theHexBoard.map((e) =>
      calculateLineResistance(theHexBoard, "Blue", e),
    );
    let blueResistance =
      1 /
      blueResistanceLines.reduce(function (a, b) {
        return a + 1 / b;
      }, 0);

    let redLines = theHexBoard[0].map((e, i) =>
      theHexBoard.map((row) => row[i]),
    );
    let redResistanceLines = redLines.map((e) =>
      calculateLineResistance(theHexBoard, "Red", e),
    );
    let redResistance =
      1 /
      redResistanceLines.reduce(function (a, b) {
        return a + 1 / b;
      }, 0);

    return playerColor === "Red"
      ? blueResistance / redResistance
      : redResistance / blueResistance;
  }

  function isTerminal(theHexBoard) {
    let opponentColor = playerColor === "Red" ? "Blue" : "Red";
    return (
      checkWin(playerRoute, playerColor) ||
      checkWin(opponentRoute, opponentColor)
    );
  }

  function generateTuples(n) {
    const tuples = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        tuples.push([i, j]);
      }
    }
    return tuples;
  }

  function miniMax(
    theHexBoard,
    theHexBoardSize,
    depth,
    alpha,
    beta,
    maximizingPlayer,
    evaluationFunc,
  ) {
    if (depth === 0 || isTerminal(theHexBoard)) {
      return [
        null,
        maximizingPlayer
          ? evaluationFunc(theHexBoard)
          : -evaluationFunc(theHexBoard),
      ];
    }
    let bestValue = maximizingPlayer ? -Infinity : +Infinity;
    let bestIndex = null;
    let myTuples = generateTuples(theHexBoardSize);
    let childs = myTuples.map((e) => {
      if (theHexBoard[e[0]][e[1]] === ".") {
        let childBoard = [...theHexBoard];
        childBoard[e[0]][e[1]] = playerColor === "Red" ? "Blue" : "Red";
        return [e, childBoard];
      }
      return [null, theHexBoard];
    });

    for (let child of childs) {
      let [vIndex, value] = miniMax(
        child[1],
        theHexBoardSize,
        depth - 1,
        alpha,
        beta,
        !maximizingPlayer,
        evaluationFunc,
      );
      if (maximizingPlayer) {
        if (bestValue < value) {
          bestValue = value;
          bestIndex = child[0];
        }
        if (bestValue > beta) {
          break;
        }
        alpha = Math.max(alpha, bestValue);
      } else {
        if (bestValue > value) {
          bestValue = value;
          bestIndex = child[0];
        }
        if (bestValue < alpha) {
          break;
        }
        beta = Math.min(beta, bestValue);
      }
    }
    return [bestIndex, bestValue];
  }

  /*let mCircuits = playerCircuits.map((e) => (
    <div>{e.map((i) => "(" + i[0] + ", " + i[1] + "), ")}</div>
  ));*/

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
          <h2 className="winMsg">Game Over - The Winner is {gameWinner}</h2>
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
      {/*<div style={{ marginTop: "1vh" }}>Circuits : {mCircuits}</div>*/}
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
