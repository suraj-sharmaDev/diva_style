import React from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FakedSearchBar from './FakedSearchBar';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
  position: absolute;
  width: 100%;
  top: 40%;
  flex-direction : row;
	align-items : center;
	padding : 0px 10px;	
  justify-content : center;
`;

const View = styled.View`
  align-items : center;
  justify-content : center;
`;

const ShopName = styled.Text`
  font-size : 22px;
  font-family  : ${Font.normalFont};
  color : white;
`;

const ShopInfoCard = ({name, category, rating, ...props}) => {
	let content = (
		<Container>
			<View>
				<ShopName>{name}</ShopName>
        <FakedSearchBar clickHandler={props.updateActive}/>
			</View>
		</Container>
	);
	return content;
}

export default React.memo(ShopInfoCard);