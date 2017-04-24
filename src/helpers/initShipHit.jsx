import config from '../config-mock.js';

export default function initShipHit() {
    const localStorageShipHitRef = localStorage.getItem('board-shiphit');
    let shipHit = {};
    if (localStorageShipHitRef) {
        shipHit = JSON.parse(localStorageShipHitRef)
    } else {
        Object
            .keys(config.shipTypes)
            .forEach((shipName) => {
                shipHit[shipName] = 0
            });
    }
    return shipHit;
}