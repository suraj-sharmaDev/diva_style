import React from 'react';
import styled from 'styled-components';
import {height, width} from '../constants/Layout';
import Fonts from '../constants/Fonts';

const Container = styled.View`
	height : ${height};
	width : ${width};
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image``;
const ErrorText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
`;
const InfoText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
`;

const NetworkServiceOffline = () => {
	let content = (
		<Container>
			<Image source={require('../assets/images/service_out_of_range.png')} />
			<ErrorText>Network Error</ErrorText>
			<InfoText>There seems to error in your network!</InfoText>
		</Container>
	);
	return content;
}

export default NetworkServiceOffline;