import React, { Component } from "react";
import CouponReedemScreenPresenter from "./CouponReedemScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null,
  };

  render() {
    return <CouponReedemScreenPresenter navigation={this.props.navigation}/>;
  }
}
