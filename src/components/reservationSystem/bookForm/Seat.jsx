import React, {Component} from 'react';
import classNames from 'classnames/bind';
import './Seat.css';

class Seat extends Component {
    state = {
        seatNum: this.props.item.num,
        seatRow: this.props.item.row,
        isSeatChosen: false,
        chosenSeats: '',
        isSeatAvailable: this.props.item.available
    }
  
    handleSeatClick= (e) => {
        let { seatNum, seatRow } = this.state; 
        let chosen;
        if(!e.target.classList.contains('seat--available')) {
          this.setState({ isSeatChosen: false });
          return;
        } 
   
        chosen = seatNum + seatRow;
        e.target.classList.toggle('seat--booked');
        this.setState({ isSeatChosen: true, chosenSeats:chosen  });
      }

    render() {
        const seatClass = classNames('seat',{
            'seat--available': this.state.isSeatAvailable 
        }); 

        return (
            <div className={seatClass} onClick={this.handleSeatClick}>
                {this.state.seatNum}
            </div>
        )
    }
}

export default Seat;