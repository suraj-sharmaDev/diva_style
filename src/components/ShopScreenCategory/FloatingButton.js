import React from 'react';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";
const Container = styled.View`
	padding : 5px 10px;
	flex-direction : row;
	justify-content : center;
	align-items : center;
	width : 100%;
`;
const FAB = styled.TouchableOpacity`
	background-color : ${Color.greenColor};
	padding : 8px 15px;
	border-radius : 10px;	
`;
const Text = styled.Text`
	font-size : 14px;
	font-family : ${Font.boldFont};
	color : white;
`;
const FloatingButton = props => {
	let content = (
		<Container>
			<FAB activeOpacity={0.5} onPress={props.updateActive}>
				<Text>Categories</Text>
			</FAB>
		</Container>
	);
	return content;
};

export default FloatingButton;