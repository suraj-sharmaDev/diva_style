import React from 'react';
import { Button } from 'native-base';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	position : absolute;
	bottom : 30px;
	width : 100%;
	padding : 10px;
	border-width : 1px;
	border-color : ${Color.greyColor};
	background-color : white;
`;
const Text = styled.Text`
	font-family : ${Font.boldFont};
	font-size : 16px;
	color : ${Color.greenColor};
	text-transform : uppercase;
`;

const Footer = props => {
	const addAddress = () => {
		props.navigation.navigate('LocationSelector',{screen : 'ManageAddress'});
	}
	let content = (
		<Container>
			<Button block bordered success onPress={addAddress}>
				<Text>Add New Address</Text>
			</Button>
		</Container>		
	);
	return content;
}

export default Footer;