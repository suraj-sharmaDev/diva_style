import React from 'react';
import styled from 'styled-components';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";
import QuantityButton from './QuantityButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Card = styled.View`
	padding : 0px 20px;
	flex-direction : row;
	justify-content : space-between;
	margin-bottom : 10px;
`;
const View = styled.View``;
const QuantityDiv = styled.View`
	flex-direction : column;
	align-items : center;
`;
const Text = styled.Text`
	font-size : 16px;
	font-family  : ${Font.normalFont};
`;
const OriginalPrice = styled.Text`
	font-size : 16px;
	font-family  : ${Font.normalFont};
	color : ${Color.darkGreyColor};
`;
const Image = styled.Image`
  border-radius: 12px;
  height: 100px;
  width: 150px;
`;
const ItemCard = props => {
	let amount = props.info.price * props.info.qty;
	let productName = typeof props.info.name != 'undefined' ? props.info.name : props.info.productName;
	let content = (
		<Card>
			<View style={{ flexDirection : 'row', alignItems : 'center', width : '60%'}}>
				<Icon name="brightness-1" style={{ marginRight : 10 }}/>
				<View>
					<Text numberOfLines={1}>{productName}</Text>
					<OriginalPrice>Rs {props.info.price}</OriginalPrice>
				</View>
			</View>
			<QuantityDiv>
				<QuantityButton 
					item={{productId : props.info.productId, name : productName, price : props.info.price}} 
					store={props.store} 
					onIncrement={props.onIncrement} 
					onDecrement={props.onDecrement}
					refresh = {props.refresh}
				/>
				<Text>Rs {amount}</Text>
			</QuantityDiv>
		</Card>
	);
	return content;
}

export default ItemCard;