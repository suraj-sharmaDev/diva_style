import React from 'react';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Product = styled.TouchableOpacity`
  flex-direction : row;
  height : 110px;
  margin-vertical: 5px;
  background-color: white;
  padding: 10px 10px 0px 10px;
  border-radius: 12px;
`;

const InfoBox = styled.View`
  width : 60%;
  padding : 0px 20px
`;

const TopBox = styled.View`
  width : 100%;
  flex-direction : column;
  border-bottom-width : 0.5px;
  border-bottom-color : ${Color.lightGreyColor};
  padding-bottom : 10px;  
`;

const BottomBox = styled.View`
  padding-top : 5px;
  flex-direction : row;
  justify-content: space-between;
`;

const RatingContainer = styled.View``;

const RatingBox = styled.View`
  flex-direction : row;
  justify-content : center;
  align-items : center;
  width : 30px;
  padding : 3px 5px;
  background-color : white;
  border-radius : 3px;
`;

const RatingText = styled.Text`
  font-size : 12px;
  font-family  : ${Font.normalFont};  
  color : ${Color.lightGreyColor};
`;

const PriceText = styled.Text`
  font-size : 14px;
  font-family  : ${Font.normalFont};  
  color : ${Color.lightGreyColor};  
`;
const ImageView = styled.View`
  border-radius: 12px;
  background-color : ${Color.preLoadingColor};  
  height: 90px;
  width: 120px;
`;
const Image = styled.Image`
  border-radius: 12px;
  height: 90px;
  width: 120px;
`;

const Name = styled.Text`
  font-size : 16px;
  font-family  : ${Font.normalFont};
  color : ${Color.darkGreyColor};
`;

const Category = styled.Text`
  font-size : 12px;
  font-family  : ${Font.normalFont};  
  color : ${Color.lightGreyColor};
`;

const ShopDetailCard = ({ info, navigation }) => {
  const distance = info.distance * 1.06;
  let isNear = false;
  if(typeof info.coverage === 'undefined'){
    isNear = true;
  }
  else if(distance < info.coverage)
  {
    isNear = true;
  }
  const navigationHandler = () => {
    if(isNear){
      navigation.navigate('Shop', {shopId : info.shopId});
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Delivery not availabe at your location!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }
  return (
    <Product activeOpacity={0.8} onPress={navigationHandler}>
      <ImageView>
        <Image source ={{ uri : info.image }}/>
      </ImageView>
      <InfoBox>
        <TopBox>
          <Name ellipsizeMode='tail' numberOfLines={1}>{info.name}</Name>
          <Category>{info.category}</Category>                
        </TopBox>
        <BottomBox>
          <RatingContainer>
            <RatingBox>
              <RatingText>{info.rating ? info.rating : '.'}</RatingText>
              <Icon name="star" style={{ color : Color.goldenColor, fontSize:12}}/>              
            </RatingBox>
          </RatingContainer>
          {
            !info.onlineStatus
            ?
            <PriceText style={{color: Color.redColor}}>Offline</PriceText>
            :
            null            
          }          
          <PriceText>{distance.toFixed(1)} km</PriceText>
        </BottomBox>
      </InfoBox>
    </Product>
  );
}

export default ShopDetailCard;