import React from 'react';
import PropTypes from 'prop-types';

class Ship extends React.Component {
	render() {
    const shipPoints = [];
    const shipPointsStyle = (this.props.hit === this.props.size) ? 'ship-point_hit': '';
    for (var i = 0; i < this.props.size; i++) {
      shipPoints.push(
        <i key={i} className={`ship-point ${shipPointsStyle}`}/>
      )
    }

    return (
      <li className="ship">
        <div className={`ship-image ship-image_${this.props.shipName}`}></div>
        {shipPoints}
      </li>
		)
	}
}

Ship.propTypes = {
  shipName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  hit: PropTypes.number.isRequired
}

export default Ship;