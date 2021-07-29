import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';

import OverlayLoader from './OverlayLoader';
import Icon from '../../assets/images/icons';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	padding : 15px;
`;

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content: center;
  width : 90px;
  height : 50px;
  padding: 4px 4px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-radius : 5px;  
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 32px;
  width: 32px;
`;

const CategoryName = styled.Text`
  font-size : 14px;
  line-height: 16px;
  font-family : ${Font.normalFont};
  padding : 0px 5px;
`;
const Item = ({info, index, selected, setSelected}) => {
	const backgroundColor = info.subCategoryId ==selected ? Colors.greenColor : Colors.greyColor; 
	const color = info.subCategoryId ==selected ? Colors.homeBackgroundColor : Colors.darkGreyColor;
	let content = (
		<CategoryItem style={{backgroundColor}} onPress={()=>setSelected(info.subCategoryId)}>
			<CategoryName numberOfLines={2} style={{color}}>{info.subCategoryName}</CategoryName>
		</CategoryItem>
	);
	return content;
}
const SubCategoryList = props => {
	// console.warn(props.subCategories);
	const [isLoading, updateLoading] = React.useState(false);
	const setSelected = subCategoryId => {
		if(subCategoryId!==props.selected){
			updateLoading(true);
			props.setSelected(subCategoryId);
		}
	}
	React.useEffect(()=>{
		updateLoading(false);
	},[props.selected])
	let content = (
		<Container>
			<OverlayLoader 
				isLoading={isLoading} 
			/>
			<FlatList
				data={props.subCategories}
				horizontal={true}
		        showsHorizontalScrollIndicator={false}        
		        renderItem={({ item, index }) => (
		          <Item
		            info={item}
		            index={index}
		            selected={props.selected}
		            setSelected={setSelected}
		          />
		        )}
		        keyExtractor={item => item.subCategoryId+'key'}
		        extraData={props.selected}
			/>
		</Container>
	);
	return content;
}

export default SubCategoryList;