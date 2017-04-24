export const CREATE_POINTS = 'CREATE_POINTS';
export const UPDATE_POINT = 'UPDATE_POINT';
export const CREATE_SHIPS_HITS = 'CREATE_SHIPS_HITS';
export const INCREMENT_SHIP_HIT = 'INCREMENT_SHIP_HIT';

export function createPoints(store_key, boardSize, getPointKeyFunk) {
    return {
        type: CREATE_POINTS,
        store_key: store_key,
        boardSize: boardSize,
        getPointKey: getPointKeyFunk
    };
}

export function updatePoint(pointIsHit, coords, getPointKeyFunk) {
    return {
        type: UPDATE_POINT,
        coords: coords,
        pointIsHit: pointIsHit,
        getPointKey: getPointKeyFunk
    };
}

export function createShipsHits(store_key, shipTypes){
    return {
        type: CREATE_SHIPS_HITS,
        store_key: store_key,
        shipTypes: shipTypes
    }
}

export function incrementShipHit(ship) {
    return {
        type: INCREMENT_SHIP_HIT,
        ship: ship
    };
}
