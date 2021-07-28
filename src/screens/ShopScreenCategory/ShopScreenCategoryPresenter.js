import React from "react";
import { Platform } from 'react-native';
import {connect} from 'react-redux';
import styled from "styled-components";

import AbortController from '../../middleware/AbortController';
import {ShopStocksBySubCategory} from '../../middleware/API';
import {addToCacheFromSearch} from '../../store/actions/shop';
import {height, width} from '../../constants/Layout';
import Colors from "../../constants/Colors";

import LoadingScreen from '../../components/LoadingScreen';
import Header from "../../components/ShopScreenCategory/Header";
import SubCategoryList from "../../components/ShopScreenCategory/SubCategoryList";
import ProductsList from "../../components/ShopScreenCategory/ProductsList";
import FooterCard from "../../components/ShopScreenCategory/FooterCard";

const Theme = styled.View`
  background-color : ${Colors.homeBackgroundColor};
  flex : 1;
`;

const ShopScreenCategoryPresenter = ({navigation, parentProps, ...props }) => {
	const [selected, setSelected] = React.useState(null);
	React.useEffect(()=>{
		abortController = new AbortController();
		updateSelected(parentProps.items.subCategory[0]['subCategoryId']);
		return () => {
			abortController._abort();
		}
	},[]);

	const updateSelected = (subCategoryId) => {
		const shopId = parentProps.items.shopId;
		//to speed up the process and lower api calls we store the api results
		//locally and everytime user changes the catgeory we check if the data is stored locally
		//else get data and store
		//check if given categoryId exists in our cache
		if(parentProps.subCategoryId!==null && selected===null){
			//this means user had already selected one this subCategoryId so work on this
			//first in cache then api 
			data = checkInCache(parentProps.categoryId, parentProps.subCategoryId);
			global.products = data;
			setSelected(parentProps.subCategoryId);
		}else{
			//this is when user has not selected a product before hand and only is 
			//exposed to category
			data = checkInCache(parentProps.categoryId, subCategoryId);
			if(data!=null){
				global.products = data;
				setSelected(subCategoryId);
			}else{
				//cached data not available then make api call
				fetchStock(shopId, subCategoryId)
				.then((result)=>{
					if(!abortController._signal()){
						global.products = result;
						setSelected(subCategoryId);
					}
				})
				.catch((err)=>{
					console.warn(err);
				})
				// console.warn(props.shop.categories);
			}
		}	
	}
	const checkInCache = (categoryId, subCategoryId) => {
		if(parentProps.items.shopId!==props.shop.shopId){
			return null
		}
		let cachedData = null;
		let cachedCategories = props.shop.categories; 
		let categoryLength = Object.keys(cachedCategories).length;
		for(var i=0; i<categoryLength; i++){
			category = cachedCategories[i];
			if(category.categoryId == categoryId){
				//found matching category, now check for subCategory
				subCategories = category.subCategories;
				subCategoriesLength = Object.keys(subCategories).length;
				// console.warn(subCategories);
				for(var j=0; j<subCategoriesLength; j++){
					subCategory = subCategories[j];
					// console.warn(subCategory);
					if(subCategory.subCategoryId==subCategoryId){
						cachedData = subCategory.subCategoryChild;
						break;
					}
				}
			}
			if(cachedData!=null){
				break;
			}
		}
		// console.warn(cachedData);
		return cachedData;
	}
	const fetchStock = async(shopId, subCategoryId) => {
		const result = await ShopStocksBySubCategory(parentProps.items.shopId, subCategoryId);
		try {
			props.addToCache({category: result, shopId: shopId});	
		} catch (error) {
			console.log(error);
		}
		return result;
	}

	_listRef = (ref) => {
		_list = ref;
	}
	const scroll = (sectionIndex, itemIndex) => {
		// updateSearchActive(false);
		_list.scrollToLocation({
         animated: true,
         sectionIndex: sectionIndex,
         itemIndex: itemIndex
		})
	}
	if(selected===null){
		content = <LoadingScreen />
	}else{
		content = (
			<Theme>
				<Header 
					navigation={navigation}
					title={parentProps.items.categoryName}
				/>
				<SubCategoryList 
					subCategories={parentProps.items.subCategory}
					selected={selected}
					setSelected={updateSelected}
				/>
				<ProductsList 
					navigation={navigation}
					shopId={parentProps.items.shopId}
					products={global.products}
					selected={selected.selected}
					onlineStatus={parentProps.onlineStatus}
					deliveryAvailability={parentProps.deliveryAvailability}
				/>
				<FooterCard 
					scroll={scroll}
					productList={global.products}
					navigation={navigation} 
				/>	  					
			</Theme>
		);
	}
	return content;	
}

const mapStateToProps = state => {
	return {
		shop : state.shop,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		addToCache: data => {
			dispatch(addToCacheFromSearch(data));
		}		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopScreenCategoryPresenter);
// export default React.memo(ShopScreenCategoryPresenter);
