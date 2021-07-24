import { 
  RETRIEVE_ADDRESS, GUEST_ADDRESS, 
  SAVE_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, 
  SELECT_ADDRESS, SERVICE_UNAVAILABLE 
} from '../actions/types';

export const retrieveAddress = data => {
  return {
    type: RETRIEVE_ADDRESS,
    payload: data
  }
}

export const guestAddress = data => {
  return {
    type: GUEST_ADDRESS,
    payload: data
  }
}

export const saveAddress = data => {
  return {
    type: SAVE_ADDRESS,
    payload: data
  }
}

export const editAddress = data => {
  return {
    type: EDIT_ADDRESS,
    payload: data
  }
}

export const deleteAddress = index => {
  return {
    type: DELETE_ADDRESS,
    payload: index
  }
}

export const selectAddress = index => {
  return {
    type : SELECT_ADDRESS,
    payload : index
  }
}

export const serviceUnavailable = (data) => {
  return {
    type : SERVICE_UNAVAILABLE,
    payload : data
  }
}