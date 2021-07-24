import React, { Component } from "react";
import VerificationScreenPresenter from "./VerificationScreenPresenter";
import {connect} from 'react-redux';

class VerificationScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <VerificationScreenPresenter 
            verifiedHandler={this.props.verify}
            changeNumber={this.props.changeNumber}
    		    user={this.props.user}/>;
  }
}

export default React.memo(VerificationScreenContainer);