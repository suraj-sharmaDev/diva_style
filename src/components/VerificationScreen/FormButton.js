import React from 'react';
import { Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {AlertService} from '../../middleware/AlertService';

const {height, width} = Dimensions.get('window');

const Container = styled.View``;
const View = styled.View``;
const InfoText= styled.Text`
	color : ${Colors.blackColor};
	font-size : 14px;
	font-family : ${Fonts.normalFont};
`;
const ButtonGroup = styled.View`
	margin : 30px 0px;
	flex-direction : row;
	align-items : center;
	justify-content : center;
`;
const ResendButton = styled.TouchableOpacity`
	padding : 5px 0px;
	width : 100px;
	align-items : center;
`;
const ResendText = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
`;
const SubmitButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content : center;	
	padding: 5px;
	border-radius: 10px;
	background-color : ${Colors.greenColor};
`;
const ButtonText = styled.Text`
	color : white;
	font-size : 20px;
	font-family : ${Fonts.normalFont};
`;

const FormButton = props => {
	const [resendEnable, updateResendEnable] = React.useState(false);
	React.useEffect(()=>{
		timer = setTimeout(()=>{
			updateResendEnable(true)
		},50000);
		return ()=>{
			clearTimeout(timer);
		}
	},[])
	const handleResend = () => {
		if(resendEnable){
			props.handleResend();
		}
	}
	const handleChangeNumber = () => {
		AlertService('Change Number', 'Are you Sure?', props.handleChangeNumber);
	}
	let content = (
		<Container>
			<ButtonGroup>
				<InfoText>
					
				</InfoText>
				{/* <ResendButton 
					onPress={handleResend} 
					style={{ borderColor : resendEnable?Colors.greenColor:Colors.disabledGreenColor}}
					disabled={!resendEnable}
				>
					<ResendText style={{color : resendEnable?Colors.greenColor : Colors.greyColor}}>Resend OTP</ResendText>
				</ResendButton> */}
			</ButtonGroup>
			<SubmitButton 
				onPress={props.handleSubmit}
			>
				<View
					style={{
						flex: 1.25,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<ButtonText style={{color: 'white', fontSize: 20}}>Continue</ButtonText>
				</View>
				<View
					style={{
						flex: 0.75,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<Icon name="arrow-right-drop-circle" size={25} style={{color: 'white'}} />
				</View>
			</SubmitButton>
		</Container>
	);
	return content;
}

export default FormButton;