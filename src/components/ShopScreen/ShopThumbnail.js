import React from 'react';
import { Dimensions } from "react-native";
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../constants/Colors";

const Thumbnail = styled.View``;

const Image = styled.ImageBackground`
	height : 180px;
	width : ${Dimensions.get('window').width};
`;
const ShopThumbnail = ({image}) => {
	let content = (
	    <Thumbnail>
		    <Image source={{ uri : image }} />	      
	    </Thumbnail>	
	);
	return content;
}

export default React.memo(ShopThumbnail);