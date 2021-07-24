import React, { Component } from "react";
import CredentialScreenPresenter from "./CredentialScreenPresenter";
import {UpdateUsername} from "../../middleware/API"; 

class CredentialScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };
  onCredential = (userName) => {
    if(userName.length > 3){
      let formData = new FormData();
      formData.append('customerId', this.props.userId);      
      formData.append('customerName', userName);
      //Call the API
      UpdateUsername(formData)
      .then((value)=>{
        if(value.error){
          AlertService('Error','There was some misconfigured files in cloud, sorry of inconvenience!', ()=>{});
        }else{
          this.props.credentialHandler(userName);
        }
      })
      .catch((err)=>AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{}));
      }
  }
  render() {
    return (
      <CredentialScreenPresenter
        onCredential={this.onCredential}
      />
    );
  }
}

export default React.memo(CredentialScreenContainer);