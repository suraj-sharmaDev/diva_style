import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Fonts from "../constants/Fonts";
import {height} from '../constants/Layout';
import ShopDetailCard from './HomeScreen/ShopDetailCard';

const Container = styled.View`
  min-height : 100%;
  height : auto;
  elevation : 26;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
  background-color : white;
  border-top-width : 1;
  border-top-color : ${Colors.boxShadowColor};
  border-top-left-radius : 20px;
  border-top-right-radius : 20px;  
  padding : 10px 20px;
`;
const BigWarningText = styled.Text`
	font-size: 30px;
	font-family  : ${Fonts.normalFont};
	color: ${Colors.lightGreyColor};
`;
const HeaderText = styled.Text`
  font-family  : ${Fonts.normalFont};
  font-size : 18px;
  color : ${Colors.darkGreyColor};
`;
const View = styled.View`
  padding : 10px;
`;

const _renderHeader = ({title}) => {
  let content = (
    <View>
      <HeaderText>{title} Shops Near You</HeaderText>
    </View>
  );
  return content;
}

const ExploreMenu = ({navigation, products, selectedId}) => {
	let content = null;
	const renderListFooter = () => {
		return <View style={{paddingBottom: 100}} />
	}
	if (!products || products.length === 0) {
		content = (
			<Container>
				<View style={{alignItems: 'center', justifyContent: 'center'}}>
					<BigWarningText>No Items Found!</BigWarningText>
				</View>
			</Container>
		);
	} else {
		content = (
			<Container>
		      <FlatList
		        data={products}
		        renderItem={({item})=><ShopDetailCard navigation={navigation} info={item} />}
		        ListFooterComponent={<View style={{height : height * 0.35}} />}
		        keyExtractor={(item, index) => item + index}        
		      />
			</Container>
		);
	}
	return content;
};

export default React.memo(ExploreMenu);
