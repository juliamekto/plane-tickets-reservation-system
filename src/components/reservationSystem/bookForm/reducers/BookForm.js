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
        case 'CHECKING_TICKET_INFO':
        return  {
          ...state,
          isTicketInfoAvailable: action.isTicketInfoAvailable
        }
        case 'START_TIMER':
        return  {
          ...state,
          isTimerStarted: action.isTimerStarted
        }
        case 'END_TIMER':
        return  {
          ...state,
          isTimerOver: action.isTimerOver
        }
      default:
        return state
    }
  }
  
  export default bookForm;