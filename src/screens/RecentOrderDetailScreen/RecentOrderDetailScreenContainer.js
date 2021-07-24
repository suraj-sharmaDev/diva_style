import React, { Component } from "react";
import RecentOrderDetailScreenPresenter from "./RecentOrderDetailScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <RecentOrderDetailScreenPresenter navigation={this.props.navigation}/>;
  }
}
