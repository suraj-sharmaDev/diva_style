import { RETRIEVE_FAVOURITE, ADD_FAVOURITE, DELETE_FAVOURITE } from '../actions/types';

const initalState = {
    favourites: []
}

const retrieveFavourite = (state, data) => {
    newState = {...state};
    data.map(d=>{
        newState.favourites.push(d.shopId);
    })
	return newState;
}

const addFavourite = (state, shopId) => {
    let newState = { ...state};
    newState.favourites.push(shopId);
    return newState;
}

const deleteFavourite = (state, shopId) => {
    let newState = {...state};
    const index = newState.favourites.indexOf(shopId);
    newState.favourites.splice(index, 1);
    return newState;
}

const favouriteReducer = (state=initalState, action) => {
	switch(action.type) {
		case RETRIEVE_FAVOURITE :
			return retrieveFavourite(state, action.payload);
		case ADD_FAVOURITE : 
			return addFavourite(state, action.payload);		
        case DELETE_FAVOURITE :
            return deleteFavourite(state, action.payload);
		default :
			return state;
	}
}

export default favouriteReducer;