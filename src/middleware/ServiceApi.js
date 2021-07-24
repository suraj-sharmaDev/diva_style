import {
	GetAllServicesApi,
	GetServiceItemApi,
	GetServiceItemPackagesApi,
	GetPackageRateApi,
	GetRepairPartsRateApi,
	GetQuoteDetailsApi,
	GetRecentQuotesApi,
	CreateQuoteApi,
	GetAllBiddingsApi,
	AcceptBiddingApi
} from '../constants/serviceurls';

const header = {
	'Content-Type': 'application/json'
};

export const GetAllServices = async (coordinates, categoryId = 0) => {
	// this function can do two different api calls
	// when categoryId is not passed it will get all categories near user
	// when categoryId is passed it will get category if exists near user coordinates
	let url = `${GetAllServicesApi}/${coordinates.latitude}/${coordinates.longitude}`;
	if (categoryId > 0) url = `${GetAllServicesApi}/${coordinates.latitude}/${coordinates.longitude}/${categoryId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const GetServiceItem = async (categoryId) => {
	const url = `${GetServiceItemApi}/${categoryId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const GetServiceItemPackages = async (categoryId) => {
	const url = `${GetServiceItemPackagesApi}/${categoryId}`;
	console.warn(url);
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetPackageRate = async (packageItemId) => {
	const url = `${GetPackageRateApi}/${packageItemId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetRepairPartsRate = async (repairItemId) => {
	const url = `${GetRepairPartsRateApi}/${repairItemId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const CreateQuote = async (data) => {
	const url = `${CreateQuoteApi}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: header,
		body: JSON.stringify(data)
	});
	const result = await response.json();
	return result;
}

export const GetQuoteDetails = async (quoteId) => {
	const url = `${GetQuoteDetailsApi}/${quoteId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const GetRecentQuotes = async (customerId, pageNo) => {
	const url = `${GetRecentQuotesApi}/${customerId}/${pageNo}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const AcceptBidding = async (quoteBiddingId, serviceProviderId) => {
	const url = `${AcceptBiddingApi}/${quoteBiddingId}/${serviceProviderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}