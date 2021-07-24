const serverUrl = `https://www.nxtshops.com`;

export const GetAllServicesApi = `${serverUrl}/searchApi/service/services`;
export const GetServiceItemApi = `${serverUrl}/searchApi/service/serviceItem`;
export const GetServiceItemPackagesApi = `${serverUrl}/searchApi/service/serviceDetails`;
export const GetPackageRateApi = `${serverUrl}/searchApi/service/packageRate`;
export const GetRepairPartsRateApi = `${serverUrl}/searchApi/service/repairParts`;

// quote as in order
export const GetQuoteDetailsApi = `${serverUrl}/orderApi/quote/`;
export const CreateQuoteApi = `${serverUrl}/orderApi/quote`;
export const AcceptBiddingApi = `https://nxtshops.com/orderApi/operations/acceptBid`;
export const GetRecentQuotesApi = `https://nxtshops.com/customerApi/quote`;