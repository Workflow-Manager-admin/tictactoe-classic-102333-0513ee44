import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1} style={{visibility:"hidden",pointerEvents:"none"}} aria-hidden="true">Template Button</button>
          </div>
        </div>
      </nav>
      <main>
        {/* Centered main container for TicTacToe */}
        <TicTacToeClassic />
      </main>
    </div>
  );
}

export default App;