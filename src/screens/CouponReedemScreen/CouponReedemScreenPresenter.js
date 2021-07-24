import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Color from '../../constants/Colors';
import {couponApplied} from '../../store/actions/cart';
import {ActivateCoupon} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

import InputCoupon from '../../components/CouponReedemScreen/InputCoupon';
import InfoBox from '../../components/CouponReedemScreen/InfoBox';
const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  padding : 10px;
`;
const Text = styled.Text``;
const Button = styled.TouchableOpacity``;

const CouponReedemScreenPresenter = ({navigation, ...props}) => {
  totalAmount = navigation.getParam('totalAmount'); 
  couponCode = '';
  const [infoText, updateInfoText] = React.useState('');
  React.useEffect(()=>{

  },[infoText]);

  const clickHandler = () => {
    if(couponCode.length > 3)
    {
      let formData = new FormData();
      formData.append('customerId', props.user.userId);
      formData.append('couponCode', couponCode);
      formData.append('totalAmount', totalAmount);
      ActivateCoupon(formData)
      .then((result)=>{
        if(result.error){
          if(result.reason==='wrong_coupon'){
            updateInfoText('You Entered Wrong Code');
          }else if(result.reason==='coupon_exhaustion'){
            updateInfoText('You have exhausted the usage limit for this coupon');
          }else if(result.reason==='min_order_amount'){
            updateInfoText('This coupon is not applicable for your order amount.');
          }
        }
        else
        {
          props.onCouponApplied(result.reason);
          navigation.goBack();
          // updateInfoText(`You will get discount of Rs ${result.reason['discountAmount']}`);
        }
      })
      .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
      })
    }
  }
  const inputCoupon = (text) => {
    couponCode = text;
  }
  let content = (
  	<Theme>
      <InputCoupon inputCoupon={inputCoupon} clickHandler={clickHandler}/>
      <InfoBox infoText={infoText} />
  	</Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCouponApplied: data => {
      dispatch(couponApplied(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponReedemScreenPresenter);