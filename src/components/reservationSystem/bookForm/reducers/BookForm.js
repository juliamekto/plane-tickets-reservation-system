const bookForm = (state = {}, action) => {
    switch (action.type) {
      case 'SHOW_MODAL':
        return  {
          ...state,
          isModalShown: action.isModalShown
        }
        case 'HIDE_MODAL':
        return  {
          ...state,
          isModalShown: action.isModalShown
        }
        case 'ROUND_TICKET_CHOSEN':
        return  {
          ...state,
          isRoundTicketChosen: action.isRoundTicketChosen
        }
        case 'ONEWAY_TICKET_CHOSEN':
        return  {
          ...state,
          isOneWayTicketChosen: action.isOneWayTicketChosen
        }
      default:
        return state
    }
  }
  
  export default bookForm;