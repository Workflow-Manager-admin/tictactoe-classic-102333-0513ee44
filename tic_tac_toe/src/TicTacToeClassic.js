import React, { useState } from "react";

/**
 * PRIMARY COLORS from requirements:
 *   primary:   #ffffff (white, for main background and grid)
 *   secondary: #222222 (dark, for X, O, and text)
 *   accent:    #4caf50 (accent, for winning cells / highlight)
 * THEME: Light, minimal, clean.
 */

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  // Board is 9 cells: '' | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(""));
  // true: X's turn, false: O's turn
  const [isXNext, setIsXNext] = useState(true);
  // null: running, 'X'|'O': winner, 'draw': draw
  const [status, setStatus] = useState(null);
  // If win, store winning line for highlight
  const [winningLine, setWinningLine] = useState([]);

  // All possible win lines (indexes)
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for winner/draw on every board change
  React.useEffect(() => {
    const winnerInfo = calculateWinner(board);
    if (winnerInfo) {
      setStatus(winnerInfo.winner);
      setWinningLine(winnerInfo.line);
    } else if (board.every((cell) => cell !== "")) {
      setStatus("draw");
    } else {
      setStatus(null);
      setWinningLine([]);
    }
  }, [board]);

  // Returns {winner: 'X'|'O', line: [i,i,i]} if win, else null
  function calculateWinner(squares) {
    for (let line of winLines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    // If finished or cell taken, do nothing
    if (status || board[idx]) return;
    const newBoard = board.slice();
    newBoard[idx] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext((val) => !val);
    // status updates via effect
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setStatus(null);
    setWinningLine([]);
  }

  // UI helpers
  function renderCell(idx) {
    const isWin = winningLine.includes(idx);
    return (
      <button
        key={idx}
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        style={{
          color: board[idx]
            ? board[idx] === "X"
              ? "#222222"
              : "#4caf50"
            : "#bbbbbb",
          background: isWin ? "#e8ffe8" : "#ffffff",
          borderColor: isWin ? "#4caf50" : "#dddddd",
          fontWeight: isWin ? 900 : 600,
          cursor: board[idx] || status ? "default" : "pointer",
        }}
        aria-label={`cell ${idx} ${board[idx] || ""}`}
        tabIndex={0}
      >
        {board[idx]}
      </button>
    );
  }

  // Status label content
  let statusLabel =
    status === "draw"
      ? "Game ended in a draw!"
      : status === "X" || status === "O"
      ? `Winner: ${status}`
      : `Current turn: ${isXNext ? "X" : "O"}`;

  // Style constants
  const outerStyle = {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
  };
  const cardStyle = {
    margin: "auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 16px 0 #e0e0e0",
    padding: "32px 24px",
    minWidth: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily:
      "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  };
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 72px)",
    gridTemplateRows: "repeat(3, 72px)",
    gap: "8px",
    margin: "24px auto 12px",
    background: "#f6f6f6",
    borderRadius: 12,
    border: "1.5px solid #eeeeee"
  };
  const statusStyle = {
    fontSize: 18,
    fontWeight: 600,
    margin: "12px 0 8px",
    color: status === "X"
      ? "#222222"
      : status === "O"
      ? "#4caf50"
      : "#333333",
    letterSpacing: 0.3
  };
  const resetBtnStyle = {
    marginTop: 10,
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "8px 22px",
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  };

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>
        <h2
          style={{
            marginTop: 0,
            marginBottom: 8,
            color: "#222222",
            fontWeight: 700,
            letterSpacing: "1.0",
            fontSize: "2rem"
          }}
        >
          TicTacToe Classic
        </h2>
        {/* Turn + status display */}
        <div style={statusStyle}>{statusLabel}</div>
        {/* Board grid */}
        <div style={boardStyle}>
          {[...Array(9)].map((_, idx) => renderCell(idx))}
        </div>
        {/* Reset button */}
        <button style={resetBtnStyle} onClick={handleReset}>
          Reset Game
        </button>
        {/* Minimal signature */}
        <div
          style={{
            fontSize: 12,
            color: "#bbb",
            marginTop: 18,
            letterSpacing: 0.5,
          }}
        >
          <span style={{ color: "#4caf50" }}>XO</span> Built with React.
        </div>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
