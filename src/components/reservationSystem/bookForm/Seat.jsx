import React, {Component} from 'react';
import classNames from 'classnames/bind';
import './Seat.css';

class Seat extends Component {
    state = {
        seatNum: this.props.item.num,
        seatRow: this.props.item.row,
        isSeatAvailable: this.props.item.available
    }

    render() {
        const seatClass = classNames('seat',{
            'seat--available': this.state.isSeatAvailable 
        }); 

        return (
            <div className={seatClass}>
                {this.state.seatNum}
            </div>
        )
    }
}

export default Seat;