import React from 'react';
import {Dimensions} from 'react-native';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import {connect} from 'react-redux';

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import {height, width} from '../../constants/Layout';

const Container = styled.View`
	flex-direction : column;
	padding : 10px 10px 10px 10px;
	border-bottom-width : 1;
	border-bottom-color : ${Colors.greyColor};				
`;
const View = styled.View``;
const Label = styled.Text`
  font-size : 12px;
  font-family  : ${Fonts.normalFont};
  color : ${Colors.lightGreyColor};	
`;
const Address = styled.Text`
	font-size : 15px;
	font-family  : ${Fonts.normalFont};
	color : ${Colors.blackColor};
	width : ${width * 0.7};
`;
const Button = styled.TouchableOpacity`
	padding : 0px 3px;
`;
const Change = styled.Text`
	font-size : 15px;
    font-family  : ${Fonts.normalFont};
	color : ${Colors.greenColor};
`;
const ShopDeliveryOption = ({ navigation, ...props }) => {
	React.useEffect(()=>{
	},[])

	const currentAddress = props.address.savedAddresses[props.address.currentAddress];
	let address = '';
	if(currentAddress){
		const houseDetail = currentAddress.houseDetail;
		const landmark = currentAddress.landmark;
		address = `${houseDetail}, ${landmark}`;
	}
	let content = (
		<Container>
			<View>
				<Label>DELIVERING TO</Label>			
			</View>
			<View style={{flexDirection:'row', justifyContent : 'space-between'}}>
				{
					currentAddress
					?
					<View style={{flexDirection:'row', alignItems : 'center'}}>
						<Entypo name="check" size={15} color={Colors.greenColor}/>			
						<Address numberOfLines={1}>{address}</Address>	
					</View>
					:
					<Button onPress={()=>navigation.navigate('LocationSelector')}>
						<View style={{flexDirection:'row', alignItems : 'center'}}>
							<Address numberOfLines={1}>Please Add a Address</Address>	
						</View>
					</Button>					
				}
			</View>
		</Container>
	);
	return content;
}
const mapStateToProps = state => {
	return {
		address : state.address,
	}
}
export default React.memo(connect(mapStateToProps,{})(ShopDeliveryOption));