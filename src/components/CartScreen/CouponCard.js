import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";
const Container = styled.TouchableOpacity`
	margin-top : 10px;
	padding : 12px 20px;
	border-width : 1px;
	border-color : ${Color.greyColor};
	flex-direction : row;
	align-items : center;
`;
const Text = styled.Text`
	font-size : 16px;
	font-family  : ${Font.boldFont};
	margin-left : 20px;
`;
const CouponCard = props => {
	let content = (
		<Container onPress={props.couponReedem}>
			<Icon name="brightness-percent" size={18}/>
			<Text>Apply Coupon</Text>
		</Container>
	);
	return content;
}

export default CouponCard;