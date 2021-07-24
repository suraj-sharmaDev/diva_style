import React from "react";

import styled from 'styled-components';
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const Label = styled.Text`
	margin : 0;
	padding : 0;
	text-align : center;
	font-family : ${Fonts.lightFont};
	font-size : 12px;
`;
const TabBarLabel = ({ name, focused }) => {
	return null;
//  return(
//   <Label style={{color : focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>
//   	{name}
//   </Label>
//  );
}

export default TabBarLabel;
