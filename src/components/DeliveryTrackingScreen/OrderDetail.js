import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components';
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import OrderDetailModal from './OrderDetailModal';
import OrderStatusInfoView from './OrderStatusInfoView';

const Container = styled.ScrollView`
	padding : 0px 10px;
`;
const Row = styled.View`
	border-top-color : ${Colors.semiDarkGreyColor};	
	flex-direction : row;	
	align-items : center;
`;
const View = styled.View`
	flex-direction : row;
`;
const DeliveryImage = styled.View`
	border-radius : 40px;
	border-width : 1px;
	border-color : ${Colors.greyColor};
	margin-right : 10px;
`;
const Text = styled.Text`
	font-family : ${Fonts.lightFont};
	text-align : center;
	text-transform : capitalize;
`;
const Button = styled.TouchableOpacity`
	justify-content : center;
	align-items : center;
	padding : 10px;
	width : 80%;
	border-radius : 10px;
	background-color : ${Colors.greenColor};
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const CallButton = styled.TouchableOpacity``;
const OrderDetail = props =>{
	const [active, updateActive] = React.useState(false);

	const callDeliveryBoy = (mobile) => {
		Linking.openURL(`tel:${mobile}`);
	}

	let orderPlaced =false;
	let orderArriving = false;
	let orderCompleted = false;
	if(props.order.deliveryStatus==='pending'){
		orderPlaced = true;
	}else if(props.order.deliveryStatus==='accepted'){
		orderPlaced = true;
		orderArriving = true;
	}else if(props.order.deliveryStatus==='completed'){
		orderPlaced = true;
		orderArriving = true;
		orderCompleted = true;
	}

	let content = (
		<Container>
			<Row style={{ justifyContent:'space-between', borderTopWidth : 0.5, paddingTop : 10, paddingBottom : 10}}>
				<OrderStatusInfoView 
					order={props.order}
					callDeliveryBoy={()=>callDeliveryBoy(props.order.deliveryBoyMobile)}
				/>
			</Row>
			<Row style={{justifyContent:'space-between', borderTopWidth : 0.5, paddingTop : 10}}>
				<View>
					<Icon name="basket" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Your Order Placed</Text>
				</View>
				<Icon 
					name={orderPlaced ? "check-circle" : "check-circle-outline"} 
					size={20} 
					color={orderPlaced ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'space-between', paddingTop : 10}}>
				<View>
					<Icon name="account-clock" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Your Order Accepted</Text>
				</View>
				<Icon 
					name={orderArriving ? "check-circle" : "check-circle-outline"} 
					size={20} 
					color={orderArriving ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'space-between', paddingTop : 10}}>
				<View>
					<Icon name="truck-delivery" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Your Order Delivered</Text>
				</View>
				<Icon 
					name={orderCompleted?"check-circle":"check-circle-outline"} 
					size={20} 
					color={orderCompleted ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'center', paddingTop : 10, height : 80}}>
				<Button onPress={()=>updateActive(true)}>
					<ButtonText style={{color : 'white'}}>View Order Details</ButtonText>
				</Button>
			</Row>
			<OrderDetailModal active={active} order={props.order} updateActive={()=>updateActive(!active)} />
		</Container>
	);
	return content;
}

export default OrderDetail;