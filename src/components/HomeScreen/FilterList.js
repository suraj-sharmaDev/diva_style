import React from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {height, width} from '../../constants/Layout';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
const Container = styled.View`
	background-color : white;
	height : ${height*0.5};
	width : ${width*0.8};
	padding : 5px 0px;
	flex-direction : column;
	align-items : flex-start;
	border-radius : 10px;
	border-width : 1px;
	border-color : ${Colors.greyColor};
`;
const Header = styled.View`
	width : ${width*0.8};
	padding : 5px;
	flex-direction : row;
	justify-content : space-between;
	border-bottom-width : 2px;
	border-bottom-color : ${Colors.greyColor};	
`;
const Body = styled.View`
	height : 90%;
	flex-direction : row;
`;
const HeaderText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 18px;
`;
const ControlPanel = styled.View`
	background-color : ${Colors.searchBarColor};
	flex : 1;
	height : 100%;
	padding : 10px;
	flex-direction : column;
	padding : 10px;
	border-right-width : 1px;
	border-right-color : ${Colors.greyColor};
`;
const RightPanel = styled.View`
	flex : 2;
	padding : 10px;
	height : 100%;
	flex-direction : column;
	padding : 10px;
`;
const Button = styled.TouchableOpacity`
	flex-direction : row;
	align-items : center;
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 18px;
`;
const FilterList = ({active, selected, filterHandler, toggleModal}) =>{
	let modalBody = (
		<Container>
			<Header>
				<HeaderText>Sort shops in your location</HeaderText>
				<Button onPress={toggleModal}>
					<Icon name="close" size={20} />
				</Button>
			</Header>
			<Body>
				<ControlPanel>
					<Button activeOpacity={1}>
						<ButtonText style={{ marginRight : 10}}>Sort By</ButtonText>
						<Icon name="chevron-right" size={20} />						
					</Button>						
				</ControlPanel>
				<RightPanel>
					<Button 
						activeOpacity={0.6}
						disabled={selected==='distance'}
						style={{ backgroundColor : selected==='distance'?Colors.darkGreenColor : 'white', padding:4 }}
						onPress={()=>filterHandler('distance')}
					>
						<ButtonText style={{ color : selected==='distance'? 'white' : 'black'}}>Distance</ButtonText>
					</Button>						
					<Button 
						activeOpacity={0.6}
						disabled={selected==='rating'}
						style={{ backgroundColor : selected==='rating'?Colors.darkGreenColor : 'white', padding:4 }}						
						onPress={()=>filterHandler('rating')}						
					>
						<ButtonText style={{ color : selected==='rating'? 'white' : 'black'}}>Rating</ButtonText>
					</Button>						
				</RightPanel>
			</Body>
		</Container>
	);
	let content = (
		<Modal
		isVisible={active}
		onBackdropPress={toggleModal}
		animationInTiming={50}
		animationOutTiming={100}
		deviceWidth={width}
		deviceHeight={height}
		backdropColor={'white'}
		backdropOpacity={0.3}
		style={{ justifyContent:'flex-end', alignItems:'center', fontFamily : Fonts.normalFont}}>
			{modalBody}
		</Modal>		
	);
	return content;
}

export default FilterList;