import React from 'react';
import PropTypes from 'prop-types';

const FormInputDate = ({ name, action, customClassName, currentDate }) => {
     let date = new Date(),
         currentDay = (date.getDate() < 10 ? '0' : '') + date.getDate(),
         currentMonth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1),
         currentYear = date.getFullYear() + '';
      
      currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
     
      return (
          <input className={customClassName} 
                name={name} 
                type='date'
                min={currentDate}
                placeholder="mm/dd/yyyy"
                onChange={action}/>
      );
     
}
FormInputDate.propTypes  = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  action: PropTypes.func,
  customClassName: PropTypes.string,
  currentDate: PropTypes.string.isRequired
}

FormInputDate.defaultProps  = {
  name: 'text',
  placeholder: '',
  customClassName: 'default-input',
  currentDate: ''
}

export default FormInputDate;