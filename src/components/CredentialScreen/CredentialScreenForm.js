import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
	height : 85%;
	width : ${width};
	padding : 10px;
	justify-content : center;
`;
const FormView = styled.View`
	justify-content : center;
`;
const Label = styled.Text`
	padding : 0px 10px;
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor}
`;
const Input = styled.TextInput`
	width : 100%;
	padding : 7px 10px;
	border-width : 1px;
	border-color : ${Colors.greyColor};
	font-size : 14px;
	border-radius : 7px;
`;
const Button = styled.TouchableOpacity`
	width : 100%;
	margin-top : auto;	
	padding : 10px 8px;	
	align-items : center;
	justify-content : center;	
	border-radius : 7px;
	background-color : ${Colors.greenColor}
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.normalFont};
	color : white;
	font-size : 14px;
	text-transform : uppercase;
`;
const CredentialScreenForm = props => {
	const [userName, updateUserName] = React.useState('');
	React.useEffect(()=>{},[]);

	const changeHandler = (text) => {
		updateUserName(text);
	}
	let content = (
		<Container>
			<FormView>
				<Label>Enter your name</Label>
				<Input 
					placeholder = "Example : Suraj Sharma"
					onChangeText={e => changeHandler(e)}
					style={{ fontFamily : Fonts.normalFont }}
					autoFocus={true}
				/>
			</FormView>
			<Button onPress={()=>props.clickHandler(userName)}>
				<ButtonText>Submit</ButtonText>
			</Button>			
		</Container>
	);
	return content;
}

export default CredentialScreenForm;