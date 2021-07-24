import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incItem, decItem, emptyCart, removeService } from '../../store/actions/cart';
import {trackStart} from '../../store/actions/order';
import {GetAppConfigDetails} from '../../middleware/API';
import CartScreenPresenter from './CartScreenPresenter';
import {withNavigationFocus} from 'react-navigation';

import NetworkServiceOffline from '../../components/NetworkServiceOffline';
import NetworkService from '../../middleware/NetworkService';

class CartScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			distance : 10,
			deliveryFee : 0,
	  		isOnline : null			
		}
	}
	
    serviceUpdate = (state) => {
  	  this.setState({
  	    	isOnline : state
  	  })
    }

	cartInitializer = () => {
		GetAppConfigDetails()
		.then((res)=>{
			this.setState({
				deliveryFee: res.entity[0].stdShipping 
			})
		})		
	}
    
	componentWillMount()
    {
    	NetworkService(true, this.serviceUpdate);
		this.cartInitializer();
    }

    componentWillUnMount(){
  	   NetworkService(false, ()=>{});  	
    }	
	onIncrement = (data) => {
		this.props.incrementItem(data);
	};

	onDecrement = productId => {
		this.props.decrementItem(productId);
	};

	onRemoveService = data => {
		// console.warn(data);
		this.props.onRemoveService(data);
	};
	render() {
		let focused = this.props.isFocused;
		//To save memory leakage we see whether current screen is focused or not
		//but the screen should be active in background when tracking is enabled
	  	if(this.state.isOnline){
		    return <CartScreenPresenter
					focused={focused}
					navigation={this.props.navigation}
					userId={this.props.user.userId}
					userMobile={this.props.user.userMobile}
					store={this.props.cart}
					address={this.props.address}
					onIncrement={this.onIncrement}
					onDecrement={this.onDecrement}
					onRemoveService={this.onRemoveService}
					trackStart={this.props.onTrackStart}
					distance={this.state.distance}
					deliveryFee={this.state.deliveryFee}
			/>
	  	}else{
	  		return <NetworkServiceOffline />;
	  	}
	}
}

const mapStateToProps = state => {
	return {
		user : state.user,
		cart: state.cart,
		address: state.address
	};
};
const mapDispatchToProps = dispatch => {
	return {
		incrementItem: data => {
			dispatch(incItem(data));
		},
		decrementItem: productId => {
			dispatch(decItem(productId));
		},
		onTrackStart: () => {
			// dispatch(trackStart(data));
			dispatch(emptyCart());
		},
		onTrackEnd: (data) => {
			dispatch(trackEnd(data));
		},		
	    onStatusUpdate: data => {
	      dispatch(statusUpdate(data));
		},
		onRemoveService: data => {
			dispatch(removeService(data));
		}	
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withNavigationFocus(CartScreenContainer));