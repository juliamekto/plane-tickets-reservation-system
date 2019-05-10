import React from 'react';
import Button from '../../Button.jsx';
import PropTypes from 'prop-types';

const FlightInfo = ({ companyName, departTime, returnTime, action }) =>  (
    <div className="flight-info">
        <span className="flight-info__airline">{companyName}</span>
        <div className="flight-info__time flight-info__time--oneway">
            <span className="flight-info__depart-time">{departTime}</span> -
            <span className="flight-info__return-time"> {returnTime}</span>
        </div>
        <div className="flight-info__time flight-info__time--round-ticket">
            <div>
                <span className="flight-info__depart-time">{departTime}</span> -
                <span className="flight-info__return-time"> {returnTime}</span>
            </div>
            <span className="flight-info__time-caption">flight back:</span>
            <div>
                <span className="flight-info__depart-time">{departTime}</span> -
                <span className="flight-info__return-time"> {returnTime}</span>
            </div>
        </div>
        <Button className="button--flight-info-btn button"
                caption='view'
                action={action}/>
    </div>
);

FlightInfo.propTypes  = {
    companyName: PropTypes.string.isRequired,
    departTime: PropTypes.string.isRequired,
    returnTime: PropTypes.string.isRequired,
    action: PropTypes.func
}

export default FlightInfo;