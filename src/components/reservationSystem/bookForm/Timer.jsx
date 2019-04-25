import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isTimerOver } from './actions/BookFormActions.js';

class Timer extends Component {
  state = {
    time: {},
    seconds: 5,
    isTimerOver: false
  }
  timer = 0;

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.bookForm.isTimerStarted !== prevProps.bookForm.isTimerStarted) {
      this.startTimer()
    }	   
  }

  secondsToTime(secs){
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
       minutes,
       seconds
    };

    return obj;
  }

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    if (seconds === 0) { 
      clearInterval(this.timer);
      this.props.endTimer(true);
    }
  }

  render() {
    const { minutes, seconds } = this.state.time;
       if ( minutes === 0 && seconds === 0) {
        return <div className='timer'>Time is up!</div>
       } else {
          return (
              <div className='timer'>
                <div className="timer__item">{minutes}</div>:
                <div className="timer__item">{seconds}</div>
            </div>
          );
       }
      }
    }

  const mapStateToProps = state => ({ bookForm: state.bookForm });

  const mapDistpatchToProps = dispatch => {
    return {
      endTimer: value => dispatch(isTimerOver( value ))
    }
  };
  
  export default connect(mapStateToProps, mapDistpatchToProps)(Timer);