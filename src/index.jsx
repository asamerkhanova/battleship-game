import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import pointsReducer from './reducers/pointsReducer';
import shipsHitReducer from './reducers/shipsHitReducer';
import Game from './components/Game';
import initPoints from './helpers/initPoints';
import initShipHit from './helpers/initShipHit';

let points = initPoints();
let shipHit = initShipHit();

// Initial state
const pointsState = { points: {}, score: 0 };
const shipsState = shipHit;

const pointsStore = createStore(pointsReducer, pointsState);
const shipsStore = createStore(shipsHitReducer, shipsState);

ReactDOM.render(<Game pointsStore={pointsStore} shipsStore={shipsStore} />, document.getElementById('main'));
