import {
  RETRIEVE_ORDER, RETRIEVE_QUOTE,
  TRACK_START, STATUS_UPDATE,
  TRACK_END, UPDATE_TRACK_COORDINATE
} from '../actions/types';
import { act } from 'react-test-renderer';

const initialState = {
  recentOrders: [],
  pendingOrders: [],
  pendingQuotes: [],
  orderUpdate: 0
};

const onRetrieveOrder = (state, data) => {
  let newState = { ...state };
  if (data.order != null) {
    newState.pendingOrders = data.order;
  }else{
    newState.pendingOrders = [];
  }
  if (data.recentOrder != null) {
    newState.recentOrders = data.recentOrder;
  }else{
    newState.recentOrders = [];
  }
  if (data.quote !== null){
    newState.pendingQuotes = data.quote;
  }else{
    newState.pendingQuotes = [];
  }
  return newState;
}

const onTrackStart = (state, data) => {
  let newState = { ...state };
  newState.pendingOrders.push(data[0]);
  return newState;  
}
const onStatusUpdate = (state, data) => {
  let newState = { ...state };
  newState.orderUpdate = newState.orderUpdate + 1;
  return newState;
}

const retrieveQuote = (state, data) => {
  let newState = {...state};
  newState.pendingQuotes = data;
  return newState;
}
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_ORDER:
      return onRetrieveOrder(state, action.payload);
    case TRACK_START:
      return onTrackStart(state, action.payload);
    case STATUS_UPDATE:
      return onStatusUpdate(state, action.payload);
    case RETRIEVE_QUOTE:
      return retrieveQuote(state, action.payload);
    default:
      return state;
  }
}

export default orderReducer;