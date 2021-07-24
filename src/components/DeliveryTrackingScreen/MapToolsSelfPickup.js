import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const Button = styled.TouchableOpacity`
  position : absolute;
  background-color : white;
  left : ${width - 50};
  top : ${height*0.1 - 32};
  border-radius : 20px;
`;
const Text = styled.Text``;
const MapToolsSelfPickup = props => {
	let content = (
		<Button onPress={props.openNativeMaps}>
			<Icon name="call-split" size={32} />
		</Button>
	);
	return content;
}

export default MapToolsSelfPickup;