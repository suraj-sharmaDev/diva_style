import React from "react";
import AntDesign  from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
import styled from 'styled-components';
import {connect} from 'react-redux';

const Container = styled.View`
	position: absolute;
	bottom: 5px;
	height: 60px;
	width: 60px;
	border-radius: 60px;
	background-color: ${Colors.greenColor};
	border: 3px solid ${Colors.cartRoundedBorderColor};
	justify-content: center;
	align-items: center;
`;
const Badge = styled.View`
	padding : 0px;
	border-radius : 0px;
	margin-top : 0px;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	color : white;
	font-size : 10px;
`;
const CartBadge = ({name, focused, ...props}) => {
	// if(props.cart.tracking===false){
	// 	IconName = name; 
	// }else{
	// 	IconName = 'enviromento'
	// }
	let IconName = name;	
	return (
		<Container>
			{
				props.cart.items.length > 0
				?
				<Badge>
					{
						<Text>{props.cart.items.length}</Text>
					}
				</Badge>				
				:
				null
			}
			<AntDesign
				name={IconName}
				size={22}
				style={{marginBottom: -3}}
				color={focused ? 'white' : 'white'}
			/>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(
	mapStateToProps,
	{},
)(CartBadge);

