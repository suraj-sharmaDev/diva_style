import React, {useState, useEffect} from 'react';
import {
	Platform,
	Dimensions,
	StatusBar,
	TouchableHighlight,
	BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import {
	updateCurrentSearch,
	updateRecentSearches,	
	clearCurrentSearch,
} from '../../store/actions/search';
import styled from 'styled-components';
import Color from '../../constants/Colors';

import {SearchAutosuggest, Search} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';
import AbortController from '../../middleware/AbortController';

import SearchTabNavigator from '../../components/SearchTabNavigator';
import SearchBarWithCart from '../../components/SearchBarWithCart';
import SearchDynamicResult from '../../components/SearchDynamicResult';
import RecentSearches from '../../components/RecentSearches';

const Theme = styled.ScrollView`
	background-color: ${Color.homeBackgroundColor};
	height: 600px;
`;

const SearchFetchScreenPresenter = ({navigation, ...props}) => {
	const [timeOut, updateTimeOut] = React.useState(null);  	
	let body=null;
	const [searchData, updateSearchData] = useState(null);
	const [isSearchSelected, updateSearchSelected] = useState(false);
	React.useEffect(()=>{
		abortController = new AbortController();		
		backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		return()=>{
			backHandler.remove();
			abortController._abort();
		}
	},[]);

	const handleBackPress = () => {
		if(searchData!==null) {
			clearSearch();
			return true;
		}
	}
	const clearSearch = () => {
	    clearTimeout(timeOut);
		updateSearchSelected(false);
		updateSearchData(null);
		props.clearCurrent();
		shops= null;
		products = null;
	};
	const fetchSearch = text => {
		if (text.length < 1) {
			clearSearch();
		} else if (text.length >= 1) {
			props.updateCurrent(text);
			// clearTimeout(timeOut);
			// updateTimeOut(
			// 	setTimeout(function() {
			// 		//fetch API
			// 		SearchAutosuggest(text)
			// 			.then(result => {
			// 				if (!result.error && !abortController._signal()) {
			// 					updateSearchData(result.reason);
			// 				}
			// 			})
			// 			.catch(err => {
			// 				AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
			// 			});
			// 	}, 850),
			// );
		}
	};
	const onSelectSearch = (searchText) => {
		let coordinates = null;
		if(props.address.savedAddresses.length > 0){
			coordinates = props.address.savedAddresses[props.address.currentAddress].coordinate;
		}else{
			coordinates = props.address.guestAddress;
		}
		Search(searchText, coordinates)
		.then((result)=>{
			if(!abortController._signal()){
				shops=result;
				products = result;
				props.updateRecent(searchText);
				updateSearchSelected(true);			
			}
		})
		.catch((err)=>{
			AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
		})
	}
	
	// if (searchData!==null & !isSearchSelected) 
	// 	body = <SearchDynamicResult data={searchData} onSelect={onSelectSearch}/>;
	if(isSearchSelected && shops!=null && products!=null) {
		body = <SearchTabNavigator shops={shops} products={products} navigation={navigation} />;
	}
	else{
		body = (
			<RecentSearches
				data={props.search.recentSearches}
				onSelectSearch={onSelectSearch}
			/>
		);
	}
	let content = (
		<Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
			<SearchBarWithCart
				fetchSearch={fetchSearch}
				searchTerm={props.search.currentSearch}
				navigation={navigation}
				clearSearch={clearSearch}
				startSearch={onSelectSearch}
				cartQuantity={Object.keys(props.cart.items).length}
			/>
			{body}
		</Theme>
	);
	return content;
};

const mapStateToProps = state => ({
	address : state.address,
	search: state.search,
	cart : state.cart,
});
const mapDispatchToProps = dispatch => ({
	clearCurrent: () => {
		dispatch(clearCurrentSearch());
	},
	updateCurrent: searchTerm => {
		dispatch(updateCurrentSearch(searchTerm));
	},
	updateRecent: searchTerm => {
		dispatch(updateRecentSearches(searchTerm));
	}
});
export default React.memo(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(SearchFetchScreenPresenter),
);