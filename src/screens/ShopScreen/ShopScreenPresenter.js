import React, { useEffect } from "react";
import { Platform } from 'react-native';
import styled from "styled-components";
import ShopScreenLoader from '../../components/ShopScreen/ShopScreenLoader';
import ShopScreenHeader from "../../components/ShopScreen/ShopScreenHeader";
import ShopCategoryList from "../../components/ShopScreen/ShopCategoryList";
import FooterCard from "../../components/ShopScreen/FooterCard";

const Theme = styled.View`
  background-color : white;
  flex : 1;
`;

const ShopScreenPresenter = ({navigation, Shop }) => {
	const [categoryList, updateCategoryList] = React.useState(Shop);
	useEffect(()=>{
	},[])
	const navigateToCategory = (item) => {
		// This function used in version 2 is used instead for scroll
		item.shopId = Shop.shop.id;
		let items = {
					items : item, 
					categoryId : item.categoryId, 
					onlineStatus : Shop.shop.onlineStatus, 
					deliveryAvailability : true
				}
		navigation.navigate('ShopCategory', items);
	}
	const searchHandler = (data) => {
		// This function used in version 2 is used instead for scroll
		let found = -1;
		let categories = Shop.categories;
		let categoryLength = Object.keys(categories).length;
		try {
			for(var i =0; i<categoryLength; i++){
				if(categories[i].categoryId == data.categoryId){
					found = i;
					break;
				}
			}			
		} catch (error) {
			console.log(error);
		}
		let item = categories[found];
		item.shopId = Shop.shop.id;
		navigation.navigate('ShopCategory', {items : item, 
											 categoryId : item.categoryId,
											 subCategoryId : data.subCategoryId, 
											 subCategoryChildId : data.subCategoryChildId,
											 onlineStatus : Shop.shop.onlineStatus
											});
	} 		
	let content = null;
	if(categoryList===null){
		content = <ShopScreenLoader />;
	}else {
		content = (
		  <Theme>
		  	<ShopScreenHeader
				navigation={navigation}
				searchHandler={searchHandler}
				Shop={Shop.shop}
		  	/>
		  	<ShopCategoryList 
				navigateToCategory={navigateToCategory}
				categoryList={categoryList}
				onlineStatus={Shop.shop.onlineStatus}
		  	/>
			<FooterCard 
				loading={categoryList===null} 
				navigation={navigation} 
				scroll={searchHandler} 
				categoryList={categoryList}
			/>	  	
		   </Theme>
		);		
	}
	return content;
}

export default React.memo(ShopScreenPresenter);
