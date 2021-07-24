import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo"; 
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
const View = styled.View``;

const ButtonContainer = styled.View`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 80px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonContainer = styled.TouchableOpacity`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 60px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonView = styled.View`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Button = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Quantity = styled.View`
	flex : 2;
	flex-direction : row;
	align-items : center;
	justify-content : center;	
	background-color : white;
`;

const QuantityText = styled.Text`
	font-family : ${Font.normalFont};
	color : ${Colors.greenColor};
`;
const Label = styled.Text`
	font-family : ${Font.normalFont};
	color : ${Colors.greenColor};
`;

const QuantityButton = ({item, store, onIncrement, onDecrement, refresh }) => {
	let [selected, setSelected] = useState(null);
	useEffect(()=>{
		if(Object.keys(store).length > 0){
			setSelected(store.items.find((s)=>(s.productId == item.productId)))
		} 
	},[refresh])
	let content = null;
	if(selected!=null)
	{
		content = (
			<ButtonContainer>
				<Button onPress={()=>{onDecrement(item.productId)}}>
					<Entypo name="minus" color={Colors.greenColor} />
				</Button>
				<Quantity>
					<QuantityText>{selected.qty}</QuantityText>
				</Quantity>
				<Button onPress={()=>onIncrement({
					shopId: store.shopId,
					productId: item.productId,
					name: item.name,
					price: item.price,
				})}>
					<Entypo name="plus" color={Colors.greenColor} />
				</Button>
			</ButtonContainer>
		);
	}
	else
	{
		content = (
				<DefaultButtonContainer onPress={()=>{onIncrement(item.productId, item.name, item.price)}}>
					<View style={{flex:1, flexDirection :'row', alignItems : 'center', jusitfyContent : 'center'}}>
						<Label>Add</Label>
						<DefaultButtonView>
							<Entypo name="plus" color={Colors.greenColor} />
						</DefaultButtonView>
					</View>
				</DefaultButtonContainer>
		);
	}
	return content;
}

export default QuantityButton;