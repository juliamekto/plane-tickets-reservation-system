const bookForm = (state = {chosenSeats:[], chosenSeatsNum: 0},action) => {
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
        case 'ADD_CHOSEN_SEATS':
        return  {
          ...state,
          chosenSeats: action.chosenSeats
        }
        case 'CHANGE_SEATS_AMOUNT':
        return  {
          ...state,
          chosenSeatsNum: action.chosenSeatsNum
        }
        case 'GET_PASSENGERS_NUM':
        return  {
          ...state,
          totalPassengersNum: action.totalPassengersNum
        }
        case 'GET_PASSENGERS_NUM_ERROR':
        return  {
          ...state,
          getPassengersNumError: action.getPassengersNumError
        }
      default:
        return state
    }
  }
  
  export default bookForm;