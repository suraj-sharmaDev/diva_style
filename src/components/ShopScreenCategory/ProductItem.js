import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import ShopQuantityButton from './ShopQuantityButton';
import {width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
  height : 100px;
  padding : 5px 10px;
  flex-direction : row;
  align-items : center;
`;
const Text = styled.Text`
  font-size : 15px;
  font-family  : ${Fonts.normalFont};
  color : ${Colors.darkGreyColor};
  text-transform : capitalize;
`;
const OfferText = styled.Text`
  font-size : 11px;
  font-family  : ${Fonts.normalFont};
  color : ${Colors.greenColor};
  text-transform : capitalize;
`;
const Image = styled.Image`
  background-color : ${Colors.preLoadingColor};
  width : 100%;
  height : 100%;
`;

const ProductItem = ({item, showImageViewer, ...props}) => {
  console.warn(item);
  let content = (
    <Container>
      <TouchableOpacity style={{ width : '27%'}} onPress={()=>showImageViewer(item)}>
        <Image source={{ uri : item.image }}/>
      </TouchableOpacity>
      <View style={{ width : '45%', justifyContent : 'center', padding : 10}}>
        <Text>{item.name}</Text>
        {
          (item?.mrp && (item?.mrp > item.price)) && (
            <OfferText style={{textDecorationLine: 'line-through'}}>Rs {item.mrp}/-</OfferText>            
          )
        }
        <Text>Rs {item.price}/-</Text>
      </View>
      <View style={{ width : '28%', alignItems : 'center', justifyContent:'center'}}>
        {
          item.stock
          ?
          <ShopQuantityButton 
            item={{
                 shopId : props.shopId,
                 deliveryAvail : props.deliveryAvailability, 
                 productId : item.productId, 
                 name : item.name, 
                 price : item.price,
                 extras : item.extras ? item.extras : null,
                 image: item.image
              }}
            onlineStatus={props.onlineStatus}
            navigation={props.navigation}
          />
          :
          <Text style={{color : Colors.lightGreyColor}}>Unavailable</Text>          
        }
      </View>
    </Container>
  );
  return content;
}

export default ProductItem;