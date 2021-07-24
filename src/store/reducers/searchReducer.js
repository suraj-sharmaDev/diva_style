import { UPDATE_CURRENT_SEARCH, CLEAR_CURRENT_SEARCH, UPDATE_RECENT_SEARCHES} from '../actions/types';

const initalState = {
    currentSearch : '',
    recentSearches : [
        {
            searchTerm : 'Fish',
        },
    ],
}

const updateCurrentSearch = (state, searchTerm) => {
	newState = {...state};
	newState.currentSearch = searchTerm;
	return newState;
}
const updateRecentSearches = (state, searchTerm) => {
    newState = {...state};
    newState.currentSearch = searchTerm;
    pushData = {searchTerm : searchTerm};
    index = newState.recentSearches.findIndex(obj => obj.searchTerm === searchTerm);
    if(index===-1){
        newState.recentSearches.push(pushData);
    }
    return newState;    
}
const clearCurrentSearch = (state) => {
    newState = {...state}
    newState.currentSearch = '';
    return newState;
}
const searchReducer = (state=initalState, action) => {
	switch(action.type) {
		case UPDATE_CURRENT_SEARCH :
			return updateCurrentSearch(state, action.payload);
        case CLEAR_CURRENT_SEARCH :
            return clearCurrentSearch(state);
		case UPDATE_RECENT_SEARCHES : 
			return updateRecentSearches(state, action.payload);
		default :
			return state;
	}
}

export default searchReducer;