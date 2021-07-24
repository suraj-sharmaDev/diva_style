import React from "react";
import { Platform } from 'react-native';
import { View, Text } from 'native-base';
import styled from "styled-components";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchIcon from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";

import FakedSearchBar from "./FakedSearchBar";

const Container = styled.View`
  elevation:5;
  background-color : white;
  border-bottom-color : ${Colors.greyColor};
  border-bottom-width : 1.6;
  border-bottom-left-radius : 20px;
  border-bottom-right-radius : 20px;  
  padding : 10px;
  padding-bottom : 15px;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
`;

const HeaderButtons = styled.View`
  flex : 1;
  flex-direction : row;
`;

const Logo = styled.TouchableOpacity`
  flex : 1;
`;

const Cart = styled.TouchableOpacity`
  background-color : ${Colors.greenColor};
  padding : 10px;
  border-radius : 5px;
  align-items : center;
  flex-direction : row;
`;

const Quantity = styled.Text`
  color : white;
  margin-left : 4px;
  font-size : 16px;
  font-family : 'Roboto-Regular';
`;

const FakedSearchBarWithCart = (props) => {
  let cartQuantity = Object.keys(props.cart.items).length;
  return(
    <Container>
      <HeaderButtons>
      {
        // <Logo>
        //   <Icon name="location-pin" size={30} />
        // </Logo>      
        // <Cart activeOpacity={0.8} onPress={()=>props.navigation.navigate('CartStack')}>
        //   <Icon name="bag" size={18} color={'white'}/>
        //   {
        //     cartQuantity > 0 ? <Quantity>{cartQuantity}</Quantity> : null
        //   }
        // </Cart>
      }
      </HeaderButtons>
      <FakedSearchBar navigation={props.navigation}/>
    </Container>
  )
};

export default FakedSearchBarWithCart;
