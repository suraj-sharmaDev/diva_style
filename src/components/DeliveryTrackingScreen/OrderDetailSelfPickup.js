import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components';
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import OrderDetailModal from './OrderDetailModal';
import OrderStatusInfoView from './OrderStatusInfoView';

import {AlertService} from '../../middleware/AlertService';

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
	width : 40%;
	border-radius : 10px;
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const CallButton = styled.TouchableOpacity``;

const GoogleMapsButton = styled.TouchableOpacity`
	justify-content : center;
	align-items : center;
	padding : 10px;
	width : 80%;
	border-radius : 10px;
`;

const OrderDetailSelfPickup = props =>{
	const [active, updateActive] = React.useState(false);

	const callDeliveryBoy = (mobile) => {
		Linking.openURL(`tel:${mobile}`);
	}
	const completeSelfPickUp = () => {
		AlertService('Order!', 'Have you picked up your order?', props.completeSelfPickUp);
	}
	let orderPlaced =false;
	let deliveryAssigned = false;
	let orderArriving = false;
	if(props.order.deliveryStatus==='pending'){
		orderPlaced = true;
	}else if(props.order.deliveryStatus==='accepted'){
		orderPlaced = true;
		deliveryAssigned = true;
	}else if(props.order.deliveryStatus==='picked'){
		orderPlaced = true;
		deliveryAssigned = true;		
		orderArriving = true;
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
			<Row style={{justifyContent:'space-between', paddingTop : 10, height : 70}}>
				<Button onPress={()=>updateActive(true)} style={{backgroundColor : Colors.greenColor}}>
					<ButtonText style={{color : 'white'}}>Order Details</ButtonText>
				</Button>
				<Button style={{backgroundColor : Colors.greenColor}} onPress={completeSelfPickUp}>
					<ButtonText style={{color : 'white'}}>Picked Up</ButtonText>
				</Button>				
			</Row>
			<Row style={{justifyContent:'center', paddingTop : 0}}>
				<GoogleMapsButton style={{backgroundColor : Colors.greenColor}} onPress={props.openNativeMaps}>
					<ButtonText style={{color : 'white'}}>Open in Google Maps</ButtonText>
				</GoogleMapsButton>
			</Row>			
			<OrderDetailModal active={active} order={props.order} updateActive={()=>updateActive(!active)} />
		</Container>
	);
	return content;
}

export default OrderDetailSelfPickup;