import React from 'react';
import styled from 'styled-components';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const InputView = styled.View`
	margin-top: 10px;
	height: 50px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: ${Color.searchBarColor};
	border-radius: 12px;
`;
const Code = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;	
	padding: 0px 2px 0px 0px;
`;
const Input = styled.TextInput`
	width: 90%;
`;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;
const LoginInput = ({inputMobile, code, type = "number"}) =>{
	const [secured, setSecured] = React.useState(true);
	let content = null;
	if(type==="number") {
		const codeLength = code.length;
		const width = codeLength > 2 ? codeLength * 10 + 50 : 50;
		content = (
			<InputView>
				<Code style={{ width : width}}>
					<Text style={{color: Color.darkGreyColor, fontSize: 19, padding : 0, marginTop : -3}}>+{code}</Text>
				</Code>
				<Input
					placeholder="Enter Mobile Number"
					keyboardType="numeric"
					style={{fontSize: 16}}
					onChangeText={e => inputMobile(e)}
					maxLength={10}
				/>
			</InputView>
		);
	} else {
		content = (
			<InputView>
				<Code style={{ width : 20}}>
				</Code>
				<Input
					placeholder="Enter Password"
					style={{fontSize: 16}}
					onChangeText={e => inputMobile(e)}
					secureTextEntry={secured}
					style={{width: '70%'}}
					maxLength={20}
				/>
				<Code style={{ width : 30, marginLeft: 30}} onPress={() => setSecured(!secured)}>
					<Icons name={secured ? "eye-outline" : "eye-off-outline"} size={25} />
				</Code>				
			</InputView>
		);		
	}
	return content;
}

export default LoginInput;