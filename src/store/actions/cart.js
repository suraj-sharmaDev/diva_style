import { RETRIEVE_CART, EMPTY_CART, 
  INC_ITEM, DEC_ITEM, DISCOUNT, 
  ADD_SERVICE, REMOVE_SERVICE, REMOVE_ALL_SERVICES
} from './types';

export const retrieveCart = data => {
  return {
    type: RETRIEVE_CART,
    payload: data
  }
}
export const emptyCart = data => {
  return {
    type: EMPTY_CART,
    payload: data
  }
}
export const incItem = data => {
  return {
    type: INC_ITEM,
    payload: data
  }
}

export const decItem = itemID => {
  return {
    type: DEC_ITEM,
    payload: itemID
  }
}
export const couponApplied = discountAmount => {
  return {
    type: DISCOUNT,
    payload: discountAmount
  }
}

export const addService = data => {
  return {
    type: ADD_SERVICE,
    payload: data
  }
}

export const removeService = data => {
  return {
    type: REMOVE_SERVICE,
    payload: data
  }
}

export const removeAllServices = () => {
  return {
    type: REMOVE_ALL_SERVICES
  }
}