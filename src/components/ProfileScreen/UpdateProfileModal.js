import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components';

import {AlertService} from '../../middleware/AlertService';
import {width, height} from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
	width : ${width};
	height: ${height};
`;
const BackgroundOverlay = styled.TouchableOpacity`
	height : ${height*0.20};
	width : ${width};
`;
const Title = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size: 18px;
	margin-bottom : 10px;
`;
const Form = styled.View`
	width : ${width};
	height : ${height*0.80};
	padding : 10px;
	background-color : white;
`;
const FormGroup = styled.View`
	padding : 10px 0px 0px 0px;
`;
const Label = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size: 12px;
`;
const Input = styled.TextInput``;
const ButtonView = styled.View`
	align-items : center;
`;
const Button = styled.TouchableOpacity`
	width : ${width*0.8};
	padding : 10px 0px;
	align-items : center;
	justify-content : center;
	background-color : ${Colors.lightGreenColor};
`;
const ButtonText = styled.Text`
	color : white;
	font-family : ${Fonts.boldFont};
	font-size : 14px;
	text-transform : uppercase;
`;
const UpdateProfileModal = ({active, toggleModal, ...props}) => {
	React.useEffect(()=>{
		customerName = '';
		customerMobile = '';
	},[])
	const changeTextHandler = (text, type) => {
		type==='customerName' ? customerName=text : customerMobile=text;
	}
	const submitHandler = () => {
		if(customerName.length > 0 || customerMobile.length===10)
		{
			let formData = new FormData();
			let reduxData = {customerName:null, customerMobile:null};
			formData.append('customerId', props.customerId);
			if(customerName.length > 0){
				formData.append('customerName', customerName); 
				reduxData.customerName = customerName;
			}if(customerMobile.length > 0){
				formData.append('customerMobile', customerMobile);
				reduxData.customerMobile = customerMobile;
			}
			AlertService('Update', 'Are you sure?', ()=>props.updateCustomerInfo(formData, reduxData));
		}else{
			toggleModal();
		}
	}
	let modalBody = (
		<Form>
			<Title>Edit Your Account Information</Title>		
			<FormGroup>
				<Label>Full Name</Label>
				<Input
					defaultValue={props.customerName}
					placeholder = "Enter Name"
		            underlineColorAndroid={Colors.lightGreenColor}
		            onChangeText={(e)=>changeTextHandler(e, 'customerName')}
				/>
			</FormGroup>			
			<FormGroup>
				<Label>Mobile No.</Label>			
				<Input
					defaultValue={props.customerMobile}				
					placeholder = "Enter Mobile"
		            underlineColorAndroid={Colors.lightGreenColor}					
		            onChangeText={(e)=>changeTextHandler(e, 'customerMobile')}
				/>	
			</FormGroup>
			<ButtonView>
				<Button onPress={submitHandler}><ButtonText>Submit</ButtonText></Button>
			</ButtonView>
		</Form>	
	);
	let content=(
        <Modal
          animationType="slide"
          transparent={true}
          visible={active}
          onRequestClose={toggleModal}
        >
			<Container>
				<BackgroundOverlay onPress={toggleModal} activeOpacity={1}/>
				{modalBody}
			</Container>
        </Modal>
	);
	return content;	
}

export default UpdateProfileModal;