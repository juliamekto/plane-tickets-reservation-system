import React from 'react';
import PropTypes from 'prop-types';

const SeatRow = ({ rowName, seatRow, action }) =>  (
    <div className="seats-row">
    <span className='row-name'>{rowName}</span>
    <div className="seats-wrapper"
         onClick={action}>{seatRow}</div>
    </div>
);

SeatRow.propTypes  = {
    rowName: PropTypes.string.isRequired,
    seatRow: PropTypes.array.isRequired,
    action: PropTypes.func
}

SeatRow.defaultProps  = {
    rowName: "row"
}

export default SeatRow;