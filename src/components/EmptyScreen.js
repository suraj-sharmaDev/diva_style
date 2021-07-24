import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
const Container = styled.View`
	padding : 20px;
	align-items : center;
	justify-content : center;
`;
const InfoBox = styled.View`
	background-color : ${Colors.disabledGreenColor};
	padding : 10px;
`;
const Image = styled.Image`

`;
const InfoText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 16px;
`;

const EmptyScreen = props => {
	let content = (
		<Container>
			<InfoBox>
				<InfoText>Nothing to display</InfoText>
			</InfoBox>
		</Container>
	);
	return content;
}

export default EmptyScreen;