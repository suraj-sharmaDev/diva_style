import React from 'react';
import {Keyboard} from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import ProceedCard from './ProceedCard';
import FloatingButton from './FloatingButton';
import FloatingList from './FloatingList';

const Container = styled.View`
	elevation : 17;
	width : 100%;
	position : absolute;
	bottom : 0px;
	flex-direction : column;
	align-items : center;
	justify-content : center;
`;
const TrackView = styled.TouchableOpacity`
	width : 100%;
	background-color : ${Colors.greenColor};
	padding : 10px;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 14px;
	color : white;
`;

const FooterCard = props => {
	const [active, updateActive] = React.useState(false);	
	const [show, updateShow] = React.useState(true);
	React.useEffect(()=>{
	    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', hideFooter);    
	    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', showFooter);
	    return()=>{
	      keyboardDidShowListener.remove();
	      keyboardDidHideListener.remove();
	    }        		
	})	
	const showFooter = () => {
		if(props.isFocused){
			updateShow(true);
		}
	}
	const hideFooter = () => {
		if(props.isFocused){
			updateShow(false);
		}
	}
	let content = null;
	if(!props.loading && show && !props.tracking){
		content = (
			<Container>
				<React.Fragment>
					<FloatingList 
						active={active} 
						scroll={props.scroll} 
						productList={props.productList} 
						updateActive={()=>updateActive(!active)}
					/>
					<FloatingButton 
						updateActive={()=>updateActive(!active)}
					/>
				</React.Fragment>						
				<ProceedCard {...props}/>
			</Container>
		);
	}else if(show){
		content = (
			<Container>
				<React.Fragment>
					<FloatingList 
						active={active} 
						scroll={props.scroll} 
						productList={props.productList} 
						updateActive={()=>updateActive(!active)}
					/>
					<FloatingButton 
						updateActive={()=>updateActive(!active)}
					/>
				</React.Fragment>									
				<TrackView activeOpacity={0.6} onPress={()=>props.navigation.navigate('CartStack')}>
					<Text>Track Your Current Order</Text>
				</TrackView>
			</Container>
		);
	}
	return content;
}
const mapStateToProps = state => {
	return {
		tracking : state.cart.tracking
	}
}
export default connect(mapStateToProps,{})(withNavigationFocus(FooterCard));