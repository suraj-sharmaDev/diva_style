import React from 'react';
import styled from 'styled-components';
import {height, width} from '../constants/Layout';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const Container = styled.View`
	height : ${height*0.75};
	width : ${width};
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image``;
const ErrorText = styled.Text`
	margin-top : 30px;
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	color : ${Colors.lightGreyColor};
`;
const InfoText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
	color : ${Colors.lightGreyColor};	
`;

const ServiceOutOfRange = () => {
	let content = (
		<Container>
			<Image source={require('../assets/images/service_out_of_range.png')} />
			<ErrorText>Service out of range</ErrorText>
			<InfoText>Don't worry, we are reaching you soon!</InfoText>
		</Container>
	);
	return content;
}

export default ServiceOutOfRange;