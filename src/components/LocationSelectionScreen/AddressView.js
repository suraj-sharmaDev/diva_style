import React from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View``;
const AddressRow = styled.TouchableOpacity`
	padding : 10px;
	flex-direction : row;
	align-items : flex-start;
`;
const Address = styled.Text`
	text-transform : uppercase;
	font-family : ${Font.boldFont};
	color : ${Colors.blackColor};
	font-size : 15px;
`;
const AddressDetail = styled.Text`
	font-family : ${Font.lightFont};
	font-size : 15px;
`;

const AddressView = ({address, place_id, type, onLocationSelect, ...props}) => {
	let IconName;
	let addressTitle;
	let addressInfo;
	let content;
	let color = Colors.blackColor;
	if(type==='SavedLocation')
	{
		addressTitle = address.savedAs;
		addressInfo = address.houseDetail+', '+address.landmark;
		if(address.savedAs === 'home'){
			IconName=props.isCurrent ? "home" : "home-outline";
			color=props.isCurrent ? Colors.darkGreenColor : Colors.blackColor; 
		}else if(address.savedAs === 'work'){
			IconName=props.isCurrent ? "briefcase" : "briefcase-outline";
			color=props.isCurrent ? Colors.darkGreenColor : Colors.blackColor; 
		}else{
			IconName=props.isCurrent ? "map-marker" : "map-marker-outline";
			color=props.isCurrent ? Colors.darkGreenColor : Colors.blackColor; 
		}
	}else{
		addressTitle = address.structured_formatting.main_text;
		IconName = "map-marker-outline";
		addressInfo = address.structured_formatting.secondary_text;
	}
	content = (
		<AddressRow onPress={()=>onLocationSelect(place_id)}>
			<View style={{marginRight : 20}}>
				<Icon name={IconName} size={22} color={color}/>
			</View>
			<View style={{justifyContent:'center'}}>
				<Address>{addressTitle}</Address>				
				<AddressDetail>{addressInfo}</AddressDetail>
			</View>
		</AddressRow>
	);
	return content;
}
export default AddressView;