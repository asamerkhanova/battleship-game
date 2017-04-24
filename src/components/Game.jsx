import React from 'react';
import PropTypes from 'prop-types';
import ShipBoard from './ShipBoard';
import ScoreBoard from './ScoreBoard';
import Point from './Point';
import Reset from './Reset';
import Config from '../config-mock.js';
import { createPoints, updatePoint, createShipsHits, updateHitsScore, incrementShipHit } from '../actions'

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.processShot = this.processShot.bind(this);

		this.scoreMax = 0;
		Config.layout.map((ship) => this.scoreMax += ship.positions.length);

		this.pointsStore = this.props.pointsStore;
		this.shipsStore = this.props.shipsStore;
	}

	componentDidMount() {
		this.unsubscribePoints = this.pointsStore.subscribe(() => { this.forceUpdate() });
		this.unsubscribeShips = this.shipsStore.subscribe(() => { this.forceUpdate() });
	}

	componentWillUnmount() {
		this.unsubscribePoints();
		this.unsubscribeShips();
	}

	getHitsScore(points) {
		let score = 0;
		Object.keys(points).map((pointkey) => (points[pointkey].hit ? score++ : 0));
		return score;
	}

	componentWillMount() {
		this.pointsStore.dispatch(createPoints('board-points', Config.boardSize, this.getPointKey));
		this.shipsStore.dispatch(createShipsHits('board-shiphit', Config.shipTypes));
	}

	componentWillUpdate(nextProps, nextState) {
		const pointsState = this.pointsStore.getState();
		const shipHit = this.shipsStore.getState();
		localStorage.setItem(`board-points`, JSON.stringify(pointsState.points))
		localStorage.setItem(`board-shiphit`, JSON.stringify(shipHit))
	}

	pointIsHit(coords) {
		let i = 0;
		for (const shipConfig of Config.layout) {
			for (i = 0; i < shipConfig.positions.length; i++) {
				if (shipConfig.positions[i][0] === coords[0] && shipConfig.positions[i][1] === coords[1]) {
 					this.shipsStore.dispatch(incrementShipHit(shipConfig.ship))
					return true;
				}
			}
		}
		return false
	}

	processShot(coords) {
		const pointIsHits = this.pointIsHit(coords);
		this.pointsStore.dispatch(updatePoint(pointIsHits, coords, this.getPointKey));
	}

	getPointKey(coords) {
		return `key${coords.join('')}`;
	}

	render() {
		const pointsState = this.pointsStore.getState();
		const shipHit = this.shipsStore.getState();
		let board;
		let scoreList;
		if (pointsState.points && shipHit) {
			board = <ul className="points-list">
				{
					Object
						.keys(pointsState.points)
						.map((key, i) => {
							return <Point
								key={key}
								coords={pointsState.points[key].coords}
								hit={pointsState.points[key].hit}
								enabled={pointsState.points[key].enabled}
								processShot={this.processShot}
							/>
						})
				}
			</ul>;

			scoreList = <div className="score-list">
				<ScoreBoard
					remainingHitPoints={this.scoreMax - pointsState.score}
					scoreMax={this.scoreMax}
				/>
				<ShipBoard
					shipTypes={Config.shipTypes}
					shipHit={shipHit}
				/>
				<div className="reset-area">
					<Reset />
				</div>
			</div>;
		}

		return (
			<div className="game">
				{board}
				{scoreList}
			</div>
		)
	}
}

Game.contextTypes = {
	pointsStore: PropTypes.object,
	shipsStore: PropTypes.object
};

export default Game;