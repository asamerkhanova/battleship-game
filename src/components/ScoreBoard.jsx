import React from 'react';
import PropTypes from 'prop-types';

class ScoreBoard extends React.Component {
	render() {
		return (
      <div className="score-board">
        <div className="player-score first-player">
          <div className="score">{this.props.remainingHitPoints === 0 ? 'Winner!': this.props.remainingHitPoints}</div>
          <div className="player-name"><span>player 1</span></div>
        </div>
        <div className="player-score second-player">
          <div className="score">{this.props.scoreMax}</div>
          <div className="player-name"><span>player 2</span></div>
        </div>
      </div>
		)
	}
}

ScoreBoard.propTypes = {
  remainingHitPoints: PropTypes.number.isRequired,
  scoreMax: PropTypes.number.isRequired
}

export default ScoreBoard;