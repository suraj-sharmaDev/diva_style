import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incItem, decItem} from '../../store/actions/cart';
import CartScreenPresenter from './CartScreenPresenter';
import {withNavigationFocus} from 'react-navigation';

class CartScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			distance : 10,
			deliveryFee : 20
		}
	}
	onIncrement = (productId, price) => {
		this.props.incrementItem({id : productId, price : price});
	};

	onDecrement = productId => {
		this.props.decrementItem(productId);
	};
	render() {
		let update = this.props.isFocused;
		return (
			<CartScreenPresenter
				navigation={this.props.navigation}
				update={update}
				store={this.props.cart}
				onIncrement={this.onIncrement}
				onDecrement={this.onDecrement}
		        distance={this.state.distance}
                deliveryFee = {this.state.deliveryFee}				
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
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
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withNavigationFocus(CartScreenContainer));