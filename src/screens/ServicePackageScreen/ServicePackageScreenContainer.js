import React, {Component} from 'react';
import {connect} from 'react-redux';
import { retrieveQuote } from '../../store/actions/order';
import ServicePackageScreenPresenter from './ServicePackageScreenPresenter';

class ServicePackageScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ServicePackageScreenPresenter
				user={this.props.user}
				navigation={this.props.navigation}
				onRetrieveQuote={this.props.onRetrieveQuote}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};
const mapDispatchToProps = dispatch => {
    return {
        onRetrieveQuote: data => {
            dispatch(retrieveQuote(data));
        },
    };
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ServicePackageScreenContainer);