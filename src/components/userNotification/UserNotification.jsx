import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button.jsx';
import './UserNotification.css'

const UserNotification = ({ mainText, btnCaption, btnAction }) => {
   return (
    <div className="notification">
    <span className="notification__text">{mainText}</span>
    <Button className="button button--notification-link" caption={btnCaption} action={btnAction}/>
    </div>
   )
}

UserNotification.propTypes  = {
    mainText: PropTypes.string.isRequired,
    btnCaption: PropTypes.string
  }
  
  UserNotification.defaultProps  = {
    mainText:'Something goes wrong...'
  }

export default UserNotification;