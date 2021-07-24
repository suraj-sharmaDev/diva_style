import React from "react";
import { Platform, Dimensions, BackHandler } from 'react-native';
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {Verify, GenerateOtp} from "../../middleware/API";
import {AlertService} from '../../middleware/AlertService';

import InputForm from '../../components/VerificationScreen/InputForm';
import Header from '../../components/VerificationScreen/Header';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
  background-color : ${Colors.homeBackgroundColor};
`;
const HeaderText = styled.Text`
  text-transform : uppercase;
  text-align : center;
  font-size : 20px;
  font-family : ${Fonts.boldFont};
  color : ${Colors.darkGreyColor};
  border-bottom-width : 1px;
  border-bottom-color : ${Colors.greyColor};
`;

const VerificationScreenPresenter = ({user, verifiedHandler, changeNumber}) => {

  React.useEffect(()=>{
  },[])

  const handleVerify = (otpCode) => {
    //First check if otpCode is valid or not
    let formData = {};
    formData.customerId = user.userId;
    formData.otpCode = otpCode;
    Verify(formData)
    .then((result)=>{
      if(result.error){
        AlertService('OTP Error','Wrong OTP entered, Do you want another OTP?', handleResendOtp);
      }else{
        verifiedHandler();
      }
    })
    .catch((err)=>{
      console.warn(err);
      AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{})
    });
  }
  const handleResendOtp = () => {
    GenerateOtp(user.userId)
    .then((result)=>{
      AlertService('Notice','You will receive new OTP shortly!', ()=>{})
    })
    .catch((err)=>AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{}))
  }
  const handleChangeNumber = () => {
    changeNumber();
  }
  let content = (
    <Theme>
      <Header 
        userMobile={user.userMobile}
        handleChangeNumber={handleChangeNumber}
      />
      <InputForm 
        handleVerify={handleVerify} 
        handleResendOtp={handleResendOtp} 
      />
    </Theme>
  );
  return content;
};

export default React.memo(VerificationScreenPresenter);
