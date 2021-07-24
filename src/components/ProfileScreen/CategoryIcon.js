import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryIcon = ({ subCategoryName, size }) => {
	let IconName = 'barley';
	if(subCategoryName.indexOf('fish') > -1) { IconName = "fish"}
	else if(subCategoryName.indexOf('farm') > -1) { IconName = "barley"}
	return (<Icon name={IconName} size={size} color="white" />);
}

export default CategoryIcon;