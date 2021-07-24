import React from 'react';
import styled from 'styled-components';

import {ShopBasicInformation} from '../../middleware/API';
import Colors from '../../constants/Colors';
import Font from "../../constants/Fonts";

const ImageDiv = styled.TouchableOpacity`
	padding : 10px 20px;
	flex-direction : row;
	align-items : flex-start;
	margin-bottom : 20px;
`;
const ShopCard = styled.View`
	flex-direction : column;
`;
const ShopName = styled.Text`
	margin-left : 10px;
	font-size : 16px;
	font-family  : ${Font.boldFont};
`;
const ShopLocation = styled.Text`
	margin-left : 10px;
	font-size : 16px;
	font-family  : ${Font.normalFont};
	color : ${Colors.darkGreyColor};
`;
const Image = styled.Image`
  height: 60px;
  width: 60px;
  border-radius : 5px;
`;
const ShopInfo = props => {
	const [isloading, updateLoading] = React.useState(true);
	React.useEffect(()=>{
		initialization();
		return ()=>{
			updateLoading('unmounted');
		}
	},[props.shopId])
	const initialization = () => {
		ShopBasicInformation(props.shopId)
		.then((result)=>{
			shopInfo = result;
			if(isloading!=='unmounted'){
				updateLoading(false);
			}
		})
		.catch((err)=>{
			console.warn(err);
		})
	}
	let content = null;
	if(!isloading){
		content = (
			  <ImageDiv onPress={()=>props.navigation.navigate('Shop', {shopId : props.shopId})}>
				  <Image source={{ uri : shopInfo.image }}/>
				  <ShopCard>
				  	<ShopName>{shopInfo.name}</ShopName>
				  	<ShopLocation>{shopInfo.pickupAddress}</ShopLocation>
				  </ShopCard>
			  </ImageDiv>			  
		);
	}
	return content;
}

export default ShopInfo;