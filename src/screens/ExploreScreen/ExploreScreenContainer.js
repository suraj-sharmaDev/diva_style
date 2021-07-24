import React, { Component } from "react";
import ExploreScreenPresenter from "./ExploreScreenPresenter";

export default class extends Component {
  render() {
    return <ExploreScreenPresenter navigation={this.props.navigation}/>;
  }
}
