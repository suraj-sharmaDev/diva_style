import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incItem, decItem} from '../../store/actions/cart';
import NotificationScreenPresenter from './NotificationScreenPresenter';

class CartScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<NotificationScreenPresenter
				navigation={this.props.navigation}
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
)(CartScreenContainer);