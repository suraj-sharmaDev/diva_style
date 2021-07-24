import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Colors from '../constants/Colors';
const LoadingScreen = () => {
	let content = (
		<View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
			<ActivityIndicator size="large" color={Colors.greenColor}/>
		</View>
	);
	return content;
}

export default LoadingScreen;