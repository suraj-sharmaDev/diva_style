import React from "react";
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	padding : 10px;
	flex-direction : row;
	align-items : center;
	border-width : 1px;
	border-color : ${Color.greyColor};
	background-color : white;
	border-top-width : 0px;
`;
const View = styled.View``;
const Text = styled.Text`
	color : ${Color.blackColor};
	font-size : 22px;
	font-family : ${Font.boldFont};
	padding-left : 20px;
`;
const Button = styled.TouchableOpacity`
	padding : 5px;
`;
const Header = props => {
	let content = (
		<Container>
			<View>
				<Button onPress={()=>props.navigation.goBack()}>
					<Icon name="keyboard-backspace" style={{ fontSize : 22, color : Color.blackColor }}/>
				</Button>
			</View>
			<View>
				<Text>Manage Address</Text>
			</View>			
		</Container>
	);
	return content;
}

export default Header;