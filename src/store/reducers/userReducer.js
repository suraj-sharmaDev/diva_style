import { LOGIN, SKIPLOGIN, CREDENTIAL, VERIFY, LOGOUT, SUBSCRIBE, UPDATE_CUSTOMER } from '../actions/types';

const initalState = {
	userId : null,
	userName : null,
	userMobile : null,
	fcmToken : null,
	apiKey : null,
	skipped: false,
	loggedIn : false,
	verified : false
}

// const initalState = {
// 	userId : 1,
// 	userName : 'Suraj Sharma',
// 	userMobile : 7907508735,
// 	fcmToken : null,
// 	apiKey : null,
//	skipped: false,
// 	loggedIn : true,
// 	verified : true
// }

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const updateCustomer = (state, data) => {
	newState = {...state};
	data.customerName!==null ? newState.userName = data.customerName : null;
	data.customerMobile!==null ? newState.userMobile = data.customerMobile : null;
	return newState;
}
const skipLogin = (state) => {
	let newState = {...state};
	newState.skipped = true;
	return newState;
}
const login = (state, data) => {
	newState = {...state};
	newState.userId = data.id;
	newState.userName = data.name;
	newState.userMobile = data.mobile;
	// newState.skipped = true;
	newState.loggedIn = true;
	return newState;
}
const credential = (state, name) => {
	newState = {...state};
	newState.userName = name;
	return newState;
} 
const verify = (state) => {
	newState = {...state};
	newState.verified = true;
	return newState;
} 
const logout = () => {
	newState = {	
		userId : null,
		userName : null,
		userMobile : null,
		fcmToken : null,
		apiKey : null,
		skipped: false,
		loggedIn : false,
		verified : false
	};
	return newState;
}
const userReducer = (state=initalState, action) => {
	switch(action.type) {
		case LOGIN :
			return login(state, action.payload);
		case SKIPLOGIN :
			return skipLogin(state);
		case CREDENTIAL : 
			return credential(state, action.payload);		
        case VERIFY :
            return verify(state);
        case LOGOUT :
            return logout();
        case SUBSCRIBE :
        	return subscribe(state, action.payload);
        case UPDATE_CUSTOMER :
        	return updateCustomer(state, action.payload);
		default :
			return state;
	}
}

export default userReducer;