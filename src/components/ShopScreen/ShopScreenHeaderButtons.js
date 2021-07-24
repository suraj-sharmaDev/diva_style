import React from 'react';
import { Dimensions, View } from "react-native";
import {connect} from 'react-redux';
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";

const HeaderButtons = styled.View`
  position: absolute;
  top: 0px;
  flex-direction : row;
  padding : 10px 10px 5px 10px;
`;

const BackButton = styled.TouchableOpacity`
	width : 40px;
`;

const MenuButton = styled.TouchableOpacity`
	width : 40px;
`;

const ShopScreenHeaderButtons = ({navigation, shopId, favouriteHandler, ...props}) => {
	const isFavourite = props.favourite.favourites.includes(shopId);
	const backIcon = "chevron-left-circle";
	const heartIcon = isFavourite ? "cards-heart" : "heart-circle";
	let content = (
	    <HeaderButtons>
	    	<View style={{flex:1}}>
		    	<BackButton onPress={()=>navigation.goBack()}>
		          <Icon name={backIcon} size={30} color={'white'}/>
		        </BackButton>      
		    </View>
	        <MenuButton onPress={()=>favouriteHandler(isFavourite)}>
	          <Icon name={heartIcon} size={30} color={isFavourite ? Colors.redColor : 'white'}/>
	        </MenuButton>
	    </HeaderButtons>
	);
	return content;
}

const mapStateToProps = state => {
	return {
	  favourite: state.favourite,
	};
  };
  export default connect(
	mapStateToProps,
	{}
  )(ShopScreenHeaderButtons);