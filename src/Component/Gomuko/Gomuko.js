import "../../ComponentStyle/GomukoStyle/Gomuko.css";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GomukoGame() {
  const [gameBoard, setGameBoard] = useState(initialiseBoard(10, 10, []));
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState("Black");
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [gameWinner, setGameWinner] = useState("None");

  function handleGameStart() {
    setGameHasStarted(true);
  }

  function handleGameReplay() {
    setGameBoard(initialiseBoard(10, 10, []));
    setGameHasEnded(false);
    setGameHasStarted(false);
  }

  function handlePlayerChoice(e) {
    setPlayerColor(e.target.value);
  }

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
                value="Black"
                onClick={handlePlayerChoice}
              />
              <label for="playerChoice1">Black</label>
            </div>
            <div className="playerOption">
              <input
                type="radio"
                id="playerChoice2"
                name="player"
                value="White"
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

      {gameHasStarted && <h2>Your color is : {playerColor}</h2>}
      {gameHasEnded && (
        <>
          <h1 className="gameTitleWin">
            The Game Has Ended - The Winner is {gameWinner}
          </h1>
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
        setGameBoard={setGameBoard}
        gameHasStarted={gameHasStarted}
        gameHasEnded={gameHasEnded}
        setGameHasEnded={setGameHasEnded}
        playerColor={playerColor}
        setGameWinner={setGameWinner}
      />
    </header>
  );
}

function initialiseBoard(lines, columns, winCases) {
  let BoardTable = [...Array(columns * lines).keys()];
  let Board = BoardTable.map((e) => ".");
  return { gboard: Board, lines: lines, columns: columns, winCases: winCases };
}

function GomukoTable({
  gameBoard,
  setGameBoard,
  gameHasStarted,
  gameHasEnded,
  setGameHasEnded,
  playerColor,
  setGameWinner,
}) {
  const [opponentTurn, setOpponentTurn] = useState(false);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(0);

  useEffect(() => {
    if (opponentTurn) {
      let opponentMove = lastPlayedIndex;
      let newBoard = [...gameBoard.gboard];
      let voisins = [
        newBoard[opponentMove + 1],
        newBoard[opponentMove - 1],
        newBoard[opponentMove + gameBoard.columns],
        newBoard[opponentMove - gameBoard.columns],
        newBoard[opponentMove + gameBoard.columns + 1],
        newBoard[opponentMove + gameBoard.columns - 1],
        newBoard[opponentMove - gameBoard.columns - 1],
        newBoard[opponentMove - gameBoard.columns + 1],
      ];
      while (newBoard[opponentMove] !== ".") {
        /*opponentMove = Math.floor(
          Math.random() * (gameBoard.columns * gameBoard.lines),
        );*/
        opponentMove = voisins[Math.floor(Math.random() * 8)];
      }
      newBoard[opponentMove] = playerColor === "Black" ? "o" : "x";
      setGameBoard({ ...gameBoard, gboard: newBoard });
      setOpponentTurn(false);
    }
  }, [gameBoard]);

  let BoardTab = gameBoard.gboard;
  let BoardTabx = BoardTab.map((e, index) => (
    <motion.div
      className={
        gameBoard.winCases.includes(index) ? "winBoardCase" : "BoardCase"
      }
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
  let BoardLines = [...Array(gameBoard.lines).keys()].map((e) => (
    <div className="BoardLine" key={e}>
      {BoardTabx.slice(e * gameBoard.columns, (e + 1) * gameBoard.columns)}
    </div>
  ));

  function handleCaseClick(index) {
    if (!gameHasStarted || gameHasEnded || opponentTurn) {
      return;
    }
    if (gameBoard.gboard[index] === ".") {
      let newBoard = [...gameBoard.gboard];
      newBoard[index] = playerColor === "Black" ? "x" : "o";
      setLastPlayedIndex(index);
      let checkGameWin = checkWin(gameBoard, playerColor, index);
      if (checkGameWin[0]) {
        setGameHasEnded(true);
        setGameWinner(playerColor);
        setGameBoard({
          ...gameBoard,
          gboard: newBoard,
          winCases: checkGameWin[1],
        });
      } else {
        setGameBoard({ ...gameBoard, gboard: newBoard });
        setOpponentTurn(true);
      }
    }
    return;
  }

  function neighborsCardinal(gamingBoard, color, index) {
    let vertical = [];
    let horizontal = [];
    let leftDiagonal = [];
    let rightDiagonal = [];
    let board = gamingBoard.gboard;
    let value = color === "Black" ? "x" : "o";

    let [i, j, k, l, m, n, o, p] = [1, 1, 1, 1, 1, 1, 1, 1];
    while (board[index + i] === value) {
      horizontal.push(index + i);
      i++;
    }
    while (board[index - j] === value) {
      horizontal.push(index - j);
      j++;
    }
    while (board[index + k * gameBoard.columns] === value) {
      vertical.push(index + k * gameBoard.columns);
      k++;
    }
    while (board[index - l * gameBoard.columns] === value) {
      vertical.push(index - l * gameBoard.columns);
      l++;
    }
    while (board[index + m * (gameBoard.columns + 1)] === value) {
      rightDiagonal.push(index + m * (gameBoard.columns + 1));
      m++;
    }
    while (board[index - n * (gameBoard.columns + 1)] === value) {
      rightDiagonal.push(index - n * (gameBoard.columns + 1));
      n++;
    }
    while (board[index + o * (gameBoard.columns - 1)] === value) {
      leftDiagonal.push(index + o * (gameBoard.columns - 1));
      o++;
    }
    while (board[index - p * (gameBoard.columns - 1)] === value) {
      leftDiagonal.push(index - p * (gameBoard.columns - 1));
      p++;
    }
    return {
      horizontal: horizontal,
      vertical: vertical,
      rightDiagonal: rightDiagonal,
      leftDiagonal: leftDiagonal,
    };
  }

  function checkDraw(gamingBoard) {
    let board = [...gamingBoard.gboard];
    return board.every((element) => element !== ".");
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

  return <div className="BoardTable">{BoardLines}</div>;
}
