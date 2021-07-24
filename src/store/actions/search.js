import { UPDATE_CURRENT_SEARCH, CLEAR_CURRENT_SEARCH, UPDATE_RECENT_SEARCHES} from './types';

export const updateCurrentSearch = searchTerm => {
  return {
    type: UPDATE_CURRENT_SEARCH,
    payload: searchTerm
  }
}

export const clearCurrentSearch = () => {
	return {
		type : CLEAR_CURRENT_SEARCH
	}
}
export const updateRecentSearches = searchedTerm => {
	return {
		type : UPDATE_RECENT_SEARCHES,
		payload : searchedTerm
	}
}