const registrationForm = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD_REGISTRATION':
        return  {
          ...state,
          [action.name]: action.value
        }
      default:
        return state
    }
  }
  
  export default registrationForm