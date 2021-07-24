import React from 'react';
import { Platform, FlatList, StyleSheet, Animated, Dimensions } from 'react-native';
import styled from "styled-components";
import Color from "../constants/Colors";
import SearchStaticResultShops from "./SearchStaticResultShops";
import SearchStaticResultItems from "./SearchStaticResultItems";

import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 0px 20px 0px;
`;
const ButtonContainer = styled.View`
	flex : 1;
	flex-direction : row;
	justify-content : space-around;
`;
const Button = styled.TouchableOpacity`
`;
const ButtonText = styled.Text`
  font-size : 20px;
  font-family  : ${Font.normalFont};
`;
const {height, width} = Dimensions.get('window');
const SearchTabNavigator = props => {
	let shopX = new Animated.Value(0);
	let shopOpacity = new Animated.Value(1);
	// let itemX = new Animated.Value(0);
	// let itemOpacity = new Animated.Value(1);
	let shopAnimationStyle = { transform : [{translateX : shopX}], opacity:shopOpacity};
	// let itemAnimationStyle = { transform : [{translateX : itemX}], opacity:itemOpacity};
	let barShopAnimationStyle = {width : 'auto', borderBottomColor:'Green', borderBottomWidth:2, opacity:shopOpacity};
	// let barItemAnimationStyle = {width : 'auto', borderBottomColor:'Green', borderBottomWidth:2, opacity:itemOpacity};	

	React.useEffect(()=>{
		// if(Object.keys(props.products).length==0 && Object.keys(props.shops).length!=0){
		// 	shopSelect();
		// }
	},[])
	const itemSelect = ()=>{
		Animated.parallel([
			Animated.timing(shopX,{
				toValue : width,
				duration : 300
			}),
			Animated.timing(shopOpacity,{
				toValue : 0,
				duration : 100
			})			
		]).start();
		// Animated.parallel([
		// 	Animated.timing(itemX,{
		// 		toValue : 0,
		// 		duration : 300
		// 	}),
		// 	Animated.timing(itemOpacity,{
		// 		toValue : 1,
		// 		duration : 100
		// 	})			
		// ]).start();		
	}

	const shopSelect = () => {
		Animated.parallel([
			Animated.timing(shopX,{
				toValue : 0,
				duration : 300
			}),
			Animated.timing(shopOpacity,{
				toValue : 1,
				duration : 100
			})			
		]).start();
		// Animated.parallel([
		// 	Animated.timing(itemX,{
		// 		toValue : -width,
		// 		duration : 300
		// 	}),
		// 	Animated.timing(itemOpacity,{
		// 		toValue : 0,
		// 		duration : 100
		// 	})			
		// ]).start();		
		// itemEnabled=false;
		shopEnabled=true;		
	}
	const content = (
		<Container>
			<ButtonContainer>
				{
					// <Button onPress={itemSelect}>
					// 	<ButtonText>Items</ButtonText>
					// 	<Animated.View style={barItemAnimationStyle} />
					// </Button>			
				}
				<Button onPress={shopSelect}>
					<ButtonText>Shops</ButtonText>
					<Animated.View style={barShopAnimationStyle}/>					
				</Button>
			</ButtonContainer>
			{
				// <Animated.View style={[itemAnimationStyle, styles.itemDefault]}>
				// 	<SearchStaticResultItems
				// 		navigation={props.navigation}
				// 		products={props.products}
				// 	/>
				// </Animated.View>
			}
			<Animated.View style={[shopAnimationStyle]}>
				<SearchStaticResultShops 
					navigation={props.navigation} 
					shops={props.shops} 
				/>					
			</Animated.View>						
		</Container>
	);
	return content;
}

const styles = StyleSheet.create({
	shopDefault : {
		position : 'absolute',
		top : 50,	
	},
	itemDefault : {
		top : 0,	
	}
});
export default SearchTabNavigator;