import React from 'react';
import {Platform, StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CountryToCode} from '../../middleware/CountryToCode';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

import LoginInput from './LoginInput';
import LoginButton from './LoginButton';

const {height, width} = Dimensions.get('window');

const Form = styled.View`
	padding: 20px;
	height: 95%;
	border-top-width : 2px;
	border-top-color : ${Color.greyColor}; 
`;

const OptionView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
`;
const OptionButton = styled.TouchableOpacity``;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;
const LoginForm = props => {
	const [isLoading, updateLoading] = React.useState(true);	
    const [show, updateShow] = React.useState(false);  //actual initial value is true
    const [mobile, updateMobile] = React.useState('');
	const [password, updatePassword] = React.useState('');
    const [disabled, updateDisabled] = React.useState(true);
    React.useEffect(()=>{
		global.get_country = CountryToCode(props.country.trim());
		updateLoading(false);    	
    },[])
	
	const screenCheck = event => {
		//since for now referral code is not being used we comment it for future use
		// if (event.nativeEvent.layout.height <= height*0.30) updateShow(false);
		// else updateShow(true); 
	};
	
	const inputMobile = (data) => {
		updateMobile(data);
		if (data.length === 10 && password.length > 4) {
			updateDisabled(false);
		} else {
			updateDisabled(true);
		}
	}
	
	const inputPassword = data => {
		updatePassword(data);
		if (data.length > 4 && mobile.length === 10) {
			updateDisabled(false);
		} else {
			updateDisabled(true);
		}
	}

	const loginHandler = () => {
		updateDisabled(true);		
		props.clickHandler(`+${global.get_country.Phone}${mobile}`, password);
	}
	
	let content=null;
	
	if(!isLoading){
		content = (
			<Form onLayout={event=> screenCheck(event)}>
				<Text style={{color: Color.darkGreyColor, fontSize: 20}}>Get Started!</Text>
				<LoginInput inputMobile={inputMobile} code={global.get_country.Phone}/>
				<LoginInput inputMobile={inputPassword} type={"password"} />
				{
					show
					?
					<OptionView>
						<OptionButton>
							<Text>Have a refferal Code?</Text>
						</OptionButton>
						<OptionButton>
							<Text>Skip</Text>
						</OptionButton>
					</OptionView>				
					:
					null
				}
				<LoginButton disabled={disabled} loginHandler={loginHandler}/>
			</Form>
		);
	}
	return content;
};

export default LoginForm;