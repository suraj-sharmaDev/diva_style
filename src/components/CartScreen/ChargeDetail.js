import React from 'react';
import { Tooltip } from 'react-native-elements';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";
const View = styled.View``;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;
const Title = styled.Text`
	font-family  : ${Font.boldFont};
	color : ${Color.blackColor};
`;
const Info = styled.Text`
	font-family  : ${Font.normalFont};
	color : ${Color.lightGreyColor};
`;
const CurrencyHOC = ({data, type}) => {
	if(type === 'info'){
		color = Color.lightGreyColor;
	} else {
		color = Color.blackColor;
	}
	let HOC = (
		<React.Fragment>
			<Icon name="currency-inr" size={16} style={{ color : color}}/>	
			<Text style={{ color : color }}>{data}</Text>
		</React.Fragment>	
	);
	return HOC;
}
const DisplayComponent = ({ data }) => {
	let fee = (
		<View>
			<View style={{ marginBottom : 5}}>
				<Title>Delivery Fee for this order</Title>
			</View>
			<View style={{ flexDirection : 'row', justifyContent : 'space-between'}}>
				<Title>Distance Fee</Title>
				<View style={{ flexDirection : 'row'}}>
					<CurrencyHOC data={data.fee} type={'title'}/>
				</View>
			</View>
			<View style={{ flexDirection : 'row', flexWrap : 'wrap'}}>
				<Info>Delivering from distance {data.distance} KM</Info>
			</View>						
		</View>
	);
	return fee;
}

const ChargeDetail = props => {
	let content = (
		<Tooltip popover={<DisplayComponent data={props}/>}
			width={250}
			height = {100} 
			containerStyle={{backgroundColor : 'white'}}>
		  <Icon name="information-outline" size={20} style={{ color : Color.darkGreyColor}}/>
		</Tooltip>		
	);
	return content;
}

export default ChargeDetail;