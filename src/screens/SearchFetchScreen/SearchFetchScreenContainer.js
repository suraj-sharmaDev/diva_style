import React, { Component } from "react";
import SearchFetchScreenPresenter from "./SearchFetchScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <SearchFetchScreenPresenter navigation={this.props.navigation}/>;
  }
}
