import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../constants';
import OrderCard from './OrderCard';
import ServiceCard from './ServiceCard';

const Renderer = ({ order, type, navigation, ...props }) => {
	let content = null;
	if (type === 'orders') {
		content = (
			<OrderCard
				order={order}
				navigation={navigation}
			/>
		)
	}else{
		content = (
			<ServiceCard
				serviceQuote={order}
				navigation={navigation}
			/>
		)
	}
	return content;
}
const OrderListing = ({orders, type, fetchOrders, navigation, ...props}) => {
	const _renderFooter = () => {
		return (
			<View style={{height: 100}}></View>
		)
	}
    let content = (
        <View style={styles.container}>
			{
				orders.length === 0
				?
				<View style={styles.header}>
					<Text style={styles.totalText}>No Completed {type === 'orders' ? 'Orders' : 'Services'}</Text>
				</View>
				:
				<FlatList
					data={orders}
					showsVerticalScrollIndicator={false}
					renderItem={({item}) => (
						<Renderer
							order={item}
							type={type} 
							navigation={navigation}
						/>
					)}
					keyExtractor={(item, index) => 'key'+item.id}
					ListFooterComponent={_renderFooter}
					extraData={orders}
				/>
			}
        </View>
    );
    return content;
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        padding: 5,
    },
    headerText: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: Fonts.normalFont,
        textTransform: 'capitalize'
    },
    totalText: {
        fontSize: 16,
        fontFamily: Fonts.boldFont,
        textAlign: 'center',
        textTransform: 'capitalize'
    }	
})
export default OrderListing;