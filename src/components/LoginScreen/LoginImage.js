import React from 'react';
import { Platform } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";

const View = styled.View`
	background-color : white;
	height : 100%;
	justify-content : center;
	align-items : center;
`;
const Image = styled.Image`
	height : 70%;
	width : 100%;
`;

const LoginImage = props => {
	let content = (
		<View>
			<Image 
				resizeMode="center"
				source={require('../../assets/images/loginBanner.png')} 
			/>		
		</View>
	);
	return content;
}

export default LoginImage;