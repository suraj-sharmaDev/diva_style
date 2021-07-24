import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const Container = styled.View`
	padding : 20px 0px;
	height : 20%;
	flex-direction : column;
`;
const View = styled.View``;
const HeaderText = styled.Text`
	font-size : 18px;
	font-family : ${Fonts.normalFont};
	color : #014C28;
	text-align : center;
`;
const Button = styled.TouchableOpacity``;
const InfoText = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.placeHolderColor};
`;
const MobileText = styled.Text`
	padding-left : 10px;
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.blackColor};
`;
const Header = ({ handleChangeNumber, userMobile }) => {
	React.useEffect(()=>{},[]);
	let content = (
		<Container>
			<View style={{flexDirection:'row', width : '100%'}}>
				<Button onPress={()=>handleChangeNumber()}>
		            <Icon name="chevron-left" size={30} color={Colors.greenColor}/>
	            </Button>
	            <View style={{flex:4}}>
					<HeaderText>Verification</HeaderText>
				</View>
			</View>
			<View style={{marginTop : 20, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
				<InfoText>Enter OTP sent to</InfoText>
				<MobileText>{userMobile}</MobileText>
			</View>
		</Container>
	);

	return content;
}

export default React.memo(Header);