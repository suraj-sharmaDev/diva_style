import React, { Component } from "react";
import CheckOutScreenPresenter from "./CheckOutScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null,
  };

  render() {
    return <CheckOutScreenPresenter navigation={this.props.navigation}/>;
  }
}
