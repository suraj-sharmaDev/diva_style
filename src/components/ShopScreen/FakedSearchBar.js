import React from 'react';
import Icon from "react-native-vector-icons/Feather";

import styled from "styled-components";
import Colors from "../../constants/Colors";
import {width} from "../../constants/Layout";

const SearchBarContainer = styled.View`
  background-color : white;
  width: ${width * 0.8}px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
  border-radius: 20px;
`;
const Search = styled.TouchableOpacity`
  flex-direction : row;
  width: 100%;
  elevation: 1;
  shadow-opacity: 0.1;
  shadow-radius: 2.14px;
  shadow-color: #606060;
  shadow-offset: 0px 1px;  
  border-radius : 7px;

  background-color : white;
  align-items : center;
  justify-content : center;
  padding-left : 10px;
  height : 40px;
`;
const InputFaked = styled.View`
  flex : 1;
`;

const Placeholder = styled.Text`
  margin-left : 5px;
  font-size : 14px;
  color : ${Colors.lightGreyColor};
`;

const FakedSearchBar = props => {
	return(
      <SearchBarContainer>
        <Search activeOpacity={0.6} onPress={props.clickHandler}>
          <Icon name="search" size={16} color={Colors.lightGreyColor} />      
          <InputFaked>
            <Placeholder>Search for grocery, food, shop...</Placeholder>
          </InputFaked>
        </Search>
        {props.children}
      </SearchBarContainer>     
	);
}

export default FakedSearchBar;