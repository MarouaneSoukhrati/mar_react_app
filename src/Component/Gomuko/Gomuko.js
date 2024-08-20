import "../../ComponentStyle/GomukoStyle/Gomuko.css";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { validateSchema } from "webpack";

export default function GomukoGame() {
  const [gameSize, setGameSize] = useState(10);
  const [gameBoard, setGameBoard] = useState(initialiseBoard(gameSize));
  const [winCases, setWinCases] = useState([]);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState("x");
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [gameWinner, setGameWinner] = useState("None");
  const [lastPlayedIndex, setLastPlayedIndex] = useState([0, -1]);
  const [opponentTurn, setOpponentTurn] = useState(false);

  function handleGameStart() {
    setGameSize(10);
    setGameBoard(initialiseBoard(gameSize));
    setWinCases([]);
    setLastPlayedIndex([0, 0]);
    setGameHasEnded(false);
    setGameHasStarted(true);
  }

  function handleGameReplay() {
    setGameSize(10);
    setGameBoard(initialiseBoard(gameSize));
    setWinCases([]);
    setLastPlayedIndex([0, 0]);
    setGameHasEnded(false);
    setGameHasStarted(false);
  }

  function handlePlayerChoice(e) {
    setPlayerColor(e.target.value);
  }

  let gameOverExp =
    "Game Over - " +
    (gameWinner === "None"
      ? "It's a Draw"
      : gameWinner === "x"
      ? "The winner is Black"
      : "The winner is White");

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
              <label for="playerChoice1">Black</label>
            </div>
            <div className="playerOption">
              <input
                type="radio"
                id="playerChoice2"
                name="player"
                value="o"
                onClick={handlePlayerChoice}
              />
              <label for="playerChoice2">White</label>
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
        <h2>Your color is : {playerColor === "x" ? "Black" : "White"}</h2>
      )}
      {gameHasEnded && (
        <>
          <h1 className="gameTitleWin">{gameOverExp}</h1>
          <motion.div
            className="restartGame"
            whileHover={{ opacity: 0.4 }}
            onClick={handleGameReplay}
          >
            Replay
          </motion.div>
        </>
      )}
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
      />
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
}) {
  useEffect(() => {
    if (opponentTurn) {
      if (checkDraw()) {
        setOpponentTurn(false);
        setGameHasEnded(true);
        setGameWinner("None");
        setWinCases([]);
      } else {
        let opponentColor = playerColor === "x" ? "o" : "x";
        let opponentMove = evaluation(gameBoard);
        while (gameBoard[opponentMove] !== ".") {
          opponentMove = evaluation(gameBoard);
        }
        let newBoard = [...gameBoard];
        newBoard[opponentMove] = opponentColor;
        setGameBoard(newBoard);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPlayedIndex]);

  let BoardTab = gameBoard.map((e, index) => (
    <motion.div
      className={winCases.includes(index) ? "winBoardCase" : "BoardCase"}
      whileHover={{ scale: 1.1, opacity: 0.3 }}
      onClick={() => handleCaseClick(index)}
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

  /*function miniMax(gamingBoard, depth, maximizingPlayer) {
    if (depth === 0 || checkDraw(gamingBoard)) {
      return evaluation(gamingBoard);
    }
    let value;
    if (maximizingPlayer) {
      value = -666;
      let childs = gamingBoard.map((e, index) => {
        if (gamingBoard[index] === ".") {
          let childBoard = [...gamingBoard];
          childBoard[index] = playerColor === "x" ? "o" : "x";
          return childBoard;
        }
      });
      childs.forEach((child) => {
        value = Math.max(value, miniMax(child, depth - 1, false));
      });
    } else {
      value = 666;
      let childs = gamingBoard.map((e, index) => {
        if (gamingBoard[index] === ".") {
          let childBoard = [...gamingBoard];
          childBoard[index] = playerColor === "x" ? "o" : "x";
          return childBoard;
        }
      });
      childs.forEach((child) => {
        value = Math.min(value, miniMax(child, depth - 1, true));
      });
    }
    return value;
  }*/

  function evaluation(gamingBoard) {
    let newGamingBoard = [...gamingBoard].map((e, index) =>
      e === "." ? index : "xx"
    );
    newGamingBoard.filter((e) => e !== "xx");
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
    return evalTab.reduce(
      (maxIndex, elem, i, evalTab) => (elem > evalTab[maxIndex] ? i : maxIndex),
      0
    );
  }

  function handleCaseClick(index) {
    if (!gameHasStarted || gameHasEnded || opponentTurn) {
      return;
    }

    if (gameBoard[index] === ".") {
      let newBoard = [...gameBoard];
      newBoard[index] = playerColor;
      setGameBoard(newBoard);
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

  function isBorder(index) {
    return index % gameSize === 0 || index % gameSize === gameSize - 1;
  }

  function neighborsCardinal(gamingBoard, color, index) {
    let vertical = [];
    let horizontal = [];
    let leftDiagonal = [];
    let rightDiagonal = [];

    let [i, j, k, l, m, n, o, p] = [1, 1, 1, 1, 1, 1, 1, 1];
    while (gamingBoard[index + i] === color) {
      if (isBorder(index + i)) {
        break;
      } else {
        horizontal.push(index + i);
        i++;
      }
    }
    while (gamingBoard[index - j] === color) {
      if (isBorder(index - j)) {
        break;
      } else {
        horizontal.push(index - j);
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
    while (gamingBoard[index + m * (gameSize + 1)] === color) {
      if (isBorder(index + m * (gameSize + 1))) {
        break;
      } else {
        rightDiagonal.push(index + m * (gameSize + 1));
        m++;
      }
    }
    while (gamingBoard[index - n * (gameSize + 1)] === color) {
      if (isBorder(index - n * (gameSize + 1))) {
        break;
      } else {
        rightDiagonal.push(index - n * (gameSize + 1));
        n++;
      }
    }
    while (gamingBoard[index + o * (gameSize - 1)] === color) {
      if (isBorder(index + o * (gameSize - 1))) {
        break;
      } else {
        leftDiagonal.push(index + o * (gameSize - 1));
        o++;
      }
    }
    while (gamingBoard[index - p * (gameSize - 1)] === color) {
      if (isBorder(index - p * (gameSize - 1))) {
        break;
      } else {
        leftDiagonal.push(index - p * (gameSize - 1));
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
    <>
      <div className="BoardTable">{BoardLines}</div>
      <div style={{ marginTop: "3vh" }}>
        Last played square:{" "}
        {lastPlayedIndex[1] === -1 ? "None" : lastPlayedIndex[1]}
      </div>
    </>
  );
}
