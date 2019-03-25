import React from 'react';
import Button from '../../Button.jsx';
import PropTypes from 'prop-types';

const FlightInfo = ({ companyName, departTime, returnTime , action}) => {
    return (
        <div className="flights__info">
            <span className="flights__airline-name">{companyName}</span>
            <div className="flights__time">
                <span className="flights__depart-time">{departTime}</span> -
                <span className="flights__return-time"> {returnTime}</span>
            </div>
            <Button className="button--flights__btn button"
                    caption='view'
                    action={action}/>
        </div>
    );
}

FlightInfo.propTypes  = {
    companyName: PropTypes.string.isRequired,
    departTime: PropTypes.string.isRequired,
    returnTime: PropTypes.string.isRequired,
    action: PropTypes.func
}

export default FlightInfo;