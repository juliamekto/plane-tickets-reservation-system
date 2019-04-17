import React, {Component} from 'react';
import classNames from 'classnames/bind';
import './Seat.css';

class Seat extends Component {
    state = {
        seatNum: this.props.item.num,
        seatRow: this.props.item.row,
        id: this.props.item.id,
        isSeatAvailable: this.props.item.available
    }
  
    render() {
        const seatClass = classNames('seat',{
            'seat--available': this.state.isSeatAvailable 
        }); 

        return (
            <div className={seatClass} 
                 id={this.state.id}
                 data-row={this.state.seatRow}
                 data-num={this.state.seatNum}>
                {this.state.seatNum}
            </div>
        )
    }
}

export default Seat;