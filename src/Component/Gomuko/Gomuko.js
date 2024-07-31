import "../../ComponentStyle/GomukoStyle/Gomuko.css";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GomukoGame() {
  const [gameBoard, setGameBoard] = useState(initialiseBoard(10, 10));
  const [gameHasEnded, setGameHasEnded] = useState(false);
  function handleGameStart() {
    let statefulBoard = { ...gameBoard };
    statefulBoard.gboard[0] = "x";
    setGameBoard(statefulBoard);
  }
  return (
    <header className="gomuko-wrapper">
      <h1 className="gameTitle">Gomuko Game : 5 Allined</h1>
      <h2>Choose a Color:</h2>
      <div className="playerChoice">
        <div className="playerOption">
          <input type="radio" id="playerChoice1" name="player" value="Black" />
          <label for="playerChoice1">Black</label>
        </div>
        <div className="playerOption">
          <input type="radio" id="playerChoice2" name="player" value="White" />
          <label for="playerChoice2">White</label>
        </div>
      </div>
      <motion.div className="startGame" onClick={handleGameStart}>
        Start
      </motion.div>
      {!gameHasEnded && (
        <GomukoTable
          gameBoard={gameBoard}
          setGameBoard={setGameBoard}
          setGameHasEnded={setGameHasEnded}
        />
      )}
      {gameHasEnded && <h1 className="gameTitle">Game Has Ended</h1>}
    </header>
  );
}

function initialiseBoard(lines, columns) {
  let BoardTable = [...Array(columns * lines).keys()];
  let Board = BoardTable.map((e) => ".");
  return { gboard: Board, lines: lines, columns: columns };
}

function GomukoTable({ gameBoard, setGameBoard, setGameHasEnded }) {
  let BoardTab = gameBoard.gboard;
  let BoardTabx = BoardTab.map((e, index) => (
    <div className="BoardCase" onClick={() => handleCaseClick(index)}>
      {e === "." ? null : e === "x" ? (
        <div className="BlackPion"></div>
      ) : (
        <div className="WhitePion"></div>
      )}
    </div>
  ));
  let BoardLines = [...Array(gameBoard.lines).keys()].map((e) => (
    <div className="BoardLine">
      {BoardTabx.slice(
        e * gameBoard.columns,
        e * gameBoard.columns + gameBoard.columns
      )}
    </div>
  ));

  function handleCaseClick(index) {
    let newBoard = [...gameBoard.gboard];
    newBoard[index] = "x";
    setGameBoard({ ...gameBoard, gboard: newBoard });
    if (checkWin(gameBoard.gboard)) {
      setGameHasEnded(true);
    }
  }

  function checkWin(board) {}

  return <div className="BoardTable">{BoardLines}</div>;
}
