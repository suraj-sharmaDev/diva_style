import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";
import ChargeDetail from './ChargeDetail';

const Container = styled.View`
	padding : 10px 20px 20px 20px;
`;
const BillTitle = styled.Text`
	font-size : 18px;
	font-family : ${Font.boldFont};
`;
const Bill = styled.View`
	flex-direction : column;
`;
const BillItem = styled.View`
	flex-direction : row;
	justify-content : space-between;
	margin-top : 10px;
`;
const View = styled.View`
	flex-direction : row;
	align-items : center;
`;
const BillText = styled.Text`
	font-size : 16px;
	font-family : ${Font.boldFont};	
	color : ${Color.darkGreyColor};
	margin-right : 10px
`;
const Button = styled.TouchableOpacity`
	padding : 0px 2px;
`;
const BillCard = ({ store, deliveryFee, discountAmount, distance, totalAmountPreserver }) => {
	let amount = 0;
	store.items.map(s=>{
		amount+=s.price*s.qty;
	})
	totalAmountPreserver(amount); //delivery fee not added
	//check if delivery is available then only add delivery fee
	if(store.shopDeliveryAvailability!=0){
		totalAmount = amount + deliveryFee;		
	}else{
		totalAmount = amount;
	}
	let content= (
		<Container>
			<BillTitle>Bill Details</BillTitle>
			<Bill>
				<BillItem>
					<BillText>Item Total</BillText>
					<View>
						<Icon name="currency-inr" size={16} style={{ color : Color.darkGreyColor}}/>					
						<BillText>{amount}</BillText>
					</View>
				</BillItem>
				{
					store.shopDeliveryAvailability!=0
					?
					<BillItem>
						<View>
							<BillText>Delivery Fee</BillText>
							<ChargeDetail fee={deliveryFee} distance={distance}/>
						</View>
						<View>
							<Icon name="currency-inr" size={16} style={{ color : Color.darkGreyColor}}/>					
							<BillText>{deliveryFee}</BillText>
						</View>
					</BillItem>
					:
					null
				}				
				{
					discountAmount!=0
					?
					<BillItem>
						<BillText>Discount</BillText>
						<View>
							<Icon name="currency-inr" size={16} style={{ color : Color.darkGreyColor}}/>					
							<BillText>{discountAmount}</BillText>
						</View>
					</BillItem>
					:
					null
				}
				<BillItem>
					<BillText>To Pay</BillText>
					<View>
						<Icon name="currency-inr" size={16} style={{ color : Color.darkGreyColor}}/>					
						<BillText>{totalAmount - discountAmount}</BillText>
					</View>
				</BillItem>
				<BillItem>
					<BillText>Payment Method</BillText>
					<View>
						<BillText>
						{
							store.shopDeliveryAvailability==0
							?
							'Self Pickup'
							:
							'COD'
						}
						</BillText>
					</View>
				</BillItem>				
			</Bill>
		</Container>
	);
	return content;
}

export default BillCard;