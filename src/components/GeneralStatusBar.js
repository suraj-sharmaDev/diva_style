import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from "styled-components";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const View = styled.SafeAreaView`
	height: ${STATUSBAR_HEIGHT};	
`;
const GeneralStatusBar = ({ backgroundColor, ...props }) => (
	<View style={{ backgroundColor }}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);

export default GeneralStatusBar;