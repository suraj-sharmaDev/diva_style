import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	padding: 3px;
	height: 90%;
	align-items: center;
	justify-content: center;
`;
const Image = styled.Image`
	width: 20px;
	height: 20px;
`;
const Label = styled.Text`
	font-family: ${Fonts.normalFont};
	text-transform: capitalize;
`;

const HomeNavigationButton = ({ label, active }) => {
	let iconImage = "";
	switch (label) {
		case 'shops':
			iconImage = require('../../assets/images/shops.png');
			break;
		case 'services':
			iconImage = require('../../assets/images/services.png');
			break;
	}
	let content = (
		<Container>
			<Image source={iconImage} style={{ tintColor: active ? null : Colors.lightGreyColor }} />
			<Label style={{ color: active ? Colors.greenColor : Colors.lightGreyColor }}>
				{label}
			</Label>
		</Container>
	);
	return content;
}

export default HomeNavigationButton;