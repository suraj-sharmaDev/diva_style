import React from 'react';
import styled from 'styled-components';
import {StyleSheet} from 'react-native';
import {width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	padding: 4px 0px;
	align-items : center;
	justify-content : center;
`;
const Button = styled.TouchableOpacity`
	width : ${width*0.6};
	padding : 8px 10px;
	background-color : ${Colors.greenColor};	
	align-items : center;
	justify-content : center;
	border-radius : 7px;
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 15px;
	color : white;
`;

const ReorderButton = (props) => {
	let content = (
		<Container style={styles.shadow}>
			<Button onPress={props.clickHandler} activeOpacity={0.5}>
				<ButtonText>Reorder</ButtonText>
			</Button>
		</Container>
	);
	return content;
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		
		elevation: 3,		
	}
})
export default ReorderButton;