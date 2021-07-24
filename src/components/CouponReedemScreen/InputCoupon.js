import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	border-width : 1px;
	border-color : ${Colors.greyColor};
	padding : 0px 10px; 
`;
const Input = styled.TextInput`
	width : 80%;
	font-family : ${Fonts.normalFont};
	font-size : 16px;
	align-items : center;
`;
const Button = styled.TouchableOpacity``;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	color : ${Colors.greenColor};
`;
const InputCoupon = props => {
	let content = (
		<Container>
			<Input 
				placeholder = "Enter Coupon"
				onChangeText={e => props.inputCoupon(e)}				
			/>
			<Button onPress={props.clickHandler}>
				<Text>Apply</Text>
			</Button>
		</Container>
	);
	return content;
}

export default InputCoupon;