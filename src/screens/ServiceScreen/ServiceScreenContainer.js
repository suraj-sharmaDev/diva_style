import React, {Component} from 'react';
import {connect} from 'react-redux';

import ServiceScreenPresenter from './ServiceScreenPresenter';

class ServiceScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}

	render() {
		let update = this.props.isFocused;
		return (
			<ServiceScreenPresenter
				navigation={this.props.navigation}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
	};
};
const mapDispatchToProps = dispatch => {
	return {
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ServiceScreenContainer);