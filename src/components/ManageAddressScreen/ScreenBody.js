import React from 'react';
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import AddressView from './AddressView';
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	padding-top : 10px;
	padding-bottom : 100px;
`;
const View = styled.View``;
const InfoBox = styled.View`
	background-color : ${Color.separateViewColor};
	padding : 20px 10px 10px 10px;
`;
const InfoText = styled.Text`
	font-size : 13px;
	font-family : ${Font.normalFont};	
	text-transform : uppercase;
	text-align : center;
`;
const ScreenBody = ({store, currentAddress, ...props}) => {
	let content = null;
	if(Object.keys(store).length > 0){
		content = (
			<React.Fragment>
				<InfoBox>
					<InfoText>Saved Address</InfoText>
				</InfoBox>
				<View style={{paddingBottom : 60}}>
				{
					store.map((s, index)=>(
						<AddressView 
							key={index} 
							address={s} 
							index={index}
							currentAddress={currentAddress}
							trackingOrder={props.trackingOrder}
							navigation={props.navigation}
							deleteAddress={props.deleteAddress}
						/>
					))
				}
				</View>
			</React.Fragment>
		)
	}else{
		content = (
			<React.Fragment>
				<View>
					<InfoBox>
						<InfoText>
							No Saved Addresses
						</InfoText>
					</InfoBox>
				</View>
			</React.Fragment>
		);
	}
	return (
		<Container>
			{content}
		</Container>
	);
}

export default ScreenBody;