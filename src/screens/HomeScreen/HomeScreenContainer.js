import React, { Component } from "react";
import HomeScreenPresenter from "./HomeScreenPresenter";

import NetworkServiceOffline from '../../components/NetworkServiceOffline';
import NetworkService from '../../middleware/NetworkService';

export default class extends Component {
  static navigationOptions = {
    header : null
  };
  constructor(props){
  	super(props);
  	this.state = {
  		isOnline : null
  	}
  }
  componentWillMount()
  {
  	NetworkService(true, this.serviceUpdate);
  }
  serviceUpdate = (state) => {
  	this.setState({
  		isOnline : state
  	})
  }
  componentWillUnMount(){
  	NetworkService(false, ()=>{});  	
  }
  render() {
  	if(this.state.isOnline){
	    return <HomeScreenPresenter navigation={this.props.navigation}/>
  	}else{
  		return <NetworkServiceOffline />;
  	}
  }
}
