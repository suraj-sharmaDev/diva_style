import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	margin-top : 15%;
	align-items : center;
	justify-content : center;
`
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	color : ${Colors.greenColor};
`;
const Button = styled.TouchableOpacity``;
const InfoBox = props => {
	let content = (
		<Container>
			<Text>{props.infoText}</Text>
			<Button>
				<Text></Text>
			</Button>
		</Container>
	);
	return content;
}

export default InfoBox;