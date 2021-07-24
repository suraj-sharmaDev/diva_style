import React from 'react';
import styled from 'styled-components';
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

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
const CallButton = styled.TouchableOpacity``;

const OrderStatusInfoView = props => {
	// console.warn(props.order);
	let content = null;
	if(props.orderPlaced && props.deliveryAssigned){
		//when deliveryboy is assigned as well as dealer has accepted order
		content = (
			<React.Fragment>
				<View style={{alignItems: 'center'}}>
					<DeliveryImage>
						<Icon name="account" size={50} color={Colors.greyColor} />
					</DeliveryImage>
					<Text style={{color: Colors.semiDarkGreyColor, fontSize: 15}}>
						{props.deliveryBoyName}
					</Text>
				</View>
				<CallButton
					activeOpacity={0.8}
					style={{padding: 12}}
					onPress={() => props.callDeliveryBoy()}>
					<Icon name="phone" size={24} color={Colors.greenColor} />
				</CallButton>
			</React.Fragment>
		);
	}else if(!props.orderPlaced){
		//when dealer has not accepted order yet
		content = (
			<React.Fragment>
				<DeliveryImage>
					<Icon name="account" size={50} color={Colors.greyColor} />
				</DeliveryImage>
				<Text style={{color: Colors.semiDarkGreyColor, fontSize: 15}}>
					Waiting for dealer to accept your order
				</Text>
			</React.Fragment>
		);
	}else{
		//when deliveryboy is Waiting to be assigned
		content = (
			<React.Fragment>
				<DeliveryImage>
					<Icon name="account" size={50} color={Colors.greyColor} />
				</DeliveryImage>
				<Text style={{color: Colors.semiDarkGreyColor, fontSize: 15}}>
					Finding delivery boy for your order
				</Text>
			</React.Fragment>
		);		
	}
	return content;
}

export default OrderStatusInfoView;