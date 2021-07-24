//user based types
export const LOGIN = 'LOGIN';
export const SKIPLOGIN = 'SKIPLOGIN';
export const CREDENTIAL = 'CREDENTIAL';
export const VERIFY = 'VERIFY';
export const LOGOUT = 'LOGOUT';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

//search based types
export const UPDATE_CURRENT_SEARCH = 'UPDATE_CURRENT_SEARCH';
export const CLEAR_CURRENT_SEARCH = 'CLEAR_CURRENT_SEARCH';
export const UPDATE_RECENT_SEARCHES = 'UPDATE_RECENT_SEARCHES';

//shop based types
export const ADD_TO_CACHE_FROM_SEARCH = 'ADD_TO_CACHE_FROM_SEARCH';
export const ADD_TO_CACHE_FROM_API = 'ADD_TO_CACHE_FROM_API';

//cart based types
export const RETRIEVE_CART = 'RETRIEVE_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const INC_ITEM = 'INC_ITEM';
export const DEC_ITEM = 'DEC_ITEM';
export const DISCOUNT = 'DISCOUNT';
export const ADD_SERVICE = 'ADD_SERVICE';
export const REMOVE_SERVICE = 'REMOVE_SERVICE';
export const REMOVE_ALL_SERVICES = 'REMOVE_ALL_SERVICES';

//order based types
export const RETRIEVE_ORDER = 'RETRIEVE_ORDER';
export const RETRIEVE_QUOTE = 'RETRIEVE_QUOTE';
export const TRACK_START = 'TRACK_START';
export const STATUS_UPDATE = 'STATUS_UPDATE';
export const TRACK_END = 'TRACK_END';
export const UPDATE_TRACK_COORDINATE = 'UPDATE_TRACK_COORDINATE';

//address based types
export const RETRIEVE_ADDRESS = 'RETRIEVE_ADDRESS';
export const GUEST_ADDRESS = 'GUEST_ADDRESS';
export const SAVE_ADDRESS = 'SAVE_ADDRESS';
export const EDIT_ADDRESS = 'EDIT_ADDRESS'; 
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE';

//favourite based types
export const RETRIEVE_FAVOURITE = 'RETRIEVE_FAVOURITE';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';