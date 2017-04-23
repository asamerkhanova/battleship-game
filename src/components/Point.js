import React from 'react';
import PropTypes from 'prop-types';

class Point extends React.Component {
	render() {
    const {coords, enabled, hit} = this.props;
    const pointStyle = !enabled ? (hit ? ' board-point__hit' : ' board-point__miss') : '';
		return (
      <li className={`board-point${pointStyle}`}>
        <button disabled={!enabled} onClick={() => this.props.processShot(coords)}></button>
      </li>
		)
	}
}

Point.propTypes = {
  enabled: PropTypes.bool.isRequired,
  hit: PropTypes.bool.isRequired,
  coords: PropTypes.array.isRequired,
  processShot: PropTypes.func.isRequired
};

export default Point;