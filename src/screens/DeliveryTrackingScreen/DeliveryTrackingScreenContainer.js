import React, { Component } from "react";
import DeliveryTrackingScreenPresenter from "./DeliveryTrackingScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <DeliveryTrackingScreenPresenter 
    		navigation={this.props.navigation} 
    		cart={this.props.cart} 
        userId={this.props.userId}
    		userLocation={this.props.userLocation}
    		focused={this.props.focused}
        onStatusUpdate={this.props.onStatusUpdate}
        completeDelivery={this.props.completeDelivery}/>;
  }
}
