export const ReverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json`;
export const PlacesAutoComplete = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
export const PlaceDetailsById = `https://maps.googleapis.com/maps/api/place/details/json`;

const serverUrl = `https://www.nxtshops.com`;

// const serverUrl = `http://35.230.117.116`;

export const LoginApi = `${serverUrl}/customerApi/login/`;

// export const GenerateOtpApi = `${serverUrl}/customer/loginApi/otpGenerator`;

export const VerificationApi = `${serverUrl}/customerApi/verify`;
export const UpdateUsernameApi = `${serverUrl}/customerApi/login`;

export const InitializeApi =`${serverUrl}/customerApi/login`;

export const UpdateTokenApi = `${serverUrl}/customerApi/login`;

export const AddressApi = `${serverUrl}/customerApi/address`;

export const FavouriteApi = `${serverUrl}/customerApi/favourite`;

export const GetAllShopsApi = `${serverUrl}/searchApi/shop`;
export const ShopInformationApi = `${serverUrl}/merchantApi/shop`;
export const ShopStocksBySubCategoryApi = `${serverUrl}/merchantApi/shop`;

export const GetCategoriesApi = `${serverUrl}/merchantApi/category`;
export const SearchInShopApi = `${serverUrl}/searchApi/shop`;

export const SearchAutosuggestApi = `${serverUrl}/customer/shopApi/searchAutoSuggest`;
export const SearchApi = `${serverUrl}/searchApi/shop`;
export const SearchWithSubCategoryApi = `${serverUrl}/customer/shopApi/searchWithSubCategoryId`;

export const GetAppConfigDetailsApi = `${serverUrl}/adminApi/appConfig`;

export const CartApi = `${serverUrl}/customerApi/cart`;
export const RetrieveCartApi = `${serverUrl}/customer/cartApi/retrieveCart`;

export const GetOrderDetailsApi = `${serverUrl}/customer/orderApi/getOrderDetails`;
export const GetRecentOrdersApi = `${serverUrl}/customerApi/order`;
export const InsertOrderApi =`${serverUrl}/orderApi/order`;
export const FinalizePaymentApi = `${serverUrl}/paymentApi/payment`;
export const CompleteOrderApi =`${serverUrl}/customer/orderApi/completeOrder`;

export const GetCouponApi = `${serverUrl}/customer/couponApi/getCoupon`;
export const ActivateCouponApi = `${serverUrl}/customer/couponApi/activateCoupon`;
export const UpdateCustomerInfoApi = `${serverUrl}/customer/customerApi/updateCustomerInfo`;

export const GeoNameApi = 'http://api.geonames.org/countryCode?username=crypt4bits'