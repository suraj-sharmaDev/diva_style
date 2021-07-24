import React from 'react';
import {Dimensions} from 'react-native';
import NotificationBar from "../../components/DeliveryTrackingScreen/Modules/NotificationBar";
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
	height : ${height};
	width : ${width};
	align-items : center;
	justify-content : flex-end;	
`;
const InfoBox = styled.View`
	flex : 0.75;
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image``;
const InfoText = styled.Text`
	margin-top : 30px;
	font-size : 20px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.lightGreyColor};
`;
const EmptyCart = (props) => {
	let content = (
		<Container>
			<InfoBox>
				<InfoText>
					No Items in your cart
				</InfoText>
				<Image 
					source={require('../../assets/images/empty-cart.png')} 
				/>				
			</InfoBox>
			<NotificationBar navigation={props.navigation}/>	
		</Container>
	);
	return content;
}

export default EmptyCart;