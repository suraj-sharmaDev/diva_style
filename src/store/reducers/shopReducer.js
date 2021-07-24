import { ADD_TO_CACHE_FROM_SEARCH, ADD_TO_CACHE_FROM_API } from '../actions/types';

// const initialState = {
// 	shopId : 2,
// 	categories: [
// 		{
// 			categoryId : 1,
// 			subCategories : [
// 				{
// 					subCategoryId : 1,
// 					subCategoryChild : [
// 						{
// 							subCategoryChildId : 1,
// 							data : [
// 								{
// 									productId : 1,
// 									productName : 'Tea Leaves'
// 								},
// 								{
// 									productId : 2,
// 									productName : 'Tea Powder'
// 								},
// 								{
// 									productId : 3,
// 									productName : 'Instant Tea'
// 								}																
// 							]
// 						}
// 					]
// 				}
// 			]
// 		}
// 	],
// };

const initialState = {
	shopId : 0,
	categories: [],
};


const createNewArray = (array, data) => {
	let newState = array;
	let subCategoryIndex = -1;	
	for (category of data.category) {
		if(subCategoryIndex > -1){
			let subCategoryChild = {
				subCategoryChildId: category.subCategoryChildId,
				title : category.title,
				data: [],					
			};
			for (product of category.data) {
				subCategoryChild.data.push(
					product
				);
			}
			pushData.subCategories[0].subCategoryChild.push(subCategoryChild);
			subCategoryIndex++;			
		}else{
			pushData = {
				categoryId: category.categoryId,
				subCategories: [
					{
						subCategoryId: category.subCategoryId,
						subCategoryChild: [
							{
								subCategoryChildId: category.subCategoryChildId,
								title : category.title,
								data: [],
							},
						],
					},
				],
			};
			for (product of category.data) {
				pushData.subCategories[0].subCategoryChild[0].data.push(
					product
				);
			}
			subCategoryIndex++;
		}
	}
	if(Array.isArray(newState)){
		newState.push(pushData);
		return newState;
	}else{
		return pushData;
	}	
}
const pushToArray = (array, data) => {

}
const onAddToCacheFromSearch = (state, data) => {
	let newState = {...state};
	if(newState.shopId==0 || newState.shopId!=data.shopId){
		//When app initialized for first time
		//product from different shop
		newState.shopId = data.shopId;
		newState.categories = createNewArray([], data);
	}
	else if(newState.shopId == data.shopId){
		//if the cache already contains data from given shop
		for(category of data.category)
		{
			const categoryIndex = newState.categories.findIndex(item => item.categoryId === category.categoryId);
			if(categoryIndex > -1)
			{
		  		//if categoryId also exists
		  		//find if subCategoryId exists or not
				const subCategoryIndex = newState.categories[categoryIndex].subCategories.findIndex(item => item.subCategoryId === category.subCategoryId);
				if(subCategoryIndex>-1){
					const pushData = {
						subCategoryChildId : category.subCategoryChildId,
						title : category.title,
						data : []
					}
					for(product of category.data){
						pushData.data.push(product);
					}
					newState.categories[categoryIndex].subCategories[subCategoryIndex].subCategoryChild.push(pushData);	
				}else{
					//if subCategory doesn't exist create one and push into newState
					const pushData = {
						subCategoryId : category.subCategoryId,
						subCategoryChild : [
							{
								subCategoryChildId : category.subCategoryChildId,
								title : category.title,
								data : []
							}
						],
					}
					for(product of category.data){
						pushData.subCategoryChild[0].data.push(product);
					}
					newState.categories[categoryIndex].subCategories.push(pushData);						
				}
			}
			else
			{
				//if category doesn't exist
				//create a new category and push to newState
				pushData = createNewArray({}, data);
				newState.categories.push(pushData);
			}
		}
	}
	return newState;
}

const shopReducer = (state = initialState, action) => {
  switch(action.type) {
  	case ADD_TO_CACHE_FROM_SEARCH : 
  		return onAddToCacheFromSearch(state, action.payload);
    default:
      return state;
  }
}

export default shopReducer;