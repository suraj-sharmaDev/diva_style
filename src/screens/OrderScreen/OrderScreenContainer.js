import React, {Component} from 'react';
import OrderScreenPresenter from './OrderScreenPresenter';
import {withNavigationFocus} from 'react-navigation';

class OrderScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}
	render() {
		let focused = this.props.isFocused;
		return (
			<OrderScreenPresenter
				navigation={this.props.navigation}
				focused={focused}
			/>
		);
	}
}

export default withNavigationFocus(OrderScreenContainer);