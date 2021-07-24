import React, { Component } from "react";
import LocationSelectionScreenPresenter from "./LocationSelectionScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <LocationSelectionScreenPresenter navigation={this.props.navigation}/>;
  }
}
