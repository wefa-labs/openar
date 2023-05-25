import { SetStateAction, useState } from "react";

export const Checkers2D: React.FC = () => {
  const [history, setHistory] = useState([Array(64).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  function jumpTo(nextMove: SetStateAction<number>) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> */}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
