import React from 'react';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const OptionButton = styled.TouchableOpacity`
	flex-direction : row;
	justify-content : space-between;
	padding : 5px 0px;
`;
const View = styled.View``;

const OptionText = styled.Text`
	font-size : 18px;
	font-family  : ${Font.boldFont};
	color : ${Colors.darkGreyColor};	
`;
const ProfileOptionTab = ({iconName, optionText, navigation}) => (
	<OptionButton onPress={navigation}>
		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
			<Entypo name={iconName} size={22} style={{marginRight : 10,	color : Colors.darkGreyColor}}/>
			<OptionText>{optionText}</OptionText>
		</View>
		<View>
			{
				optionText!=='Customer Care'
				?
					<Entypo name="chevron-thin-right" size={22} style={{color : Colors.darkGreyColor}}/>				
				:
					null
			}
		</View>
	</OptionButton>
);

export default ProfileOptionTab;