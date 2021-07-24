import { ADD_TO_CACHE_FROM_SEARCH, ADD_TO_CACHE_FROM_API } from './types';

export const addToCacheFromSearch = data => {
  return {
    type: ADD_TO_CACHE_FROM_SEARCH,
    payload: data
  }  
}

export const addToCacheFromApi = data => {
  return {
    type: ADD_TO_CACHE_FROM_API,
    payload: data
  }  
}