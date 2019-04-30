import React, { Component } from 'react';
import Button from '../../Button.jsx';
import { connect } from 'react-redux';
import { showModal } from '../bookForm/actions/BookFormActions.js';
import PropTypes from 'prop-types';

class FlightInfo extends Component {
    state = {
        companyName: this.props.company,
        departTime: "05:40 AM",
        returnTime: "08:40 AM",
        id: this.props.item.id
    }

    showModal = () =>  this.props.showModal();

    render() {
        const { companyName, departTime, returnTime } = this.state;
        
        return (
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
                        action={this.showModal}/>
            </div>
        );
    }
}

FlightInfo.propTypes  = {
    companyName: PropTypes.string.isRequired,
    departTime: PropTypes.string.isRequired,
    returnTime: PropTypes.string.isRequired,
    action: PropTypes.func
}

FlightInfo.defaultProps  = {
    companyName: "test",
    departTime: "test",
    returnTime: "test"
}

const mapDistpatchToProps = dispatch => {
    return {
        showModal: () => dispatch(showModal())
    }
};  

export default connect(null, mapDistpatchToProps)(FlightInfo);