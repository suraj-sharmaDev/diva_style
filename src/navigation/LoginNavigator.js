import React from 'react';
import {connect} from 'react-redux';
import {login, credential, logout, verify} from '../store/actions/user';
import LoginScreen from "../screens/LoginScreen";
import CredentialScreen from "../screens/CredentialScreen";
import VerificationScreen from "../screens/VerificationScreen";


const LoginNavigator = (props) => {
  React.useEffect(()=>{

  },[])
  if(!props.user.loggedIn && !props.user.verified){
    return <LoginScreen loginHandler={props.loginHandler}/>;
  }
  // if user not verified take to otp entering screen
  // else if(!props.user.verified){
  //   return (
  //     <VerificationScreen
  //       verify={props.verifyHandler}
  //       changeNumber={props.logoutHandler}
  //       user={props.user}
  //     />
  //   );
  // }
  // entering user credential screen
  else if ((props.user.userName === null || props.user.userName.length === 0) ){
    return <CredentialScreen userId={props.user.userId} credentialHandler={props.credentialHandler} /> 
  }
  return null;
}

const mapStateToProps = state =>{
  return {
    user : state.user,
    address : state.address
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginHandler: (data) => {
      dispatch(login(data));
    },
    credentialHandler: (data) => {
      dispatch(credential(data))
    },
    logoutHandler: () => {
      dispatch(logout());
    },
    verifyHandler: () => {
      dispatch(verify());
    },    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginNavigator);