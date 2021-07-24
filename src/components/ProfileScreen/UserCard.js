import React from 'react';
import { Platform, View } from "react-native";
import styled from "styled-components";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import {connect} from 'react-redux';

import {AlertService} from '../../middleware/AlertService';
import {UpdateCustomerInfo} from '../../middleware/API';
import {updateCustomer} from '../../store/actions/user';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import UpdateProfileModal from './UpdateProfileModal';

const Container = styled.SafeAreaView`
  flex-direction : column;
  padding : 20px 20px;	
`;

const Header = styled.View`
  align-items : flex-end;
`;
const UserInfo = styled.View`
  flex-direction : row;
`;
const UserName = styled.Text`
	font-size : 32px;
	font-family  : ${Font.normalFont};
	color : ${Colors.darkGreyColor};
	text-transform : capitalize;
`;
const Text = styled.Text`
	font-size : 16px;
	font-family  : ${Font.normalFont};
	color : ${Colors.darkGreyColor}
`;
const UserImage = styled.View`
	height : 80px;
	width : 80px;
	align-items : center;
	justify-content :center;
	border-radius : 40px;
	border-width : 3px;
	border-color : ${Colors.greenColor};
`;
const Button = styled.TouchableOpacity``;

const UserCard = (props) => {
	const [active, updateActive] = React.useState(false);
	React.useEffect(()=>{
	},[])

	const toggleModal = () => {
		updateActive(!active);
	}
	const updateCustomerInfo = (formData, reduxData) => {
		toggleModal();
		UpdateCustomerInfo(formData)
		.then((result)=>{
			props.onUpdateCustomerInfo(reduxData);
		})
		.catch((err)=>{
			AlertService('Error', 'An error occurred, Sorry for inconvenience!', ()=>{});
		})
	}
	return(
	<Container>
		<Header>
		</Header>
		<UserInfo>
			<View style={{flex:2}}>
				<UserName>{props.user.userName}</UserName>
				<Text>{props.user.userMobile}</Text>
			</View>
			{
			// <View>
			// 	<UserImage>
			// 		<Icon name="account" size={40} color={Colors.lightGreenColor}/>
			// 	</UserImage>
			// 	<Button activeOpacity={0.8} onPress={toggleModal}>
			// 		<Text>Edit Profile</Text>
			// 	</Button>
			// </View>
			}
		</UserInfo>
		<UpdateProfileModal 
			customerName={props.user.userName}
			customerMobile={props.user.userMobile}
			customerId = {props.user.userId}
			updateCustomerInfo={updateCustomerInfo}
			active={active} 
			toggleModal={toggleModal}
		/>
	</Container>
	)
};

const mapStateToProps = state => {
	return {
		user : state.user
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onUpdateCustomerInfo: data => {
			dispatch(updateCustomer(data))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);