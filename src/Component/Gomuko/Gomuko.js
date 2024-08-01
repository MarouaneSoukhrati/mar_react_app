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

  function computerMove() {}

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

  function handleCaseClick(index) {
    if (!gameHasStarted || gameHasEnded) {
      return;
    }
    if (gameBoard.gboard[index] === ".") {
      let newBoard = [...gameBoard.gboard];
      newBoard[index] = playerColor === "Black" ? "x" : "o";
      setGameBoard({ ...gameBoard, gboard: newBoard });
    }
    let checkGameWin = checkWin(gameBoard, playerColor, index);
    if (checkGameWin[0]) {
      setGameHasEnded(true);
      setGameWinner(checkGameWin[1]);
    }
  }

  function checkWin(gameBoard, playerColor, index) {
    let vertical = 0;
    let horizontal = 0;
    let leftDiagonal = 0;
    let rightDiagonal = 0;
    let checkBlackWin = false;
    let checkWhiteWin = false;
    let checkWin = checkBlackWin || checkWhiteWin;
    let board = gameBoard.gboard;
    let value = playerColor === "Black" ? "x" : "o";

    for (let i = 0; i < 5; i++) {
      if (board[index + i] === value) {
        horizontal++;
      }
      if (board[index - i] === value) {
        horizontal++;
      }
      if (board[index + i * gameBoard.columns] === value) {
        vertical++;
      }
      if (board[index - i * gameBoard.columns] === value) {
        vertical++;
      }
      if (board[index + i * (gameBoard.columns + 1)] === value) {
        rightDiagonal++;
      }
      if (board[index - i * (gameBoard.columns + 1)] === value) {
        rightDiagonal++;
      }
      if (board[index + i * (gameBoard.columns - 1)] === value) {
        leftDiagonal++;
      }
      if (board[index - i * (gameBoard.columns - 1)] === value) {
        leftDiagonal++;
      }
    }

    if (
      horizontal > 3 ||
      vertical > 3 ||
      leftDiagonal > 3 ||
      rightDiagonal > 3
    ) {
      if (value === "x") {
        checkBlackWin = true;
      } else {
        checkWhiteWin = true;
      }
    }

    return [
      checkBlackWin || checkWhiteWin,
      checkBlackWin ? "Black" : checkWhiteWin ? "White" : "None",
    ];
  }

  return <div className="BoardTable">{BoardLines}</div>;
}
