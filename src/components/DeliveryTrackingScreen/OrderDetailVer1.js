import React from 'react';
import styled from 'styled-components';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const Container = styled.View`
	padding : 10px;
`;
const StatusView = styled.View`
	background-color : ${Colors.greenColor};
	padding : 5px;
	align-items : center;
	justify-content : center;
	border-radius : 3px;
`;
const StatusText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	color : white;
`;
const Table = styled.View`
	justify-content : center;
`;
const Row = styled.View`
	flex-direction : row;
	justify-content : space-between;
`;
const Column = styled.View`
	flex : 1;
	flex-direction : column;
`;
const Total = styled.Text`
	margin-top : 20px;
	font-family : ${Fonts.boldFont};
	text-align : center;
`;
const Header = styled.Text`
	font-family : ${Fonts.boldFont};
	text-align : center;
	font-size : 18px;
	text-decoration-line: underline;
	text-decoration-style: solid;
    text-decoration-color: ${Colors.greyColor};	
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	text-align : center;
`;

const OrderItem = ({item}) => {
	return(
	 <Row>
		<Column>
			<Text>{item.name}</Text> 
		</Column>
		<Column>
			<Text>{item.qty}</Text> 			
		</Column>
		<Column>				
			<Text>Rs {item.price}/-</Text>
		</Column>
	 </Row>
	);
}
const OrderDetailVer1 = props =>{
	count = 0;
	if(props.order.deliveryStatus==='pending'){
		deliveryStatus = 'Your order will be received soon';
	}else if(props.order.deliveryStatus==='accepted'){
		deliveryStatus = 'Your order has been received and will be picked up soon';
	}else if(props.order.deliveryStatus==='picked'){
		deliveryStatus = 'Your Order has been picked up and will be delivered to you';
	}else{
		deliveryStatus = 'Your Order has been delivered';		
	}
	let content = (
		<Container>
			<Table>
				<Row>
					<Column>
						<Header>Name</Header>
					</Column>
					<Column>
						<Header>Quantity</Header>
					</Column>
					<Column>				
						<Header>Price/Qty</Header>			
					</Column>			
				</Row>
				{
					props.order.items.map((i, index)=>{
						count = count + i.qty * i.price;
						return(<OrderItem item={i} key={index} />)
					})
				}				
			</Table>
			<Total>You pay total of Rs {props.order.totalAmount}/-</Total>
			<StatusView>
				<StatusText>{deliveryStatus}</StatusText>
			</StatusView>
		</Container>
	);
	return content;
}

export default OrderDetailVer1;