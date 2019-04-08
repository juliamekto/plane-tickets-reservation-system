const authForm = (state = {}, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return  [
          ...state,
          {
            email: action.email,
            password: action.password,
          }
        ]
      default:
        return state
    }
  }
  
  export default authForm