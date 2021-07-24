import React from 'react';
import {ScrollView } from 'react-native';
import {connect} from 'react-redux';
import SearchIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";

import {SearchInShope} from '../../middleware/API';
import {addToCacheFromSearch} from '../../store/actions/shop';
import {height, width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	width : ${width};
	height: ${height};
	padding : 10px 10px 60px 10px;
	background-color : white;
`;
const Header = styled.View`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	background-color : white;
`; 
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor};
	font-size : 15px;
	text-transform : capitalize;
`;
const Button = styled.TouchableOpacity``;
const SearchBarContainer = styled.View`
  flex-direction : row;
  align-items : center;
  justify-content : center;
  padding : 0px 10px;
  height : 40px;
  border-radius : 12px;
  background-color : ${Colors.searchBarColor};
`;
const Input = styled.TextInput`
	width : ${width*0.7};
`;
const SearchOutputItem = styled.TouchableOpacity`
	padding : 20px 10px;
`;

const ModalHeader = props => {
	const [timeOut, updateTimeOut] = React.useState(null);
	onChangeHandler = (text) => {
		props.updateSearchTerm(text);
		if(timeOut) clearTimeout(timeOut);
		if(text.length===0){
			props.doSearch('cleanSlateMode');
		}
		if(text.length>2)
		{
			updateTimeOut(setTimeout(function() {
				props.doSearch(text.toLowerCase());
			}, 500))
		}
	}
	let header = (
		<Header>
		  <Button onPress={props.updateActive}>
			  <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
		  </Button>
	      <SearchBarContainer>
	        <SearchIcon name="search" size={22} color={Colors.lightGreyColor} />      
	        <Input placeholder="Search for products"
	        	   value={props.searchTerm} 
	               underlineColorAndroid="transparent"
	               autoFocus={true}
	               onChangeText={(e)=>onChangeHandler(e)}
	        />
	      </SearchBarContainer>
		</Header>
	);
	return header;
}
const SearchOutput = ({data, onSearchItemPress}) => {
	let Body = (
		<SearchOutputItem onPress={()=>onSearchItemPress(data)}>
			<Text>{data.name}</Text>
			<Text>In {data.subCategoryName}</Text>
		</SearchOutputItem>
	);
	return Body;
}	
const SearchInShop = ({data, searchHandler, ...props}) => {
	let contentBody = [];
	const [searchTerm, updateSearchTerm] = React.useState('');
	const [modalBody, updateModalBody] = React.useState([]);
	React.useEffect(()=>{
		// updateSearchTerm('');
		updateModalBody([]);
	},[props.active])
	const handleBackPress = () => {
		if(searchTerm!=""){
			updateModalBody([]);
			updateSearchTerm('');
			return true;
		}
		else if(props.active){
			props.updateActive();
			return true;
		}
	}	
	const doSearch = text => {
		if(text==='cleanSlateMode'){
			updateModalBody([]);
		}else{
			//Here we make an API call to get all searched items for this shop
			//but search for the item in our cache if not found then only make an API call
			const categoryLength = Object.keys(props.shop.categories).length;
			if(categoryLength > 0){
				var content = [];
				if(props.shop.shopId==props.shopId){
					content = searchInArray(props.shop.categories, text);
				}
				if(content.length > 0){
					updateModalBody(content);
				}else{
					//if searched item not found
					fetch(text)
					.then((result)=>{
						updateModalBody(result);
					})
					.catch((error)=>{
						console.warn('error nested', error);	
					});					
				}
			}else{
				//if cache is empty
				fetch(text)
				.then((result)=>{
					updateModalBody(result);
				})
				.catch((error)=>{
					console.warn('error', error);	
				});
			}
		}
	}
	const fetch = async(text) => {
		var data = [];
		const result = await SearchInShope(props.shopId, text);
		if(result.error === undefined){
			props.addToCache({category: result, shopId: props.shopId});
			const products = result[0].data;
			const productsLength = Object.keys(products).length;
			for(var i=0; i<productsLength; i++){
				data.push(<SearchOutput key={i} 
										data={{name : products[i].name, 
											  subCategoryName : result[0].title, 
											  categoryId : result[0].categoryId, 
											  subCategoryId : result[0].subCategoryId,
											  subCategoryChildId : result[0].subCategoryChildId}
										}
										onSearchItemPress={onSearchItemPress}
						  />
				);
			}
		}else{
			data.push(<SearchOutput key={'121'} data={{name : 'Searched Item unavailable', subCategoryName : 'this shop'}} onSearchItemPress={()=>{}} />);
		}
		return data;
	}
	const searchInArray = (array, key) => {
		var arrayLength = Object.keys(array).length;
		var data = [];
		for (var i = 0; i < arrayLength; i++) {
			var subCategory = array[i].subCategories;
			var subCategoryLength = Object.keys(subCategory).length;
			for (var j = 0; j < subCategoryLength; j++) {
				var subCategoryChild = subCategory[j].subCategoryChild;
				var subCategoryChildLength = Object.keys(subCategoryChild).length;
				for (var k = 0; k < subCategoryChildLength; k++) {
					var products = subCategoryChild[k].data;
					var productsLength = Object.keys(products).length;
					for (var l = 0; l < productsLength; l++) {
						var productName = products[l].name.toLowerCase();
						if (productName.includes(key.toLowerCase())) {
							data.push(<SearchOutput key={`${i}${j}${k}${l}`} 
													data={{name : productName, 
														  subCategoryName : subCategoryChild[k].title, 
														  categoryId : array[i].categoryId, 
														  subCategoryId : subCategory[j].subCategoryId,
														  subCategoryChildId : subCategoryChild[k].subCategoryChildId}
													}
													onSearchItemPress={onSearchItemPress}
									  />
							);
						}
					}
				}
			}
		}
		return data;
	}
	const onSearchItemPress = (data) =>{
		props.updateActive();
		searchHandler(data);
	}
	let content=(
		<React.Fragment>
			<Modal
			isVisible={props.active}
			onBackButtonPress={handleBackPress}	
			onBackdropPress={props.updateActive}
			animationIn={'slideInUp'}
			animationOut={'slideOutDown'}
			animationOutTiming={200}
			deviceWidth={width}
			deviceHeight={height}
			backdropColor={'white'}
			backdropOpacity={0.3}
			style={{ justifyContent:'flex-start', margin:0, padding:0}}>
				<Container>
					<ModalHeader 
						updateActive={props.updateActive} 
						searchTerm={searchTerm} 
						updateSearchTerm={updateSearchTerm} 
						doSearch={doSearch}
					/>
					{
						modalBody.length>0
						?
						<ScrollView>
							{modalBody}
						</ScrollView>
						:
						null
					}
				</Container>
			</Modal>
		</React.Fragment>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInShop);
