import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {incItem, decItem} from '../../store/actions/cart';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";

import {AddCart, DeleteCart} from '../../middleware/API';
import CustomizeList from './CustomizeList';
import {AlertService} from '../../middleware/AlertService'; 
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View``;

const ButtonContainer = styled.View`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 80px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonContainer = styled.TouchableOpacity`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 60px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonView = styled.View`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Button = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Quantity = styled.View`
	flex : 2;
	flex-direction : row;
	align-items : center;
	justify-content : center;	
	background-color : white;
`;

const QuantityText = styled.Text`
	font-family : ${Font.normalFont};
	color : ${Colors.greenColor};
`;
const Label = styled.Text`
	font-family : ${Font.normalFont};
	color : ${Colors.greenColor};
`;

const ShopQuantityButton = ({item, ...props }) => {
	const [selected, setSelected] = useState(null);
	const [active, updateActive] = useState(false);

	useEffect(()=>{
		if(Object.keys(props.cart.items).length > 0 && !props.cart.tracking){
			setSelected(props.cart.items.find((s)=>(s.productId == item.productId)));
		}else{
			setSelected(null);
		}
	}, [props.cart.items.length])

	const onCustomiseHandler = (data) => {
		if(data.name==='none'){
			onIncrement(item.shopId, item.productId, item.name, item.price);
		}else{
			let name = `${item.name} ${data.name}`;
			price = parseInt(item.price) + parseInt(data.amount);
			onIncrement(item.shopId, item.productId, name, price);			
		}
	}

	const onAddToCartApi = (shopId, productId, name, price, prevShopId = null) => {
		let data = 	{
			"master":{
				"shopId": shopId,
				"customerId": props.user.userId,
				"prevShopId": prevShopId
			},
			"detail": [
				{
				"productId": productId,
				"name": name,
				"image": null,
				"price": price,
				"qty": 1
				}    
			]
		};
		// add this data to cart API
		AddCart(data)
		.then((res)=>console.log(res))
		.catch(err=>console.warn(err));
	}

	const onDeleteFromCartApi = (shopId, productId) => {
		let data = [productId];
		DeleteCart(data, shopId, props.user.userId)
		.then((res)=>console.log(res))
		.catch((err)=>console.warn(err))
	}

	const onIncrement = (shopId, productId, name, price) => {
		if(props.address.savedAddresses.length === 0){
			AlertService('No saved Address',"You don't have saved addresses. Create one!", ()=>{
				props.navigation.navigate('LocationSelector')
			});
			return;
		}
		if(shopId===props.cart.shopId || props.cart.shopId=== 0){
			if(ButtonDisabled){
				AlertService('Tracking','Your already have an order in progress!', ()=>{});
			}else{
				if(typeof selected == 'undefined'){
					//that means this item is added for first time
					//so post a copy to backend
					onAddToCartApi(shopId, productId, name, price);
				}
				props.incrementItem({
					shopId: shopId,
					deliveryAvail : item.deliveryAvail,
					productId: productId,
					name: name,
					price: price,
				});
			}
		}else{
			AlertService('Cart Not Empty','Your cart contains items from other shop. \n Replace it?!', ()=>{
				//first delete all the items from cloud belonging to previous shop
				onAddToCartApi(shopId, productId, name, price, props.cart.shopId);				
				//then replace cart in localstorage
				props.incrementItem({
					shopId: shopId,
					deliveryAvail : item.deliveryAvail,
					productId: productId,
					name: name,
					price: price,
				});
			});			
		}
	};

	const onDecrement = productId => {
		if(ButtonDisabled){
			AlertService('Tracking','Your already have an order in progress!', ()=>{});
		}else{
			if(selected.qty === 1){
				onDeleteFromCartApi(item.shopId, productId);
			}
			props.decrementItem(productId);
		}
	};

	let ButtonDisabled = props.cart.tracking ? true : false;
	let content = null;
	if(selected)
	{
		content = (
			<ButtonContainer>
				<Button onPress={()=>{onDecrement(item.productId)}}>
					<Entypo name="minus" color={Colors.greenColor} />
				</Button>
				<Quantity>
					<QuantityText>{selected.qty}</QuantityText>
				</Quantity>
				<Button onPress={()=>{onIncrement(item.shopId, item.productId, item.name, item.price)}}>
					<Entypo name="plus" color={Colors.greenColor} />
				</Button>
			</ButtonContainer>
		);
	}
	else
	{
		content = (
			<React.Fragment>
				<DefaultButtonContainer
					disabled={props.onlineStatus==0}
					style={{opacity : props.onlineStatus==0 ? 0.4 : 1}} 
					onPress={()=>{item.extras!==null ? updateActive(true) : onIncrement(item.shopId, item.productId, item.name, item.price)}}
				>
					<View style={{flex:1, flexDirection :'row', alignItems : 'center', jusitfyContent : 'center'}}>
						<Label>Add</Label>
						<DefaultButtonView>
							<Entypo name="plus" color={Colors.greenColor} />
						</DefaultButtonView>
					</View>
				</DefaultButtonContainer>
				{
					item.extras!==null
					?
					<CustomizeList 
						extras={JSON.parse(item.extras)} 
						active={active} 
						updateActive={()=>updateActive(!active)}
						onCustomiseHandler={onCustomiseHandler}
					/>
					:
					null
				}
			</React.Fragment>
		);
	}
	return content;
}

const mapStateToProps = state => {
  return {
	cart: state.cart,
	user: state.user,
	address: state.address
  };
};
const mapDispatchToProps = dispatch => {
  return {
    incrementItem: data => {
      dispatch(incItem(data));
    },
    decrementItem: productId => {
      dispatch(decItem(productId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopQuantityButton);

// export default ShopQuantityButton;