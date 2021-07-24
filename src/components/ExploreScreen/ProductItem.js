import React from 'react';
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View`

`;
const ItemContainer = styled.View`
	flex-direction : column;
	padding : 10px 10px;
`;
const ItemDetailView = styled.TouchableOpacity`
	margin : 10px 0px;
	flex-direction : row;
	align-items : center;	
`;
const ImageView = styled.View`
	width : 100px;
	height : 100px;
	border-radius : 7px;
	background-color : ${Colors.preLoadingColor};
	margin : 0px 20px 0px 0px;
`;
const ItemImage = styled.Image`
	width : 100px;
	height : 100px;
	border-radius : 7px;
`;
const ItemName = styled.Text`
	font-size : 16px;
	font-family  : ${Font.normalFont};
	color : ${Colors.blackColor};
	text-transform : capitalize;
`;
const ItemSubCategory = styled.Text`
  font-size : 15px;
  font-family  : ${Font.normalFont};
  color : ${Colors.blackColor};
`;

const ProductItem = ({ navigation, data }) => {
	let content = null;
	content = (
		<ItemContainer>
			<ItemName numberOfLines={1}>Product In {data.sub_category_child_name} Category</ItemName>
			<ItemDetailView onPress={()=>navigation.navigate('Shop', {shopId : data.dist_point_id})}>
				<ImageView>
					<ItemImage 
						source={{ uri : data.product_image}}
					/>			
				</ImageView>
				<View style={{alignItems : 'flex-start', width : '50%'}}>
					<ItemName numberOfLines={2} ellipsizeMode = 'tail'>{data.product_name}</ItemName>
					<ItemSubCategory>Rs {data.product_price}</ItemSubCategory>
				</View>
			</ItemDetailView>
		</ItemContainer>
	);
	return content;
}

export default React.memo(ProductItem);