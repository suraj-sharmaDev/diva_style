import React from 'react';
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import styled from "styled-components";
import Color from "../constants/Colors";
import ShopDetailCard from "./HomeScreen/ShopDetailCard";
import EmptyScreen from './EmptyScreen';

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 0px 20px 0px;
`; 
const DataContainer = styled.View``;
const Text = styled.Text``;
const ShopsContainer = props => {
	const shopContainer = (
	  <DataContainer>
	      <FlatList
	        data={props.data}
	        horizontal = {false}
	        renderItem={({ item }) => {
		        return(
		          <ShopDetailCard
		            info = {item}
		            navigation = {props.navigation}
		          />
		        )}
	    	}
	        keyExtractor={(item,index) => index+'key'}
	        extraData={props.data}
	      />
	  </DataContainer> 
	);
	return shopContainer;
}

const SearchStaticResultShops = props => {
	React.useEffect(()=>{
	},[]);
	const content = (
		<Container>
		{
			Object.keys(props.shops).length > 0
			?
			<ShopsContainer data={props.shops} navigation={props.navigation}/>
			:
			<EmptyScreen />
		}
		</Container>
	);
	return content;
}

const mapStateToProps = state => ({
	search : state.search
})

export default React.memo(connect(mapStateToProps, [])(SearchStaticResultShops));