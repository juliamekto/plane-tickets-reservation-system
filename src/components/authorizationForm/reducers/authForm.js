const authForm = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD_AUTH':
        return  {
          ...state,
          [action.name]: action.value
        }
      default:
        return state
    }
  }
  
  export default authForm