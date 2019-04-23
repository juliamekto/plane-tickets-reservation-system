export const fetchOrders = value => ({
  type: 'FETCH_USER_ORDERS',
  fetchedOrders: value
});

export const isOrdersDataLoading = bool => ({
  type: 'LOADING_ORDERS_DATA',
  isOrdersDataLoading: bool
});