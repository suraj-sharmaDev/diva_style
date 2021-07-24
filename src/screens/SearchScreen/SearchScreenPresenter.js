import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import { Container, Content, View } from 'native-base';
import styled from "styled-components";
import {connect} from 'react-redux';

import Color from "../../constants/Colors";

import AbortController from '../../middleware/AbortController';
import {GetCategories} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

import LoadingScreen from '../../components/LoadingScreen';
import ServiceOutOfRange from "../../components/ServiceOutOfRange";
import FakedSearchBarWithCart from "../../components/FakedSearchBarWithCart";
import ScrollCategory from "../../components/ScrollCategory";
import SearchMenu from "../../components/SearchMenu";

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const SearchScreenPresenter = ({navigation, ...props}) => {
	const [selectedId, setSelectedId] = useState(null);
	useEffect(() => {
		abortController = new AbortController();
		initialization();
		return ()=>{
			abortController._abort();			
		}
	},[props.address]);
	const initialization = () => {
		if(!props.address.serviceUnavailable)
		{
			GetCategories()
			.then((result)=>{
				if(!abortController._signal()){
					DATA = result;			
					selectedCategory = DATA[0];		
					setSelectedId(DATA[0].id);
				}
			})
			.catch((err)=>{
				AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
			})
		}
	}
	const onSelect = (categoryId, index) => {
		// console.warn(categoryId, index);
		selectedCategory = DATA[index];
		setSelectedId(categoryId);
	};
	let content = <LoadingScreen />;
	if(props.address.serviceUnavailable){
		content = (
			<React.Fragment>
				<View style={{height : 57}} />
				<ServiceOutOfRange />
			</React.Fragment>
		);
	}
	else if(selectedId!==null){
		content = (
			<Container>
				<Content>
					<Theme>
						<FakedSearchBarWithCart navigation={navigation} cart={props.cart}/>
						<ScrollCategory selected={selectedId} onSelect={onSelect} data={DATA} />
						<SearchMenu
							selectedCategory={selectedCategory}
							selectedId={selectedId}
							navigation={navigation}
							address={props.address}
						/>
					</Theme>
				</Content>
			</Container>
		);
	}
	return content;
};

const mapStateToProps = state => {
	return {
		address : state.address,
		cart : state.cart
	}
}
export default connect(mapStateToProps, {})(SearchScreenPresenter);
