import React from 'react';
import styled from 'styled-components';

import Colors from '../../constants/Colors';
import { width, height } from '../../constants/Layout';

import FakedSearchBar from '../FakedSearchBar';
import DeliveryLocationHeader from './DeliveryLocationHeader';

const Container = styled.View`
	width: ${width}px;
	height: 60px;
	background-color: ${Colors.greenColor};
`;
const View = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;

const Header = ({ navigation, currentAddress, type, ...props }) => {
	let content = (
		<Container>
			<View>
				<DeliveryLocationHeader navigation={navigation} currentAddress={currentAddress} />
				{
					type == 'services'
						?
						null
						:
						<FakedSearchBar navigation={navigation} />
				}
			</View>
		</Container>
	);
	return content;
}

export default Header;