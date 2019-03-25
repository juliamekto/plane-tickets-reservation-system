import React, {Component} from 'react';
import classNames from 'classnames/bind';
import './Seat.css';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seatNum: props.item.num,
            seatRow: props.item.row,
            isSeatAvailable: props.item.available
        }
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