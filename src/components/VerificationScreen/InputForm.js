import React from 'react';
import styled from 'styled-components';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import {AlertService} from '../../middleware/AlertService';
import InputFields from './InputFields';
import FormButton from './FormButton';

const Container = styled.SafeAreaView`
	padding : 20px 10px;
	height : 40%;
	width : 100%;
`;

const InputForm = ({ handleVerify, handleResendOtp, handleChangeNumber }) => {
	refs = [];
	otp = [];
	React.useEffect(()=>{},[]);
	const handleSubmit = () => {
		otpCode = otp.join('');
		if(otpCode.length === 4) {
			handleVerify(otpCode);
		}else{
			AlertService('Incomplete!','Please fill all 4 fields.', ()=>{});
		}
	}
	let content = (
		<Container>
			<InputFields handleSubmit={handleSubmit}/>
			<FormButton 
				handleResend={handleResendOtp} 
				handleSubmit={handleSubmit} 
			/>
		</Container>
	);

	return content;
}

export default React.memo(InputForm);