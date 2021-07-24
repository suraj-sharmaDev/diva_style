import React, {Component} from 'react';
import {connect} from 'react-redux';
import FavouriteScreenPresenter from './FavouriteScreenPresenter';

class FavouriteScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<FavouriteScreenPresenter
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
)(FavouriteScreenContainer);