import React, { Component } from "react";
import {connect} from 'react-redux';
import ManageAddressScreenPresenter from "./ManageAddressScreenPresenter";
import {AlertService} from '../../middleware/AlertService';
import {DeleteAddress} from '../../middleware/API';
import {deleteAddress} from '../../store/actions/address';

class ManageAddressScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };

  _prepareAddress = (index) => {
    //if other address was to be deleted 
    //first delete it from redux and then prepare it
    otherAddress = this.props.address.savedAddresses.filter((address, i)=>i!==index && address.savedAs==='other')
    if(Object.keys(otherAddress).length===0){
      return '';
    }else{
      return JSON.stringify(otherAddress);
    }
  }
  _deleteAddress = (address, index) => {
    DeleteAddress(address.id)
    .then((result)=>{
      if(!result.error){
        this.props.onDeleteAddress(index);
      }
    })
    .catch((err)=>{
      AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', ()=>{});
    })
  }
  render() {
    return <ManageAddressScreenPresenter 
    		    address={this.props.address}
            cart={this.props.cart}
    		    navigation={this.props.navigation}
            deleteAddress={this._deleteAddress}
           />;
  }
}

const mapStateToProps = state => {
	return {
		address: state.address,
    user: state.user,
    cart : state.cart
	};
};
const mapDispatchToProps = dispatch => {
	return {
    onDeleteAddress: index => {
      dispatch(deleteAddress(index));
    },    
  }
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAddressScreenContainer);