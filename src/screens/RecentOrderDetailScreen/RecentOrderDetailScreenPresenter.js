import React, { useState, useEffect } from "react";
import { Platform } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import Entypo from "react-native-vector-icons/Entypo";

import {AlertService} from '../../middleware/AlertService';
import {retrieveCart} from '../../store/actions/cart';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Address from '../../components/RecentOrderDetailScreen/Address';
import BillDetail from '../../components/RecentOrderDetailScreen/BillDetail';
import ReorderButton from '../../components/RecentOrderDetailScreen/ReorderButton';

const Theme = styled.View`
  height : 100%;
  padding-horizontal : 10px;
  padding-top: 10px;
  background-color : ${Colors.homeBackgroundColor};
`;
const Header = styled.View`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	margin-bottom : 20px;
`;
const BackButton = styled.TouchableOpacity`
`;
const HeaderText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 18px;
`;

const RecentOrderDetailScreenPresenter = (props) => {
	const order=props.navigation.getParam('item');
	const reorderHandler = () => {
		order.items.map(el=>{
			el['name'] = el.productName
		})
		let payload = [order];		
		props.onReorder(payload);
		props.navigation.navigate('CartStack');
	} 
	const redorderCriteria = () => {
		if(props.cart.shopId!=""){
			AlertService('Items in Cart', 'You already have some items in cart, do you want to replace them?', reorderHandler);			
		}else{
			reorderHandler();
		}
	}
	let content = (
		<Theme>
			<Header>
				<BackButton onPress={() => props.navigation.goBack()}>
					<Entypo name="chevron-left" size={30} color={Colors.greenColor} />
				</BackButton>
				<HeaderText>Summary for #ORDERID{order.id}</HeaderText>
			</Header>
			<Address 
				shopInfo = {{
					shopName : order.shopName, 
					shopAddress : null,
					shopImage: order.shopImage
				}}
			/>
			<BillDetail bill={order.items} />
			<ReorderButton clickHandler={redorderCriteria}/>
		</Theme>
	);
	return content;
};

const mapStateToProps = state =>{
	return {
		cart : state.cart
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onReorder : data => {
			dispatch(retrieveCart(data));			
		}
	}
}
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(RecentOrderDetailScreenPresenter));
