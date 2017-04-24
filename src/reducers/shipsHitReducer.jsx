import { CREATE_SHIPS_HITS, INCREMENT_SHIP_HIT } from '../actions';

export default function shipsHitReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_SHIPS_HITS:
            const localStorageShipHitRef = localStorage.getItem(action.store_key);
            shipHit = {};
            if (localStorageShipHitRef) {
                shipHit = JSON.parse(localStorageShipHitRef)
            } else {
                Object
                    .keys(action.shipTypes)
                    .forEach((shipName) => {
                        shipHit[shipName] = 0
                    });
            }
            return shipHit;

        case INCREMENT_SHIP_HIT:
            let shipHit = state;
            shipHit[action.ship] = shipHit[action.ship] ? shipHit[action.ship] + 1 : 1;
            return shipHit;

        default:
            return state;
    }
}
