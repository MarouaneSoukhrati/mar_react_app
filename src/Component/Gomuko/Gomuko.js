import "../../ComponentStyle/GomukoStyle/Gomuko.css";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import prevMove from "../../Logos/leftArrow.svg";
import nextMove from "../../Logos/rightArrow.svg";

export default function GomukoGame() {
  const [gameSize, setGameSize] = useState(10);
  const [gameBoard, setGameBoard] = useState(initialiseBoard(gameSize));
  const [movesHistory, setMovesHistory] = useState({
    historyBoard: [initialiseBoard(gameSize)],
    historyIndex: 0,
  });
  const [winCases, setWinCases] = useState([]);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState("x");
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [gameWinner, setGameWinner] = useState("None");
  const [lastPlayedIndex, setLastPlayedIndex] = useState([0, -1]);
  const [opponentTurn, setOpponentTurn] = useState(false);
  const [lastHooveredIndex, setLastHooveredIndex] = useState(-1);

  function handleGameStart() {
    setGameSize(10);
    setGameBoard(initialiseBoard(gameSize));
    setWinCases([]);
    setLastPlayedIndex([0, -1]);
    setMovesHistory({
      historyBoard: [initialiseBoard(gameSize)],
      historyIndex: 0,
    });
    setGameHasEnded(false);
    setGameHasStarted(true);
  }

  function handleGameReplay() {
    setGameSize(10);
    setGameBoard(initialiseBoard(gameSize));
    setWinCases([]);
    setLastPlayedIndex([0, -1]);
    setMovesHistory({
      historyBoard: [initialiseBoard(gameSize)],
      historyIndex: 0,
    });
    setGameHasEnded(false);
    setGameHasStarted(false);
  }

  function handlePlayerChoice(e) {
    setPlayerColor(e.target.value);
  }

  function handlePrevMove() {
    let newHistoryIndex =
      movesHistory.historyIndex > 0 ? movesHistory.historyIndex - 1 : 0;
    setMovesHistory({ ...movesHistory, historyIndex: newHistoryIndex });
    setGameBoard(movesHistory.historyBoard[newHistoryIndex]);
    setOpponentTurn(!opponentTurn);
  }

  function handleNextMove() {
    let newHistoryIndex =
      movesHistory.historyIndex < movesHistory.historyBoard.length - 1
        ? movesHistory.historyIndex + 1
        : movesHistory.historyBoard.length - 1;
    setMovesHistory({ ...movesHistory, historyIndex: newHistoryIndex });
    setGameBoard(movesHistory.historyBoard[newHistoryIndex]);
    setOpponentTurn(!opponentTurn);
  }

  let gameOverExp =
    "Game Over - " +
    (gameWinner === "None"
      ? "It's a Draw"
      : gameWinner === "x"
      ? "The Winner is Black"
      : "The Winner is White");

  return (
    <header className="gomuko-wrapper">
      <h1 className="gameTitle">Gomuko Game : 5 Allined</h1>
      {!gameHasStarted && (
        <>
          <h2>Choose a Color:</h2>
          <div className="playerChoice">
            <div className="playerOption">
              <input
                type="radio"
                id="playerChoice1"
                name="player"
                value="x"
                onClick={handlePlayerChoice}
              />
              <label htmlFor="playerChoice1">Black</label>
            </div>
            <div className="playerOption">
              <input
                type="radio"
                id="playerChoice2"
                name="player"
                value="o"
                onClick={handlePlayerChoice}
              />
              <label htmlFor="playerChoice2">White</label>
            </div>
          </div>
          <motion.div
            className="startGame"
            whileHover={{ opacity: 0.4 }}
            onClick={handleGameStart}
          >
            Start
          </motion.div>
        </>
      )}

      {gameHasStarted && (
        <h2>Your Color is : {playerColor === "x" ? "Black" : "White"}</h2>
      )}
      {gameHasEnded && <h1 className="gameTitleWin">{gameOverExp}</h1>}
      {gameHasStarted && (
        <motion.div
          className="restartGame"
          whileHover={{ opacity: 0.4 }}
          onClick={handleGameReplay}
        >
          Replay
        </motion.div>
      )}

      <div className="GomukoTableControls">
        <div className="prevMove">
          <motion.img
            className="prevMoveButton"
            src={prevMove}
            alt="prevMove"
            whileHover={{ scale: 1.3 }}
            onClick={handlePrevMove}
          />
          <div className="prevMoveLabel">Prior Move</div>
        </div>
        <GomukoTable
          gameBoard={gameBoard}
          gameSize={gameSize}
          winCases={winCases}
          setGameBoard={setGameBoard}
          setWinCases={setWinCases}
          gameHasStarted={gameHasStarted}
          gameHasEnded={gameHasEnded}
          setGameHasEnded={setGameHasEnded}
          playerColor={playerColor}
          setGameWinner={setGameWinner}
          lastPlayedIndex={lastPlayedIndex}
          setLastPlayedIndex={setLastPlayedIndex}
          opponentTurn={opponentTurn}
          setOpponentTurn={setOpponentTurn}
          movesHistory={movesHistory}
          setMovesHistory={setMovesHistory}
          setLastHooveredIndex={setLastHooveredIndex}
        />
        <div className="nextMove">
          <motion.img
            className="nextMoveButton"
            src={nextMove}
            alt="nextMove"
            whileHover={{ scale: 1.3 }}
            onClick={handleNextMove}
          />
          <div className="nextMoveLabel">Next Move</div>
        </div>
      </div>
      <div style={{ marginTop: "3vh" }}>
        Last Played Square:{" "}
        {lastPlayedIndex[1] === -1 ? "None" : lastPlayedIndex[1]}
      </div>
      <div style={{ marginTop: "1vh" }}>
        Selected Square: {lastHooveredIndex === -1 ? "None" : lastHooveredIndex}
      </div>
    </header>
  );
}

