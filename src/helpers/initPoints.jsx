import config from '../config-mock.js';

export default function initPoints() {
    const localStoragePointsRef = localStorage.getItem('board-points');
    let points = {};
    if (localStoragePointsRef) {
        points = JSON.parse(localStoragePointsRef);
    } else {
        for (var i = 0; i < config.boardSize; i++) {
            for (var k = 0; k < config.boardSize; k++) {
                points[getPointKey([i, k])] = {
                    enabled: true,
                    hit: false,
                    coords: [i, k]
                }
            }
        }
    };
    return points;
}

function getPointKey(coords) {
    return `key${coords.join('')}`;
}