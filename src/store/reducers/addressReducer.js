import { 
		RETRIEVE_ADDRESS, GUEST_ADDRESS, 
		SAVE_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, 
		SELECT_ADDRESS, SERVICE_UNAVAILABLE 
	} from '../actions/types';

// const initialState = {
// 	currentAddress: 0,
// 	savedAddresses: [
// 		{
// 			savedAs: 'Home',
// 			coordinate: {latitude: 10.0458737, longitude: 76.318553},
// 			houseDetail: 'House',
// 			landmark: 'Near benelli',
// 		},
// 		{
// 			savedAs: 'Work',
// 			coordinate: {latitude: 10.2458737, longitude: 76.418553},
// 			houseDetail: 'Lorem ipsum dolor sit amet',
// 			landmark: 'consectetur adipisicing elit. Perspiciatis earum',
// 		},
// 		{
// 			savedAs: 'Other',
// 			coordinate: {latitude: 10.4458737, longitude: 76.518553},
// 			houseDetail: 'Lorem ipsum dolor sit amet',
// 			landmark: 'consectetur adipisicing elit. Perspiciatis earum',
// 		},
// 	],
// };

const initialState = {
	currentAddress : 0,
	savedAddresses: [],
	guestAddress: null,
	serviceUnavailable : false
};

const onServiceUnavailable = (state, data) => {
	let newState = {...state};
	newState.serviceUnavailable = data;
	return newState;
}
const current_address = (data) => {
	const size = data.length - 1;
	let currentCoords = data[size].guestAddress;
	let distance = [];
	// last element is currentCoords which we took already
	for(var i=0; i < size; i++){
		let pAddress = data[i];
		let pCoords = {latitude: pAddress.latitude, longitude: pAddress.longitude};
		distance.push(haversine_distance(currentCoords, pCoords));
	}
	unSortedDistance = [...distance]; 
	return unSortedDistance.indexOf(distance.sort(function(a, b){return a-b})[0]);
	
	function haversine_distance(coords1, coords2){
		var dLat = toRad(coords2.latitude - coords1.latitude);
		var dLon = toRad(coords2.longitude - coords1.longitude);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(coords1.latitude)) *
				Math.cos(toRad(coords2.latitude)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}
    function toRad(x) {
        return x * Math.PI / 180;
    }
}

const onRetrieveAddress = (state, data) => {

	// selected address is always nearest location to current GPS
	let selectedAddress = data.coordinates!==null ? current_address(data) : 0;
	let newState = {
		currentAddress : selectedAddress!==-1 ? selectedAddress : 0, 
		savedAddresses : []
	};
	newState.serviceUnavailable = state.serviceUnavailable;

	const size = data.length - 1;	//since last address is current GPS

	// now setup home, work and other addresses
	for(var i=0; i < size; i++){
		let pAddress = data[i];
		let addr = {
			id: pAddress.id,
			savedAs: pAddress.label,
			coordinate: {latitude: pAddress.latitude, longitude: pAddress.longitude},
			houseDetail: pAddress.addressName,
			landmark: pAddress.landmark,
		};
		//push it into saved Addresses
		newState.savedAddresses.push(addr);
	}
	return newState;
}

const onGuestAddress = (state, data) => {
	let newState = {...state};
	newState.guestAddress = data.guestAddress;
	return newState;
}

const onSaveAddress = (state, data) => {
	let newState = {...state};
	if(newState.currentAddress===null) newState.currentAddress = 0; //When app initialized for first time
	newState.savedAddresses.push(data);
	return newState;
}
const onEditAddress = (state, data) => {
	let newState = {...state};
	let index = newState.savedAddresses.findIndex((addr)=>(addr.id===data.id));
	newState.savedAddresses[index] = data;
	return newState;
}
const onDeleteAddress = (state, index) => {
	let newState = {...state};
	newState.savedAddresses = newState.savedAddresses.filter((address, i)=>i!==index)
	return newState;	
}
const onSelectAddress = (state, index) => {
	let newState = {...state};
	newState.currentAddress = index;
	return newState;		
}
const addressReducer = (state = initialState, action) => {
  switch(action.type) {
  	case RETRIEVE_ADDRESS : 
		  return onRetrieveAddress(state, action.payload);
  	case GUEST_ADDRESS : 
  		return onGuestAddress(state, action.payload);		  
  	case SAVE_ADDRESS : 
  		return onSaveAddress(state, action.payload);
  	case EDIT_ADDRESS :
  		return onEditAddress(state, action.payload);
  	case DELETE_ADDRESS :
  		return onDeleteAddress(state, action.payload);
  	case SELECT_ADDRESS : 
  		return onSelectAddress(state, action.payload);
  	case SERVICE_UNAVAILABLE :
  		return onServiceUnavailable(state, action.payload);
    default:
      return state;
  }
}

export default addressReducer;