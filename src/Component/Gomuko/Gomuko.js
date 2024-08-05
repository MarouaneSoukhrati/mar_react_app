import "../../ComponentStyle/GomukoStyle/Gomuko.css";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GomukoGame() {
  const [gameBoard, setGameBoard] = useState(initialiseBoard(10, 10));
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState("Black");
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [gameWinner, setGameWinner] = useState("None");

  function handleGameStart() {
    let statefulBoard = { ...gameBoard };
    setGameHasStarted(true);
    setGameBoard(statefulBoard);
  }

  function handleGameReplay() {
    setGameBoard(initialiseBoard(10, 10));
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

      {!gameHasEnded && (
        <GomukoTable
          gameBoard={gameBoard}
          setGameBoard={setGameBoard}
          gameHasStarted={gameHasStarted}
          playerColor={playerColor}
          gameHasEnded={gameHasEnded}
          setGameHasEnded={setGameHasEnded}
          setGameWinner={setGameWinner}
        />
      )}
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
    </header>
  );
}

function initialiseBoard(lines, columns) {
  let BoardTable = [...Array(columns * lines).keys()];
  let Board = BoardTable.map((e) => ".");
  return { gboard: Board, lines: lines, columns: columns };
}

function GomukoTable({
  gameBoard,
  setGameBoard,
  gameHasStarted,
  playerColor,
  gameHasEnded,
  setGameHasEnded,
  setGameWinner,
}) {
  const [opponentTurn, setOpponentTurn] = useState(false);
  let BoardTab = gameBoard.gboard;
  let BoardTabx = BoardTab.map((e, index) => (
    <motion.div
      className="BoardCase"
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

  function handleOpponentMove(gameBoard) {
    let randomCase = 33;
    while (gameBoard.gboard[randomCase] !== ".") {
      randomCase = Math.floor(
        Math.random() * (gameBoard.lines * gameBoard.columns - 1)
      );
    }
    let newBoard = [...gameBoard.gboard];
    let opponentColor = playerColor === "Black" ? "White" : "Black";
    newBoard[randomCase] = opponentColor === "Black" ? "x" : "o";
    setGameBoard({ ...gameBoard, gboard: newBoard });
    setOpponentTurn(false);
    let checkGameWin = checkWin(gameBoard, opponentColor, randomCase);
    if (checkGameWin) {
      setGameHasEnded(true);
      setGameWinner(opponentColor);
    }
  }

  function handleCaseClick(index) {
    if (!gameHasStarted || gameHasEnded || opponentTurn) {
      return;
    }
    if (gameBoard.gboard[index] === ".") {
      let newBoard = [...gameBoard.gboard];
      newBoard[index] = playerColor === "Black" ? "x" : "o";
      let newGameBoard = { ...gameBoard, gboard: newBoard };
      setGameBoard(newGameBoard);
      let checkGameWin = checkWin(gameBoard, playerColor, index);
      if (checkGameWin) {
        setGameHasEnded(true);
        setGameWinner(playerColor);
      } else {
        setOpponentTurn(true);
        handleOpponentMove(newGameBoard);
      }
    }
    return;
  }

  function checkWin(gameBoard, playerColor, index) {
    let vertical = 0;
    let horizontal = 0;
    let leftDiagonal = 0;
    let rightDiagonal = 0;
    let board = gameBoard.gboard;
    let value = playerColor === "Black" ? "x" : "o";

    let [i, j, k, l, m, n, o, p] = [1, 1, 1, 1, 1, 1, 1, 1];
    while (board[index + i] === value) {
      i++;
      horizontal++;
    }
    while (board[index - j] === value) {
      j++;
      horizontal++;
    }
    while (board[index + k * gameBoard.columns] === value) {
      k++;
      vertical++;
    }
    while (board[index - l * gameBoard.columns] === value) {
      l++;
      vertical++;
    }
    while (board[index + m * (gameBoard.columns + 1)] === value) {
      m++;
      rightDiagonal++;
    }
    while (board[index - n * (gameBoard.columns + 1)] === value) {
      n++;
      rightDiagonal++;
    }
    while (board[index + o * (gameBoard.columns - 1)] === value) {
      o++;
      leftDiagonal++;
    }
    while (board[index - p * (gameBoard.columns - 1)] === value) {
      p++;
      leftDiagonal++;
    }

    if (
      horizontal > 3 ||
      vertical > 3 ||
      leftDiagonal > 3 ||
      rightDiagonal > 3
    ) {
      return true;
    }
    return false;
  }

  return <div className="BoardTable">{BoardLines}</div>;
}
