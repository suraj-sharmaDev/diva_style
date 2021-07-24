import React, { Component } from 'react';
import { connect } from 'react-redux';

import ServiceItemScreenPresenter from './ServiceItemScreenPresenter';

class ServiceItemScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}

	render() {
		const currentAddress = this.props.address.savedAddresses[this.props.address.currentAddress];
		return (
			<ServiceItemScreenPresenter
				navigation={this.props.navigation}
				label={currentAddress ? currentAddress.savedAs : 'Your'}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		address: state.address,
		user: state.user
	};
};
const mapDispatchToProps = dispatch => {
	return {
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ServiceItemScreenContainer);