import React from 'react';
import PropTypes from 'prop-types';

const SeatRow = ({ rowName, seatRow }) =>  (
    <div className="seats-row">
        <span className='row-name'>{rowName}</span>
        <div className="seats-wrapper">{seatRow}</div>
    </div>
);

SeatRow.propTypes  = {
    rowName: PropTypes.string.isRequired,
    seatRow: PropTypes.array.isRequired
}

SeatRow.defaultProps  = {
    rowName: "row"
}

export default SeatRow;