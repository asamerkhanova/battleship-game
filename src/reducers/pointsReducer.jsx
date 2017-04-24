import { CREATE_POINTS, UPDATE_POINT, CREATE_SHIPS_HITS, INCREMENT_SHIP_HIT, UPDATE_HITS_SCORE } from '../actions';

export default function pointsReducer(state = {}, action) {
    let points;
    let score;
    switch (action.type) {
        case CREATE_POINTS:
            points = pointReducer(state.points, action);
            score = 0;
            Object.keys(points).map((pointkey) => (points[pointkey].hit ? score++ : 0));
            return { points, score };

        case UPDATE_POINT:
            points = pointReducer(state.points, action);
            score = 0;
            Object.keys(points).map((pointkey) => (points[pointkey].hit ? score++ : 0));
            return { points, score };

        default:
            return state;
    }
}
function pointReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_POINTS:
            const localStoragePointsRef = localStorage.getItem(action.store_key);
            let points = {};
            if (localStoragePointsRef) {
                points = JSON.parse(localStoragePointsRef);
            } else {
                for (var i = 0; i < action.boardSize; i++) {
                    for (var k = 0; k < action.boardSize; k++) {
                        points[action.getPointKey([i, k])] = {
                            enabled: true,
                            hit: false,
                            coords: [i, k]
                        }
                    }
                }
            }
            return points;

        case UPDATE_POINT:
            points = { ...state };
            const point = {
                ...points[action.getPointKey(action.coords)],
                enabled: false,
                hit: action.pointIsHit
            }
            points[action.getPointKey(action.coords)] = point;
            return points;
        default:
            return state;
    }
}

