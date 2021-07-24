import React from 'react';
import styled from 'styled-components';
import Icon from '../../assets/images/icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content: space-between;
  width : 75px;
  height : 75px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-top-start-radius : 10px;
  border-top-end-radius : 10px;
  border-bottom-start-radius : 10px;
  border-bottom-end-radius : 10px;  
  padding: 10px 2px;
  background-color : ${Colors.searchBarColor};
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 30px;
  width: 30px;
`;

const CategoryName = styled.Text`
	font-size : 12px;
	font-family : ${Fonts.normalFont};
  color : ${Colors.darkGreyColor};
  padding : 0px 5px;
`;

const CategoryButton = props =>{
  let iconName = props.item.categoryName.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  let content = (
    <CategoryItem onPress={()=>props.navigateToCategory(props.item)}>
      <Image source={Icon[iconName]} />
      <CategoryName numberOfLines={1}>{props.item.categoryName}</CategoryName>
    </CategoryItem>
  );
  return content;
}
export default CategoryButton;