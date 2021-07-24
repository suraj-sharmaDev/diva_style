import React from 'react';
import styled from 'styled-components';
import Shimmer from '../../middleware/Shimmer';
import {height, width} from '../../constants/Layout';

const Container = styled.View`
	flex-direction : column;
	height : ${height*0.6};
`;
const ShopScreenLoader = () => {
	let content = (
		<Container>
	        <Shimmer 
	        	direction="right" 
	        	opacity={0.5} 
	        	autoRun={true} 
	        	visible={false}
	        	style={{height:80, width: width, marginBottom : 15}}
	        />
	        <Shimmer 
	        	direction="right" 
	        	opacity={0.5} 
	        	autoRun={true} 
	        	visible={false} 
	        	style={{height:180, width: width, marginTop : 'auto'}}	        	
	        />
		</Container>
	);
	return content;
}

export default ShopScreenLoader;