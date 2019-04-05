const authForm = (state = [], action) => {
    switch (action.type) {
      case 'ADD_LOG_DATA':
        return [
          ...state,
          {
            email: action.id,
            password: action.text,
          }
        ]
      default:
        return state
    }
  }
  
  export default authForm