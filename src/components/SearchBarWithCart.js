import React from "react";
import { Platform } from 'react-native';
import { View, Text } from 'native-base';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

import SearchBar from "./SearchBar";

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
  font-family : ${Font.normalFont};
`;

const SearchBarWithCart = (props) => {
  React.useEffect(()=>{},[]);
  let content = (
    <Container>
      <HeaderButtons>
        <Logo onPress={()=>props.navigation.goBack()}>
          <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
        </Logo>      
        <Cart activeOpacity={0.8} onPress={()=>props.navigation.navigate('CartStack')}>
          <Icon name="bag" size={18} color={'white'}/>
          {
            props.cartQuantity > 0
            ?
            <Quantity>{props.cartQuantity}</Quantity>            
            :
            null
          }
        </Cart>
      </HeaderButtons>
      <SearchBar 
        fetchSearch={props.fetchSearch} 
        clearSearch={props.clearSearch}
        startSearch={props.startSearch}
        searchTerm={props.searchTerm} 
      />
    </Container>
  )
  return content;
};

export default SearchBarWithCart;
