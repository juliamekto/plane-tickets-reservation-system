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