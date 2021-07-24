import React, { Component } from "react";
import MapScreenPresenter from "./MapScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <MapScreenPresenter navigation={this.props.navigation}/>;
  }
}
