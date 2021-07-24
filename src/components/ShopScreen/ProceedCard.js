import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.TouchableOpacity`
	padding : 5px 10px;
	background-color : ${Color.greenColor};
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
	width : 100%;
	border-top-left-radius : 10px;
	border-top-right-radius : 10px;	
`;
const View = styled.View``;
const ItemText = styled.Text`
	color : white;
	font-family : ${Font.lightFont};
	font-size : 18px;
`;
const Amount = styled.Text`
	color : white;
	font-family : ${Font.lightFont};	
	font-size : 18px;
`;
const Text = styled.Text`
	color : white;
	font-family : ${Font.normalFont};	
	font-size : 16px;
	margin-right : 10px;
`;

const ProceedCard = props => {
	const TotalCalculator = (data) => {
		let count = 0;
		let amount = 0;
		data.map(d => {
			count+=d.qty;
			amount+=d.qty * d.price;
		});
		return {count : count, amount : amount}; 
	}
	if(Object.keys(props.cart.items).length>0)
	{
		let data = TotalCalculator(props.cart.items);
		let content = (
			<Container activeOpacity={0.95} onPress={()=>props.navigation.navigate('Cart')}>
				<View>
					<ItemText>
						{
							data.count == 1
							?
								`${data.count} item`
							:
								`${data.count} items`
						}
					</ItemText>
					<View style={{ flexDirection:'row', marginLeft : -5, alignItems:'center' }}>
						<Icon name="currency-inr" style={{ color : 'white', fontSize:18}}/>				
						<Amount>{data.amount}</Amount>
					</View>
				</View>
				<View style={{ flexDirection:'row' }}>
					<Text>View Cart</Text>
					<SimpleLineIcons name="bag" style={{ color : 'white', fontSize:22}}/>						
				</View>
			</Container>
		);
		return content;
	}else{
		return null;
	}
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
export default connect(
  mapStateToProps,
  {}
)(ProceedCard);