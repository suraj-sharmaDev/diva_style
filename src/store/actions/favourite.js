import { RETRIEVE_FAVOURITE, ADD_FAVOURITE, DELETE_FAVOURITE } from './types';

export const retrieveFavourite = data => {
  return {
    type: RETRIEVE_FAVOURITE,
    payload: data
  }  
}

export const addFavourite = data => {
    return {
      type: ADD_FAVOURITE,
      payload: data
    }  
}

export const deleteFavourite = data => {
    return {
      type: DELETE_FAVOURITE,
      payload: data
    }  
}
