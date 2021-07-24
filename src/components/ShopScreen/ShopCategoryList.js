import React from 'react';
import {FlatList} from 'react-native';
import {width} from '../../constants/Layout';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CategoryButton from './CategoryButton';
import RecommendedProducts from "./RecommendedProducts";

const Container = styled.ScrollView`
	padding : 10px;
`;
const Label = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor};	
	margin-bottom : 10px;
`;
const ShopCategoryList = ({categoryList, onlineStatus, ...props}) => {
	//flatlist column should be in match to width of screen
	let numColumns = width > 420 ? 5 : 4; 
	let content = (
		<Container contentContainerStyle={{paddingBottom: 80}}>
			<Label>Categories</Label>
			<FlatList
				numColumns={numColumns}
				data={categoryList.categories}
				renderItem={({item}) => (
					<CategoryButton 
						item={item} 
						navigateToCategory={props.navigateToCategory} 
					/>
				)}
				keyExtractor={(item, index) => 'key'+index}
				extraData={categoryList}
			/>
			<RecommendedProducts
				products={categoryList.recommends}
				onlineStatus={onlineStatus}
			/>			
		</Container>
	);
	return content;
}

export default ShopCategoryList;