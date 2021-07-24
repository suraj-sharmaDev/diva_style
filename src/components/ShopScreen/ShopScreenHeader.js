import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {height, width} from '../../constants/Layout';
import {AddShopToFavourite, DeleteShopFromFavourite} from '../../middleware/API';
import {addFavourite, deleteFavourite} from '../../store/actions/favourite';
import ShopScreenHeaderButtons from "./ShopScreenHeaderButtons";
import SearchInShop from "./SearchInShop";
import ShopInfoCard from "./ShopInfoCard";
import ShopDeliveryOption from "./ShopDeliveryOption";

const ImageView = styled.View`
	width: ${width}px;
	height: ${height * 0.3 + 10}px;
`;
const Image = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: stretch;
`;
const OverlayView = styled.View`
	width: ${width}px;
	height: ${height * 0.3}px;
	position: absolute;
	top: 0px;
    background-color: rgba(40, 40, 40, 0.4);	
`;
const View = styled.View`
	margin-top: -15px;
	background-color: white;
	border-top-right-radius: 18px;
`;

const ShopScreenHeader = ({Shop,...props}) => {
	const [searchActive, updateSearchActive] = React.useState(false);
	const favouriteHandler = (status) => {
		if(status){
			//remove from favourites
			props.deleteFromFavourite(Shop.id);
			DeleteShopFromFavourite(props.user.userId, Shop.id)
			.then(()=>{})
			.catch(err=>console.warn(err))			
		}else{
			//add it to favourites
			props.addToFavourite(Shop.id);	
			AddShopToFavourite(props.user.userId, Shop.id)
			.then(()=>{})
			.catch(err=>console.warn(err))
		}
	}
	let content = (
		<React.Fragment>
			<ImageView>
				<Image 
					source={{uri: Shop.image}}
				/>	
			</ImageView>
			<OverlayView>
				<ShopScreenHeaderButtons
					navigation={props.navigation}
					shopId={Shop.id}
					active={searchActive}
					favouriteHandler={favouriteHandler}
				/>
				<ShopInfoCard 
					name={Shop.name}
					image={Shop.image}
					category={Shop.category} 
					rating={Shop.rating}
					updateActive={() => updateSearchActive(!searchActive)}					
				/>				
			</OverlayView>
			<View>
				{
				<ShopDeliveryOption 
					navigation={props.navigation} 
				/>
				}
			</View>			
			<SearchInShop
				shopId={Shop.id}
				searchHandler={props.searchHandler}
				active={searchActive}
				updateActive={() => updateSearchActive(!searchActive)}
			/>
		</React.Fragment>
	);
	return content;
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
  };

  const mapDispatchToProps = dispatch => {
	return {
		addToFavourite: data => {
			dispatch(addFavourite(data));
		},
		deleteFromFavourite: data => {
			dispatch(deleteFavourite(data))
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(ShopScreenHeader);