import React from 'react';
import { FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Entypo';

import styled from 'styled-components';
import ShopInfo from './ShopInfo';
import ItemCard from './ItemCard';
import CouponCard from './CouponCard';
import BillCard from './BillCard';
import Colors from '../../constants/Colors';

const Container = styled.View``;
const Expand = styled.TouchableOpacity`
	height: 30px;
	align-items: center;
	justify-content: center;
`;
const CartBody = props => {
	const [collapsed, updateCollapsed] = React.useState(true);
	React.useEffect(()=>{
		if(!collapsed) updateCollapsed(true);
	},[props.focused])
	const expandHandler = () => {
		updateCollapsed(!collapsed);
	}
	const totalAmountPreserver = (amount) => {
		totalAmount = amount;
	}
	const couponReedem = () => {
		props.navigation.navigate('CouponReedem', {totalAmount : totalAmount});
	}
	let content = (
		<Container>
			<ShopInfo
				shopId={props.store.shopId}
				navigation={props.navigation}
			/>
			<ItemCard
				info={props.store.items[0]}
				store={props.store}
				refresh={props.refresh}
				onIncrement={props.onIncrement}
				onDecrement={props.onDecrement}
			/>
			{
				props.store.items.length > 1
				?
				<>
					{
						!collapsed
						?
						null
						:
						<Expand onPress={()=>expandHandler()}>
							<Icon name="chevron-down" size={32} color={Colors.darkGreyColor} />
						</Expand>
					}
					<Collapsible collapsed={collapsed} align="top">
						<FlatList
							data={props.store.items}
							renderItem={({item, index}) => {
								if(index!=0) return(
									<ItemCard
										key={index}
										info={item}
										store={props.store}
										refresh={props.refresh}
										onIncrement={props.onIncrement}
										onDecrement={props.onDecrement}
									/>
								)
							}}
							keyExtractor={(item, index) => item.productId + 'key'}
							extraData={props.store}
						/>
					</Collapsible>
					{
						collapsed
						?
						null
						:
						<Expand onPress={()=>expandHandler()}>
							<Icon name="chevron-up" size={32} color={Colors.darkGreyColor} />
						</Expand>
					}					
				</>
				:
				null
			}
			<CouponCard couponReedem={couponReedem}/>
			<BillCard 
				store={props.store} 
				deliveryFee={props.deliveryFee} 
				discountAmount={props.discountAmount} 
				distance={props.distance}
				totalAmountPreserver={totalAmountPreserver}
			/>
		</Container>
	);
	return content;
};

export default CartBody;