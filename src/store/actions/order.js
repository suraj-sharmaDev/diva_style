import {
  RETRIEVE_ORDER, RETRIEVE_QUOTE,
  TRACK_START, STATUS_UPDATE,
  TRACK_END, UPDATE_TRACK_COORDINATE
} from './types';

export const retrieveOrder = (data) => {
  return {
    type: RETRIEVE_ORDER,
    payload: data
  }
}
export const retrieveQuote = (data) => {
  return {
    type: RETRIEVE_QUOTE,
    payload: data
  }
}
export const trackStart = (data) => {
  //for delivery tracking
  return {
    type: TRACK_START,
    payload: data
  }
}
export const statusUpdate = (data) => {
  return {
    type: STATUS_UPDATE,
    payload: data
  }
}
export const trackEnd = () => {
  return {
    type: TRACK_END
  }
}

export const updateTrackCoordinate = (data) => {
  return {
    type: UPDATE_TRACK_COORDINATE,
    payload: data
  }
}