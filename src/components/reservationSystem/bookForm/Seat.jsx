import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { isTimerStarted, addChosenSeats, changeChosenSeatNumber, getPassengersNumError } from './actions/BookFormActions.js';
import './Seat.css';

class Seat extends Component {
    state = {
        seatNum: this.props.item.num,
        seatRow: this.props.item.row,
        id: this.props.item.id,
        price: this.props.item.price,
        isSeatAvailable: this.props.item.available,
        isSeatBooked: false
    }

    componentDidUpdate = prevProps => {
        const { isTimerOver } = this.props.bookForm;
        if(isTimerOver !== prevProps.bookForm.isTimerOver) {
            this.setState ({ isSeatBooked: false, isSeatNotAvailable: false })
            this.props.changeChosenSeatNumber(0);
            this.props.addChosenSeats([]);
            this.props.getPassengersNumError('');
        }	
    }

    handleSeatClick = e => {
        const { chosenSeats, totalPassengersNum } =  this.props.bookForm;
        const chosenSeat = this.state.seatRow + this.state.seatNum;
        const { id, price} = this.state;
        const seatData = { chosenSeat, id, price }

        let { isSeatBooked } = this.state;
        let newChosenSeats = [...chosenSeats];
          
        if(e.target.classList.contains('seat--available')) {
            this.validateArray(newChosenSeats,seatData);
            this.setState ({isSeatBooked: !isSeatBooked })
            this.props.addChosenSeats(newChosenSeats)
            this.props.startTimer(true);
        }

        if(newChosenSeats.length > totalPassengersNum) {
            this.props.getPassengersNumError("you can't choose more seats than the number of travelers");
        } else {
            this.props.getPassengersNumError('');
        }
    }

    validateArray = (arr,item) => {
        item = JSON.stringify(item)
        
        if (arr.indexOf(item) === -1) {
            arr.push(item); 
            this.increment();
        } else {
            let deletedSeatIndex = arr.indexOf(item);
            if (deletedSeatIndex >= 0) { 
                arr.splice(deletedSeatIndex, 1);
            }
            this.decrement();
        }
    }

    increment = () =>  {
        let { chosenSeatsNum } = this.props.bookForm;
        this.props.changeChosenSeatNumber(chosenSeatsNum + 1);
    }

    decrement = () => {
        let { chosenSeatsNum } = this.props.bookForm;
        this.props.changeChosenSeatNumber(chosenSeatsNum - 1);
    }

    render() {
        const seatClass = classNames('seat',{
            'seat--available': this.state.isSeatAvailable,
            'seat--booked': this.state.isSeatBooked 
        }); 

        return (
            <div className={seatClass} 
                 id={this.state.id}
                 data-row={this.state.seatRow}
                 data-num={this.state.seatNum}
                 onClick={this.handleSeatClick}>
                {this.state.seatNum}
            </div>
        )
    }
}

const mapStateToProps = state => ({ bookForm: state.bookForm });

const mapDistpatchToProps = dispatch => {
    return {
        startTimer: value => dispatch(isTimerStarted( value )),
        addChosenSeats: value => dispatch(addChosenSeats( value )),
        changeChosenSeatNumber: value => dispatch(changeChosenSeatNumber( value )),
        getPassengersNumError: value => dispatch(getPassengersNumError( value ))
    }
  };  

export default connect(mapStateToProps, mapDistpatchToProps)(Seat);