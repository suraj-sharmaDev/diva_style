import React from 'react';
import {Dimensions, StatusBar} from 'react-native';
import styled from 'styled-components';
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const {height, width} = Dimensions.get('window');
const Container = styled.SafeAreaView`
	z-index : 2;
	top : 0px;
	left : 10px;
	width : ${width-20};
	height : auto;
	padding : 10px 10px;
	background-color : ${Colors.searchBarColor};
`;
const SearchContainer = styled.ScrollView``;
const List = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
	padding : 10px 0px;
	border-bottom-color : white;
	border-bottom-width : 1px;
`;
const View = styled.View``;
const ListText = styled.Text`
	font-size : 18px;
	font-family : ${Font.normalFont};
	color : ${Colors.darkGreyColor};
	text-transform : capitalize;	
`;
const ListCategory = styled.Text`
	font-size : 12px;
	font-family : 'Roboto-Regular';
	color : ${Colors.lightGreyColor};
	text-transform : capitalize;		
`;

const ListView = ({item, onSelect}) => {
	let list = (
		<List onPress={()=>onSelect(item.sub_category_name)}>
			<View>
				<ListText>{item.sub_category_name}</ListText>
				<ListCategory>In {item.category_name}</ListCategory>
			</View>
		</List>
	);
	return list;
}
const SearchDynamicResult = props => {
	const content = (
		<Container>
			<SearchContainer>
				{
					props.data.map((d, index)=><ListView item={d} onSelect={props.onSelect} key={index}/>)
				}
			</SearchContainer>
		</Container>
	);
	return content;
}

export default SearchDynamicResult;