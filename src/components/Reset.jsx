import React from 'react';

class Reset extends React.Component {
  render() {
    return (
      <div className="reset-game" onClick={() => this.resetGame()}>
        <label>Reset game</label>
      </div>
    );
  }

  resetGame() {
    localStorage.removeItem(`board-points`);
    localStorage.removeItem(`board-shiphit`);
    window.location.reload();
  }
}

export default Reset;