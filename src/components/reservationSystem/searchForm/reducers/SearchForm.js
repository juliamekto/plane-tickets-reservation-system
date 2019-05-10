const searchForm = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD_SEARCH':
        return  {
          ...state,
          [action.name]: action.value
        }
      default:
        return state
    }
  }
  
  export default searchForm