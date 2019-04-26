export const showModal = () => ({
  type: 'SHOW_MODAL',
  isModalShown: true
});

export const hideModal = () => ({
  type: 'HIDE_MODAL',
  isModalShown: false
});

export const isRoundTicketChosen = value => ({
  type: 'ROUND_TICKET_CHOSEN',
  isRoundTicketChosen: value
});

export const isOneWayTicketChosen = value => ({
  type: 'ONEWAY_TICKET_CHOSEN',
  isOneWayTicketChosen: value
});

export const isTicketInfoAvailable = value => ({
  type: 'CHECKING_TICKET_INFO',
  isTicketInfoAvailable: value
});

export const isTimerStarted = value => ({
  type: 'START_TIMER',
  isTimerStarted: value
});

export const isTimerOver = value => ({
  type: 'END_TIMER',
  isTimerOver: value
});

export const addChosenSeats = value => ({
  type: 'ADD_CHOSEN_SEATS',
  chosenSeats: value
});

export const changeChosenSeatNumber = value => ({
  type: 'CHANGE_SEATS_AMOUNT',
  chosenSeatsNum: value
});

export const getPassengersNum = value => ({
  type: 'GET_PASSENGERS_NUM',
  totalPassengersNum: value
});

export const getPassengersNumError = value => ({
  type: 'GET_PASSENGERS_NUM_ERROR',
  getPassengersNumError: value
});