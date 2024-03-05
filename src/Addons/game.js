import { useState } from "react";
import "./game.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] !== ".") {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        {squares.slice(0, 3).map((element, index) => (
          <Square
            value={element}
            onSquareClick={() => handleClick(index)}
          ></Square>
        ))}
      </div>
      <div>
        {squares.slice(3, 6).map((element, index) => (
          <Square
            value={element}
            onSquareClick={() => handleClick(3 + index)}
          ></Square>
        ))}
      </div>
      <div>
        {squares.slice(6, 9).map((element, index) => (
          <Square
            value={element}
            onSquareClick={() => handleClick(6 + index)}
          ></Square>
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(".")]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMove = nextHistory.length - 1;
    setHistory(nextHistory);
    setCurrentMove(nextMove);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <div className="list-board" onClick={() => jumpTo(move)}>
          {description}
        </div>
      </li>
    );
  });

  return (
    <div className="game">
      <header className="game-header">
        <div className="info-display">
          <StatusShow
            className="next-displayer"
            xIsNext={xIsNext}
            squares={currentSquares}
          />
          <div className="moves-list">
            <ul>{moves}</ul>
          </div>
        </div>
        <div>
          <Board
            {...{
              xIsNext: xIsNext,
              squares: currentSquares,
              onPlay: handlePlay,
            }}
          />
        </div>
      </header>
    </div>
  );
}

function StatusShow({ xIsNext, squares, className }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "The Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return <div className={className}>{status}</div>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== "." &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
