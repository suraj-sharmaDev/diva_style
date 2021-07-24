import React from 'react';
import styled from "styled-components";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import Font from "../constants/Fonts";

const Container = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	padding : 15px 0px 10px 0px;	
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.greyColor};
`;
const RecentText = styled.Text`
	font-size : 16px;
	font-family : ${Font.normalFont};;	
	margin-left : 10px;
	color : ${Colors.lightGreyColor};
`;
const RecentSearchedText = props => {
	return(
		<Container activeOpacity={0.7} onPress={props.onSelectSearch}>
	        <Icon name="search" size={20} color={Colors.lightGreyColor} />      		
			<RecentText>{props.searchTerm}</RecentText>
		</Container>
	);
}

export default RecentSearchedText;