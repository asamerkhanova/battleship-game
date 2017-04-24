import React from 'react';
import PropTypes from 'prop-types';
import Ship from './Ship';

class ShipBoard extends React.Component {
	render() {
		return (
      <ul className="ship-board">
        {
            Object
              .keys(this.props.shipTypes)
              .map((shipName) => {
                  return <Ship 
                      key={shipName}
                      shipName={shipName}
                      size={this.props.shipTypes[shipName].size}
                      hit={this.props.shipHit[shipName]}
                    />
                }
              )
        }
      </ul>
		)
	}
}

ShipBoard.propTypes = {
  shipTypes: PropTypes.object.isRequired,
  shipHit: PropTypes.object.isRequired
}

export default ShipBoard;