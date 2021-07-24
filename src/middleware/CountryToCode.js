import Data from '../constants/country_codes.json';

export const CountryToCode = (country) => {
	filt_data = Data.filter((d)=>d.Code == country);
	return filt_data[0];
}