import React from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import {height, width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	min-height : ${height*0.1};
	width : ${width*0.8};
	padding : 10px;
	background-color : white;
	margin-bottom : 100px;
	border-width : 0.6px;
	border-color : ${Colors.lightGreenColor};
`;
const OrderView = styled.View`
	width : 100%;
	flex-direction : row;
	justify-content : space-between;
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 15px;
`;

const Item = ({order}) => {
	let item = (
		<OrderView>
			<Text numberOfLines={1} style={{paddingRight:10, width : '70%'}}>{order.productName}</Text>
			<Text>Rs {order.price} x {order.qty}</Text>
		</OrderView>
	);
	return item;
}
const OrderDetailModal = (props) => {
	let totalAmount = 0;
	let content=(
		<Modal
			isVisible={props.active}
			onBackButtonPress={props.updateActive}	
			onBackdropPress={props.updateActive}
			animationIn={'slideInRight'}
			animationOut={'slideOutRight'}
			animationOutTiming={10}
			deviceWidth={width}
			deviceHeight={height}
			backdropColor={'white'}
			backdropOpacity={0.6}
			style={{alignItems : 'center', justifyContent : 'flex-end'}}
		>
			{
				props.active
				?
				<Container>
					{
						props.order.items.map((order, index)=>{ 
							totalAmount+=order.price*order.qty
							return <Item order={order} key={index} />
						})
					}
					{
						props.order.paymentType=='COD'
						?
						<React.Fragment>
							<OrderView 
								style={{ borderBottomWidth:1, borderBottomColor : Colors.greyColor, paddingBottom : 10}}
							>
								<Text>Delivery Charge</Text>
								<Text>Rs 20</Text>
							</OrderView>					
							<OrderView style={{ paddingTop : 10}}>
								<Text>Total Amount</Text> 
								<Text>Rs {totalAmount+20}</Text>
							</OrderView>
						</React.Fragment>
						:
						<React.Fragment>
							<OrderView style={{ paddingTop : 10}}>
								<Text>Total Amount</Text> 
								<Text>Rs {totalAmount}</Text>
							</OrderView>
						</React.Fragment>
					}

					<OrderView>
						<Text>Payment Mode</Text> 
						<Text>
						{
							props.order.paymentType=='COD'
							?
							'COD'
							:
							'Online Payment'
						}
						</Text>
					</OrderView>				
				</Container>				
				:
				<Text />
			}
		</Modal>
	);
	return content;
}

export default OrderDetailModal;