import React from 'react';
import { Platform, Dimensions} from 'react-native';
import styled from 'styled-components';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const {height, width} = Dimensions.get('window');

const View = styled.View`
  flex-direction : row;
  margin-top : 50px; 
  padding : 0px 10px;
  justify-content : space-between;
  align-items : center;
`;

const InputBox = styled.View`
  justify-content : center;
  align-items : center;
  background-color : white;
  border-bottom-width : 1px;
  border-bottom-color : ${Colors.lighterGreenColor};
`;
const Input = styled.TextInput`
  justify-content : center;
  align-items : center;
  font-family : ${Fonts.normalFont};
`;

const InputFields = ({handleSubmit}) => {
	const inputs = Array(4).fill(0);
	React.useEffect(()=>{
		refs[0].focus();
	},[]);

	const focusNext = (text, index) => {
		otp[index] = text[text.length-1];
		refs[index].setNativeProps({ text: text[text.length-1] });
		if(index < 3 && text.length>0){
			refs[index + 1].focus();
		}
	}
	const focusPrevious = (key, index) => {
		if(key==='Backspace' && index!=0){
			otp[index] = '';			
			refs[index - 1].focus();
		}else if(key === 'Enter' && index===3){
			handleSubmit();
		}
	}	

	const otpInput = inputs.map((i, j) => (
		<InputBox key={j}>
			<Input
				ref={ref => refs.push(ref)}
				keyboardType="numeric"
				style={{fontSize: 16}}
	            blurOnSubmit={false}				
				onChangeText={e => focusNext(e, j)}
				onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
				returnKeyType="done"
			/>
		</InputBox>
	));

	let content = (
		<View>
			{otpInput}
		</View>
	);
	return content;
}
export default InputFields;