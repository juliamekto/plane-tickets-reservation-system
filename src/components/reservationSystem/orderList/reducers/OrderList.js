const orderList = (state = {isOrdersDataLoading: true,fetchedOrders: [{ticketId:1,default:'test'}]}, action) => {
    switch (action.type) {
      case 'FETCH_USER_ORDERS':
        return  {
          ...state,
          fetchedOrders: action.fetchedOrders
        }
        case 'LOADING_ORDERS_DATA':
        return  {
          ...state,
          isOrdersDataLoading: action.isOrdersDataLoading
        }
      default:
        return state
    }
  }
  
  export default orderList;