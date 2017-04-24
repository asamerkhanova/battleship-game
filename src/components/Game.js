import React from 'react';
import PropTypes from 'prop-types';
import ShipBoard from './ShipBoard';
import ScoreBoard from './ScoreBoard';
import Point from './Point';
import Reset from './Reset';
import Config from '../config-mock.js';

class Game extends React.Component {
	constructor() {
		super();

		this.processShot = this.processShot.bind(this);

		this.scoreMax = 0;
		Config.layout.map((ship) => this.scoreMax += ship.positions.length);

		// initial State
		this.state = {
			points: {},
			shipHit: {},
			enabledPointsCount: 0,
			score: 0
		}
	}

	getHitsScore(points) {
		let score = 0;
		Object.keys(points).map((pointkey) => (points[pointkey].hit ? score++ : 0));
		return score;
	}

	getEnabledPointsCount(points) {
		let hitCount = 0;
		Object.keys(points).map((pointkey) => (!points[pointkey].enabled ? hitCount++ : 0));
		return hitCount;
	}

	componentWillMount() {
		const localStoragePointsRef = localStorage.getItem(`board-points`);
		let points = {};
		let shipHit = {};

		if (localStoragePointsRef) {
			points = JSON.parse(localStoragePointsRef);
		} else {
			for (var i = 0; i < Config.boardSize; i++) {
				for (var k = 0; k < Config.boardSize; k++) {
					points[this.getPointKey([i, k])] = {
						enabled: true,
						hit: false,
						coords: [i, k]
					}
				}
			}
		}

		const localStorageShipHitRef = localStorage.getItem(`board-shiphit`);
		if (localStorageShipHitRef) {
			shipHit = JSON.parse(localStorageShipHitRef)
		} else {
			Object
				.keys(Config.shipTypes)
				.forEach((shipName) => {
					shipHit[shipName] = 0
				})
		}

		const score = this.getHitsScore(points);
		const enabledPointsCount = this.getEnabledPointsCount(points);

		this.setState({
			score,
			enabledPointsCount,
			points,
			shipHit
		});
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`board-points`, JSON.stringify(nextState.points))
		localStorage.setItem(`board-shiphit`, JSON.stringify(nextState.shipHit))
	}

	pointIsHit(coords) {
		let i = 0;
		for (const shipConfig of Config.layout) {
			for (i = 0; i < shipConfig.positions.length; i++) {
				if (shipConfig.positions[i][0] === coords[0] && shipConfig.positions[i][1] === coords[1]) {
					const shipHit = this.state.shipHit;
					shipHit[shipConfig.ship] = shipHit[shipConfig.ship] ? shipHit[shipConfig.ship] + 1 : 1;

					this.setState({ shipHit });
					return true;
				}
			}
		}
		return false
	}

	processShot(coords) {
		const points = { ...this.state.points };
		const point = {
			...points[this.getPointKey(coords)],
			enabled: false,
			hit: this.pointIsHit(coords)
		}

		points[this.getPointKey(coords)] = point;

		const score = this.getHitsScore(points);
		const enabledPointsCount = this.getEnabledPointsCount(points);

		this.setState({
			score,
			enabledPointsCount,
			points
		});
	}

	getPointKey = (coords) => `key${coords.join('')}`

	render() {
		return (
			<div className="game">
				<ul className="points-list">
					{
						Object
							.keys(this.state.points)
							.map((key, i) => {
								return <Point
									key={key}
									coords={this.state.points[key].coords}
									hit={this.state.points[key].hit}
									enabled={this.state.points[key].enabled}
									processShot={this.processShot}
								/>
							})
					}
				</ul>
				<div className="score-list">
					<ScoreBoard
						remainingHitPoints={this.scoreMax - this.state.score}
						scoreMax={this.scoreMax}
					/>
					<ShipBoard
						shipTypes={Config.shipTypes}
						shipHit={this.state.shipHit}
					/>
					<div className="reset-area">
						<Reset />
					</div>
				</div>

			</div>
		)
	}
}

Game.contextTypes = {
	router: PropTypes.object
};

export default Game;