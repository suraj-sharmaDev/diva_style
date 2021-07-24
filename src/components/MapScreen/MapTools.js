import React from 'react';
import { Dimensions } from 'react-native';
import styled from "styled-components";
import marker from '../../assets/images/marker.png';
import target from '../../assets/images/target.png';
const {height, width} = Dimensions.get('window');
const Marker = styled.View`
  position : absolute;
  left : ${width/2 - 20};
  top : ${height*0.25 - 32};
`;
const MarkerImage = styled.Image`
  border-radius: 12px;
  height: 40px;
  width: 40px;
`;
const Button = styled.TouchableOpacity`
  position : absolute;
  border-radius : 12px;
  backgroundColor : white;
  padding : 5px;
  left : ${width - 50};
  top : ${height * 0.5 - 40};
`;
const TargetImage = styled.Image`
  height: 25px;
  width: 25px;
`;
const MapTools = props => (
	<React.Fragment>
      <Marker>
        <MarkerImage source={marker} />
      </Marker>
      <Button onPress={getCurrentLocation}>
        <TargetImage source={target} />
      </Button>
	</React.Fragment>	
)

export default MapTools;