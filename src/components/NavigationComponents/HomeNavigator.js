import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import HomeNavigationButton from './HomeNavigationButton';

const Container = styled.View`
	width: 100%;
	height: 100px;
	align-items: center;
`;
const HalfView = styled.View`
	width: 100%;
	height: 50%;
	background-color: ${Colors.greenColor};
`;
const View = styled.View`
	position: absolute;
	height: 70%;
	width: 70%;
`;
const Label = styled.Text`
	font-family: ${Fonts.boldFont};
	font-size: 16px;
`;
const ButtonGroup = styled.View`
	height: 72%;
	width: 100%;
	elevation: 1;
	flex-direction: row;
	background-color: white;
	justify-content: space-between;
	align-items: center;	
	border-radius: 8px;
	padding: 0px 30px;
`;
const Button = styled.TouchableOpacity`
	flex: 1;
`;
const Separator = styled.View`
	flex: 1;
	height: 90%;
	justify-content: flex-end;
	align-items: center;
`;

const HomeNavigator = props => {
	let content = (
		<Container>
			<HalfView></HalfView>
			<View>
				<Label style={{color: 'white'}}>Choose a service</Label>			
				<ButtonGroup>
					<Button onPress={()=>props.navigation.navigate('Home')}
						style={{alignItems: 'flex-start'}}
					>
						<HomeNavigationButton 
							label={'shops'} 
							active={props.navigation.state.routeName==='Home'}
						/>
					</Button>
					<Separator>
						<Label>|</Label>
					</Separator>							
					<Button onPress={()=>props.navigation.navigate('Service')}
						style={{alignItems: 'flex-end'}}					
					>
						<HomeNavigationButton 
							label={'services'} 
							active={props.navigation.state.routeName==='Service'}							
						/>
					</Button>
				</ButtonGroup>
			</View>
		</Container>
	);
	return content;
}

export default HomeNavigator;