function initialiseBoard(gameSize) {
  let BoardTable = [...Array(gameSize * gameSize).keys()];
  let Board = BoardTable.map((e) => ".");
  return Board;
}

function GomukoTable({
  gameBoard,
  gameSize,
  winCases,
  setWinCases,
  setGameBoard,
  gameHasStarted,
  gameHasEnded,
  setGameHasEnded,
  playerColor,
  setGameWinner,
  lastPlayedIndex,
  setLastPlayedIndex,
  opponentTurn,
  setOpponentTurn,
  movesHistory,
  setMovesHistory,
  setLastHooveredIndex,
}) {
  useEffect(() => {
    if (checkDraw()) {
      setOpponentTurn(false);
      setGameHasEnded(true);
      setGameWinner("None");
      setWinCases([]);
    }
    if (opponentTurn) {
      let opponentColor = playerColor === "x" ? "o" : "x";
      let opponentMove = evaluation(gameBoard);
      /*let opponentMove = miniMax(
        gameBoard,
        2,
        -Infinity,
        +Infinity,
        true,
        minimaxEvaluation
      )[0];*/
      while (gameBoard[opponentMove] !== ".") {
        opponentMove = evaluation(gameBoard);
        /*opponentMove = miniMax(
          gameBoard,
          2,
          -Infinity,
          +Infinity,
          true,
          minimaxEvaluation
        )[0];*/
      }
      let newBoard = [...gameBoard];
      newBoard[opponentMove] = opponentColor;
      setGameBoard(newBoard);
      let newHistoryBoard = [...movesHistory.historyBoard];
      newHistoryBoard.push(newBoard);
      setMovesHistory({
        historyBoard: newHistoryBoard,
        historyIndex: movesHistory.historyIndex + 1,
      });
      setLastPlayedIndex((lastPlayedIndex) => [
        lastPlayedIndex[0] + 1,
        opponentMove,
      ]);
      setOpponentTurn(false);
      let checkGameWin = checkWin(gameBoard, opponentColor, opponentMove);
      if (checkGameWin[0]) {
        setGameHasEnded(true);
        setGameWinner(opponentColor);
        setWinCases(checkGameWin[1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPlayedIndex]);

  let BoardTab = gameBoard.map((e, index) => (
    <motion.div
      className={winCases.includes(index) ? "winBoardCase" : "BoardCase"}
      whileHover={{ scale: 1.1, opacity: 0.3 }}
      onClick={() => handleCaseClick(index)}
      onMouseEnter={() => handleCaseHoover(index)}
      onMouseLeave={handleCaseHooverExit}
      key={index}
    >
      {e === "." ? null : e === "x" ? (
        <div className="BlackPion"></div>
      ) : (
        <div className="WhitePion"></div>
      )}
    </motion.div>
  ));
  let BoardLines = [...Array(gameSize).keys()].map((e) => (
    <div className="BoardLine" key={e}>
      {BoardTab.slice(e * gameSize, (e + 1) * gameSize)}
    </div>
  ));

  function isTerminal(gamingBoard) {
    return gamingBoard.every((element) => element !== ".");
  }

  function miniMax(
    gamingBoard,
    depth,
    alpha,
    beta,
    maximizingPlayer,
    evaluationFunc
  ) {
    let opponentColor = playerColor === "x" ? "o" : "x";
    if (
      depth === 0 ||
      isTerminal(gamingBoard) ||
      checkWin(gamingBoard, opponentColor, lastPlayedIndex)[0] ||
      checkWin(gamingBoard, playerColor, lastPlayedIndex)[0]
    ) {
      return [
        null,
        maximizingPlayer
          ? evaluationFunc(gamingBoard)
          : -evaluationFunc(gamingBoard),
      ];
    }
    let bestValue = maximizingPlayer ? -Infinity : +Infinity;
    let bestIndex = null;
    let childs = gamingBoard.map((e, index) => {
      if (gamingBoard[index] === ".") {
        let childBoard = [...gamingBoard];
        childBoard[index] = playerColor === "x" ? "o" : "x";
        return [index, childBoard];
      }
      return [null, gamingBoard];
    });

    for (let child of childs) {
      let [vIndex, value] = miniMax(
        child[1],
        depth - 1,
        alpha,
        beta,
        !maximizingPlayer,
        evaluationFunc
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

  function evaluation(gamingBoard) {
    let opponentColor = playerColor === "x" ? "o" : "x";
    let newGamingBoard = [...gamingBoard].map((e, index) =>
      e === "." ? index : "xx"
    );
    newGamingBoard = newGamingBoard.filter((e) => e !== "xx");
    let evalTab = newGamingBoard.map((e) => {
      let voisins = neighborsCardinal(gamingBoard, playerColor, e);

      let h = voisins.horizontal.length;
      let v = voisins.vertical.length;
      let rd = voisins.rightDiagonal.length;
      let ld = voisins.leftDiagonal.length;

      h = h > 3 ? 30 * h : h > 2 ? 10 * h : h > 1 ? 5 * h : h;
      v = v > 3 ? 30 * v : v > 2 ? 10 * v : v > 1 ? 5 * v : v;
      rd = rd > 3 ? 30 * rd : rd > 2 ? 10 * rd : rd > 1 ? 5 * rd : rd;
      ld = ld > 3 ? 30 * ld : ld > 2 ? 10 * ld : ld > 1 ? 5 * ld : ld;

      return h + v + rd + ld;
    });
    let evalValue = evalTab.reduce(
      (maxIndex, elem, i, evalTab) => (elem > evalTab[maxIndex] ? i : maxIndex),
      0
    );
    return newGamingBoard[evalValue];
  }

  // Attacking Strategy
  function minimaxEvaluation(gamingBoard) {
    let opponentColor = playerColor === "x" ? "o" : "x";
    let newGamingBoard = [...gamingBoard].map((e, index) =>
      e === "." ? index : "xx"
    );
    newGamingBoard = newGamingBoard.filter((e) => e !== "xx");
    let evalTab = newGamingBoard.map((e) => {
      let voisins = neighborsCardinal(gamingBoard, opponentColor, e);

      let h = voisins.horizontal.length;
      let v = voisins.vertical.length;
      let rd = voisins.rightDiagonal.length;
      let ld = voisins.leftDiagonal.length;

      h = h > 3 ? 30 * h : h > 2 ? 10 * h : h > 1 ? 5 * h : h;
      v = v > 3 ? 30 * v : v > 2 ? 10 * v : v > 1 ? 5 * v : v;
      rd = rd > 3 ? 30 * rd : rd > 2 ? 10 * rd : rd > 1 ? 5 * rd : rd;
      ld = ld > 3 ? 30 * ld : ld > 2 ? 10 * ld : ld > 1 ? 5 * ld : ld;

      return h + v + rd + ld;
    });
    return Math.max(...evalTab) + Math.random() * 1;
  }

  function handleCaseClick(index) {
    if (!gameHasStarted || gameHasEnded || opponentTurn) {
      return;
    }

    if (gameBoard[index] === ".") {
      let newBoard = [...gameBoard];
      newBoard[index] = playerColor;
      setGameBoard(newBoard);
      let newHistoryBoard = [...movesHistory.historyBoard];
      newHistoryBoard.push(newBoard);
      setMovesHistory({
        historyBoard: newHistoryBoard,
        historyIndex: movesHistory.historyIndex + 1,
      });
      setLastPlayedIndex((lastPlayedIndex) => [lastPlayedIndex[0] + 1, index]);
      let checkGameWin = checkWin(gameBoard, playerColor, index);
      if (checkGameWin[0]) {
        setGameHasEnded(true);
        setGameWinner(playerColor);
        setWinCases(checkGameWin[1]);
      } else {
        setOpponentTurn(true);
      }
    }
    return;
  }

  function handleCaseHoover(index) {
    setLastHooveredIndex(index);
  }

  function handleCaseHooverExit(index) {
    setLastHooveredIndex(-1);
  }

  function isLeftBorder(index) {
    return index % gameSize === 0;
  }

  function isRightBorder(index) {
    return index % gameSize === gameSize - 1;
  }

  function neighborsCardinal(gamingBoard, color, index) {
    let vertical = [];
    let horizontal = [];
    let leftDiagonal = [];
    let rightDiagonal = [];

    let [i, j, k, l, m, n, o, p] = [1, 1, 1, 1, 1, 1, 1, 1];

    while (gamingBoard[index + i] === color && !isRightBorder(index)) {
      horizontal.push(index + i);
      if (isRightBorder(index + i)) {
        break;
      } else {
        i++;
      }
    }
    while (gamingBoard[index - j] === color && !isLeftBorder(index)) {
      horizontal.push(index - j);
      if (isLeftBorder(index - j)) {
        break;
      } else {
        j++;
      }
    }
    while (gamingBoard[index + k * gameSize] === color) {
      vertical.push(index + k * gameSize);
      k++;
    }
    while (gamingBoard[index - l * gameSize] === color) {
      vertical.push(index - l * gameSize);
      l++;
    }
    while (
      gamingBoard[index + m * (gameSize + 1)] === color &&
      !isRightBorder(index)
    ) {
      rightDiagonal.push(index + m * (gameSize + 1));
      if (isRightBorder(index + m * (gameSize + 1))) {
        break;
      } else {
        m++;
      }
    }
    while (
      gamingBoard[index - n * (gameSize + 1)] === color &&
      !isLeftBorder(index)
    ) {
      rightDiagonal.push(index - n * (gameSize + 1));
      if (isLeftBorder(index - n * (gameSize + 1))) {
        break;
      } else {
        n++;
      }
    }
    while (
      gamingBoard[index + o * (gameSize - 1)] === color &&
      !isLeftBorder(index)
    ) {
      leftDiagonal.push(index + o * (gameSize - 1));
      if (isLeftBorder(index + o * (gameSize - 1))) {
        break;
      } else {
        o++;
      }
    }
    while (
      gamingBoard[index - p * (gameSize - 1)] === color &&
      !isRightBorder(index)
    ) {
      leftDiagonal.push(index - p * (gameSize - 1));
      if (isRightBorder(index - p * (gameSize - 1))) {
        break;
      } else {
        p++;
      }
    }
    return {
      horizontal: horizontal,
      vertical: vertical,
      rightDiagonal: rightDiagonal,
      leftDiagonal: leftDiagonal,
    };
  }

  function checkDraw() {
    return lastPlayedIndex[0] === gameSize * gameSize;
  }

  function checkWin(gamingBoard, color, index) {
    let neighbors = neighborsCardinal(gamingBoard, color, index);
    let winCases = [];
    let winIndex = false;

    if (neighbors.horizontal.length > 3) {
      winCases.push(...neighbors.horizontal, index);
      winIndex = true;
    }
    if (neighbors.vertical.length > 3) {
      winCases.push(...neighbors.vertical, index);
      winIndex = true;
    }
    if (neighbors.rightDiagonal.length > 3) {
      winCases.push(...neighbors.rightDiagonal, index);
      winIndex = true;
    }
    if (neighbors.leftDiagonal.length > 3) {
      winCases.push(...neighbors.leftDiagonal, index);
      winIndex = true;
    }
    return [winIndex, winCases];
  }

  return (
    <motion.div
      className="BoardTable"
      animate={
        gameHasEnded
          ? {
              scale: [1, 1.1, 1.1, 1, 1],
              rotate: [0, 0, 360, 360, 0],
            }
          : {}
      }
      transition={
        gameHasEnded
          ? {
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }
          : {}
      }
    >
      {BoardLines}
    </motion.div>
  );
}
