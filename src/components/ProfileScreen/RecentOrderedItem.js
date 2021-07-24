import React from 'react';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import CategoryIcon from "./CategoryIcon";

const Container = styled.TouchableOpacity`
	flex-direction : row;
	align-items : center;
	height : 60px;
	background-color : ${Colors.greenColor};
	padding : 0px 20px;
	margin-top : 5px;
	border-radius : 12px;
`;
const View = styled.View``;

const ItemName = styled.Text`
	font-size : 18px;
	color : white;
	font-family  : ${Font.normalFont};
`;
const ShopName = styled.Text`
	font-size : 12px;
	color : white;
	font-family  : ${Font.normalFont};
	text-transform: capitalize;
`;
const ItemPrice = styled.Text`
	font-size : 18px;
	color : white;
	font-family  : ${Font.normalFont};
`;
const RecentOrderedItem = ({item, navigation}) => {
	React.useEffect(()=>{
	},[])
	const recentOrderHandler = () => {
		// console.warn(item);
		navigation.navigate('RecentOrderDetail',{'item':item});
	}
	let deliveryAddress = JSON.parse(item.deliveryAddress);
	let content = (
		<Container activeOpacity={0.6} onPress={recentOrderHandler}>
			<CategoryIcon subCategoryName={(item.category).toLowerCase()} size={32}/>
			<View>
				<ItemName>{item.shopName}</ItemName>
				<ShopName>
					{
						item.deliveryAddress!=null
						?
						`${deliveryAddress.houseDetail} ${deliveryAddress.landmark}`
						:
						`Delivered to you`
					}
				</ShopName>
			</View>
		</Container>
	)
	return content;
};

export default RecentOrderedItem;