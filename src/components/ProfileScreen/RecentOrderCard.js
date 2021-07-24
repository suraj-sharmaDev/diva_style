import React from 'react';
import { FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';
import styled from 'styled-components';
import {Fonts} from "../../constants";
import {connect} from 'react-redux';

import ProfileOptionTab from "./ProfileOptionTab";
import RecentOrderedItem from "./RecentOrderedItem";

const Container = styled.View`
	padding : 0px 20px;
	margin-vertical: 10px;
`;
const View = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	margin-bottom: 5px;	
`;
const Button = styled.TouchableOpacity`
	padding: 4px 10px;
`;
const Label = styled.Text`
	text-align: right;
	font-family: ${Fonts.boldFont};
`;

const RecentOrderCard = (props) => {
	let content = null;
	const [collapsed, updateCollapsed] = React.useState(true);

	const recentOrdersHandler = () => {
		props.navigation.navigate('RecentOrdersServices');
	}
	content = (
		<Container>
			{
				props.recentOrders.length > 0
				?
				<React.Fragment>
					<ProfileOptionTab
						iconName="unread"
						optionText="Recent Orders"
						navigation={() => updateCollapsed(!collapsed)}
					/>
					<Collapsible collapsed={collapsed} align="center">
						<View>
							<Button onPress={recentOrdersHandler}>
								<Label>View All</Label>
							</Button>
						</View>
						<FlatList
							data={props.recentOrders}
							renderItem={({item}) => (
								<RecentOrderedItem item={item} navigation={props.navigation} />
							)}
							keyExtractor={item => item.id+'key'}
							extraData={props.recentOrders}
						/>
					</Collapsible>
				</React.Fragment>
				:
				null
			}
		</Container>
	);
	return content;
}	

export default RecentOrderCard;