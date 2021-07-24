import { LOGIN, SKIPLOGIN, VERIFY, CREDENTIAL, LOGOUT, SUBSCRIBE, UPDATE_CUSTOMER } from './types';

export const login = data => {
  return {
    type: LOGIN,
    payload: data
  }
}
export const skipLogin = () => {
  return {
    type: SKIPLOGIN
  }
}
export const credential = (data) => {
  return {
    type: CREDENTIAL,
    payload : data  
  }
}
export const verify = () => {
  return {
    type: VERIFY  
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const subscribe = (data) => {
	return {
		type : SUBSCRIBE,
		payload : data
	}
}

export const updateCustomer = (data) => {
  return {
    type : UPDATE_CUSTOMER,
    payload : data
  }
}