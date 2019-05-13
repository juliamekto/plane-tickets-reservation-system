import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import Button from './Button.jsx';

const PeopleCounter = ({ value, increment, decrement }) => (
      <div className="people-counter">
        <Button caption='-' className="button button--people-counter"
                action={decrement} />
        <input value={value} 
               readOnly 
               className='default-input default-input--people-counter'/>
        <Button caption='+' className="button button--people-counter"
                action={increment} />
      </div>
)

PeopleCounter.propTypes  = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}

PeopleCounter.defaultProps  = {
  value: 0
}

const mapStateToProps = state => ({ searchForm: state.searchForm });

export default connect(mapStateToProps, null)(PeopleCounter); 