import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import styled from "styled-components";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.ScrollView`
	margin-top : 10px;
`;
const View = styled.View``;
const Row = styled.View`
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
	margin-vertical : 3px;
`;
const Header = styled.View`
	margin-vertical : 5px;
`;
const BoldText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 15px;
	text-transform : capitalize;
`;
const BillView = styled.View`
	margin-top : 10px;
	padding-bottom : 4px;
	flex-direction : row;
	justify-content : space-between;
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.greyColor};
	align-items : center;
`;
const Item = ({item}) => {
	return (
		<BillView>
			<View style={{flex: 0.8}}>
				<Text>{item.productName}</Text>
				<Text>{item.qty} x Rs {Math.round(item.price)}</Text>
			</View>
			<View style={{flex: 0.2}}>
				<Text style={{textAlign: 'right'}}>Rs {item.qty * Math.round(item.price)}</Text>
			</View>
		</BillView>
	);
}
const BillDetail = ({bill, ...props}) => {
	total = 0;
	let content = (
		<Container>
			<Header>
				<BoldText>Your Order Details</BoldText>
			</Header>
			<View>
				{
					bill.map((b, index)=>{
						total+=b.qty*b.price
						return <Item item={b} key={index}/>
					})
				}
					<View>
						<Row>
							<BoldText>Delivery Charge</BoldText>
							<BoldText>Rs 20</BoldText>							
						</Row>
						<Row>
							<BoldText>Total Price</BoldText>
							<BoldText>Rs {Math.round(total+20)}</BoldText>							
						</Row>
					</View>
			</View>
		</Container>
	);

	return content;
}

export default BillDetail;