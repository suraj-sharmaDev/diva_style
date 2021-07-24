import { 
	ReverseGeocode, PlacesAutoComplete, PlaceDetailsById, GeoNameApi, 
	LoginApi, GenerateOtpApi, VerificationApi, UpdateUsernameApi, InitializeApi, 
	UpdateTokenApi, AddressApi, FavouriteApi, GetAllShopsApi, 
	ShopInformationApi, ShopStocksBySubCategoryApi,
	ShopBasicInformationApi, GetCategoriesApi, 
	SearchInShopApi, SearchAutosuggestApi, 
	SearchApi, SearchWithSubCategoryApi, 
	CartApi, RetrieveCartApi, 
	GetRecentOrdersApi, GetOrderDetailsApi, InsertOrderApi, CompleteOrderApi, 
	GetCouponApi, ActivateCouponApi, 
	UpdateCustomerInfoApi,
	GetAppConfigDetailsApi,
	FinalizePaymentApi
} from "../constants/Urls";

import KEYS from "../constants/Keys";

export const GeoName = async(latitude, longitude) => {
	const url = `${GeoNameApi}&lat=${latitude}&lng=${longitude}`;
	const response = await fetch(url);
	return response.text();
}

export const Login = async (data) => {
	const response = await fetch(LoginApi,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},		
    	body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}
export const GenerateOtp = async(customerId) => {
	const url = `${GenerateOtpApi}?customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const Verify = async (data) => {
	const response = await fetch(VerificationApi,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
    	body : JSON.stringify(data)		
	});
	const result = await response.json();
	return result;	
}
export const UpdateUsername = async (data) => {
	const response = await fetch(UpdateUsernameApi,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
    	body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}
export const Initialize = async(customerId) => {
	const url = `${InitializeApi}/${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const UpdateToken = async(customerId, data) => {
	const url = `${UpdateTokenApi}/${customerId}`;
	const response = await fetch(url,{
		method : 'PUT',
		headers : {
			'Content-Type': 'application/json'
		},
		body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;	
}

export const AddAddress = async(data) => {
	const response = await fetch(AddressApi,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},		
    	body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}

export const UpdateAddress = async(addressId, data) => {
	const url = `${AddressApi}/${addressId}`;
	const response = await fetch(url,{
		method : 'PUT',
		headers : {
			'Content-Type': 'application/json'
		},		
    	body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}

export const RetrieveAddress = async(customerId) => {
	const url = `${AddressApi}/${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const DeleteAddress = async(addressId) => {
	const url = `${AddressApi}/${addressId}`;
	const response = await fetch(url,{
		method : 'DELETE'
	});
	const result = await response.json();
	return result;
}

export const GetAllFavouriteShops = async(customerId) => {
	const url = `${FavouriteApi}/${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const AddShopToFavourite = async(customerId, shopId) => {
	const url = `${FavouriteApi}/${customerId}/${shopId}`;
	const response = await fetch(url,{
		method: 'POST'
	});
	const result = await response.json();
	return result;
}

export const DeleteShopFromFavourite = async(customerId, shopId) => {
	const url = `${FavouriteApi}/${customerId}/${shopId}`;
	const response = await fetch(url,{
		method: 'DELETE'
	});
	const result = await response.json();
	return result;
}

export const GetAllShops = async(coordinates) => {
	const url = `${GetAllShopsApi}/${coordinates.latitude}/${coordinates.longitude}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopInformation = async(shopId) => {
	const url = `${ShopInformationApi}/${shopId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopStocksBySubCategory = async(shopId, subCategoryId) => {
	const url = `${ShopStocksBySubCategoryApi}/${shopId}/${subCategoryId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopBasicInformation = async(shopId) => {
	const url = `${ShopInformationApi}/${shopId}/basic`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetCategories = async() => {
	const response = await fetch(GetCategoriesApi);
	const result = await response.json();
	return result;
}
export const SearchInShope = async(shopId, search) => {
	const url = `${SearchInShopApi}/${shopId}?searchKey=${search}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const SearchAutosuggest = async(searchTerm) => {
	const url = `${SearchAutosuggestApi}?search=${searchTerm}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const Search = async(searchTerm, coordinates) => {
	const url = `${SearchApi}/${coordinates.latitude}/${coordinates.longitude}/?searchKey=${searchTerm}`;
	const response = await fetch(url);
	const result = await response.json();
	console.log(url);
	console.log(result);
	return result;
}
export const SearchWithSubCategory = async(subCategoryChildId, coordinates) => {
	const url = `${SearchApi}/${coordinates.latitude}/${coordinates.longitude}/${subCategoryChildId}`;
	console.log(url);
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetAppConfigDetails = async() => {
	const response = await fetch(GetAppConfigDetailsApi);
	const result = await response.json();
	return result;	
}
export const AddCart = async(data) => {
	const response = await fetch(CartApi,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},		
    	body : JSON.stringify(data)
	});
	const result = await response.json();
	return result;	
}
export const UpdateCart = async(data, customerId, shopId) => {
	const url = `${CartApi}/${customerId}/${shopId}`;	
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}

export const DeleteCart = async(data, customerId, shopId) => {
	const url = `${CartApi}/${customerId}/${shopId}`;	
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}
export const ActivateCoupon = async(data) => {
	const response = await fetch(ActivateCouponApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;		
}
export const PlaceOrder = async(data) => {
	const response = await fetch(InsertOrderApi,{
		method : 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}
export const FinalizePayment = async(data) => {
	const response = await fetch(FinalizePaymentApi,{
		method : 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}
export const CompleteOrder = async(data) => {
	//Incase self_pickup
	const response = await fetch(CompleteOrderApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;
}
export const GetOrderDetails = async(orderId) => {
	let url = `${GetOrderDetailsApi}?orderId=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const GetRecentOrders = async(customerId, pageNo) => {
	let url = `${GetRecentOrdersApi}/${customerId}/${pageNo}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const UpdateCustomerInfo = async(data) => {
	const response = await fetch(UpdateCustomerInfoApi, {
		method : 'POST',
		body : data
	})
	const result = await response.json();
	return result;
}
//Fetch when user searches for places
export const PlacesAutoFetch = async(searchTerm) => {
	let url = `${PlacesAutoComplete}?input=${searchTerm}&components=country:in&key=${KEYS.API_KEY}`;
	console.log(url);
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const PlaceDetails = async(placeId) => {
	//function to get place details from placeId
	let url = `${PlaceDetailsById}?place_id=${placeId}&fields=geometry&key=${KEYS.API_KEY}`;
	console.log(url);
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const ReverseLookup = async (region) => {
	//function to get place name from lat and long
	let formattedAddress = {'title':'', 'street':''};
	const url = `${ReverseGeocode}?latlng=${region.latitude},${region.longitude}&key=${KEYS.API_KEY}`;
   	const response = await fetch(url);
    const result = await response.json();
    formattedAddress.title = result.results[0].address_components[1].long_name;
	formattedAddress.street = result.results[0].address_components[0].long_name;
    return formattedAddress;
  }