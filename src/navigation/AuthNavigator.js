import React from 'react';
import {connect} from 'react-redux';
import RNBootSplash from "react-native-bootsplash";
import NetInfo from "@react-native-community/netinfo";

import GeolocationService from '../middleware/GeolocationService';
import {AlertService} from '../middleware/AlertService';
import {Initialize} from '../middleware/API';

import {retrieveFavourite} from '../store/actions/favourite';
import {retrieveAddress, guestAddress} from '../store/actions/address';
import {retrieveCart} from '../store/actions/cart';
import {retrieveOrder} from '../store/actions/order';
import {logout} from '../store/actions/user';

import LoginNavigator from "./LoginNavigator";
import AppNavigator from "./AppNavigator";
import NetworkServiceOffline from '../components/NetworkServiceOffline';

const AuthNavigator = (props) => {
	const [initialized, updateInitialized] = React.useState(null);
	const [pendingApi, setPendingApi] = React.useState([]);
	const [isConnected, setConnected] = React.useState(true);

	React.useEffect(()=>{
		//After login is done we have to refresh our localstorage
		//for saved addresses and other details stored in cloud
		if(props.user.loggedIn || props.user.verified || props.user.skipped)
		{
			GeolocationService(true, onLocation, onLocation, false);
		}
		//This hides splash screen on app start		
		RNBootSplash.hide(); // immediate		
		return ()=>{
			GeolocationService(false, ()=>{}, onLocation, false);
		}
	},[props.user])

	React.useEffect(()=>{
		// Subscribe
		const networkListener = NetInfo.addEventListener(state => {
			if(state.isConnected) {
				if (pendingApi.length !== 0) {
					const resolve = [...pendingApi];
					setPendingApi([]);
					resolve.map((r)=>r());
				}
				setConnected(true);
			}else {
				setConnected(false);
			}
		});

		return ()=>{
			// unsubscribe networkListener
			networkListener();
		}
	});
	
	const onLocation = (data) => {
		NetInfo.fetch().then(async (state) => {
			if (state.isConnected) {
				coordinates = data;
				if(typeof coordinates == 'undefined'){
					coordinates = null;
				}
				if(props.user.skipped && !props.user.loggedIn){
					skipLoginHandler();
				}else{
					appInitializer();
				}		
			} else {
				setPendingApi([...pendingApi, ()=>onLocation(data)]);
			}
		});
		// props.logoutHandler()
	}

	const appInitializer = async() => {
		if(initialized===null ){
			Initialize(props.user.userId)
				.then(async result => {
					console.log(result)
					if (!result) {
						// something seems to not work in server if code reaches this line
						console.warn('Error in AuthNavigator');
						// updateInitialized('initialized');
					} else {
						//if saved addresses found in server save it in app for use
						if(result.address != null){
							result.address.push({"guestAddress" : coordinates});
						}else{
							result.address = {"guestAddress" : coordinates};							
						}
						await props.onRetrieveData(result);
						//along with get geolocation and change current
						updateInitialized('initialized');
					}
				})
				.catch(err => {
					console.warn('Auth Navigator', err);
			        AlertService('Error!', 'Please check your internet!', ()=>{});
					updateInitialized('api_error');
				});
		}
	}
	const skipLoginHandler = async() => {
		let data = {
			cart: null,
			order: null,
			recentOrder: null,
			quote: null,
			favourite: null
		};
		data.address = {"guestAddress" : coordinates};
		try {
			await props.onRetrieveData(data);
			updateInitialized('initialized');
		} catch (error) {
			console.warn(error);
			AlertService('Error!', 'Please check your internet!', ()=>{});
			updateInitialized('api_error');
		}
	}
	let content = null;

	if (!isConnected && initialized===null) {
		content = <NetworkServiceOffline/>;
	}
	if((props.user.loggedIn && props.user.verified) || props.user.skipped ){
		//initialize app only when user has been verified and not already initialized
		if(initialized === 'initialized'){
			content = <AppNavigator />;
		}else{
			//incase any error occurs display this screen
			// console.warn('error to');
		}
	}else{
		content = <LoginNavigator />;
	}

	return content;
};

const mapStateToProps = state =>{
	return {
		user : state.user,
		address: state.address
	}
}
const mapDispatchToProps = dispatch => {
  return {
    onRetrieveData : data => {
      if(data.address instanceof Array){
		  //multiple addresses found
		  //insert addresses saved in database
	      dispatch(retrieveAddress(data.address));
	  }else{
		  //if this is guest user then current coordinate will be used
		  dispatch(guestAddress(data.address));
	  }
	  if(data.cart !== null){
      	  //insert items to cart fetched from database
		  dispatch(retrieveCart(data.cart));
	  }
	  if(data.order !== null || data.recentOrder !== null || data.quote !== null){
		  //if order was created call necessary functions
		  dispatch(retrieveOrder({
			order: data.order, 
			quote: data.quote,
			recentOrder: data.recentOrder
		}));
	  }
	  if(data.favourite !== null){
		  dispatch(retrieveFavourite(data.favourite));
	  }
	},
	
	logoutHandler: () => {
		dispatch(logout())
	}
  }
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AuthNavigator));