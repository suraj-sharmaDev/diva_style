import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import SearchIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Ionicons";
import styled from "styled-components";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const SearchBarContainer = styled.View`
  elevation : 3;
  shadow-opacity: 0.1;
  shadow-radius: 2.14px;
  shadow-color: #606060;
  shadow-offset: 0px 1px;  
  border-radius : 7px;

  flex-direction : row;
  flex : 5;
  align-items : center;
  justify-content : center;
  margin : 20px 15px 0px 20px;
  padding : 0px 10px;
  height : 40px;
  background-color : white;
`;

const Input = styled.TextInput`
  flex : 1;
`;

const SearchBar = (props) => {
  const doSearch = text => {
    props.fetchSearch(text);
  }
  const startSearch = data => {
    props.startSearch(data.nativeEvent.text);
  }
  return(
      <SearchBarContainer>
        <SearchIcon name="search" size={22} color={Colors.darkGreyColor} />      
        <Input placeholder="Search for categories like fish, vegetables..." 
               value = {props.searchTerm}
               underlineColorAndroid="transparent"
               autoFocus={true}
               onChangeText={(e)=>doSearch(e)}
               returnKeyType='search'
               onSubmitEditing={startSearch}
        />
        {
          props.searchTerm.length > 1
          ?
          <TouchableOpacity onPress={props.clearSearch} style={{padding : 5}}>
            <CloseIcon name="ios-close-circle" size={22} color={Colors.darkGreyColor} />                    
          </TouchableOpacity>          
          :
          null
        }
      </SearchBarContainer>
)};

export default SearchBar;